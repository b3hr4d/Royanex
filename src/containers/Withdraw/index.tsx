import classnames from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { API } from '../../api';
import {
    Beneficiaries,
    CustomInput,
    Decimal,
    SummaryField,
    WalletItemProps,
} from '../../components';
import { cleanPositiveFloatInput } from '../../helpers';
import { Beneficiary, RootState, selectWallets } from '../../modules';

export interface WithdrawProps {
    currency: string;
    name?: string;
    fee: number;
    onClick: (
        amount: string,
        total: string,
        beneficiary: Beneficiary,
        otpCode: string,
    ) => void;
    fixed: number;
    wallets?: WalletItemProps[];
    className?: string;
    type: 'fiat' | 'coin';
    twoFactorAuthRequired?: boolean;
    withdrawAmountLabel?: string;
    withdraw2faLabel?: string;
    withdrawFeeLabel?: string;
    withdrawTotalLabel?: string;
    withdrawButtonLabel?: string;
    withdrawDone: boolean;
    isMobileDevice?: boolean;
    pushAlert?: (payload) => void;
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

interface WithdrawState {
    amount: string;
    beneficiary: Beneficiary;
    otpCode: string;
    withdrawAmountFocused: boolean;
    withdrawCodeFocused: boolean;
    total: string;
    sendCodeTimer: {
        time: number;
        complete: boolean;
        start: boolean;
    };
}

export class WithdrawComponent extends React.Component<
    WithdrawProps,
    WithdrawState
> {
    public state = {
        amount: '',
        beneficiary: defaultBeneficiary,
        otpCode: '',
        withdrawAmountFocused: false,
        withdrawCodeFocused: false,
        total: '',
        sendCodeTimer: {
            time: 120,
            complete: false,
            start: false,
        },
    };

    private timerId;

    public startTimer = () => {
        this.setState({
            sendCodeTimer: {
                ...this.state.sendCodeTimer,
                start: true,
            },
        });
        this.timerId = setInterval(this.initiateTimer, 1000);
    };

    public stopTimer = () => {
        clearInterval(this.timerId);
        this.setState({
            sendCodeTimer: {
                time: 120,
                complete: true,
                start: false,
            },
        });
    };

    public initiateTimer = () => {
        if (this.state.sendCodeTimer.time !== 0) {
            this.setState((prevState) => ({
                sendCodeTimer: {
                    ...this.state.sendCodeTimer,
                    time: prevState.sendCodeTimer.time - 1,
                },
            }));
            if (this.state.sendCodeTimer.time === 0) {
                clearInterval(this.timerId);
                this.setState({
                    sendCodeTimer: {
                        time: 120,
                        complete: true,
                        start: false,
                    },
                });
            }
        }
    };

    public UNSAFE_componentWillReceiveProps(nextProps) {
        const { currency, withdrawDone } = this.props;

        if (
            (nextProps &&
                JSON.stringify(nextProps.currency) !==
                    JSON.stringify(currency)) ||
            (nextProps.withdrawDone && !withdrawDone)
        ) {
            this.setState({
                amount: '',
                otpCode: '',
                total: '',
            });
        }
    }

    public render() {
        const {
            amount,
            beneficiary,
            total,
            withdrawAmountFocused,
            otpCode,
        } = this.state;
        const {
            currency,
            type,
            twoFactorAuthRequired,
            withdrawAmountLabel,
            withdrawFeeLabel,
            withdrawTotalLabel,
            withdrawButtonLabel,
            isMobileDevice,
            name,
            fixed,
        } = this.props;
        const walletBalance = this.walletBalance();

        const lastDividerClassName = classnames('cr-withdraw__divider', {
            'cr-withdraw__divider-one': twoFactorAuthRequired,
            'cr-withdraw__divider-two': !twoFactorAuthRequired,
        });

        const withdrawAmountClass = classnames(
            'cr-withdraw__group__amount mt-4 position-relative',
            {
                'cr-withdraw__group__amount--focused': withdrawAmountFocused,
            },
        );

        return (
            <div className="card container-fluid pb-4">
                <div className="row d-none d-md-block p-4 align-items-center border-bottom">
                    <h2>برداشت {name ? name.toUpperCase() : ''}</h2>
                </div>
                <div className="row p-md-4 ">
                    <div className="cr-withdraw-column col-sm-12 col-12 d-flex flex-column mb-4 p-0 p-md-2">
                        <div className="cr-withdraw__group__address">
                            <Beneficiaries
                                currency={currency}
                                type={type}
                                onChangeValue={this.handleChangeBeneficiary}
                            />
                        </div>
                        <div className="cr-withdraw__divider cr-withdraw__divider-one" />
                        <div className={withdrawAmountClass}>
                            <CustomInput
                                type="text"
                                label={
                                    withdrawAmountLabel || 'Withdrawal Amount'
                                }
                                defaultLabel="Withdrawal Amount"
                                inputValue={amount}
                                placeholder={withdrawAmountLabel || 'Amount'}
                                classNameInput="cr-withdraw__input"
                                handleChangeInput={this.handleChangeInputAmount}
                            />
                            <div
                                className="input-group-append text-center position-absolute w-25 h-100 text-nowrap"
                                style={{ top: 0, left: 0, zIndex: 9 }}
                            >
                                <button
                                    className="btn btn-primary w-100 text-center"
                                    type="button"
                                    onClick={this.sendTotalAmount}
                                >
                                    کل موجودی
                                </button>
                            </div>
                        </div>
                        <div className={lastDividerClassName} />
                        {!isMobileDevice &&
                            twoFactorAuthRequired &&
                            this.renderOtpCodeInput()}
                        <div>
                            <SummaryField
                                className="cr-withdraw__summary-field py-3"
                                message={
                                    withdrawFeeLabel ? withdrawFeeLabel : 'Fee'
                                }
                                content={this.renderFee()}
                            />
                            <SummaryField
                                className={`cr-withdraw__summary-field ${
                                    Number(total) <= 0 ? 'wrong-number' : ''
                                }`}
                                message={
                                    withdrawTotalLabel
                                        ? withdrawTotalLabel
                                        : 'Total Withdraw Amount'
                                }
                                content={this.renderTotal()}
                            />
                            <SummaryField
                                className={`cr-withdraw__summary-field py-3 ${
                                    walletBalance >= 0 ? '' : 'wrong-number'
                                }`}
                                message="باقیمانده موجودی"
                                content={
                                    <span>
                                        <Decimal fixed={fixed}>
                                            {walletBalance}
                                        </Decimal>{' '}
                                        {currency === 'rls'
                                            ? 'تومان'
                                            : currency.toUpperCase()}
                                    </span>
                                }
                            />
                        </div>

                        {isMobileDevice &&
                            twoFactorAuthRequired &&
                            this.renderOtpCodeInput()}
                        <div
                            className="alert alert-warning alert-dismissible fade show mt-4"
                            role="alert"
                        >
                            کارمزد انتقال مربوط به ثبت تراکنش در شبکه‌{' '}
                            {name ? name.toUpperCase() : ''} بوده و رویان در آن
                            ذینفع نیست.
                        </div>
                        <div className="cr-withdraw__deep mt-4">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={this.handleClick}
                                disabled={this.handleCheckButtonDisabled(
                                    total,
                                    beneficiary,
                                    otpCode,
                                )}
                                className="w-100"
                            >
                                {withdrawButtonLabel
                                    ? withdrawButtonLabel
                                    : 'Withdraw'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    private walletBalance = () => {
        const { currency, wallets } = this.props;
        const amount = this.state.amount;
        let balance = 0;
        if (wallets) {
            const wallet = wallets.find((w) => w.currency === currency);
            if (wallet) {
                balance = Number(wallet.balance) - Number(amount);
            }
        }

        return balance;
    };

    private handleCheckButtonDisabled = (
        total: string,
        beneficiary: Beneficiary,
        otpCode: string,
    ) => {
        const isPending =
            beneficiary.state && beneficiary.state.toLowerCase() === 'pending';

        const walletBalance = this.walletBalance();

        if (beneficiary.currency !== 'fiat') {
            return (
                Number(total) <= 0 ||
                !(walletBalance >= 0) ||
                !Boolean(beneficiary.id) ||
                isPending ||
                !Boolean(otpCode)
            );
        } else {
            return (
                Number(total) <= 0 ||
                !Boolean(beneficiary.id) ||
                isPending ||
                !(walletBalance >= 0) ||
                !Boolean(otpCode) ||
                !Boolean(otpCode.length)
            );
        }
    };

    private renderFee = () => {
        const { fee, fixed, currency } = this.props;

        return (
            <span>
                <Decimal fixed={fixed}>{fee.toString()}</Decimal>{' '}
                {currency === 'rls' ? 'تومان' : currency.toUpperCase()}
            </span>
        );
    };

    private renderTotal = () => {
        const total = this.state.total;
        const { fixed, currency } = this.props;

        return total ? (
            <span>
                <Decimal fixed={fixed}>{total.toString()}</Decimal>{' '}
                {currency === 'rls' ? 'تومان' : currency.toUpperCase()}
            </span>
        ) : (
            <span>
                0 {currency === 'rls' ? 'تومان' : currency.toUpperCase()}
            </span>
        );
    };

    private renderOtpCodeInput = () => {
        const { otpCode, withdrawCodeFocused, sendCodeTimer } = this.state;
        const { withdraw2faLabel } = this.props;
        const withdrawCodeClass = classnames(
            'cr-withdraw__group__code mt-4 position-relative',
            {
                'cr-withdraw__group__code--focused': withdrawCodeFocused,
            },
        );

        return (
            <React.Fragment>
                <div className={withdrawCodeClass}>
                    <CustomInput
                        type="tel"
                        label={withdraw2faLabel || '2FA code'}
                        placeholder={withdraw2faLabel || '2FA code'}
                        defaultLabel="2FA code"
                        handleChangeInput={this.handleChangeInputOtpCode}
                        inputValue={otpCode}
                        handleFocusInput={() => this.handleFieldFocus('code')}
                        classNameLabel="cr-withdraw__label"
                        classNameInput="cr-withdraw__input"
                        autoFocus={false}
                    />
                    <div
                        className="input-group-append text-center position-absolute w-25 h-100 text-nowrap"
                        style={{ top: 0, left: 0, zIndex: 9 }}
                    >
                        <button
                            className="btn btn-primary w-100 text-center"
                            type="button"
                            onClick={this.handleSendOtpCode}
                            disabled={sendCodeTimer.start}
                        >
                            {sendCodeTimer.start && !sendCodeTimer.complete ? (
                                <>
                                    <FormattedMessage
                                        id={'page.body.kyc.phone.send'}
                                    />{' '}
                                    ({sendCodeTimer.time}){' '}
                                </>
                            ) : (
                                <FormattedMessage
                                    id={'page.body.kyc.phone.send'}
                                />
                            )}
                        </button>
                    </div>
                </div>
                <div className="cr-withdraw__divider cr-withdraw__divider-two" />
            </React.Fragment>
        );
    };

    private handleClick = () =>
        this.props.onClick(
            this.state.amount,
            this.state.total,
            this.state.beneficiary,
            this.state.otpCode,
        );

    private handleFieldFocus = (field: string) => {
        switch (field) {
            case 'amount':
                this.setState((prev) => ({
                    withdrawAmountFocused: !prev.withdrawAmountFocused,
                }));
                break;
            case 'code':
                this.setState((prev) => ({
                    withdrawCodeFocused: !prev.withdrawCodeFocused,
                }));
                break;
            default:
                break;
        }
    };

    private handleChangeInputAmount = (value: string) => {
        const { fixed } = this.props;

        const convertedValue = cleanPositiveFloatInput(String(value));

        const amount =
            convertedValue !== ''
                ? Number(parseFloat(convertedValue).toFixed(fixed))
                : '';

        const total =
            amount !== '' ? (amount - this.props.fee).toFixed(fixed) : '';

        if (Number(total) <= 0) {
            this.setTotal((0).toFixed(fixed));
        } else {
            this.setTotal(total);
        }

        this.setState({
            amount: convertedValue,
        });
    };

    private setTotal = (value: string) => {
        this.setState({ total: value });
    };

    private handleChangeBeneficiary = (value: Beneficiary) => {
        this.setState({
            beneficiary: value,
        });
    };

    private handleChangeInputOtpCode = (otpCode: string) => {
        this.setState({ otpCode });
    };

    private sendTotalAmount = () => {
        const { currency, wallets } = this.props;
        let balance;

        if (wallets) {
            const wallet = wallets.find((w) => w.currency === currency);
            if (wallet) {
                balance = wallet.balance;
            }
        }

        this.handleChangeInputAmount(balance ? balance : '0');
    };

    private handleSendOtpCode = () => {
        this.startTimer();
        API.post({ apiVersion: 'app' })('/account/withdraws/send-sms')
            .then((e) => {
                if (this.props.pushAlert) {
                    this.props.pushAlert({
                        message: ['page.body.wallets.tabs.withdraw.code.sent'],
                        type: 'success',
                    });
                }
            })
            .catch((error) => {
                this.stopTimer();
                if (this.props.pushAlert) {
                    this.props.pushAlert({
                        message: [
                            'page.body.wallets.tabs.withdraw.code.failed',
                        ],
                        type: 'error',
                    });
                }
            });
    };
}
const mapStateToProps = (state: RootState): { wallets: WalletItemProps[] } => ({
    wallets: selectWallets(state),
});

export const Withdraw = connect(mapStateToProps)(WithdrawComponent);
