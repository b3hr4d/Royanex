import * as React from 'react';
import {injectIntl} from 'react-intl';
import {connect, MapDispatchToPropsFunction} from 'react-redux';
import {RouterProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {IntlProps} from '../../index';
import {
    Market,
    RootState,
    selectConfigsLoading,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectMarketSelectorState,
    selectMobileWalletUi,
    selectSidebarState,
    setMobileWalletUi,
    toggleMarketSelector,
    toggleSidebar,
} from '../../modules';
import {resetLayouts} from '../../modules/public/gridLayout';
import {HeaderToolbar} from '../HeaderToolbar';
import {NavBar} from '../NavBar';
import {SubHeaderToolbar} from '../SubHeaderToolbar';

interface ReduxProps {
    currentMarket: Market | undefined;
    colorTheme: string;
    mobileWallet: string;
    sidebarOpened: boolean;
    marketSelectorOpened: boolean;
    configsLoading: boolean;
    isActive: boolean;
}

interface DispatchProps {
    setMobileWalletUi: typeof setMobileWalletUi;
    toggleSidebar: typeof toggleSidebar;
    toggleMarketSelector: typeof toggleMarketSelector;
    resetLayouts: typeof resetLayouts;
}

interface LocationProps extends RouterProps {
    location: {
        pathname: string;
    };
}

const noHeaderRoutes = [
    '/confirm',
    '/404',
    '/500',
];

type Props = ReduxProps & DispatchProps & IntlProps & LocationProps;

class Head extends React.Component<Props> {
    public render() {
        const {mobileWallet, location, configsLoading, isActive} = this.props;
        const tradingCls = location.pathname.includes('/trading') ? 'pg-container-trading' : '';
        const sidebarActive = isActive ? 'sidebarActive' : '';
        const shouldRenderHeader = !noHeaderRoutes.some(r => location.pathname.includes(r)) && location.pathname !== '/';

        if (!shouldRenderHeader || configsLoading) {
            return <React.Fragment/>;
        }

        return (
            <header className={`pg-header`}>
                <div className={`pg-container pg-header__content ${tradingCls} ${sidebarActive}`}>
                    <div className="pg-header__content__wrapper">
                        <div
                            className={`pg-sidebar__toggler ${mobileWallet && 'pg-sidebar__toggler-mobile'}`}
                            onClick={this.openSidebar}
                        >
                            <span className="pg-sidebar__toggler-item"/>
                            <span className="pg-sidebar__toggler-item"/>
                            <span className="pg-sidebar__toggler-item"/>
                        </div>
                        <div className="pg-header__location">
                            {mobileWallet ? <span>{mobileWallet}</span> :
                                <span>{location.pathname.split('/')[1]}</span>}
                        </div>
                        {this.renderMobileWalletNav()}
                        <div className="pg-header__navbar">
                            <NavBar onLinkChange={this.closeMenu}/>
                            {this.renderMarketToolbar()}
                        </div>
                    </div>
                    {this.renderSubHeaderToolbar()}
                </div>
            </header>
        );
    }

    public renderMobileWalletNav = () => {
        const {colorTheme, mobileWallet} = this.props;
        const isLight = colorTheme === 'light' ? 'Light' : '';

        return mobileWallet && (
            <div onClick={this.backWallets} className="pg-header__toggler">
                <img alt="" src={require(`./back${isLight}.svg`)}/>
            </div>
        );
    };

    public translate = (id: string) => {
        return id ? this.props.intl.formatMessage({id}) : '';
    };

    private renderMarketToolbar = () => {
        if (this.props.location.pathname.includes('/signin') || this.props.location.pathname.includes('/signup')) {
            return null;
        }

        return <HeaderToolbar/>;
    };

    private renderSubHeaderToolbar = () => {
        if (this.props.location.pathname.includes('/signin') || this.props.location.pathname.includes('/signup')) {
            return null;
        }

        return <SubHeaderToolbar/>;
    };

    private openSidebar = () => {
        for (let t = 0; t <= 300; t += 10) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, t);
        }
        this.props.toggleSidebar(!this.props.sidebarOpened);
    };

    private backWallets = () => this.props.setMobileWalletUi('');

    private closeMenu = (e: any) => this.props.setMobileWalletUi('');
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    colorTheme: selectCurrentColorTheme(state),
    mobileWallet: selectMobileWalletUi(state),
    sidebarOpened: selectSidebarState(state),
    marketSelectorOpened: selectMarketSelectorState(state),
    configsLoading: selectConfigsLoading(state),
    isActive: selectSidebarState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        setMobileWalletUi: payload => dispatch(setMobileWalletUi(payload)),
        toggleSidebar: payload => dispatch(toggleSidebar(payload)),
        toggleMarketSelector: () => dispatch(toggleMarketSelector()),
        resetLayouts: payload => dispatch(resetLayouts(payload)),
    });

export const Header = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Head) as React.ComponentClass;
