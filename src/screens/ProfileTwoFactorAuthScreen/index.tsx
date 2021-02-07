import { History } from 'history';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { CloseIcon } from '../../assets/images/CloseIcon';
import { CopyableTextField, CustomInput, EasyQRCode } from '../../components';
import { copy, setDocumentTitle } from '../../helpers';
import { IntlProps } from '../../index';
import { alertPush, RootState, selectMobileDeviceState } from '../../modules';
import {
    generate2faQRFetch,
    selectTwoFactorAuthBarcode,
    selectTwoFactorAuthQR,
    selectTwoFactorAuthSuccess,
    toggle2faFetch,
} from '../../modules/user/profile';
// import { QRCode } from 'react-qrcode-logo';

interface RouterProps {
    history: History;
}

interface ReduxProps {
    barcode: string;
    qrUrl: string;
    success?: boolean;
    isMobileDevice: boolean;
}

interface DispatchProps {
    toggle2fa: typeof toggle2faFetch;
    generateQR: typeof generate2faQRFetch;
    fetchSuccess: typeof alertPush;
}

type Props = RouterProps & ReduxProps & DispatchProps & IntlProps;

interface State {
    otpCode: string;
}

class ToggleTwoFactorAuthComponent extends React.Component<Props, State> {
    public state = {
        otpCode: '',
    };

    private authClassName = 'profile-two-factor-auth';

    public componentDidMount() {
        setDocumentTitle('Two factor authentication');
        const enable2fa = this.get2faAction();
        if (enable2fa) {
            this.props.generateQR();
        }
    }

    public UNSAFE_componentWillReceiveProps(next: Props) {
        if (!this.props.success && next.success) {
            this.handleNavigateToProfile();
        }
    }

    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public doCopy = () => {
        copy('referral-id');
        this.props.fetchSuccess({
            message: ['page.body.wallets.tabs.deposit.ccy.message.success'],
            type: 'success',
        });
    };

    public render() {
        const enable2fa = this.get2faAction();

        return (
            <div className={`${this.authClassName} container`}>
                {this.renderToggle2fa(enable2fa)}
            </div>
        );
    }

    private renderToggle2fa = (enable2fa: boolean) => {
        const { qrUrl } = this.props;
        const { otpCode } = this.state;

        const secretRegex = /secret=(\w+)/;
        const secretMatch = qrUrl.match(secretRegex);
        const secret = secretMatch ? secretMatch[1] : null;
        const submitHandler = enable2fa
            ? this.handleEnable2fa
            : this.handleDisable2fa;

        const AppStoreLink =
            'https://itunes.apple.com/ru/app/google-authenticator/id388497605?mt=8';
        const GooglePlayLink =
            'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl';

        return (
            <div className="row mt-4">
                <div className="card">
                    <div className="card-header">
                        <div className={`${this.authClassName}__header`}>
                            <strong>
                                {this.translate(
                                    'page.body.profile.header.account.content.twoFactorAuthentication.header',
                                )}
                            </strong>
                            <div onClick={this.goBack}>
                                <CloseIcon />
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="my-3">
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <p>
                                            <span>1-</span>{' '}
                                            <span>
                                                {this.translate(
                                                    'page.body.profile.header.account.content.twoFactorAuthentication.message.1',
                                                )}
                                            </span>{' '}
                                            <a href={AppStoreLink}>AppStore</a>{' '}
                                            <span>
                                                {this.translate(
                                                    'page.body.profile.header.account.content.twoFactorAuthentication.message.or',
                                                )}
                                            </span>{' '}
                                            <a href={GooglePlayLink}>
                                                Google play
                                            </a>
                                        </p>
                                        <p>
                                            <span>2-</span>{' '}
                                            <span>
                                                {this.translate(
                                                    'page.body.profile.header.account.content.twoFactorAuthentication.message.2',
                                                )}
                                            </span>
                                            <br />
                                            <span>
                                                {this.translate(
                                                    'page.body.profile.header.account.content.twoFactorAuthentication.message.3',
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                    <div
                                        className={`${this.authClassName}__qrcode col-sm-6`}
                                    >
                                        {enable2fa &&
                                            this.renderTwoFactorAuthQR(qrUrl)}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    {enable2fa &&
                                        secret &&
                                        this.renderSecret(secret)}
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <span>3-</span>{' '}
                                        <span>
                                            {this.translate(
                                                'page.body.profile.header.account.content.twoFactorAuthentication.message.4',
                                            )}
                                        </span>
                                    </div>
                                    <div className="col-sm-6">
                                        <CustomInput
                                            handleChangeInput={
                                                this.handleOtpCodeChange
                                            }
                                            type="tel"
                                            inputValue={otpCode}
                                            placeholder={this.translate(
                                                'page.body.profile.header.account.content.twoFactorAuthentication.subHeader',
                                            )}
                                            onKeyPress={this.handleEnterPress}
                                            label={this.translate(
                                                'page.body.profile.header.account.content.twoFactorAuthentication.subHeader',
                                            )}
                                            defaultLabel=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <Button
                                    className="btn btn-block py-2"
                                    onClick={submitHandler}
                                    disabled={otpCode === '' ? true : false}
                                >
                                    {this.translate(
                                        'page.body.profile.header.account.content.twoFactorAuthentication.enable',
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    private renderTwoFactorAuthQR = (barcode: string) => {
        return <EasyQRCode data={barcode} size={240} />;
    };

    private renderSecret = (secret: string) => {
        return (
            <div className={`${this.authClassName}__copy row`}>
                <div className="col-sm-6">
                    <span>
                        {this.translate(
                            'page.body.profile.header.account.content.twoFactorAuthentication.message.mfa',
                        )}
                    </span>
                </div>
                <div
                    className={`${this.authClassName}__copyField col-sm-6`}
                    onClick={this.doCopy}
                >
                    <CopyableTextField
                        value={secret}
                        fieldId="secret-2fa"
                        copyButtonText={this.translate(
                            'page.body.profile.header.account.content.twoFactorAuthentication.copy',
                        )}
                    />
                </div>
            </div>
        );
    };

    private handleOtpCodeChange = (value: string) => {
        this.setState({
            otpCode: value,
        });
    };

    private handleEnterPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        const enable2fa = this.get2faAction();
        const submitHandler = enable2fa
            ? this.handleEnable2fa
            : this.handleDisable2fa;
        if (event.key === 'Enter') {
            event.preventDefault();
            submitHandler();
        }
    };

    private handleEnable2fa = () => {
        this.props.toggle2fa({
            code: this.state.otpCode,
            enable: true,
        });
    };

    private handleDisable2fa = () => {
        this.props.toggle2fa({
            code: this.state.otpCode,
            enable: false,
        });
    };

    private handleNavigateToProfile = () => {
        this.props.history.push('/profile');
    };

    private get2faAction = () => {
        const routingState = this.props.history.location.state;

        return routingState ? routingState.enable2fa : false;
    };

    private goBack = () => {
        window.history.back();
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, RootState> = (
    state,
) => ({
    qrUrl: selectTwoFactorAuthQR(state),
    barcode: selectTwoFactorAuthBarcode(state),
    success: selectTwoFactorAuthSuccess(state),
    isMobileDevice: selectMobileDeviceState(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
    dispatch,
) => ({
    generateQR: () => dispatch(generate2faQRFetch()),
    toggle2fa: ({ code, enable }) => dispatch(toggle2faFetch({ code, enable })),
    fetchSuccess: (payload) => dispatch(alertPush(payload)),
});

export const ProfileTwoFactorAuthScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(ToggleTwoFactorAuthComponent) as React.ComponentClass;
