import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { LogoIcon } from '../../assets/images/LogoIcon';
import { MarketsTable } from '../../containers';
import { IntlProps } from '../../index';
import { RootState, selectUserLoggedIn } from '../../modules';

import FeaturesAPIIcon from '../../assets/images/landing/features/API.svg';
import FeaturesCommunityIcon from '../../assets/images/landing/features/Community.svg';
import FeaturesCustomizeIcon from '../../assets/images/landing/features/Customize.svg';
import FeaturesExchangeIcon from '../../assets/images/landing/features/Exchange.svg';
import FeaturesSecurityIcon from '../../assets/images/landing/features/Security.svg';
import FeaturesTypesIcon from '../../assets/images/landing/features/Types.svg';

import CoinMarketIcon from '../../assets/images/landing/social/CoinMarket.svg';
import FacebookIcon from '../../assets/images/landing/social/Facebook.svg';
import LinkedInIcon from '../../assets/images/landing/social/LinkedIn.svg';
import MediumIcon from '../../assets/images/landing/social/Medium.svg';
import RedditIcon from '../../assets/images/landing/social/Reddit.svg';
import TelegramIcon from '../../assets/images/landing/social/Telegram.svg';
import TwitterIcon from '../../assets/images/landing/social/Twitter.svg';
import YouTubeIcon from '../../assets/images/landing/social/YouTube.svg';

interface ReduxProps {
    isLoggedIn: boolean;
}

type Props = ReduxProps & RouteProps & IntlProps;

class Landing extends React.Component<Props> {
    public renderHeader() {
        if (this.props.isLoggedIn) {
            return (
                <div className="pg-landing-screen__header">
                    <div className="pg-landing-screen__header__wrap">
                        <div
                            className="pg-landing-screen__header__wrap__left"
                            onClick={(e) => this.handleScrollTop()}
                        >
                            <LogoIcon />
                        </div>
                        <div className="pg-landing-screen__header__wrap__right">
                            <Link to="/profile" className="landing-button">
                                {this.translate(
                                    'page.body.landing.header.button1',
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="pg-landing-screen__header">
                <div className="pg-landing-screen__header__wrap">
                    <div
                        className="pg-landing-screen__header__wrap__left"
                        onClick={(e) => this.handleScrollTop()}
                    >
                        <LogoIcon />
                    </div>
                    <div className="pg-landing-screen__header__wrap__right">
                        <Link
                            to="/signin"
                            className="landing-button landing-button--simple"
                        >
                            {this.translate('page.body.landing.header.button2')}
                        </Link>
                        <Link to="/signup" className="landing-button">
                            {this.translate('page.body.landing.header.button3')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    public renderMarketInfoBlock() {
        return (
            <div className="pg-landing-screen__market-info">
                <div className="pg-landing-screen__market-info__wrap">
                    <div className="pg-landing-screen__market-info__wrap__title">
                        <h1>
                            {this.translate(
                                'page.body.landing.marketInfo.title.text1',
                            )}
                        </h1>
                        <h1>
                            {this.translate(
                                'page.body.landing.marketInfo.title.text2',
                            )}
                        </h1>
                        <Link to="/trading" className="landing-button">
                            {this.translate(
                                'page.body.landing.marketInfo.title.button',
                            )}
                        </Link>
                    </div>
                    <MarketsTable />
                </div>
            </div>
        );
    }

    public renderPlatformInfoBlock() {
        return (
            <div className="pg-landing-screen__platform-info">
                <div className="pg-landing-screen__platform-info__wrap">
                    <div className="pg-landing-screen__platform-info__wrap__item">
                        <span>
                            {this.translate(
                                'page.body.landing.platformInfo.item.first.value',
                            )}
                        </span>
                        <span>
                            {this.translate(
                                'page.body.landing.platformInfo.item.first.title',
                            )}
                        </span>
                    </div>
                    <div className="pg-landing-screen__platform-info__wrap__item">
                        <span>
                            {this.translate(
                                'page.body.landing.platformInfo.item.second.value',
                            )}
                        </span>
                        <span>
                            {this.translate(
                                'page.body.landing.platformInfo.item.second.title',
                            )}
                        </span>
                    </div>
                    <div className="pg-landing-screen__platform-info__wrap__item">
                        <span>
                            {this.translate(
                                'page.body.landing.platformInfo.item.third.value',
                            )}
                        </span>
                        <span>
                            {this.translate(
                                'page.body.landing.platformInfo.item.third.title',
                            )}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    public renderRegisterBlock() {
        return (
            <div className="pg-landing-screen__register">
                <div className="pg-landing-screen__register__wrap">
                    <div className="pg-landing-screen__register__wrap__item">
                        <h1>
                            {this.translate(
                                'page.body.landing.register.item.title',
                            )}
                        </h1>
                        <h2>
                            {this.translate(
                                'page.body.landing.register.item.text',
                            )}
                        </h2>
                        <Link to="/signup" className="landing-button">
                            {this.translate(
                                'page.body.landing.register.item.button',
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    public renderFeaturesBlock() {
        return (
            <div className="pg-landing-screen__features">
                <div className="pg-landing-screen__features__wrap">
                    <h1>
                        {this.translate('page.body.landing.features.title')}
                    </h1>
                    <div className="pg-landing-screen__features__content">
                        <div className="pg-landing-screen__features__content__row">
                            <div className="pg-landing-screen__features__content__row__item">
                                <img
                                    src={FeaturesExchangeIcon}
                                    alt={this.translate(
                                        'page.body.landing.features.features.item1.title',
                                    )}
                                />
                                <h2>
                                    {this.translate(
                                        'page.body.landing.features.features.item1.title',
                                    )}
                                </h2>
                                <span>
                                    {this.translate(
                                        'page.body.landing.features.features.item1.text',
                                    )}
                                </span>
                            </div>
                            <div className="pg-landing-screen__features__content__row__item">
                                <img
                                    src={FeaturesTypesIcon}
                                    alt={this.translate(
                                        'page.body.landing.features.features.item2.title',
                                    )}
                                />
                                <h2>
                                    {this.translate(
                                        'page.body.landing.features.features.item2.title',
                                    )}
                                </h2>
                                <span>
                                    {this.translate(
                                        'page.body.landing.features.features.item2.text',
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="pg-landing-screen__features__content__row">
                            <div className="pg-landing-screen__features__content__row__item">
                                <img
                                    src={FeaturesCustomizeIcon}
                                    alt={this.translate(
                                        'page.body.landing.features.features.item3.title',
                                    )}
                                />
                                <h2>
                                    {this.translate(
                                        'page.body.landing.features.features.item3.title',
                                    )}
                                </h2>
                                <span>
                                    {this.translate(
                                        'page.body.landing.features.features.item3.text',
                                    )}
                                </span>
                            </div>
                            <div className="pg-landing-screen__features__content__row__item">
                                <img
                                    src={FeaturesSecurityIcon}
                                    alt={this.translate(
                                        'page.body.landing.features.features.item4.title',
                                    )}
                                />
                                <h2>
                                    {this.translate(
                                        'page.body.landing.features.features.item4.title',
                                    )}
                                </h2>
                                <span>
                                    {this.translate(
                                        'page.body.landing.features.features.item4.text',
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="pg-landing-screen__features__content__row">
                            <div className="pg-landing-screen__features__content__row__item">
                                <img
                                    src={FeaturesCommunityIcon}
                                    alt={this.translate(
                                        'page.body.landing.features.features.item5.title',
                                    )}
                                />
                                <h2>
                                    {this.translate(
                                        'page.body.landing.features.features.item5.title',
                                    )}
                                </h2>
                                <span>
                                    {this.translate(
                                        'page.body.landing.features.features.item5.text',
                                    )}
                                </span>
                            </div>
                            <div className="pg-landing-screen__features__content__row__item">
                                <img
                                    src={FeaturesAPIIcon}
                                    alt={this.translate(
                                        'page.body.landing.features.features.item6.title',
                                    )}
                                />
                                <h2>
                                    {this.translate(
                                        'page.body.landing.features.features.item6.title',
                                    )}
                                </h2>
                                <span>
                                    {this.translate(
                                        'page.body.landing.features.features.item6.text',
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public renderTradeOnTheGoBlock() {
        return (
            <div className="pg-landing-screen__trade-on-the-go">
                <div className="pg-landing-screen__trade-on-the-go__wrap">
                    <div className="pg-landing-screen__trade-on-the-go__wrap__image" />
                    <div className="pg-landing-screen__trade-on-the-go__wrap__content">
                        <h1>
                            {this.translate(
                                'page.body.landing.tradeOnTheGo.item.title',
                            )}
                        </h1>
                        <h2>
                            {this.translate(
                                'page.body.landing.tradeOnTheGo.item.text1',
                            )}
                        </h2>
                        <h2>
                            {this.translate(
                                'page.body.landing.tradeOnTheGo.item.text2',
                            )}
                        </h2>
                        <h2>
                            {this.translate(
                                'page.body.landing.tradeOnTheGo.item.text3',
                            )}
                        </h2>
                        <Link to="/trading/" className="landing-button">
                            {this.translate(
                                'page.body.landing.tradeOnTheGo.item.button',
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    public renderStartTradingBlock() {
        return (
            <div className="pg-landing-screen__start-trading">
                <div className="pg-landing-screen__start-trading__wrap">
                    <h1>
                        {this.translate('page.body.landing.startTrading.title')}
                    </h1>
                    <div className="pg-landing-screen__start-trading__wrap__content">
                        <Link to="/signup" className="landing-button">
                            {this.translate(
                                'page.body.landing.startTrading.button1',
                            )}
                        </Link>
                        <Link
                            to="/trading/"
                            className="landing-button landing-button--secondary"
                        >
                            {this.translate(
                                'page.body.landing.startTrading.button2',
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    public renderFooter() {
        return (
            <div className="pg-landing-screen__footer">
                <div className="pg-landing-screen__footer__wrap">
                    <div
                        className="pg-landing-screen__footer__wrap__left"
                        onClick={(e) => this.handleScrollTop()}
                    >
                        <LogoIcon />
                    </div>
                    <div className="pg-landing-screen__footer__wrap__navigation">
                        <div className="pg-landing-screen__footer__wrap__navigation__col">
                            <Link to="/trading/">
                                {this.translate(
                                    'page.body.landing.footer.exchange',
                                )}
                            </Link>
                            <Link to="/wallets">
                                {this.translate(
                                    'page.body.landing.footer.wallets',
                                )}
                            </Link>
                            <Link to="/">
                                {this.translate(
                                    'page.body.landing.footer.fees',
                                )}
                            </Link>
                        </div>
                        <div className="pg-landing-screen__footer__wrap__navigation__col">
                            <Link to="/">
                                {this.translate('page.body.landing.footer.faq')}
                            </Link>
                            <Link to="/">
                                {this.translate(
                                    'page.body.landing.footer.support',
                                )}
                            </Link>
                            <Link to="/">
                                {this.translate(
                                    'page.body.landing.footer.privacy',
                                )}
                            </Link>
                        </div>
                        <div className="pg-landing-screen__footer__wrap__navigation__col">
                            <Link to="/">
                                {this.translate(
                                    'page.body.landing.footer.about',
                                )}
                            </Link>
                            <Link to="/">
                                {this.translate(
                                    'page.body.landing.footer.community',
                                )}
                            </Link>
                            <Link to="/">
                                {this.translate(
                                    'page.body.landing.footer.info',
                                )}
                            </Link>
                        </div>
                    </div>
                    <div className="pg-landing-screen__footer__wrap__social">
                        <div className="pg-landing-screen__footer__wrap__social__row">
                            <img src={TelegramIcon} alt="Telegram" />
                            <img src={LinkedInIcon} alt="LinkedIn" />
                            <img src={TwitterIcon} alt="Twitter" />
                            <img src={YouTubeIcon} alt="YouTube" />
                        </div>
                        <div className="pg-landing-screen__footer__wrap__social__row">
                            <img src={RedditIcon} alt="Reddit" />
                            <img src={FacebookIcon} alt="Facebook" />
                            <img src={MediumIcon} alt="MediumIcon" />
                            <img src={CoinMarketIcon} alt="CoinMarket" />
                        </div>
                    </div>
                </div>
                <span className="pg-landing-screen__footer__rights">
                    {this.translate('page.body.landing.footer.rights')}
                </span>
            </div>
        );
    }

    public render() {
        return (
            <div className="pg-landing-screen">
                {this.renderHeader()}
                {this.renderMarketInfoBlock()}
                {this.renderPlatformInfoBlock()}
                {this.renderRegisterBlock()}
                {this.renderFeaturesBlock()}
                {this.renderTradeOnTheGoBlock()}
                {this.renderStartTradingBlock()}
                {this.renderFooter()}
            </div>
        );
    }

    private handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    private translate = (key: string) =>
        this.props.intl.formatMessage({ id: key });
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    isLoggedIn: selectUserLoggedIn(state),
});

export const LandingScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, null),
)(Landing) as React.ComponentClass;
