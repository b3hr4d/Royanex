import {Market} from '../modules/public/markets';

export const PG_TITLE_PREFIX = 'رویان';

export const pgRoutes = (markets: Market[], isLoggedIn: boolean, isLight?: boolean): any => {

    const routes = [
        [1, 'page.header.navbar.fastOrder', [], '/fastOrder', `fastOrder${isLight ? 'Light' : ''}`],
        [2, 'page.header.navbar.wallets', [], '/wallets', `wallets${isLight ? 'Light' : ''}`],
        [3, 'page.header.navbar.mainMarkets',
            markets.filter(e => e.quote_unit === window.env.mainMarketsUnit).map(e => ([e.id, e.name, `/trading/${e.id}`, `mainMarkets${isLight ? 'Light' : ''}`]))
            , '/', `mainMarkets${isLight ? 'Light' : ''}`],
        [4, 'page.header.navbar.proMarkets',
            markets.filter(e => {
                return e.quote_unit === window.env.fastOrderUnit || (e.quote_unit === window.env.mainMarketsUnit && e.base_unit === window.env.fastOrderUnit);
            }).map(e => ([e.id, e.name, `/trading/pro/${e.id}`, `proMarkets${isLight ? 'Light' : ''}`]))
            , '/', `proMarkets${isLight ? 'Light' : ''}`],
        [5, 'page.header.navbar.accounting', [
            [1, 'page.header.navbar.accounting.depositRiyal', '/deposit/riyal', `accounting${isLight ? 'Light' : ''}`],
            [2, 'page.header.navbar.accounting.withdrawRiyal', '/withdraw/rls', `accounting${isLight ? 'Light' : ''}`],
        ], '/', `accounting${isLight ? 'Light' : ''}`],
        [6, 'page.header.navbar.history', [], '/history', `history${isLight ? 'Light' : ''}`],
        [7, 'page.header.navbar.privacy', [
            [1, 'page.header.navbar.privacy.setting', '/privacy', `privacy${isLight ? 'Light' : ''}`],
            [2, 'page.header.navbar.privacy.history', '/activity', `privacy${isLight ? 'Light' : ''}`],
        ], '/', `privacy${isLight ? 'Light' : ''}`],
        [8, 'page.header.navbar.referral', [], '/referral', `referral${isLight ? 'Light' : ''}`],
    ];
    const routesUnloggedIn = [
        [9, 'page.header.navbar.signIn', [], '/signin', `signin${isLight ? 'Light' : ''}`],
        [10, 'page.header.signUp', [], '/signup', `signup${isLight ? 'Light' : ''}`],
        [11, 'page.header.navbar.mainMarkets',
            markets.filter(e => e.quote_unit === window.env.mainMarketsUnit).map(e => ([e.id, e.name, `/trading/${e.id}`, `mainMarkets${isLight ? 'Light' : ''}`]))
            , '/', `mainMarkets${isLight ? 'Light' : ''}`],
        [12, 'page.header.navbar.proMarkets',
            markets.filter(e => {
                return e.quote_unit === window.env.fastOrderUnit || (e.quote_unit === window.env.mainMarketsUnit && e.base_unit === window.env.fastOrderUnit);
            }).map(e => ([e.id, e.name, `/trading/pro/${e.id}`, `proMarkets${isLight ? 'Light' : ''}`]))
            , '/', `proMarkets${isLight ? 'Light' : ''}`],
    ];

    return isLoggedIn ? routes : routesUnloggedIn;
};

export const DEFAULT_CCY_PRECISION = 4;
export const STORAGE_DEFAULT_LIMIT = 50;
export const ORDER_BOOK_DEFAULT_SIDE_LIMIT = 25;
export const DEFAULT_TRADING_VIEW_INTERVAL = '15';
export const VALUATION_PRIMARY_CURRENCY = 'USD';
export const VALUATION_SECONDARY_CURRENCY = 'ETH';

export const PASSWORD_ENTROPY_STEP = 6;

export const DEFAULT_KYC_STEPS = ['email', 'phone', 'profile', 'document', 'address'];

export const colors = {
    light: {
        chart: {
            primary: '#fff',
            up: '#54B489',
            down: '#E85E59',
        },
        navbar: {
            sun: 'var(--icons)',
            moon: 'var(--primary-text-color)',
        },
        orderBook: {
            asks: 'var(--asks-level-4)',
            bids: 'var(--bids-level-4)',
        },
        depth: {
            fillAreaAsk: '#fa5252',
            fillAreaBid: '#12b886',
            gridBackgroundStart: '#2c2c34',
            gridBackgroundEnd: '#2c2c34',
            strokeAreaAsk: '#fa5252',
            strokeAreaBid: '#12b886',
            strokeGrid: '#B8E9F5',
            strokeAxis: '#cccccc',
        },
    },
    basic: {
        chart: {
            primary: 'var(--rgb-body-background-color)',
            up: 'var(--rgb-bids)',
            down: 'var(--rgb-asks)',
        },
        navbar: {
            sun: 'var(--primary-text-color)',
            moon: 'var(--icons)',
        },
        orderBook: {
            asks: 'var(--asks-level-4)',
            bids: 'var(--bids-level-4)',
        },
        depth: {
            fillAreaAsk: 'var(--rgb-asks)',
            fillAreaBid: 'var(--rgb-bids)',
            gridBackgroundStart: 'var(--rgb-asks)',
            gridBackgroundEnd: 'var(--rgb-asks)',
            strokeAreaAsk: 'var(--rgb-asks)',
            strokeAreaBid: 'var(--rgb-bids)',
            strokeGrid: 'var(--rgb-secondary-contrast-cta-color)',
            strokeAxis: 'var(--rgb-primary-text-color)',
        },
    },
};
