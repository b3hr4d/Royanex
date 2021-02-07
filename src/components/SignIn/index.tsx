import cr from 'classnames';
import * as React from 'react';
import {Button} from 'react-bootstrap';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router';
import {CustomInput} from '../';
import {EMAIL_REGEX} from '../../helpers';

export interface SignInProps {
    labelSignIn?: string;
    labelSignUp?: string;
    emailLabel?: string;
    passwordLabel?: string;
    receiveConfirmationLabel?: string;
    forgotPasswordLabel?: string;
    isLoading?: boolean;
    title?: string;
    onForgotPassword: (email?: string) => void;
    onConfirmationResend?: (email?: string) => void;
    onSignUp: () => void;
    onSignIn: () => void;
    className?: string;
    image?: string;
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    emailFocused: boolean;
    emailPlaceholder: string;
    passwordFocused: boolean;
    passwordPlaceholder: string;
    isFormValid: () => void;
    refreshError: () => void;
    handleChangeFocusField: (value: string) => void;
    changePassword: (value: string) => void;
    changeEmail: (value: string) => void;
}

const SignInComponent = React.memo((props: SignInProps) => {
    // const isMobileDevice = useSelector(selectMobileDeviceState);
    const history = useHistory();
    const intl = useIntl();
    const isValidForm = () => {
        const isEmailValid = props.email.match(EMAIL_REGEX);

        return props.email && isEmailValid && props.password;
    };

    const handleChangeEmail = (value: string) => {
        props.changeEmail(value);
    };

    const handleChangePassword = (value: string) => {
        props.changePassword(value);
    };

    const handleFieldFocus = (field: string) => {
        props.handleChangeFocusField(field);
    };

    const handleSubmitForm = () => {
        props.refreshError();
        props.onSignIn();
    };

    const handleValidateForm = () => {
        props.isFormValid();
    };

    const handleClick = (label?: string, e?: React.FormEvent<HTMLInputElement>) => {
        if (e) {
            e.preventDefault();
        }
        if (!isValidForm()) {
            handleValidateForm();
        } else {
            handleSubmitForm();
        }
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            handleClick();
        }
    };

    const renderForgotButton = (
        <div className="cr-sign-in-form__bottom-section">
            <div
                className="cr-sign-in-form__bottom-section-password"
                onClick={() => props.onForgotPassword(email)}
            >
                {props.forgotPasswordLabel || 'Forgot your password?'}
            </div>
        </div>
    );

    const renderRegister = (
        <div className="pg-sign-in-screen__register"  onClick={() => history.push('/signup')}>
            <span>
                {intl.formatMessage({id: 'page.header.signIn.noAccountYet'})}
                <strong
                    className="pg-sign-in-screen__register-button mr-2">
                    {intl.formatMessage({id: 'page.body.landing.header.button3'})}
                </strong>
            </span>
        </div>
    );

    const {
        email,
        emailError,
        emailPlaceholder,
        password,
        passwordError,
        passwordPlaceholder,
        isLoading,
        image,
        labelSignIn,
        emailLabel,
        passwordLabel,
        emailFocused,
        passwordFocused,
    } = props;
    const emailGroupClass = cr('cr-sign-in-form__group', {
        'cr-sign-in-form__group--focused': emailFocused,
    });
    const passwordGroupClass = cr('cr-sign-in-form__group', {
        'cr-sign-in-form__group--focused': passwordFocused,
    });
    const logo = image ? (
        <h1 className="cr-sign-in-form__title">
            <img className="cr-sign-in-form__image" src={image} alt="logo"/>
        </h1>
    ) : null;

    return (
        <form>
            <div className="cr-sign-in-form" onKeyPress={handleEnterPress}>
                {logo}
                <div className={emailGroupClass}>
                    <CustomInput
                        type="email"
                        label={emailLabel || 'Email'}
                        placeholder={emailPlaceholder}
                        defaultLabel="Email"
                        handleChangeInput={handleChangeEmail}
                        inputValue={email}
                        handleFocusInput={() => handleFieldFocus('email')}
                        classNameLabel="cr-sign-in-form__label"
                        autoFocus={true}
                    />
                    {emailError && <div className={'cr-sign-in-form__error'}>{emailError}</div>}
                </div>
                <div className={passwordGroupClass}>
                    <CustomInput
                        type="password"
                        label={passwordLabel || 'Password'}
                        placeholder={passwordPlaceholder}
                        defaultLabel="Password"
                        handleChangeInput={handleChangePassword}
                        inputValue={password}
                        handleFocusInput={() => handleFieldFocus('password')}
                        classNameLabel="cr-sign-in-form__label"
                        autoFocus={false}
                    />
                    {passwordError && <div className={'cr-sign-in-form__error'}>{passwordError}</div>}
                    {renderForgotButton}
                </div>
                <div className="cr-sign-in-form__button-wrapper">
                    <Button
                        block={true}
                        type="button"
                        disabled={isLoading || !email.match(EMAIL_REGEX) || !password}
                        onClick={handleClick as any}
                        size="lg"
                        variant="primary"
                        className="mb-4"
                    >
                        {isLoading ? 'Loading...' : (labelSignIn ? labelSignIn : 'Sign in')}
                    </Button>
                </div>
                {renderRegister}
            </div>
        </form>
    );
});

export {
    SignInComponent,
};
