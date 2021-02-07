import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { TabPanel } from '../../components';
import { HistoryElement } from '../../containers/HistoryElement';
import { setDocumentTitle } from '../../helpers';
import { IntlProps } from '../../index';
import {
    fetchHistory,
    marketsFetch,
    resetHistory,
    walletsFetch,
} from '../../modules';

interface DispatchProps {
    resetHistory: typeof resetHistory;
    fetchMarkets: typeof marketsFetch;
    fetchWallets: typeof walletsFetch;
    fetchHistory: typeof fetchHistory;
}

interface OwnProps {
    match: {
        params: {
            type: string;
        };
    };
}

type Props = DispatchProps & IntlProps & OwnProps;

interface State {
    tab: string;
    currentTabIndex: number;
}

class History extends React.Component<Props, State> {
    public state = {
        tab: 'deposits',
        currentTabIndex: 0,
    };

    public tabMapping = ['deposits', 'withdraws', 'trades'];

    public translate = (id: string) => this.props.intl.formatMessage({ id });

    public componentDidMount() {
        setDocumentTitle(this.translate('page.body.history.title'));
        this.props.fetchMarkets();
        this.props.fetchWallets();
    }

    public componentWillUnmount() {
        this.props.resetHistory();
    }

    public render() {
        return (
            <div className="pg-history-tab pg-container">
                <div className="pg-history-tab__tabs-content">
                    <TabPanel
                        panels={this.renderTabs()}
                        onTabChange={this.handleMakeRequest}
                        currentTabIndex={this.state.currentTabIndex}
                        onCurrentTabChange={this.onCurrentTabChange}
                    />
                </div>
            </div>
        );
    }

    private onCurrentTabChange = (index) =>
        this.setState({ currentTabIndex: index });

    private handleMakeRequest = (index: number) => {
        if (this.state.tab === this.tabMapping[index]) {
            return;
        }
        this.props.resetHistory();
        this.setState({ tab: this.tabMapping[index] });
    };

    private renderTabs = () => {
        const { tab } = this.state;
        console.log(this.props.match.params);
        const currency =
            this.props.match.params.type !== undefined
                ? this.props.match.params.type.toLowerCase()
                : undefined;

        return [
            {
                content:
                    tab === 'deposits' ? (
                        currency ? (
                            <HistoryElement
                                type="deposits"
                                currency={currency}
                            />
                        ) : (
                            <HistoryElement type="deposits" />
                        )
                    ) : null,
                label: this.props.intl.formatMessage({
                    id: 'page.body.history.deposit',
                }),
            },
            {
                content:
                    tab === 'withdraws' ? (
                        currency ? (
                            <HistoryElement
                                type="withdraws"
                                currency={currency}
                            />
                        ) : (
                            <HistoryElement type="withdraws" />
                        )
                    ) : null,
                label: this.props.intl.formatMessage({
                    id: 'page.body.history.withdraw',
                }),
            },
            {
                content:
                    tab === 'trades' ? (
                        currency ? (
                            <HistoryElement type="trades" currency={currency} />
                        ) : (
                            <HistoryElement type="trades" />
                        )
                    ) : null,
                label: this.props.intl.formatMessage({
                    id: 'page.body.history.trade',
                }),
            },
        ];
    };
}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (
    dispatch,
) => ({
    fetchMarkets: () => dispatch(marketsFetch()),
    fetchWallets: () => dispatch(walletsFetch()),
    fetchHistory: (payload) => dispatch(fetchHistory(payload)),
    resetHistory: () => dispatch(resetHistory()),
});

export const HistoryScreen = compose(
    injectIntl,
    withRouter,
    connect(null, mapDispatchToProps),
)(History) as React.ComponentClass;
