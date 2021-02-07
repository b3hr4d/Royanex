import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Blur, WalletItemProps } from '../../components';
import {
    ModalWithdrawConfirmation,
    ModalWithdrawSubmit,
    Withdraw,
    WithdrawProps,
} from '../../containers';
import { setDocumentTitle } from '../../helpers';

import { IntlProps } from '../../index';
import {
    alertPush,
    Beneficiary,
    Card,
    cardsFetch,
    currenciesFetch,
    Currency,
    RootState,
    selectCards,
    selectCurrencies,
    selectUserInfo,
    selectWallets,
    User,
    Wallet,
    walletsFetch,
    walletsWithdrawCcyFetch,
    walletsWithdrawRlsFetch,
    WalletWithdrawRls,
} from '../../modules';

interface ReduxProps {
    user: User;
    cards: Card[];
    wallets: Wallet[];
    currencies: Currency[];
}

interface DispatchProps {
    fetchWallets: typeof walletsFetch;
    getCards: typeof cardsFetch;
    currenciesFetch: typeof currenciesFetch;
    walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
    walletsWithdrawRls: typeof walletsWithdrawRlsFetch;
    pushAlert: typeof alertPush;
}

interface ComponentProps {
    match: {
        params: {
            type: string;
        };
    };
}

const defaultBeneficiary: Beneficiary = {
    id: 0,
    currency: '',
    name: '',
    state: '',
    data: {
        address: '',
    },
};

interface WalletsState {
    activeIndex: number;
    otpCode: string;
    amount: string;
    beneficiary: Beneficiary;
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
}

interface WithdrawState {
    activeIndex: number;
    otpCode: string;
    amount: string;
    beneficiary: Beneficiary;
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
}

type Props = ReduxProps &
    DispatchProps &
    RouterProps &
    IntlProps &
    ComponentProps;

class WithdrawScreenComponent extends React.Component<Props, WithdrawState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            activeIndex: 0,
            selectedWalletIndex: 0,
            withdrawSubmitModal: false,
            withdrawConfirmModal: false,
            otpCode: '',
            amount: '',
            beneficiary: defaultBeneficiary,
            tab: this.translate('page.body.wallets.tabs.deposit'),
            withdrawDone: false,
            total: '',
            currentTabIndex: 0,
            generateAddressTriggered: false,
        };
    }

    public translate = (id: string) => this.props.intl.formatMessage({ id });

    public componentDidMount() {
        this.props.getCards();
        this.props.fetchWallets();
        this.props.currenciesFetch();
    }

    public render() {
        const { wallets } = this.props;
        const {
            withdrawConfirmModal,
            withdrawSubmitModal,
            total,
            beneficiary,
        } = this.state;
        let currency = '';
        let type = '';
        let confirmationAddress = '';
        let bankName: string | undefined = '';

        if (wallets.length) {
            const wallet = wallets.filter(
                (e) =>
                    e.currency === this.props.match.params.type.toLowerCase(),
            );
            currency = wallet[0].name;

            setDocumentTitle(
                wallet[0].currency === 'rls'
                    ? 'برداشت ریالی'
                    : `برداشت ${currency}`,
            );

            type = wallet[0].type;
            if (wallet[0]) {
                confirmationAddress =
                    wallet[0].type === 'fiat'
                        ? beneficiary.name
                        : beneficiary.data
                        ? (beneficiary.data.address as string)
                        : '';
            }
            if (wallet[0]) {
                bankName =
                    wallet[0].type === 'fiat' ? beneficiary.description : ' ';
            }
        }

        return (
            <div className="withdrawScreen container-fluid">
                <div className="row my-4 pg-container">
                    <div className="col-sm-12">
                        {wallets.length && this.renderWithdrawBlur()}
                        {wallets.length && this.renderWithdrawContent()}
                        <ModalWithdrawSubmit
                            show={withdrawSubmitModal}
                            currency={currency}
                            onSubmit={this.toggleSubmitModal}
                        />
                        <ModalWithdrawConfirmation
                            show={withdrawConfirmModal}
                            amount={total}
                            currency={currency}
                            rid={confirmationAddress}
                            type={type}
                            bankName={bankName}
                            onSubmit={this.handleWithdraw}
                            onDismiss={this.toggleConfirmModal}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private renderWithdrawBlur = () => {
        const { wallets, currencies, user } = this.props;
        const wallet = wallets.filter(
            (e) => e.currency === this.props.match.params.type.toLowerCase(),
        );
        const { currency } = wallet[0];
        const currencyItem =
            currencies && currencies.find((item) => item.id === currency);

        if (user.level !== 3) {
            return (
                <Blur
                    className="pg-blur-withdraw"
                    text={this.translate(
                        'page.body.wallets.tabs.withdraw..level.disabled.message',
                    )}
                />
            );
        } else if (currencyItem && !currencyItem.withdrawal_enabled) {
            return (
                <Blur
                    className="pg-blur-withdraw"
                    text={this.translate(
                        'page.body.wallets.tabs.withdraw.disabled.message',
                    )}
                />
            );
        } else {
            return null;
        }
    };

    private renderWithdrawContent = () => {
        const { withdrawDone } = this.state;
        const { wallets } = this.props;
        const wallet = wallets.filter(
            (e) => e.currency === this.props.match.params.type.toLowerCase(),
        );
        const { currency, fee, type, name } = wallet[0];
        const fixed = (wallet[0] || { fixed: 0 }).fixed;

        const withdrawProps: WithdrawProps = {
            withdrawDone,
            currency,
            fee,
            onClick: this.toggleConfirmModal,
            twoFactorAuthRequired: true,
            fixed,
            type,
            name,
            pushAlert: this.handlePushAlert,
            withdrawAmountLabel: this.props.intl.formatMessage({
                id: 'page.body.wallets.tabs.withdraw.content.amount',
            }),
            withdraw2faLabel: this.props.intl.formatMessage({
                id: 'page.body.wallets.tabs.withdraw.content.code2fa.sms',
            }),
            withdrawFeeLabel: this.props.intl.formatMessage({
                id: 'page.body.wallets.tabs.withdraw.content.fee',
            }),
            withdrawTotalLabel: this.props.intl.formatMessage({
                id: 'page.body.wallets.tabs.withdraw.content.total',
            }),
            withdrawButtonLabel: this.props.intl.formatMessage({
                id: 'page.body.wallets.tabs.withdraw.content.button',
            }),
        };

        return <Withdraw {...withdrawProps} />;
    };

    private toggleSubmitModal = () => {
        this.setState((state: WalletsState) => ({
            withdrawSubmitModal: !state.withdrawSubmitModal,
            withdrawDone: true,
        }));
    };

    private toggleConfirmModal = (
        amount?: string,
        total?: string,
        beneficiary?: Beneficiary,
        otpCode?: string,
    ) => {
        this.setState((state: WalletsState) => ({
            amount: amount || '',
            beneficiary: beneficiary ? beneficiary : defaultBeneficiary,
            otpCode: otpCode ? otpCode : '',
            withdrawConfirmModal: !state.withdrawConfirmModal,
            total: total || '',
            withdrawDone: false,
        }));
    };

    private handleWithdraw = () => {
        const { otpCode, amount, beneficiary } = this.state;
        const wallet = this.props.wallets.filter(
            (e) => e.currency === this.props.match.params.type.toLowerCase(),
        );
        const { currency, type } = wallet[0];
        if (type === 'fiat') {
            const withdrawRequest: WalletWithdrawRls = {
                otp: otpCode,
                amount: amount,
                acc_num: String(beneficiary.name),
            };
            this.props.walletsWithdrawRls(withdrawRequest);
        } else {
            const withdrawRequest = {
                amount,
                currency: currency.toLowerCase(),
                otp: otpCode,
                beneficiary_id: String(beneficiary.id),
            };
            this.props.walletsWithdrawCcy(withdrawRequest);
        }

        this.toggleConfirmModal();
    };

    private handlePushAlert = (payload) => {
        this.props.pushAlert(payload);
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
    cards: selectCards(state),
    wallets: selectWallets(state),
    currencies: selectCurrencies(state),
});

const mapDispatchToProps = (dispatch) => ({
    getCards: () => dispatch(cardsFetch()),
    fetchWallets: () => dispatch(walletsFetch()),
    currenciesFetch: () => dispatch(currenciesFetch()),
    walletsWithdrawCcy: (params) => dispatch(walletsWithdrawCcyFetch(params)),
    walletsWithdrawRls: (params) => dispatch(walletsWithdrawRlsFetch(params)),
    pushAlert: (payload) => dispatch(alertPush(payload)),
});

export const WithdrawScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(WithdrawScreenComponent) as any; // tslint:disable-line
