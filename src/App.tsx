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

/* Desktop components */
import { Alerts } from './containers/Alerts';
import { Customization } from './containers/Customization';
import { Footer } from './containers/Footer';
import { Header } from './containers/Header';
import { Sidebar } from './containers/Sidebar';
import { Layout } from './routes';

const gaKey = gaTrackerKey();
const browserHistory = createBrowserHistory();

if (gaKey) {
    ReactGA.initialize(gaKey);
    browserHistory.listen(location => {
        ReactGA.set({page: location.pathname});
        ReactGA.pageview(location.pathname);
    });
}


const getTranslations = (lang: string, isMobileDevice: boolean) => {
    if (isMobileDevice) {
        return {
            ...languageMap[lang],
            ...mobileTranslations[lang],
        };
    }

    return languageMap[lang];
};

const RenderDevices = () => {
    const location = useLocation();

    return (
        <React.Fragment>
            {location.pathname !== '/signin' &&
            location.pathname !== '/signup' &&
            location.pathname !== '/forgot_password' &&
            location.pathname !== '/email-verification' ? (
                <Header />
            ) : null}
            <Sidebar />
            <Customization />
            <Alerts />
            <Layout />
            <Footer />
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
                        <RenderDevices />
                    </React.Suspense>
                </ErrorWrapper>
            </Router>
        </IntlProvider>
    );
};
