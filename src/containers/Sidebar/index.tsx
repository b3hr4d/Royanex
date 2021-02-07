import { Collapse } from '@material-ui/core';
import classnames from 'classnames';
import { History } from 'history';
import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { languages } from '../../api';
import logo from '../../assets/images/logo.svg';
import logoLight from '../../assets/images/logoLight.svg';
import { DashboardIcon } from '../../assets/images/sidebar/DashboardIcon';
import { LogoutIcon } from '../../assets/images/sidebar/LogoutIcon';
import { ProfileIcon } from '../../assets/images/sidebar/ProfileIcon';
import { SidebarIcons } from '../../assets/images/sidebar/SidebarIcons';
import { pgRoutes } from '../../constants';

import {
    changeLanguage,
    changeUserDataFetch,
    logoutFetch,
    Market,
    marketsFetch,
    RootState,
    selectCurrentColorTheme,
    selectCurrentLanguage,
    selectCurrentMarket,
    selectMarkets,
    selectSidebarState,
    selectUserInfo,
    selectUserLoggedIn,
    toggleSidebar,
    User,
} from '../../modules';

interface State {
    isOpenLanguage: boolean;
    menu: {
        open: boolean;
        id: number;
    };
}

interface DispatchProps {
    changeLanguage: typeof changeLanguage;
    toggleSidebar: typeof toggleSidebar;
    logoutFetch: typeof logoutFetch;
    marketsFetch: typeof marketsFetch;
}

interface ReduxProps {
    lang: string;
    colorTheme: string;
    isLoggedIn: boolean;
    currentMarket: Market | undefined;
    isActive: boolean;
    user: User;
    markets: Market[];
}

interface OwnProps {
    onLinkChange?: () => void;
    history: History;
    changeUserDataFetch: typeof changeUserDataFetch;
}

type Props = OwnProps & ReduxProps & RouteProps & DispatchProps;

class SidebarContainer extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isOpenLanguage: false,
            menu: {
                open: false,
                id: 0,
            },
        };
        this.props.marketsFetch();
    }

    public render() {
        const { isLoggedIn, isActive, colorTheme } = this.props;

        const address = this.props.history.location
            ? this.props.history.location.pathname
            : '';

        const sidebarClassName = classnames('pg-sidebar-wrapper', {
            'pg-sidebar-wrapper--active': isActive,
            'pg-sidebar-wrapper--hidden': !isActive,
        });

        return (
            <div className={sidebarClassName}>
                <Link to={'/wallets'} className="pg-header__logo">
                    <div className="logo mx-4 my-2">
                        {colorTheme === 'light' ? (
                            <img
                                src={logoLight}
                                className="pg-logo__img"
                                alt="Logo"
                            />
                        ) : (
                            <img
                                src={logo}
                                className="pg-logo__img"
                                alt="Logo"
                            />
                        )}
                    </div>
                </Link>
                {this.renderDashboardLink()}
                {this.renderProfileLink()}
                <div className="pg-sidebar-wrapper-nav">
                    {pgRoutes(this.props.markets, isLoggedIn).map(
                        this.renderNavItems(address),
                    )}
                </div>
                {this.renderLogout()}
            </div>
        );
    }

    public renderDashboardLink = () => {
        const { isLoggedIn, location } = this.props;
        const handleLinkChange = () => this.props.toggleSidebar(true);
        const address = location ? location.pathname : '';
        const isActive = address === '/dashboard';

        const iconClassName = classnames('pg-sidebar-wrapper-nav-item-img', {
            'pg-sidebar-wrapper-nav-item-img--active': isActive,
        });

        return (
            isLoggedIn && (
                <div className="pg-sidebar-wrapper-dashboard pt-2">
                    <Link
                        to="/dashboard"
                        onClick={handleLinkChange}
                        className={`${isActive && 'route-selected'}`}
                    >
                        <div className="pg-sidebar-wrapper-profile-link">
                            <DashboardIcon className={iconClassName} />
                            <p className="pg-sidebar-wrapper-profile-link-text">
                                <FormattedMessage
                                    id={'page.header.navbar.dashboard'}
                                />
                            </p>
                        </div>
                    </Link>
                </div>
            )
        );
    };

    public handleMenuClick = (id) => {
        this.setState({
            menu: {
                open: id !== this.state.menu.id ? true : !this.state.menu.open,
                id: id,
            },
        });
    };

    public renderNavItems = (address: string) => (
        values: any,
        index: number,
    ) => {
        const [id, name, subMenu, url, img] = values;
        const handleLinkChange = () => this.props.toggleSidebar(true);
        const path = url;
        const isActive = address === url;

        const iconClassName = classnames('pg-sidebar-wrapper-nav-item-img', {
            'pg-sidebar-wrapper-nav-item-img--active': isActive,
        });

        if (subMenu.length > 0) {
            return (
                <React.Fragment key={index}>
                    <div>
                        <div
                            className="pg-sidebar-wrapper-nav-item justify-content-between"
                            onClick={this.handleMenuClick.bind(null, id)}
                        >
                            <div className="d-flex">
                                <div className="pg-sidebar-wrapper-nav-item-img-wrapper">
                                    <SidebarIcons
                                        className={iconClassName}
                                        name={img}
                                    />
                                </div>
                                <p className="pg-sidebar-wrapper-nav-item-text">
                                    <FormattedMessage id={name} />
                                </p>
                            </div>
                            {this.state.menu.open &&
                            this.state.menu.id === id ? (
                                <i className="fas fa-chevron-down float-left" />
                            ) : (
                                <i className="fas fa-chevron-left float-left" />
                            )}
                        </div>
                    </div>
                    <Collapse
                        in={this.state.menu.open && this.state.menu.id === id}
                        timeout="auto"
                        unmountOnExit
                    >
                        {subMenu.map((e) => {
                            const [subId, subName, subUrl] = e;
                            const subMenuActive = subUrl === address;
                            const splitName = subName.split('/');

                            return (
                                <Link
                                    to={subUrl}
                                    key={subId}
                                    onClick={handleLinkChange}
                                    className={`${
                                        subMenuActive && 'route-selected'
                                    }`}
                                >
                                    <div className="pg-sidebar-wrapper-nav-item submenu">
                                        <p className="m-0">
                                            {splitName.length > 1 ? (
                                                <>
                                                    <FormattedMessage
                                                        id={`page.body.coins.${splitName[0].toLowerCase()}`}
                                                    />
                                                    {' / '}
                                                    <FormattedMessage
                                                        id={`page.body.coins.${splitName[1].toLowerCase()}`}
                                                    />
                                                </>
                                            ) : (
                                                <FormattedMessage
                                                    id={subName}
                                                />
                                            )}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </Collapse>
                </React.Fragment>
            );
        } else {
            return (
                <Link
                    to={path}
                    key={index}
                    onClick={handleLinkChange}
                    className={`${isActive && 'route-selected'}`}
                >
                    <div className="pg-sidebar-wrapper-nav-item">
                        <div className="pg-sidebar-wrapper-nav-item-img-wrapper">
                            <SidebarIcons
                                className={iconClassName}
                                name={img}
                            />
                        </div>
                        <p className="pg-sidebar-wrapper-nav-item-text">
                            <FormattedMessage id={name} />
                        </p>
                    </div>
                </Link>
            );
        }
    };

    public renderProfileLink = () => {
        const { isLoggedIn, location } = this.props;
        const handleLinkChange = () => this.props.toggleSidebar(true);
        const address = location ? location.pathname : '';
        const isActive = address === '/profile';

        const iconClassName = classnames('pg-sidebar-wrapper-nav-item-img', {
            'pg-sidebar-wrapper-nav-item-img--active': isActive,
        });

        return (
            isLoggedIn && (
                <div className="pg-sidebar-wrapper-profile">
                    <Link
                        to="/profile"
                        onClick={handleLinkChange}
                        className={`${isActive && 'route-selected'}`}
                    >
                        <div className="pg-sidebar-wrapper-profile-link">
                            <ProfileIcon className={iconClassName} />
                            <p className="pg-sidebar-wrapper-profile-link-text">
                                <FormattedMessage
                                    id={'page.header.navbar.profile'}
                                />
                            </p>
                        </div>
                    </Link>
                </div>
            )
        );
    };

    public renderLogout = () => {
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            return null;
        }

        return (
            <div className="pg-sidebar-wrapper-logout">
                <div
                    className="pg-sidebar-wrapper-logout-link"
                    onClick={this.props.logoutFetch}
                >
                    <LogoutIcon className="pg-sidebar-wrapper-logout-link-img" />
                    <p className="pg-sidebar-wrapper-logout-link-text">
                        <FormattedMessage
                            id={'page.body.profile.content.action.logout'}
                        />
                    </p>
                </div>
            </div>
        );
    };

    public getLanguageDropdownItems = () => {
        return languages.map((l: string, index: number) => (
            <Dropdown.Item
                key={index}
                onClick={(e) => this.handleChangeLanguage(l)}
            >
                <div className="dropdown-row">
                    <img
                        src={
                            this.tryRequire(l) &&
                            require(`../../assets/images/sidebar/${l}.svg`)
                        }
                        alt={`${l}-flag-icon`}
                    />
                    <span>{l.toUpperCase()}</span>
                </div>
            </Dropdown.Item>
        ));
    };

    private tryRequire = (name: string) => {
        try {
            require(`../../assets/images/sidebar/${name}.svg`);

            return true;
        } catch (err) {
            return false;
        }
    };

    private handleChangeLanguage = (language: string) => {
        const { user, isLoggedIn } = this.props;

        if (isLoggedIn) {
            const data = user.data && JSON.parse(user.data);

            if (data && data.language && data.language !== language) {
                const payload = {
                    ...user,
                    data: JSON.stringify({
                        ...data,
                        language,
                    }),
                };

                this.props.changeUserDataFetch({ user: payload });
            }
        }

        this.props.changeLanguage(language);
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    markets: selectMarkets(state),
    colorTheme: selectCurrentColorTheme(state),
    isLoggedIn: selectUserLoggedIn(state),
    currentMarket: selectCurrentMarket(state),
    lang: selectCurrentLanguage(state),
    isActive: selectSidebarState(state),
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (
    dispatch,
) => ({
    marketsFetch: () => dispatch(marketsFetch()),
    changeLanguage: (payload) => dispatch(changeLanguage(payload)),
    toggleSidebar: (payload) => dispatch(toggleSidebar(payload)),
    logoutFetch: () => dispatch(logoutFetch()),
    changeUserDataFetch: (payload) => dispatch(changeUserDataFetch(payload)),
});

export const Sidebar = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(SidebarContainer) as React.ComponentClass;
