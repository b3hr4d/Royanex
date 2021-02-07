import * as React from 'react';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Decimal} from '../../components/Decimal';
import {IntlProps} from '../../index';
import {
    Market,
    marketsTickersFetch,
    RootState,
    selectCurrentMarket,
    selectMarkets,
    selectMarketTickers,
    selectUserInfo,
    Ticker,
    User,
} from '../../modules';


interface ReduxProps {
    currentMarket?: Market;
    markets: Market[];
    marketTickers: {
        [key: string]: Ticker,
    };
    user: User;
}

interface DispatchProps {
    fetchMarketTickers: typeof marketsTickersFetch;
}

interface OwnProps {
    location: {
        pathname: string,
    };
}

type Props = IntlProps & ReduxProps & DispatchProps & OwnProps;

// tslint:disable no-any jsx-no-multiline-js
class SubHeaderToolbarContainer extends React.Component<Props> {
    public componentDidMount() {
        this.props.fetchMarketTickers();
    }

    public numberWithCommas = x => {
        if (x) {
            const split = x.toString().split('.');
            if (split.length > 1) {
                // tslint:disable-next-line:prefer-template
                return split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + split[1];
            } else {
                return split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }

        }

        return '';

    };

    public render() {
        // tslint:disable-next-line:prefer-template
        const defaultIndex = 'btc' + window.env.mainMarketsUnit;
        const {marketTickers, markets, user, location} = this.props;
        const defaultTicker = {amount: 0, low: 0, last: 0, high: 0, volume: 0, price_change_percent: '+0.00%'};
        const currentMarket = (location.pathname.includes('/trading'))
            ? this.props.currentMarket
            : markets.find(e => e.id === defaultIndex);

        const isPositive = currentMarket && /\+/.test(this.getTickerValue('price_change_percent'));
        const cls = isPositive ? 'positive' : 'negative';

        const bidUnit = currentMarket && ((currentMarket.quote_unit === 'rls') ? 'تومان' : currentMarket.quote_unit.toUpperCase());

        return (
            <div className="pg-header__toolbar py-4 px-2" style={{width: '100%'}}>
                <div className={`pg-header__toolbar-item rounded px-2 ${cls}`}>
                    <span
                        className="ml-2">{(currentMarket) ? (currentMarket.base_unit === 'rls') ? 'تومان' : currentMarket.base_unit.toUpperCase() : ''}</span>
                    <p className="pg-header__toolbar-item-text text-center text-white">
                        {this.translate('page.body.trade.toolBar.change')}
                    </p>
                    <p className={`pg-header__toolbar-item-value pg-header__toolbar-item-value`}>
                        {currentMarket && (marketTickers[currentMarket.id] || defaultTicker).price_change_percent}
                    </p>
                </div>
                <div className="pg-header__toolbar-item">
                    <p className="pg-header__toolbar-item-text">
                        {this.translate('page.body.trade.toolBar.lowest')}
                    </p>
                    <p className="pg-header__toolbar-item-value pg-header__toolbar-item-value-positive">
                        {currentMarket && this.numberWithCommas(Decimal.format(Number(this.getTickerValue('low')), currentMarket.price_precision))} {bidUnit}
                    </p>
                </div>
                <div className="pg-header__toolbar-item">
                    <p className="pg-header__toolbar-item-text">
                        {this.translate('page.body.trade.toolBar.lastPrice')}
                    </p>
                    <p className="pg-header__toolbar-item-value pg-header__toolbar-item-value-negative">
                        {currentMarket && this.numberWithCommas(Decimal.format(Number(this.getTickerValue('last')), currentMarket.price_precision))} {bidUnit}
                    </p>
                </div>
                <div className="pg-header__toolbar-item">
                    <p className="pg-header__toolbar-item-text">
                        {this.translate('page.body.trade.toolBar.highest')}
                    </p>
                    <p className="pg-header__toolbar-item-value pg-header__toolbar-item-value-negative">
                        {currentMarket && this.numberWithCommas(Decimal.format(Number(this.getTickerValue('high')), currentMarket.price_precision))} {bidUnit}
                    </p>
                </div>
                <div className="pg-header__toolbar-item">
                    <p className="pg-header__toolbar-item-text">
                        {this.translate('page.body.trade.toolBar.volume')}
                    </p>
                    <p className="pg-header__toolbar-item-value pg-header__toolbar-item-value-positive">
                        {currentMarket && this.numberWithCommas(Decimal.format(Number(this.getTickerValue('volume')), currentMarket.price_precision))} {bidUnit}
                    </p>
                </div>
                {(user && user.level !== 3) &&
                <div>
                    <Link to={'/profile'}>
                        <button className="btn btn-outline-warning mt-3">
                            {this.translate('page.body.trade.toolBar.kyc')}
                        </button>
                    </Link>
                </div>
                }
            </div>
        );
    }

    private getTickerValue = (value: string) => {
        // tslint:disable-next-line:prefer-template
        const defaultIndex = 'btc' + window.env.mainMarketsUnit;
        const {marketTickers, markets, location} = this.props;
        const currentMarket = (location.pathname.includes('/trading'))
            ? this.props.currentMarket
            : markets.find(e => e.id === defaultIndex);
        const defaultTicker = {amount: 0, low: 0, last: 0, high: 0, volume: 0, price_change_percent: '+0.00%'};

        return currentMarket && (marketTickers[currentMarket.id] || defaultTicker)[value];
    };

    private translate = (id: string) => {
        return id ? this.props.intl.formatMessage({id}) : '';
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    marketTickers: selectMarketTickers(state),
    user: selectUserInfo(state),
});

const mapDispatchToProps = dispatch => ({
    fetchMarketTickers: () => dispatch(marketsTickersFetch()),
});


const SubHeaderToolbar = injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(SubHeaderToolbarContainer) as any) as any);

export {
    SubHeaderToolbar,
};
