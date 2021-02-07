import * as React from 'react';
import {Spinner} from 'react-bootstrap';
import {
    FormattedMessage,
    injectIntl,
} from 'react-intl';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {compose} from 'redux';
import {Order, OrderProps, WalletItemProps} from '../../components';
import {FilterPrice} from '../../filters';
import {IntlProps} from '../../index';
import {
    alertPush,
    currenciesFetch,
    Currency,
    marketsFetch,
    marketsTickersFetch,
    RootState,
    selectCurrencies,
    selectCurrentPrice,
    selectDepthAsks,
    selectDepthBids,
    selectMarkets,
    selectTradingFees,
    selectUserInfoData,
    selectUserLoggedIn,
    selectWallets,
    setCurrentMarket,
    setCurrentPrice,
    TradingFees,
    tradingFeesFetch,
    userInfoFetch,
    UserInfoType,
    Wallet,
    walletsFetch,
} from '../../modules';
import {
    Market,
    selectCurrentMarket,
    selectCurrentMarketFilters,
    selectMarketTickers,
} from '../../modules/public/markets';
import {
    orderExecuteFetch,
    selectOrderExecuteLoading,
} from '../../modules/user/orders';

interface ReduxProps {
    currentMarket: Market | undefined;
    currentMarketFilters: FilterPrice[];
    executeLoading: boolean;
    marketTickers: {
        [key: string]: {
            last: string;
            buy: string;
            sell: string;
        },
    };
    bids: string[][];
    asks: string[][];
    wallets: WalletItemProps[];
    currentPrice: number | undefined;
    currencies: Currency[];
    markets: Market[];
    userInfo: UserInfoType | undefined;
    tradingFees: TradingFees[];
}

interface StoreProps {
    orderSide: string;
    priceLimit: number | undefined;
    width: number;
    askFee: number;
    bidFee: number;
    selectedCoin: {
        id: string,
    };
}

interface DispatchProps {
    walletsFetch: typeof walletsFetch;
    setCurrentPrice: typeof setCurrentPrice;
    orderExecute: typeof orderExecuteFetch;
    pushAlert: typeof alertPush;
    currenciesFetch: typeof currenciesFetch;
    setCurrentMarket: typeof setCurrentMarket;
    fetchMarkets: typeof marketsFetch;
    fetchMarketTickers: typeof marketsTickersFetch;
    fetchTradingFees: typeof tradingFeesFetch;
    userInfoFetch: typeof userInfoFetch;
}

interface OwnProps {
    userLoggedIn: boolean;
    currentPrice: string;
    proTrading: boolean;
    defaultTabIndex?: number;
    mainMarket?: boolean;
    location: {
        pathname: '',
    };
}

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

class OrderInsert extends React.PureComponent<Props, StoreProps> {
    constructor(props: Props) {
        super(props);

        this.state = {
            orderSide: 'buy',
            priceLimit: undefined,
            width: 0,
            askFee: 0,
            bidFee: 0,
            selectedCoin: {
                id: 'btc',
            },
        };

        this.orderRef = React.createRef();
    }

    private orderRef;

    public componentDidMount() {
        if (typeof this.props.userInfo === 'undefined' || this.props.userInfo.group === '') {
            this.props.userInfoFetch();
        }

        if (!this.props.wallets.length) {
            this.props.walletsFetch();
        }
        if (!this.props.currencies.length) {
            this.props.currenciesFetch();
        }

        if (!this.props.markets.length) {
            this.props.fetchMarkets();
        }

        if (!Object.keys(this.props.marketTickers).length) {
            this.props.fetchMarketTickers();
        }

        if (!this.props.tradingFees || !this.props.tradingFees.length) {
            this.props.fetchTradingFees();
        }

        if (!this.props.location.pathname.includes('/trading')) {
            const marketToSet = this.props.markets.find(el => (el.base_unit === 'btc' && el.quote_unit === window.env.mainMarketsUnit));
            if (marketToSet) {
                this.props.setCurrentMarket(marketToSet);
            }
        }
    }

    public componentDidUpdate() {
        if (this.orderRef.current && this.state.width !== this.orderRef.current.clientWidth) {
            this.setState({
                width: this.orderRef.current.clientWidth,
            });
        }
    }

    public UNSAFE_componentWillReceiveProps(next: Props) {
        const {userLoggedIn, userInfo, tradingFees, currentMarket} = this.props;

        if (userLoggedIn && !next.wallets.length) {
            this.props.walletsFetch();
        }

        if (+next.currentPrice && next.currentPrice !== this.state.priceLimit) {
            this.setState({
                priceLimit: +next.currentPrice,
            });
        }

        if (userInfo && userInfo.group !== '' && tradingFees && tradingFees.length && currentMarket) {
            if (tradingFees && tradingFees.filter(e => e.market_id === currentMarket.id).length) {
                const fees = tradingFees.find(e => (e.market_id === currentMarket.id && e.group === userInfo.group));
                this.setState({
                    askFee: fees ? Number(fees.taker) : 0,
                    bidFee: fees ? Number(fees.maker) : 0,
                });
            } else {
                const fees = tradingFees.find(e => (e.market_id === 'any' && e.group === userInfo.group));
                this.setState({
                    askFee: fees ? Number(fees.taker) : 0,
                    bidFee: fees ? Number(fees.maker) : 0,
                });
            }
        }

    }

    public render() {
        const {
            asks,
            bids,
            currentMarket,
            currentMarketFilters,
            defaultTabIndex,
            executeLoading,
            marketTickers,
            wallets,
            proTrading,
            currencies,
            mainMarket,
        } = this.props;
        const {priceLimit, bidFee, askFee} = this.state;

        if (!currentMarket) {
            return null;
        }

        const walletBase = this.getWallet(currentMarket.base_unit, wallets);
        const walletQuote = this.getWallet(currentMarket.quote_unit, wallets);

        const currentTicker = marketTickers[currentMarket.id];

        const defaultCurrentTicker = {last: '0'};
        const headerContent = (
            <div className="cr-table-header__content">
                <div className="cr-title-component"><FormattedMessage id="page.body.trade.header.newOrder"/></div>
            </div>
        );

        return (
            <div className={'pg-order'} ref={this.orderRef}>
                {this.state.width > 448 ? headerContent : undefined}
                <Order
                    asks={asks}
                    bids={bids}
                    disabled={executeLoading}
                    from={currentMarket.quote_unit}
                    availableBase={this.getAvailableValue(walletBase)}
                    availableQuote={this.getAvailableValue(walletQuote)}
                    onSubmit={this.handleSubmit}
                    priceMarketBuy={Number((currentTicker || defaultCurrentTicker).last)}
                    priceMarketSell={Number((currentTicker || defaultCurrentTicker).last)}
                    priceLimit={priceLimit}
                    to={currentMarket.base_unit}
                    handleSendType={this.getOrderType}
                    orderTypes={this.getOrderTypes}
                    currentMarketAskPrecision={currentMarket.amount_precision}
                    currentMarketBidPrecision={currentMarket.price_precision}
                    width={this.state.width}
                    listenInputPrice={this.listenInputPrice}
                    defaultTabIndex={defaultTabIndex}
                    currentMarketFilters={currentMarketFilters}
                    translate={this.translate}
                    proTrading={proTrading}
                    mainMarket={mainMarket}
                    currencies={currencies}
                    onCoinSelectChange={this.handleCoinSelectChange}
                    selectedCoin={this.state.selectedCoin}
                    askFee={askFee}
                    bidFee={bidFee}
                />
                {executeLoading &&
                <div className="pg-order--loading"><Spinner animation="border" variant="primary"/></div>}
            </div>
        );
    }

    private handleCoinSelectChange = e => {

        // tslint:disable-next-line:no-shadowed-variable
        const marketToSet = this.props.markets.find(el => (el.base_unit === e.id && el.quote_unit === window.env.mainMarketsUnit));
        if (marketToSet) {
            this.props.setCurrentMarket(marketToSet);
            this.setState({
                selectedCoin: {
                    id: e.id,
                },
            });
        } else {
            this.props.pushAlert({
                message: [this.translate('error.order.market.notFound')],
                type: 'error',
            });
        }
    };

    private handleSubmit = (value: OrderProps) => {
        const {currentMarket} = this.props;

        if (!currentMarket) {
            return;
        }

        const {
            amount,
            available,
            orderType,
            price,
            type,
        } = value;

        this.props.setCurrentPrice(0);

        const resultData = {
            market: currentMarket.id,
            side: type,
            volume: amount.toString(),
            ord_type: (orderType as string).toLowerCase(),
        };

        const order = orderType === 'Limit' ? {...resultData, price: price.toString()} : resultData;
        let orderAllowed = true;

        if (+resultData.volume < +currentMarket.min_amount) {
            this.props.pushAlert({
                message: [this.translate(
                    'error.order.create.minAmount',
                    {amount: currentMarket.min_amount, currency: currentMarket.base_unit.toUpperCase()},
                )],
                type: 'error',
            });

            orderAllowed = false;
        }

        if (+price < +currentMarket.min_price) {
            this.props.pushAlert({
                message: [this.translate(
                    'error.order.create.minPrice',
                    {price: currentMarket.min_price, currency: currentMarket.quote_unit.toUpperCase()},
                )],
                type: 'error',
            });

            orderAllowed = false;
        }

        if (+currentMarket.max_price && +price > +currentMarket.max_price) {
            this.props.pushAlert({
                message: [this.translate(
                    'error.order.create.maxPrice',
                    {price: currentMarket.max_price, currency: currentMarket.quote_unit.toUpperCase()},
                )],
                type: 'error',
            });

            orderAllowed = false;
        }

        if ((+available < (+amount * +price) && order.side === 'buy') ||
            (+available < +amount && order.side === 'sell')) {
            this.props.pushAlert({
                message: [this.translate(
                    'error.order.create.available',
                    {
                        available: available, currency: order.side === 'buy' ?
                            currentMarket.quote_unit.toUpperCase() :
                            currentMarket.base_unit.toUpperCase(),
                    },
                )],
                type: 'error',
            });

            orderAllowed = false;
        }

        if (orderAllowed) {
            this.props.orderExecute(order);
        }
    };

    private getWallet(currency: string, wallets: WalletItemProps[]) {
        const currencyLower = currency.toLowerCase();

        return wallets.find(w => w.currency === currencyLower) as Wallet;
    }

    private getOrderType = (index: number, label: string) => {
        this.setState({
            orderSide: label.toLowerCase(),
        });
    };

    private getAvailableValue(wallet: Wallet | undefined) {
        return wallet && wallet.balance ? Number(wallet.balance) : 0;
    }

    private listenInputPrice = () => {
        this.setState({
            priceLimit: undefined,
        });
        this.props.setCurrentPrice(0);
    };

    private translate = (id: string, value?: any) => this.props.intl.formatMessage({id}, {...value});

    private getOrderTypes = [
        this.translate('page.body.trade.header.newOrder.content.orderType.limit'),
        this.translate('page.body.trade.header.newOrder.content.orderType.market'),
    ];
}

const mapStateToProps = (state: RootState) => ({
    bids: selectDepthBids(state),
    asks: selectDepthAsks(state),
    currentMarket: selectCurrentMarket(state),
    currentMarketFilters: selectCurrentMarketFilters(state),
    executeLoading: selectOrderExecuteLoading(state),
    marketTickers: selectMarketTickers(state),
    wallets: selectWallets(state),
    currentPrice: selectCurrentPrice(state),
    userLoggedIn: selectUserLoggedIn(state),
    currencies: selectCurrencies(state),
    markets: selectMarkets(state),
    userInfo: selectUserInfoData(state),
    tradingFees: selectTradingFees(state),
});

const mapDispatchToProps = dispatch => ({
    walletsFetch: () => dispatch(walletsFetch()),
    orderExecute: payload => dispatch(orderExecuteFetch(payload)),
    pushAlert: payload => dispatch(alertPush(payload)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    currenciesFetch: () => dispatch(currenciesFetch()),
    setCurrentMarket: payload => dispatch(setCurrentMarket(payload)),
    fetchMarkets: () => dispatch(marketsFetch()),
    fetchMarketTickers: () => dispatch(marketsTickersFetch()),
    fetchTradingFees: () => dispatch(tradingFeesFetch()),
    userInfoFetch: () => dispatch(userInfoFetch()),
});

// tslint:disable-next-line no-any
const OrderComponent = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(OrderInsert) as any;


export {
    OrderComponent,
};
