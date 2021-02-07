import axios from 'axios';
import { NumberToWords } from 'persian-tools2';
import * as React from 'react';
// import {Modal} from 'react-bootstrap';
// tslint:disable-next-line:no-duplicate-imports
import { Spinner } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { RouterProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
// import {API, RequestOptions} from '../../api';
import {
    CurrencyCard,
    ReactTour,
    TourSteps,
    WalletItemProps,
    WalletList,
} from '../../components';
import { HistoryElement, OrdersElement } from '../../containers';
import { setDocumentTitle } from '../../helpers';
import { IntlProps } from '../../index';
import {
    alertPush,
    beneficiariesFetch,
    Beneficiary,
    currenciesFetch,
    Currency,
    RootState,
    selectBeneficiariesActivateSuccess,
    selectBeneficiariesDeleteSuccess,
    selectCurrencies,
    selectHistory,
    selectMarketTickers,
    selectMobileWalletUi,
    selectTradingFees,
    selectUserInfo,
    selectUserInfoData,
    selectWalletAddress,
    selectWalletCurrency,
    selectWallets,
    selectWalletsAddressError,
    selectWalletsLoading,
    selectWithdrawSuccess,
    setMobileWalletUi,
    Ticker,
    TradingFees,
    tradingFeesFetch,
    User,
    userInfoFetch,
    UserInfoType,
    WalletHistoryList,
    walletsAddressFetch,
    walletsData,
    walletsFetch,
    walletsWithdrawCcyFetch,
} from '../../modules';
import { CommonError } from '../../modules/types';

export const color = {
    ETH: '#9999ff',
    XRP: '#404040',
    DOGE: '#c68c53',
    BTC: '#ff944d',
    LTC: '#a6a6a6',
    BCH: '#77b300',
    DASH: '#0099e6',
    BNB: '#ffff4d',
    TRST: '#00b38f',
    USD: '#99ff33',
    ZAR: '#ffcc00',
    EUR: '#66b3ff',
    RLS: '#cccccc',
    TRX: '#ff0000',
};

interface ReduxProps {
    user: User;
    userInfo: UserInfoType | undefined;
    tradingFees: TradingFees | undefined;
    wallets: WalletItemProps[];
    withdrawSuccess: boolean;
    addressDepositError?: CommonError;
    walletsLoading?: boolean;
    historyList: WalletHistoryList;
    mobileWalletChosen: string;
    selectedWalletCurrency: string;
    selectedWalletAddress: string;
    beneficiariesActivateSuccess: boolean;
    beneficiariesDeleteSuccess: boolean;
    currencies: Currency[];
    tickers: {
        [pair: string]: Ticker;
    };
}

interface DispatchProps {
    userInfoFetch: typeof userInfoFetch;
    fetchTradingFees: typeof tradingFeesFetch;
    fetchBeneficiaries: typeof beneficiariesFetch;
    fetchWallets: typeof walletsFetch;
    fetchAddress: typeof walletsAddressFetch;
    clearWallets: () => void;
    walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
    fetchSuccess: typeof alertPush;
    setMobileWalletUi: typeof setMobileWalletUi;
    currenciesFetch: typeof currenciesFetch;
}

interface WalletsState {
    activeIndex: number;
    otpCode: string;
    amount: string;
    beneficiary: Beneficiary | null;
    selectedWalletIndex: number;
    withdrawSubmitModal: boolean;
    withdrawConfirmModal: boolean;
    bchAddress?: string;
    filteredWallets?: WalletItemProps[] | null;
    tab: string;
    withdrawDone: boolean;
    total: string;
    currentTabIndex: number;
    generateAddressTriggered: boolean;
    usdAmount: JSON | null;
    chartData: Number[];
    chartLabel: String[];
    chartDataTriggered: boolean;
    doTimer: boolean;
    completeTimer: boolean;
    coins: {
        tron: {
            now: '';
            archive: [];
        };
        bitcoinCash: {
            now: '';
            archive: [];
        };
        bitcoin: {
            now: '';
            archive: [];
        };
        dash: {
            now: '';
            archive: [];
        };
        ethereum: {
            now: '';
            archive: [];
        };
        litecoin: {
            now: '';
            archive: [];
        };
        ripple: {
            now: '';
            archive: [];
        };
    };
    tourModalShow: boolean;
    tourOpen: boolean;
}

interface OwnProps {
    walletsError: {
        message: string;
    };
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps & OwnProps;

class DashboardComponent extends React.Component<Props, WalletsState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            coins: {
                tron: {
                    now: '',
                    archive: [],
                },
                bitcoin: {
                    now: '',
                    archive: [],
                },
                bitcoinCash: {
                    now: '',
                    archive: [],
                },
                dash: {
                    now: '',
                    archive: [],
                },
                ethereum: {
                    now: '',
                    archive: [],
                },
                litecoin: {
                    now: '',
                    archive: [],
                },
                ripple: {
                    now: '',
                    archive: [],
                },
            },
            activeIndex: 0,
            amount: '',
            beneficiary: null,
            currentTabIndex: 0,
            generateAddressTriggered: false,
            otpCode: '',
            selectedWalletIndex: 0,
            tab: '',
            total: '',
            usdAmount: null,
            withdrawConfirmModal: false,
            withdrawDone: false,
            withdrawSubmitModal: false,
            chartData: [],
            chartLabel: [],
            chartDataTriggered: false,
            doTimer: false,
            completeTimer: false,
            tourModalShow: false,
            tourOpen: false,
        };
    }

    private tourSteps: TourSteps[] = [
        {
            selector: '.pg-sidebar-wrapper',
            content: 'منوی کاربری جهت دسترسی سریع به صفحات مختلف',
        },
        {
            selector: '.coinsCards',
            content: 'مشاهده قیمت آنلاین رمز ارز های مختلف',
        },
    ];

    public translate = (id: string) => this.props.intl.formatMessage({ id });

    public componentDidMount() {
        // this.handleCardsPrice();
        setDocumentTitle('داشبورد');
        if (!this.props.wallets.length) {
            this.props.fetchWallets();
        }

        if (!this.props.userInfo || this.props.userInfo.email === '') {
            this.props.userInfoFetch();
        }

        if (!this.props.tradingFees) {
            this.props.fetchTradingFees();
        }

        let obj = {};
        if (localStorage) {
            obj = localStorage.getItem('already_login') as string;
            if (!obj) {
                this.setState({
                    tourModalShow: true,
                });
            }
        }
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (nextProps.wallets.length !== this.props.wallets.length) {
            this.handleChartData();
        }
    }

    // private handleTourShow = () => {
    //     this.setState({
    //         tourModalShow: false,
    //         tourOpen: true,
    //     });
    //     localStorage.setItem(
    //         'already_login',
    //         'true',
    //     );
    // };

    // private handleModalClose = () => {
    //     this.setState({
    //         tourModalShow: false,
    //     });
    //     localStorage.setItem(
    //         'already_login',
    //         'true',
    //     );
    // };
    // @ts-ignore
    protected handleCardsPrice = async () => {
        const api =
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin,ethereum,dash,ripple,Dogecoin,Bitcoin-Cash,tron,WeTrust&vs_currencies=usd';
        const data = await axios.get(api).then((res) => res.data);
        Object.keys(data).forEach((coin) => {
            if (coin === 'bitcoin-cash') {
                this.setState({
                    coins: {
                        ...this.state.coins,
                        bitcoinCash: {
                            ...this.state.coins.bitcoinCash,
                            now: data[coin].usd,
                        },
                    },
                });
            } else {
                this.setState({
                    coins: {
                        ...this.state.coins,
                        [coin]: {
                            now: data[coin].usd,
                        },
                    },
                });
            }
        });
    };
    // @ts-ignore
    private renderCards = () => {
        const cards = [
            {
                name: 'بیت کوین',
                market: 'btcrls',
                icon: 'btc.svg',
                price: this.state.coins.bitcoin.now,
                bgColor: 'linear-gradient(45deg, #4638c2 0%, #2d2587 100%)',
                data: this.state.coins.bitcoin.archive,
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                ],
            },
            {
                name: 'بیت کوین کش',
                market: 'bchrls',
                icon: 'bch.svg',
                price: this.state.coins.bitcoinCash.now,
                bgColor: 'linear-gradient(45deg, #e1a82d 0%, #dd9124 100%) ',
                data: this.state.coins.bitcoinCash.archive,
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                ],
            },
            {
                name: 'اتریوم',
                market: 'ethrls',
                icon: 'eth.svg',
                price: this.state.coins.ethereum.now,
                bgColor: 'linear-gradient(45deg, #4c4f54 0%, #292a2b 100%)',
                data: this.state.coins.ethereum.archive,
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                ],
            },
            {
                name: 'لایت کوین',
                market: 'ltcrls',
                icon: 'ltc.svg',
                price: this.state.coins.litecoin.now,
                bgColor: 'linear-gradient(45deg, #33a5b2 0%, #33a5b2 100%) ',
                data: this.state.coins.litecoin.archive,
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                ],
            },
            {
                name: 'ریپل',
                market: 'xrprls',
                icon: 'xrp.svg',
                price: this.state.coins.ripple.now,
                bgColor: 'linear-gradient(45deg, #e55353 0%, #d93737 100%)',
                data: this.state.coins.ripple.archive,
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                ],
            },
            {
                name: 'دش کوین',
                market: 'dashrls',
                icon: 'dash.svg',
                price: this.state.coins.dash.now,
                bgColor: 'linear-gradient(45deg, #2eb85c 0%, #1b9e3e 100%)',
                data: this.state.coins.bitcoin.archive,
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                ],
            },
            {
                name: 'ترون',
                market: 'trxrls',
                icon: 'trx.svg',
                price: this.state.coins.tron.now,
                bgColor: 'linear-gradient(45deg, #9d1916 0%, #9d1916 100%)',
                data: this.state.coins.tron.archive,
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                ],
            },
            {
                name: 'رادین کوین',
                market: 'radinrls',
                icon: 'r.svg',
                price: '1',
                bgColor: 'linear-gradient(45deg, #3f33b1 0%, #3f33b1 100%)',
                data: this.state.coins.bitcoin.archive,
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                ],
            },
        ];

        return (
            <div className="row mt-md-4 coinsCards">
                {cards.map((e) => {
                    return (
                        <CurrencyCard
                            icon={e.icon}
                            name={e.name}
                            market={e.market}
                            bgColor={e.bgColor}
                            price={e.price}
                            data={e.data}
                            labels={e.labels}
                            tickers={this.props.tickers[e.market]}
                        />
                    );
                })}
            </div>
        );
    };

    private handleChartData = () => {
        this.setState({
            chartDataTriggered: true,
        });
        const { wallets, tickers } = this.props;

        const formattedWallets = wallets.map((wallet: WalletItemProps) => ({
            currency: wallet.currency,
            balance: wallet.balance,
            name: wallet.name,
        }));

        const chartData: Number[] = [];
        const chartLabel: String[] = [];

        for (const [key, value] of Object.entries(tickers)) {
            formattedWallets.forEach((e) => {
                if (key === `${e.currency}usdt`) {
                    chartData.push(Number(e.balance) * Number(value.last));
                    chartLabel.push(e.currency.toUpperCase());
                }
            });
        }
        this.setState({
            chartData: chartData,
            chartLabel: chartLabel,
        });
    };

    private renderWallets = () => {
        const { wallets, walletsLoading } = this.props;
        const formattedWallets = wallets.map((wallet: WalletItemProps) => ({
            ...wallet,
            currency: wallet.currency.toUpperCase(),
            iconUrl: wallet.iconUrl ? wallet.iconUrl : '',
        }));
        const chartColor = [] as any;
        for (const i in this.state.chartLabel) {
            const label = this.state.chartLabel[i];
            chartColor.push(color[label.toString()]);
        }

        const fontColor = getComputedStyle(
            document.documentElement,
        ).getPropertyValue('--sidebar-text-color');

        const data = {
            labels: this.state.chartLabel,
            datasets: [
                {
                    borderWidth: 1,
                    backgroundColor: chartColor,
                    borderColor: chartColor,
                    data: this.state.chartData,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 4,
            legend: {
                display: true,
                position: 'left',
                labels: {
                    fontColor: fontColor,
                    usePointStyle: true,
                },
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            display: false,
                        },
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            display: false,
                        },
                        gridLines: {
                            display: false,
                        },
                    },
                ],
            },
        };

        return (
            <div className="card">
                <div className="card-header text-right">کیف‌های شما</div>
                <div className="card-body">
                    {this.state.chartData.length ? (
                        <div className="pb-2 px-4 mt-5">
                            <Pie
                                data={data}
                                options={options}
                                height={200}
                                width={150}
                            />
                        </div>
                    ) : (
                        <div className="text-center my-4">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )}
                    <table className="table table-striped table-bordered datatable table-sm">
                        <thead>
                            <tr className="text-center">
                                <th>رمز ارز ها</th>
                                <th>موجودی</th>
                            </tr>
                        </thead>
                        <tbody>
                            <WalletList
                                walletItems={formattedWallets}
                                dashboard={true}
                                loading={walletsLoading}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    private renderAccountStatus = () => {
        const { user } = this.props;

        return (
            <div className="card card-auto">
                <div className="card-header text-right"> وضعیت حساب کاربری</div>
                <div className="card-body">
                    <table className="table table-striped table-bordered datatable">
                        <tbody>
                            <tr>
                                <td>سطح کاربری:</td>
                                <td className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span>سطح </span>
                                        <span>
                                            {NumberToWords.convert(
                                                this.props.user.level,
                                            ).toString()}
                                        </span>
                                    </div>
                                    <Link to="/profile">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger  mr-md-4 text-nowrap"
                                        >
                                            ارتقا سطح کاربری
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>کارمزد معاملات:</td>
                                <td className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span>
                                            {this.props.userInfo
                                                ? ` -  ${this.props.userInfo.group}`
                                                : ''}
                                        </span>
                                        <span> - میزان کارمزد : 0.3% </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>نام و نام خانوادگی:</td>
                                <td>
                                    {user.profiles.length
                                        ? `${
                                              user.profiles[
                                                  user.profiles.length - 1
                                              ].first_name
                                          } ${
                                              user.profiles[
                                                  user.profiles.length - 1
                                              ].last_name
                                          }`
                                        : 'ثبت نشده'}
                                </td>
                            </tr>
                            <tr>
                                <td>کد ملی:</td>
                                <td>
                                    {user.nid !== '' ? user.nid : 'ثبت نشده'}
                                </td>
                            </tr>
                            <tr>
                                <td>شماره همراه:</td>
                                <td>
                                    {user.phone !== ''
                                        ? user.phone
                                        : 'ثبت نشده'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    private renderOpenOrders = () => {
        return (
            <OrdersElement
                title={this.translate('page.body.dashboard.openOrdersTitle')}
                type="open"
                dashboard={true}
            />
        );
    };

    private renderLastTrades = () => {
        return (
            <HistoryElement
                title={this.translate('page.body.dashboard.lastTradesTitle')}
                type="trades"
                dashboard={true}
            />
        );
    };

    // tslint:disable-next-line: member-ordering
    public render() {
        return (
            <div>
                <div className="container-fluid">
                    {/*{this.renderCards()}*/}
                    <div className="row mt-md-4">
                        <div className="col-12 col-md-6 px-1 px-md-2">
                            {this.renderWallets()}
                        </div>
                        <div className="col-12 col-md-6 px-1 px-md-2">
                            {this.renderAccountStatus()}
                            <div className="mt-4">
                                {this.renderOpenOrders()}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12 px-1 px-md-2">
                            {this.renderLastTrades()}
                        </div>
                    </div>
                </div>
                {/*<Modal*/}
                {/*    size={'sm'}*/}
                {/*    centered*/}
                {/*    show={this.state.tourModalShow}*/}
                {/*    className="confirmModal"*/}
                {/*>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        راهنمای استفاده از پنل رادین*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>*/}
                {/*        <h3 className="text-center">به رادین خوش آمدید</h3>*/}
                {/*        <p className="my-4 px-2 text-justify">برای آشنایی بیشتر با روند کار و چگونگی کارکرد هر قسمت با*/}
                {/*            کلیک کردن روی دکمه زیر میتوانید تور*/}
                {/*            آموزشی را مشاهده کنید.</p>*/}
                {/*        <div className="w-100 d-flex justify-content-around mt-4">*/}
                {/*            <button className="btn btn-success" onClick={this.handleTourShow}>مشاهده آموزش*/}
                {/*            </button>*/}
                {/*            <button className="btn btn-danger" onClick={this.handleModalClose}>مایل نیستم*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </Modal.Body>*/}
                {/*</Modal>*/}
                <ReactTour steps={this.tourSteps} open={this.state.tourOpen} />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
    userInfo: selectUserInfoData(state),
    tradingFees: selectTradingFees(state),
    wallets: selectWallets(state),
    walletsLoading: selectWalletsLoading(state),
    addressDepositError: selectWalletsAddressError(state),
    withdrawSuccess: selectWithdrawSuccess(state),
    historyList: selectHistory(state),
    mobileWalletChosen: selectMobileWalletUi(state),
    selectedWalletAddress: selectWalletAddress(state),
    selectedWalletCurrency: selectWalletCurrency(state),
    beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
    beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
    currencies: selectCurrencies(state),
    tickers: selectMarketTickers(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
    dispatch,
) => ({
    userInfoFetch: () => dispatch(userInfoFetch()),
    fetchTradingFees: () => dispatch(tradingFeesFetch()),
    fetchBeneficiaries: () => dispatch(beneficiariesFetch()),
    fetchWallets: () => dispatch(walletsFetch()),
    fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
    walletsWithdrawCcy: (params) => dispatch(walletsWithdrawCcyFetch(params)),
    clearWallets: () => dispatch(walletsData([])),
    fetchSuccess: (payload) => dispatch(alertPush(payload)),
    setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
    currenciesFetch: () => dispatch(currenciesFetch()),
});

export const DashboardScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(DashboardComponent) as React.ComponentClass;
