import classnames from 'classnames';
import * as React from 'react';
import {
    injectIntl,
} from 'react-intl';
import {connect, MapDispatchToPropsFunction} from 'react-redux';
import {compose} from 'redux';
// import {TabPanel} from '../../components';
import {IntlProps} from '../../index';
import {
    Market,
    PublicTrade,
    resetHistory,
    RootState,
    selectCurrentMarket,
    selectCurrentPrice,
    selectUserLoggedIn,
    setCurrentPrice,
} from '../../modules';
import {recentTradesFetch, selectRecentTradesOfCurrentMarket} from '../../modules/public/recentTrades';
import {RecentTradesMarket} from './Market';
import {RecentTradesYours} from './Yours';

interface ReduxProps {
    recentTrades: PublicTrade[];
    currentMarket: Market | undefined;
    currentPrice: number | undefined;
    userLoggedIn: boolean;
}

interface DispatchProps {
    resetHistory: typeof resetHistory;
    tradesFetch: typeof recentTradesFetch;
    setCurrentPrice: typeof setCurrentPrice;
}

interface State {
    tab: string;
    index: number;
    disable: boolean;
}

export type RecentTradesProps = DispatchProps & ReduxProps & IntlProps;

class RecentTradesComponent extends React.Component<RecentTradesProps, State> {
    public state = {tab: 'market', index: 0, disable: false};

    public tabMapping = ['market', 'yours'];

    public componentWillUnmount() {
        this.props.resetHistory();
    }

    public render() {
        const className = classnames({
            'cr-table__noData': !this.props.recentTrades.length,
        });

        const cn = classnames('pg-recent-trades', {
            'pg-recent-trades-unlogged': !this.props.userLoggedIn,
        });

        return (
            <div className={className}>
                <div className={cn}>
                    {this.renderContent()}
                </div>
            </div>
        );
    }

    private renderContent = () => {
        return this.props.userLoggedIn ?
            (
                <>
                    <div className="cr-table-header__content text-right">
                        <div
                            className="cr-title-component">{this.props.intl.formatMessage({id: 'page.body.trade.header.recentTrades'})}</div>
                    </div>
                    <div className="row h-100">
                        <div className="col-12 col-md-6 border-md-left">
                            <h5 className="text-center p-2 sub-title">معاملات بازار</h5>
                            <RecentTradesMarket/>
                        </div>
                        <div className="col-12 col-md-6">
                            <h5 className="text-center p-2 sub-title">معاملات شما</h5>
                            <RecentTradesYours/>
                        </div>
                    </div>
                </>
            ) :
            (
                <div>
                    <div className="cr-table-header__content text-right">
                        <div
                            className="cr-title-component">{this.props.intl.formatMessage({id: 'page.body.trade.header.recentTrades'})}</div>
                    </div>
                    <RecentTradesMarket/>
                </div>
            );

    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    recentTrades: selectRecentTradesOfCurrentMarket(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
    userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    tradesFetch: market => dispatch(recentTradesFetch(market)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    resetHistory: () => dispatch(resetHistory()),
});

export const RecentTrades = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps),
)(RecentTradesComponent) as any; // tslint:disable-line
