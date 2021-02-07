import cr from 'classnames';
import * as React from 'react';
import {Button, InputGroup} from 'react-bootstrap';
import {FormattedMessage, injectIntl} from 'react-intl';
import {
    connect,
    MapDispatchToPropsFunction,
} from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import {CustomInput} from '../../../components';
import {IntlProps} from '../../../index';
import {
    changeUserLevel,
    resendCode,
    RootState,
    selectVerifyPhoneLoading,
    sendCode,
    sendPhoneCode,
    verifyPhone,
} from '../../../modules';


interface ReduxProps {
    verifyPhoneLoading: boolean;
    sendCodeSuccess: boolean;
}

interface PhoneState {
    phoneNumber: string;
    userNidCode: string;
    phoneNumberFocused: boolean;
    confirmationCode: string;
    confirmationCodeFocused: boolean;
    userNidCodeFocused: boolean;
    resendCode: boolean;
    sendCodeTimer: {
        time: number,
        complete: boolean,
        start: boolean,
    };
}

interface DispatchProps {
    resendCode: typeof resendCode;
    sendCode: typeof sendCode;
    verifyPhone: typeof verifyPhone;
    changeUserLevel: typeof changeUserLevel;
}

type Props = ReduxProps & DispatchProps & IntlProps;

class PhoneComponent extends React.Component<Props, PhoneState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            phoneNumber: '',
            userNidCode: '',
            phoneNumberFocused: false,
            userNidCodeFocused: false,
            confirmationCode: '',
            confirmationCodeFocused: false,
            resendCode: false,
            sendCodeTimer: {
                time: 60,
                complete: false,
                start: false,
            },
        };
    }

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

    public initiateTimer = () => {
        if (this.state.sendCodeTimer.time !== 0) {
            this.setState(prevState => ({
                sendCodeTimer: {
                    ...this.state.sendCodeTimer,
                    time: prevState.sendCodeTimer.time - 1,
                },
            }));
            if (this.state.sendCodeTimer.time === 0) {
                clearInterval(this.timerId);
                this.setState({
                    sendCodeTimer: {
                        time: 60,
                        complete: true,
                        start: false,
                    },
                });
            }
        }
    };

    public translate = (e: string) => {
        return this.props.intl.formatMessage({id: e});
    };

    public render() {
        const {
            phoneNumber,
            phoneNumberFocused,
            userNidCode,
            confirmationCode,
            confirmationCodeFocused,
            userNidCodeFocused,
            sendCodeTimer,
        } = this.state;
        const {
            verifyPhoneLoading,
        } = this.props;

        const phoneNumberFocusedClass = cr('pg-confirm__content-phone-col-content', {
            'pg-confirm__content-phone-col-content--focused': phoneNumberFocused,
        });

        const confirmationCodeFocusedClass = cr('pg-confirm__content-phone-col-content', {
            'pg-confirm__content-phone-col-content--focused': confirmationCodeFocused,
        });


        const userNidCodeFocusedClass = cr('pg-confirm__content-phone-col-content', {
            'pg-confirm__content-phone-col-content--focused': userNidCodeFocused,
        });

        return (
            <div>
                <h5 className="pg-confirm__content-phone-head text-center">{this.translate('page.body.kyc.phone.head')}</h5>
                <div className="pg-confirm__content-phone-col mt-4">
                    <fieldset className={phoneNumberFocusedClass}>
                        <CustomInput
                            label={phoneNumber ? this.translate('page.body.kyc.phone.phoneNumber') : ''}
                            defaultLabel={phoneNumber ? this.translate('page.body.kyc.phone.phoneNumber') : ''}
                            placeholder={this.translate('page.body.kyc.phone.phoneNumber')}
                            type="tel"
                            inputValue={phoneNumber}
                            handleChangeInput={this.handleChangePhoneNumber}
                            onKeyPress={this.handleSendEnterPress}
                            autoFocus={true}
                            handleFocusInput={this.handleFieldFocus('phoneNumber')}
                        />
                        <InputGroup>
                            <Button
                                block={true}
                                onClick={this.handleSendCode}
                                size="lg"
                                variant="primary"
                                disabled={!phoneNumber || !this.isValidMobileIran(phoneNumber) || sendCodeTimer.start}
                                className="mt-4"
                            >
                                {(sendCodeTimer.start && !sendCodeTimer.complete)
                                    ? <><FormattedMessage id={'page.body.kyc.phone.send'}/> ({sendCodeTimer.time}) </>
                                    : (this.state.resendCode)
                                        ? this.translate('page.body.kyc.phone.resend')
                                        : this.translate('page.body.kyc.phone.send')
                                }
                            </Button>
                        </InputGroup>
                    </fieldset>
                </div>
                <div className="pg-confirm__content-phone-col mt-4">
                    <fieldset className={userNidCodeFocusedClass}>
                        <CustomInput
                            type="tel"
                            label={userNidCode ? 'کد ملی شما' : ''}
                            defaultLabel={userNidCode ? 'کد ملی شما (با حروف لاتین)' : ''}
                            handleChangeInput={this.handleChangeUserNid}
                            onKeyPress={this.handleConfirmEnterPress}
                            inputValue={userNidCode}
                            placeholder="کد ملی شما (با حروف لاتین)"
                            handleFocusInput={this.handleFieldFocus('userNidCode')}
                        />
                    </fieldset>
                </div>
                <div className="pg-confirm__content-phone-col mt-4">
                    <fieldset className={confirmationCodeFocusedClass}>
                        <CustomInput
                            type="tel"
                            label={confirmationCode ? this.translate('page.body.kyc.phone.code') : ''}
                            defaultLabel={confirmationCode ? this.translate('page.body.kyc.phone.code') : ''}
                            handleChangeInput={this.handleChangeConfirmationCode}
                            onKeyPress={this.handleConfirmEnterPress}
                            inputValue={confirmationCode}
                            placeholder={this.translate('page.body.kyc.phone.code')}
                            handleFocusInput={this.handleFieldFocus('confirmationCode')}
                        />
                    </fieldset>
                </div>
                <div className="pg-confirm__content-deep">
                    <Button
                        block={true}
                        onClick={this.confirmPhone}
                        size="lg"
                        variant="primary"
                        disabled={!confirmationCode || !this.isValidIranianNationalCode(userNidCode)}
                    >
                        {
                            (verifyPhoneLoading)
                                ? <ClipLoader
                                    size={20}
                                    color={'#ffffff'}
                                    loading={verifyPhoneLoading}
                                /> : this.translate('page.body.kyc.next')
                        }
                    </Button>
                </div>
            </div>
        );
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>) {
        if (nextProps.sendCodeSuccess) {
            this.startTimer();
            this.setState({
                resendCode: true,
            });
        }
    }


    private handleFieldFocus = (field: string) => {
        return () => {
            switch (field) {
                case 'phoneNumber':
                    this.setState(prev => ({
                        phoneNumberFocused: !prev.phoneNumberFocused,
                    }));
                    break;
                case 'confirmationCode':
                    this.setState({
                        confirmationCodeFocused: !this.state.confirmationCodeFocused,
                    });
                    break;
                case 'userNidCode':
                    this.setState({
                        userNidCodeFocused: !this.state.userNidCodeFocused,
                    });
                    break;
                default:
                    break;
            }
        };
    };

    private handleConfirmEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.confirmPhone();
        }
    };

    private handleSendEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSendCode();
        }
    };

    private confirmPhone = () => {
        const requestProps = {
            phone_number: String(this.state.phoneNumber),
            verification_code: String(this.state.confirmationCode),
            nid: String(this.state.userNidCode),
        };
        this.props.verifyPhone(requestProps);
    };

    private handleChangePhoneNumber = (value: string) => {
        if (this.inputPhoneNumber(value)) {
            this.setState({
                phoneNumber: value,
                resendCode: false,
            });
        }
    };

    private handleChangeUserNid = (value: string) => {
        if (this.inputConfirmationCode(value)) {
            this.setState({
                userNidCode: value,
            });
        }
    };

    private handleChangeConfirmationCode = (value: string) => {
        if (this.inputConfirmationCode(value)) {
            this.setState({
                confirmationCode: value,
            });
        }
    };

    private inputPhoneNumber = (value: string) => {
        const convertedText = value.trim();
        const condition = new RegExp('^(\\+98|0)?\\d*$');

        return condition.test(convertedText);
    };

    private inputConfirmationCode = (value: string) => {
        const convertedText = value.trim();
        const condition = new RegExp('^\\d*?$');

        return condition.test(convertedText);
    };

    private isValidIranianNationalCode = (input: string) => {
        if (!/^\d{10}$/.test(input)) {
            return false;
        }
        const check = +input[9];
        const sum =
            Array(9)
                .fill(0)
                .map((_, i) => +input[i] * (10 - i))
                .reduce((x, y) => x + y) % 11;

        return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
    };

    private isValidMobileIran = (value: string) => {
        if (!/^\d{11}$/.test(value)) {
            return false;
        }
        const convertedText = value.trim();
        const condition = new RegExp('^09\\d{9}$');

        return condition.test(convertedText);
    };

    private handleSendCode = () => {
        const requestProps = {
            phone_number: String(this.state.phoneNumber),
        };
        if (!this.state.resendCode) {
            this.props.sendCode(requestProps);
        } else {
            this.props.resendCode(requestProps);
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    verifyPhoneLoading: selectVerifyPhoneLoading(state),
    sendCodeSuccess: sendPhoneCode(state),
} as ReduxProps);

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        resendCode: phone => dispatch(resendCode(phone)),
        sendCode: phone => dispatch(sendCode(phone)),
        verifyPhone: payload => dispatch(verifyPhone(payload)),
        changeUserLevel: payload => dispatch(changeUserLevel(payload)),
    });

// tslint:disable-next-line
export const Phone = injectIntl(connect(mapStateToProps, mapDispatchProps)(PhoneComponent) as any);
