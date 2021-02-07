import * as React from 'react';
import {injectIntl} from 'react-intl';
import {connect, MapDispatchToPropsFunction, MapStateToProps} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {incrementalOrderBook} from '../../api';
import {Decimal} from '../../components/Decimal';
import {GridChildInterface, GridItem} from '../../components/GridItem';
import {
    OpenOrdersComponent,
    OrderBook,
    OrderComponent,
    RecentTrades,
    ToolBar,
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


const {WidthProvider, Responsive} = require('react-grid-layout');

const breakpoints = {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0,
};

const cols = {
    lg: 24,
    md: 24,
    sm: 12,
    xs: 12,
    xxs: 12,
};

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

const ReactGridLayout = WidthProvider(Responsive);
type Props = DispatchProps & ReduxProps & RouteComponentProps & IntlProps & ComponentProps;

const TradingWrapper = props => {
    const {orderComponentResized, orderBookComponentResized, layouts, handleResize, isSidebarActive} = props;
    const children = React.useMemo(() => {
        const data = [
            {
                i: 1,
                render: () => <OrderComponent size={orderComponentResized} proTrading={true}/>,
            },
            {
                i: 2,
                render: () => <TradingChart/>,
            },
            {
                i: 3,
                render: () => <OrderBook size={orderBookComponentResized}/>,
            },
            {
                i: 5,
                render: () => <OpenOrdersComponent/>,
            },
            {
                i: 6,
                render: () => <RecentTrades/>,
            },
        ];

        return data.map((child: GridChildInterface) => (
            <div key={child.i}>
                <GridItem
                    isSidebarActive={isSidebarActive}>{child.render ? child.render() : `Child Body ${child.i}`}</GridItem>
            </div>
        ));
    }, [orderComponentResized, orderBookComponentResized, isSidebarActive]);

    return (
        <ReactGridLayout
            breakpoints={breakpoints}
            cols={cols}
            draggableHandle=".cr-table-header__content, .pg-trading-screen__tab-panel, .draggable-container"
            rowHeight={14}
            containerPadding={[25, 10]}
            layouts={layouts}
            onLayoutChange={() => {
                return;
            }}
            margin={[5, 5]}
            onResize={handleResize}
        >
            {children}
        </ReactGridLayout>
    );
};

class Trading extends React.Component<Props, StateProps> {
    public readonly state = {
        orderComponentResized: 5,
        orderBookComponentResized: 5,
    };

    constructor(props) {
        super(props);
        this.props.setCurrentMarket(this.props.markets.filter(e => e.id === this.props.match.params.market)[0]);
    }

    public componentDidMount() {
        const {markets, currentMarket, userLoggedIn, rangerState: {connected, withAuth}} = this.props;

        if (markets.length < 1) {
            this.props.marketsFetch();
        }

        if (currentMarket && !incrementalOrderBook()) {
            this.props.depthFetch(currentMarket);
        }

        if (!connected) {
            this.props.rangerConnect({withAuth: userLoggedIn});
        }

        if (userLoggedIn && !withAuth) {
            this.props.rangerConnect({withAuth: userLoggedIn});
        }
    }

    public componentWillUnmount() {
        this.props.setCurrentPrice(undefined);
    }

    public UNSAFE_componentWillReceiveProps(nextProps) {
        const {
            userLoggedIn,
            match,
        } = this.props;

        if (match.params.market !== nextProps.match.params.market) {
            this.props.setCurrentMarket(this.props.markets.filter(e => e.id === nextProps.match.params.market)[0]);
            if (!incrementalOrderBook()) {
                this.props.depthFetch(nextProps.currentMarket);
            }
        }

        if (userLoggedIn !== nextProps.userLoggedIn) {
            this.props.rangerConnect({withAuth: nextProps.userLoggedIn});
        }

        if (nextProps.currentMarket && nextProps.tickers) {
            this.setTradingTitle(nextProps.currentMarket, nextProps.tickers);
        }
    }

    public render() {
        const {orderComponentResized, orderBookComponentResized} = this.state;
        const {rgl, isActive, userLoggedIn} = this.props;

        return (
            <div className={'pg-trading-screen'}>
                <div className={'pg-trading-wrap'}>
                    <ToolBar/>
                    <div data-react-toolbox="grid" className={'cr-grid'}>
                        <div className="cr-grid__grid-wrapper">
                            <TradingWrapper
                                layouts={rgl.layouts}
                                orderComponentResized={orderComponentResized}
                                orderBookComponentResized={orderBookComponentResized}
                                handleResize={this.handleResize}
                                isSidebarActive={isActive}
                                userLoggedIn={userLoggedIn}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private setTradingTitle = (market: Market, tickers: ReduxProps['tickers']) => {
        let tickerPrice = tickers[market.id] ? tickers[market.id].last : '0.0';
        const split = Decimal.format(tickerPrice, market.price_precision).toString().split('.');
        tickerPrice = split.length > 1
            // tslint:disable-next-line:prefer-template
            ? split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + split[1]
            : split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        document.title = `${tickerPrice} ${market.name}`;
    };

    private handleResize = (layout, oldItem, newItem) => {
        switch (oldItem.i) {
            case '1':
                this.setState({
                    orderComponentResized: newItem.w,
                });
                break;
            case '3':
                this.setState({
                    orderBookComponentResized: newItem.w,
                });
                break;
            default:
                break;
        }
    };
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

export const TradingScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Trading) as React.ComponentClass;
