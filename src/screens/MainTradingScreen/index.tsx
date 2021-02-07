import * as React from 'react';
import {injectIntl} from 'react-intl';
import {connect, MapDispatchToPropsFunction, MapStateToProps} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {
    OrderComponent,
    TradingChart,
} from '../../containers';
import {IntlProps} from '../../index';
import {
    RootState,
    selectCurrentMarket,
    selectMarketTickers,
    selectSidebarState,
    selectUserInfo,
    selectUserLoggedIn,
    setCurrentMarket,
    setCurrentPrice,
    Ticker,
    User,
} from '../../modules';
import {GridLayoutState, saveLayouts, selectGridLayoutState} from '../../modules/public/gridLayout';
import {Market, marketsFetch, selectMarkets} from '../../modules/public/markets';
import {depthFetch} from '../../modules/public/orderBook';
import {rangerConnectFetch, RangerConnectFetch} from '../../modules/public/ranger';
import {RangerState} from '../../modules/public/ranger/reducer';
import {selectRanger} from '../../modules/public/ranger/selectors';


interface ReduxProps {
    currentMarket: Market | undefined;
    markets: Market[];
    user: User;
    rangerState: RangerState;
    userLoggedIn: boolean;
    rgl: GridLayoutState;
    tickers: {
        [pair: string]: Ticker,
    };
    isActive: boolean;
}

interface DispatchProps {
    depthFetch: typeof depthFetch;
    marketsFetch: typeof marketsFetch;
    rangerConnect: typeof rangerConnectFetch;
    setCurrentPrice: typeof setCurrentPrice;
    setCurrentMarket: typeof setCurrentMarket;
    saveLayouts: typeof saveLayouts;
}

interface StateProps {
    orderComponentResized: number;
    orderBookComponentResized: number;
}

interface ComponentProps {
    match: {
        params: {
            market: string;
        },
    };
}

type Props = DispatchProps & ReduxProps & RouteComponentProps & IntlProps & ComponentProps;


class MainTrading extends React.Component<Props, StateProps> {
    public componentDidMount() {
        this.props.setCurrentMarket(this.props.markets.filter(e => e.id === this.props.match.params.market)[0]);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>) {
        if (this.props.match !== nextProps.match) {
            this.props.setCurrentMarket(this.props.markets.filter(e => e.id === nextProps.match.params.market)[0]);
        }
    }

    public render() {
        return (
            <div className="mainOrderScreen container">
                <div className="row">
                    <div className="col-12 chart">
                        <TradingChart/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <OrderComponent mainMarket={true} proTrading={true}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    user: selectUserInfo(state),
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
    rgl: selectGridLayoutState(state),
    tickers: selectMarketTickers(state),
    isActive: selectSidebarState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    depthFetch: payload => dispatch(depthFetch(payload)),
    rangerConnect: (payload: RangerConnectFetch['payload']) => dispatch(rangerConnectFetch(payload)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    setCurrentMarket: payload => dispatch(setCurrentMarket(payload)),
    saveLayouts: payload => dispatch(saveLayouts(payload)),
});

export const MainTradingScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(MainTrading) as React.ComponentClass;
