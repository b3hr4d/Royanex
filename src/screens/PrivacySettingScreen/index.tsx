import cr from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { CloseIcon } from '../../assets/images/CloseIcon';
import { CustomInput, Modal } from '../../components';
import { ProfileTwoFactorAuth } from '../../containers';
import { PASSWORD_REGEX, setDocumentTitle } from '../../helpers';
import { IntlProps } from '../../index';
import { Subheader } from '../../mobile/components/Subheader';
import {
    alertPush,
    changePasswordFetch,
    RootState,
    selectMobileDeviceState,
    selectUserInfo,
    toggle2faFetch,
    User,
} from '../../modules';

interface ReduxProps {
    user: User;
    isMobileDevice: boolean;
}

interface DispatchProps {
    pushAlert: typeof alertPush;
    changePassword: typeof changePasswordFetch;
    toggle2fa: typeof toggle2faFetch;
}

interface PrivacyState {
    showChangeModal: boolean;
    showModal: boolean;
    oldPassword: string;
    newPassword: string;
    confirmationPassword: string;
    oldPasswordFocus: boolean;
    newPasswordFocus: boolean;
    confirmPasswordFocus: boolean;
    code2FA: string;
    code2FAFocus: boolean;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;

class PrivacySetting extends React.Component<Props, PrivacyState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showChangeModal: false,
            showModal: false,
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
            oldPasswordFocus: false,
            newPasswordFocus: false,
            confirmPasswordFocus: false,
            code2FA: '',
            code2FAFocus: false,
        };
    }

    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public componentDidMount() {
        setDocumentTitle(
            this.translate('page.header.navbar.privacy.setting.title'),
        );
    }

    public render() {
        const {
            oldPasswordFocus,
            newPasswordFocus,
            confirmationPassword,
            oldPassword,
            newPassword,
            confirmPasswordFocus,
        } = this.state;

        const oldPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': oldPasswordFocus,
        });

        const newPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': newPasswordFocus,
        });

        const confirmPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': confirmPasswordFocus,
        });

        const changeModalBody = (
            <div className="cr-modal__container-content">
                <div className={oldPasswordClass}>
                    <CustomInput
                        type="password"
                        label={this.props.intl.formatMessage({
                            id:
                                'page.body.profile.header.account.content.password.old',
                        })}
                        placeholder={this.props.intl.formatMessage({
                            id:
                                'page.body.profile.header.account.content.password.old',
                        })}
                        defaultLabel="Old password"
                        handleChangeInput={this.handleOldPassword}
                        inputValue={oldPassword}
                        handleFocusInput={this.handleClickFieldFocus(
                            'oldPasswordFocus',
                        )}
                        classNameLabel="cr-email-form__label"
                        classNameInput="cr-email-form__input"
                        autoFocus={true}
                    />
                </div>
                <div className={newPasswordClass}>
                    <CustomInput
                        type="password"
                        label={this.props.intl.formatMessage({
                            id:
                                'page.body.profile.header.account.content.password.new',
                        })}
                        placeholder={this.props.intl.formatMessage({
                            id:
                                'page.body.profile.header.account.content.password.new',
                        })}
                        defaultLabel="New password"
                        handleChangeInput={this.handleNewPassword}
                        inputValue={newPassword}
                        handleFocusInput={this.handleClickFieldFocus(
                            'newPasswordFocus',
                        )}
                        classNameLabel="cr-email-form__label"
                        classNameInput="cr-email-form__input"
                        autoFocus={false}
                    />
                </div>
                <div className={confirmPasswordClass}>
                    <CustomInput
                        type="password"
                        label={this.props.intl.formatMessage({
                            id:
                                'page.body.profile.header.account.content.password.conf',
                        })}
                        placeholder={this.props.intl.formatMessage({
                            id:
                                'page.body.profile.header.account.content.password.conf',
                        })}
                        defaultLabel="Password confirmation"
                        handleChangeInput={this.handleConfPassword}
                        inputValue={confirmationPassword}
                        handleFocusInput={this.handleClickFieldFocus(
                            'confirmPasswordFocus',
                        )}
                        classNameLabel="cr-email-form__label"
                        classNameInput="cr-email-form__input"
                        autoFocus={false}
                    />
                </div>
                <div className="pb-4 ">
                    <Button
                        className="PrivacySettingScreen__changeModalBody__button"
                        disabled={!this.isValidForm()}
                        type="submit"
                        variant="primary"
                        size="lg"
                    >
                        {this.props.intl.formatMessage({
                            id:
                                'page.body.profile.header.account.content.password.button.change',
                        })}
                    </Button>
                </div>
            </div>
        );

        const modal = this.state.showChangeModal ? (
            <div className="cr-modal">
                <form onSubmit={this.handleChangePassword}>
                    <div className="cr-modal__container">
                        {this.renderChangeModalHeader()}
                        {changeModalBody}
                    </div>
                </form>
            </div>
        ) : null;

        return (
            <>
                {this.props.isMobileDevice && (
                    <Subheader
                        title={'تنظیمات امنیتی'}
                        backTitle={'پروفایل'}
                        onGoBack={() => this.props.history.push('/profile')}
                    />
                )}
                <div className="PrivacySettingScreen container-fluid">
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-12 col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        شناسایی دو عاملی (2FA)
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            شناسایی دوعاملی برای حساب شما
                                            غیرفعال است. با فعال‌سازی شناسایی
                                            دوعاملی برای ورود به سامانه، علاوه
                                            بر نام کاربری و گذرواژه، نیاز به
                                            وارد کردن یک کد شش رقمی نیز خواهید
                                            داشت. برای تولید این کد از یک اپ که
                                            روی گوشی شما نصب خواهد شد، استفاده
                                            می‌کنید. فعال‌سازی شناسایی دوعاملی
                                            باعث افزایش امنیت حساب شما می‌شود و
                                            توصیه می‌شود که حتما آن را فعال
                                            کنید.
                                        </p>
                                        {this.renderProfileTwoFactor()}
                                    </div>
                                </div>
                            </div>
                            {!this.props.isMobileDevice && (
                                <div className="col-12 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            تغیر رمز عبور
                                        </div>
                                        <div className="card-body">
                                            <div className="PrivacySettingScreen__password my-3">
                                                <div className="">
                                                    {this.props.intl.formatMessage(
                                                        {
                                                            id:
                                                                'page.body.profile.header.account.content.password',
                                                        },
                                                    )}
                                                </div>
                                                <div>************</div>
                                            </div>
                                            <Button
                                                className="btn btn-block py-2"
                                                onClick={this.showChangeModal}
                                                variant="primary"
                                            >
                                                {this.props.intl.formatMessage({
                                                    id:
                                                        'page.body.profile.header.account.content.password.button.change',
                                                })}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {modal}
                        <Modal
                            className="pg-profile-page__disable-2fa-modal"
                            show={this.state.showModal}
                            header={this.renderModalHeader()}
                            content={this.renderModalBody()}
                            footer={this.renderModalFooter()}
                        />
                    </div>
                </div>
            </>
        );
    }

    private renderModalHeader = () => {
        return (
            <div className="PrivacySettingScreen__modal__header">
                <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication.modalHeader" />
                <div
                    className="cr-email-form__cros-icon"
                    onClick={this.closeModal}
                >
                    <CloseIcon className="close-icon" />
                </div>
            </div>
        );
    };

    private renderModalBody = () => {
        const { code2FA } = this.state;

        return (
            <div>
                <CustomInput
                    type="tel"
                    label="2FA code"
                    placeholder="2FA code"
                    defaultLabel=""
                    handleFocusInput={this.handleClickFieldFocus(
                        'code2FAFocus',
                    )}
                    handleChangeInput={this.handleChange2FACode}
                    inputValue={code2FA}
                    classNameLabel="cr-email-form__label"
                    classNameInput="cr-email-form__input"
                    autoFocus={true}
                />
            </div>
        );
    };

    private handleChange2FACode = (value: string) => {
        this.setState({
            code2FA: value,
        });
    };

    private handleDisable2FA = () => {
        this.props.toggle2fa({
            code: this.state.code2FA,
            enable: false,
        });
        this.closeModal();
        this.handleChange2FACode('');
    };

    private renderModalFooter = () => {
        const { code2FA } = this.state;
        const isValid2FA = code2FA.match('^[0-9]{6}$');

        return (
            <div className="pg-exchange-modal-submit-footer">
                <Button
                    block={true}
                    disabled={!isValid2FA}
                    onClick={this.handleDisable2FA}
                    size="lg"
                    variant="primary"
                >
                    {this.props.intl.formatMessage({
                        id:
                            'page.body.profile.header.account.content.twoFactorAuthentication.disable',
                    })}
                </Button>
            </div>
        );
    };

    private renderChangeModalHeader = () => (
        <div className="cr-modal__container-header">
            <div className="PrivacySettingScreen__modal__header">
                <FormattedMessage id="page.body.profile.header.account.content.password.change" />
                <div
                    className="cr-email-form__cros-icon"
                    onClick={this.handleCancel}
                >
                    <CloseIcon className="close-icon" />
                </div>
            </div>
        </div>
    );

    private handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.changePassword({
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword,
            confirm_password: this.state.confirmationPassword,
        });
    };

    private closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    private showChangeModal = () => {
        this.setState({
            showChangeModal: true,
        });
    };

    private handleOldPassword = (value: string) => {
        this.setState({
            oldPassword: value,
        });
    };

    private handleConfPassword = (value: string) => {
        this.setState({
            confirmationPassword: value,
        });
    };

    private handleNewPassword = (value: string) => {
        this.setState({
            newPassword: value,
        });
    };

    private handleCancel = () => {
        this.setState({
            showChangeModal: false,
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
        });
    };

    private handleClickFieldFocus = (field: string) => () => {
        this.handleFieldFocus(field);
    };

    private handleFieldFocus = (field: string) => {
        // @ts-ignore
        this.setState((prev) => ({
            [field]: !prev[field],
        }));
    };

    private isValidForm() {
        const { confirmationPassword, oldPassword, newPassword } = this.state;
        const isNewPasswordValid = newPassword.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = newPassword === confirmationPassword;

        return oldPassword && isNewPasswordValid && isConfirmPasswordValid;
    }

    private renderProfileTwoFactor = () => {
        return (
            <React.Fragment>
                <div className="pg-profile-page__row position-relative">
                    <ProfileTwoFactorAuth
                        is2faEnabled={this.props.user.otp}
                        navigateTo2fa={this.handleNavigateTo2fa}
                    />
                </div>
            </React.Fragment>
        );
    };

    private handleNavigateTo2fa = (enable2fa: boolean) => {
        if (enable2fa) {
            this.props.history.push('/security/2fa', { enable2fa });
        } else {
            this.setState({
                showModal: !this.state.showModal,
            });
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = (
    state,
) => ({
    user: selectUserInfo(state),
    isMobileDevice: selectMobileDeviceState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (
    dispatch,
) => ({
    pushAlert: (copied) => dispatch(alertPush(copied)),
    changePassword: ({ old_password, new_password, confirm_password }) =>
        dispatch(
            changePasswordFetch({
                old_password,
                new_password,
                confirm_password,
            }),
        ),
    toggle2fa: ({ code, enable }) => dispatch(toggle2faFetch({ code, enable })),
});

export const PrivacySettingScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(PrivacySetting) as any;
