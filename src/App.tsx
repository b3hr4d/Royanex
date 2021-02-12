import {createBrowserHistory} from 'history';
import * as React from 'react';
import * as ReactGA from 'react-ga';
import {IntlProvider} from 'react-intl';
import {useSelector} from 'react-redux';
import {Router, useLocation} from 'react-router';
import {gaTrackerKey} from './api';
import {ErrorWrapper} from './containers';
import {useSetMobileDevice} from './hooks';
import * as mobileTranslations from './mobile/translations';
import {selectCurrentLanguage, selectMobileDeviceState} from './modules';
import {languageMap} from './translations';
// import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';


const gaKey = gaTrackerKey();
const browserHistory = createBrowserHistory();

if (gaKey) {
    ReactGA.initialize(gaKey);
    browserHistory.listen(location => {
        ReactGA.set({page: location.pathname});
        ReactGA.pageview(location.pathname);
    });
}

/* Mobile components */
// const MobileFooter = React.lazy(() => import('./mobile/components/Footer').then(({Footer}) => ({default: Footer})));
// const MobileHeader = React.lazy(() => import('./mobile/components/Header').then(({Header}) => ({default: Header})));

/* Desktop components */
const AlertsContainer = React.lazy(() => import('./containers/Alerts').then(({Alerts}) => ({default: Alerts})));
const CustomizationContainer = React.lazy(() => import('./containers/Customization').then(({Customization}) => ({default: Customization})));
const FooterContainer = React.lazy(() => import('./containers/Footer').then(({Footer}) => ({default: Footer})));
const HeaderContainer = React.lazy(() => import('./containers/Header').then(({Header}) => ({default: Header})));
const SidebarContainer = React.lazy(() => import('./containers/Sidebar').then(({Sidebar}) => ({default: Sidebar})));
const LayoutContainer = React.lazy(() => import('./routes').then(({Layout}) => ({default: Layout})));

const getTranslations = (lang: string, isMobileDevice: boolean) => {
    if (isMobileDevice) {
        return {
            ...languageMap[lang],
            ...mobileTranslations[lang],
        };
    }

    return languageMap[lang];
};

const RenderDeviceContainers = () => {
    // const isMobileDevice = useSelector(selectMobileDeviceState);
    const location = useLocation();

    // if (isMobileDevice) {
    //     return (
    //         <div className="pg-mobile-app">
    //             <MobileHeader/>
    //             <LayoutContainer/>
    //             <MobileFooter/>
    //             <FooterContainer/>
    //             <AlertsContainer/>
    //         </div>
    //     );
    // }

    return (
        <React.Fragment>
            {
                (
                    location.pathname !== '/signin'
                    && location.pathname !== '/signup'
                    && location.pathname !== '/forgot_password'
                    && location.pathname !== '/email-verification'
                )
                    ? <HeaderContainer/>
                    : null
            }
            <SidebarContainer/>
            <CustomizationContainer/>
            <AlertsContainer/>
            <LayoutContainer/>
            <FooterContainer/>
        </React.Fragment>
    );
};

export const App = () => {
    useSetMobileDevice();
    const lang = useSelector(selectCurrentLanguage);
    const isMobileDevice = useSelector(selectMobileDeviceState);
    localStorage.setItem('lang_code', 'fa');

    return (
        <IntlProvider locale={'fa'} messages={getTranslations(lang, isMobileDevice)} key={'fa'}>
            <Router history={browserHistory}>
                <ErrorWrapper>
                    <React.Suspense fallback={null}>
                        <RenderDeviceContainers />
                    </React.Suspense>
                </ErrorWrapper>
            </Router>
        </IntlProvider>
    );
};
