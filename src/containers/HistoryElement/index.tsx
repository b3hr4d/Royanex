import * as React from 'react';
import {Spinner} from 'react-bootstrap';
import {
    injectIntl,
} from 'react-intl';
import {connect, MapDispatchToPropsFunction} from 'react-redux';
import {compose} from 'redux';
import {History, Pagination} from '../../components';
import {Decimal} from '../../components/Decimal';
import {
    localeDate,
    preciseData,
    setDepositStatusColor,
    setTradesType,
    setWithdrawStatusColor,
} from '../../helpers';
import {IntlProps} from '../../index';
import {
    currenciesFetch,
    Currency,
    fetchHistory,
    Market,
    RootState,
    selectCurrencies,
    selectCurrentPage,
    selectFirstElemIndex,
    selectHistory,
    selectHistoryLoading,
    selectLastElemIndex,
    selectMarkets,
    selectNextPageExists,
    selectWallets,
    Wallet,
    WalletHistoryList,
} from '../../modules';

interface HistoryProps {
    type: string;
    dashboard?: boolean;
    title?: string;
    currency?: string;
}

interface ReduxProps {
    currencies: Currency[];
    marketsData: Market[];
    wallets: Wallet[];
    list: WalletHistoryList;
    fetching: boolean;
    page: number;
    firstElemIndex: number;
    lastElemIndex: number;
    nextPageExists: boolean;
}

interface DispatchProps {
    fetchCurrencies: typeof currenciesFetch;
    fetchHistory: typeof fetchHistory;
}

type Props = HistoryProps & ReduxProps & DispatchProps & IntlProps;

class HistoryComponent extends React.Component<Props> {
    public interval;

    public componentDidMount() {
        const {currencies, type, currency} = this.props;

        if (currency) {
            this.props.fetchHistory({page: 0, type, limit: 10, currency: currency});
        } else {
            this.props.fetchHistory({page: 0, type, limit: 10});
        }
        if (currencies.length === 0) {
            this.props.fetchCurrencies();
        }

        this.interval = setInterval(() => {
            if (currency) {
                this.props.fetchHistory({page: 0, type, limit: 10, currency: currency});
            } else {
                this.props.fetchHistory({page: 0, type, limit: 10});
            }
        }, 3000);
    }

    public UNSAFE_componentWillReceiveProps(nextProps) {
        const {currencies} = this.props;

        if (nextProps.currencies.length === 0 && nextProps.currencies !== currencies) {
            this.props.fetchCurrencies();
        }
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render() {
        const {list, fetching, dashboard} = this.props;

        return (
            <div className={`pg-history-elem ${list.length ? '' : 'pg-history-elem-empty'}`}>
                {list.length ? this.renderContent() : null}
                {!list.length
                    ?
                    (dashboard)
                        ? <div className="card">
                            <div className="card-header">
                                <span>معاملات شما</span>
                            </div>
                            <div className="card-body">
                                {
                                    fetching
                                        ?
                                        <div className="text-center"><Spinner animation="border" variant="primary"/></div>
                                        :
                                        <p className="pg-history-elem__empty">{this.props.intl.formatMessage({id: 'page.noDataToShow'})}</p>
                                }
                            </div>
                        </div>
                        :
                        <p className="pg-history-elem__empty">{this.props.intl.formatMessage({id: 'page.noDataToShow'})}</p>
                    :
                    null
                }
            </div>
        );
    }

    public renderContent = () => {
        const {type, firstElemIndex, lastElemIndex, page, nextPageExists, dashboard, title} = this.props;

        return (
            <React.Fragment>
                <History title={title} headers={this.renderHeaders(type)} data={this.retrieveData()}/>
                {!dashboard &&
                <Pagination
                    firstElemIndex={firstElemIndex}
                    lastElemIndex={lastElemIndex}
                    page={page}
                    nextPageExists={nextPageExists}
                    onClickPrevPage={this.onClickPrevPage}
                    onClickNextPage={this.onClickNextPage}
                />
                }

            </React.Fragment>
        );
    };

    private onClickPrevPage = () => {
        const {page, type, currency} = this.props;
        if (currency) {
            this.props.fetchHistory({page: Number(page) - 1, type, limit: 10, currency: currency});
        } else {
            this.props.fetchHistory({page: Number(page) - 1, type, limit: 10});
        }
    };

    private onClickNextPage = () => {
        const {page, type, currency} = this.props;
        if (currency) {
            (type === 'trades')
                ? this.props.fetchHistory({page: Number(page) + 1, type, limit: 10, currency: currency})
                : this.props.fetchHistory({page: Number(page) + 1, type, limit: 10, currency: currency});
        } else {
            this.props.fetchHistory({page: Number(page) + 1, type, limit: 10});
        }
    };

    private renderHeaders = (type: string) => {
        switch (type) {
            case 'deposits':
                return [
                    this.props.intl.formatMessage({id: 'page.body.history.deposit.header.txid'}),
                    this.props.intl.formatMessage({id: 'page.body.history.deposit.header.date'}),
                    this.props.intl.formatMessage({id: 'page.body.history.deposit.header.currency'}),
                    this.props.intl.formatMessage({id: 'page.body.history.deposit.header.amount'}),
                    this.props.intl.formatMessage({id: 'page.body.history.deposit.header.status'}),
                ];
            case 'withdraws':
                return [
                    this.props.intl.formatMessage({id: 'page.body.history.withdraw.header.address'}),
                    this.props.intl.formatMessage({id: 'page.body.history.withdraw.header.date'}),
                    this.props.intl.formatMessage({id: 'page.body.history.withdraw.header.currency'}),
                    this.props.intl.formatMessage({id: 'page.body.history.withdraw.header.amount'}),
                    this.props.intl.formatMessage({id: 'page.body.history.withdraw.header.fee'}),
                    this.props.intl.formatMessage({id: 'page.body.history.withdraw.header.status'}),
                ];
            case 'trades':
                return [
                    this.props.intl.formatMessage({id: 'page.body.history.trade.header.date'}),
                    this.props.intl.formatMessage({id: 'page.body.history.trade.header.side'}),
                    this.props.intl.formatMessage({id: 'page.body.history.trade.header.market'}),
                    this.props.intl.formatMessage({id: 'page.body.history.trade.header.price'}),
                    this.props.intl.formatMessage({id: 'page.body.history.trade.header.amount'}),
                    this.props.intl.formatMessage({id: 'page.body.history.trade.header.total'}),
                ];
            default:
                return [];
        }
    };

    private retrieveData = () => {
        const {type, list, currency} = this.props;

        if (type === 'trades' && currency) {
            return [...list]
                .map(item => {
                    if ('market' in item && item.market.includes(currency.toLowerCase())) {
                        return this.renderTableRow(type, item);
                    } else {
                        return [];
                    }
                });
        } else {
            return [...list]
                .map(item => this.renderTableRow(type, item));
        }

    };

    private renderTableRow = (type, item) => {
        const {
            currencies,
            intl,
            marketsData,
            wallets,
        } = this.props;
        switch (type) {
            case 'deposits': {
                const {amount, confirmations, created_at, currency, txid} = item;
                const blockchainLink = this.getBlockchainLink(currency, txid);
                const wallet = wallets.find(obj => obj.currency === currency);
                const itemCurrency = currencies && currencies.find(cur => cur.id === currency);
                const minConfirmations = itemCurrency && itemCurrency.min_confirmations;
                const state = (item.state === 'submitted' && confirmations !== undefined && minConfirmations !== undefined) ? (
                    `${confirmations}/${minConfirmations}`
                ) : (
                    intl.formatMessage({id: `page.body.history.deposit.content.status.${item.state}`})
                );

                return [
                    <div className="pg-history-elem__hide" key={txid}>
                        <a href={blockchainLink} target="_blank" rel="noopener noreferrer">{txid}</a></div>,
                    localeDate(created_at, 'fullDate'),
                    currency && currency.toUpperCase(),
                    wallet && preciseData(amount, wallet.fixed),
                    <span style={{color: setDepositStatusColor(item.state)}} key={txid}>{state}</span>,
                ];
            }
            case 'withdraws': {
                const {txid, created_at, currency, amount, fee, rid} = item;
                const state = intl.formatMessage({id: `page.body.history.withdraw.content.status.${item.state}`});
                const blockchainLink = this.getBlockchainLink(currency, txid, rid);
                const wallet = wallets.find(obj => obj.currency === currency);

                return [
                    <div className="pg-history-elem__hide" key={txid || rid}>
                        <a href={blockchainLink} target="_blank" rel="noopener noreferrer">{txid || rid}</a>
                    </div>,
                    localeDate(created_at, 'fullDate'),
                    currency && currency.toUpperCase(),
                    wallet && preciseData(amount, wallet.fixed),
                    fee,
                    <span style={{color: setWithdrawStatusColor(item.state)}} key={txid || rid}>{state}</span>,
                ];
            }
            case 'trades': {
                const {id, created_at, side, market, price, amount, total} = item;
                const marketToDisplay = marketsData.find(m => m.id === market) ||
                    {name: '', price_precision: 0, amount_precision: 0};
                const marketName = marketToDisplay ? marketToDisplay.name : market;
                const sideText = setTradesType(side).text.toLowerCase() ? intl.formatMessage({id: `page.body.history.trade.content.side.${setTradesType(side).text.toLowerCase()}`}) : '';

                return [
                    localeDate(created_at, 'fullDate'),
                    <span style={{color: setTradesType(side).color}} key={id}>{sideText}</span>,
                    marketName,
                    <Decimal key={id} fixed={marketToDisplay.price_precision}>{price}</Decimal>,
                    <Decimal key={id} fixed={marketToDisplay.amount_precision}>{amount}</Decimal>,
                    <Decimal key={id} fixed={marketToDisplay.amount_precision}>{total}</Decimal>,
                ];
            }
            default: {
                return [];
            }
        }
    };

    private getBlockchainLink = (currency: string, txid: string, rid?: string) => {
        const {wallets} = this.props;
        const currencyInfo = wallets && wallets.find(wallet => wallet.currency === currency);
        if (currencyInfo) {
            if (txid && currencyInfo.explorerTransaction) {
                return currencyInfo.explorerTransaction.replace('#{txid}', txid);
            }
            if (rid && currencyInfo.explorerAddress) {
                return currencyInfo.explorerAddress.replace('#{address}', rid);
            }
        }

        return '';
    };
}


const mapStateToProps = (state: RootState): ReduxProps => ({
    currencies: selectCurrencies(state),
    marketsData: selectMarkets(state),
    wallets: selectWallets(state),
    list: selectHistory(state),
    fetching: selectHistoryLoading(state),
    page: selectCurrentPage(state),
    firstElemIndex: selectFirstElemIndex(state, 10),
    lastElemIndex: selectLastElemIndex(state, 10),
    nextPageExists: selectNextPageExists(state, 10),
});


export const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        fetchCurrencies: () => dispatch(currenciesFetch()),
        fetchHistory: params => dispatch(fetchHistory(params)),
    });


export const HistoryElement = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps),
)(HistoryComponent) as any; // tslint:disable-line
