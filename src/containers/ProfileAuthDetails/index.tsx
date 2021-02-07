import { History } from 'history';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Blur } from '../../components/Blur';
import { IntlProps } from '../../index';
import {
    editIdentity,
    Label,
    RootState,
    selectEditIdentitySuccess,
    selectLabelData,
    selectMobileDeviceState,
    selectSendIdentitySuccess,
    selectUserInfo,
    sendIdentity,
    User,
    userFetch,
} from '../../modules';
import {
    changePasswordFetch,
    selectChangePasswordSuccess,
    toggle2faFetch,
} from '../../modules/user/profile';
import { ConfirmModal } from '../ConfirmModal';

interface ReduxProps {
    user: User;
    passwordChangeSuccess?: boolean;
    editSuccess?: string;
    sendSuccess?: string;
    labels: Label[];
    isMobileDevice: boolean;
}

interface RouterProps {
    history: History;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

interface DispatchProps {
    changePassword: typeof changePasswordFetch;
    clearPasswordChangeError: () => void;
    toggle2fa: typeof toggle2faFetch;
    editIdentity: typeof editIdentity;
    sendIdentity: typeof sendIdentity;
    userFetch: typeof userFetch;
}

interface ProfileProps {
    showModal: boolean;
}

interface State {
    warningClose: boolean;
    countryOfBirth: string;
    dateOfBirth: string;
    datePickerValue: any;
    firstName: string;
    lastName: string;
    nid: string;
    residentialAddress: string;
    dateOfBirthFocused: boolean;
    firstNameFocused: boolean;
    lastNameFocused: boolean;
    nidFocused: boolean;
    residentialAddressFocused: boolean;
    isProfileValid: string;
    isEmailValid: string;
    isMobileValid: string;
    isPhoneValid: string;
    isDocumentValid: string;
    mobile: string;
    phone: string;
    email: string;
    modalOpen: boolean;
}

type Props = ReduxProps &
    DispatchProps &
    RouterProps &
    ProfileProps &
    IntlProps &
    OnChangeEvent;

class ProfileAuthDetailsComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            warningClose: false,
            countryOfBirth: '',
            dateOfBirth: '',
            datePickerValue: '',
            firstName: '',
            lastName: '',
            nid: '',
            residentialAddress: '',
            dateOfBirthFocused: false,
            firstNameFocused: false,
            lastNameFocused: false,
            nidFocused: false,
            residentialAddressFocused: false,
            isProfileValid:
                props.user.labels.filter(
                    (e) => e.key === 'profile' && e.value === 'verified',
                ).length > 0
                    ? 'is-valid'
                    : '',
            isEmailValid:
                props.user.labels.filter((e) => e.key === 'email').length > 0
                    ? 'is-valid'
                    : '',
            isMobileValid:
                props.user.labels.filter((e) => e.key === 'phone').length > 0
                    ? 'is-valid'
                    : '',
            isPhoneValid:
                props.user.labels.filter(
                    (e) => e.key === 'profile' && e.value === 'verified',
                ).length > 0
                    ? 'is-valid'
                    : '',
            isDocumentValid:
                props.user.labels.filter((e) => e.key === 'document').length > 0
                    ? props.user.labels.filter((e) => e.key === 'document')[0]
                          .value
                    : '',
            mobile: props.user.phone ? props.user.phone : '',
            phone: props.user.phones.length
                ? props.user.phones[props.user.phones.length - 1].number
                : '',
            email: props.user.email ? props.user.email : '',
            modalOpen: false,
        };
    }

    public render() {
        const { user } = this.props;
        const {
            firstName,
            lastName,
            nid,
            residentialAddress,
            warningClose,
            isMobileValid,
            isProfileValid,
            isEmailValid,
            isPhoneValid,
            isDocumentValid,
            mobile,
            phone,
            email,
        } = this.state;

        return (
            <div className="mt-4">
                {user.level <= 3 && (
                    <div
                        className={`alert alert-warning alert-dismissible fade ${
                            warningClose ? 'd-none' : 'show'
                        }`}
                        role="alert"
                    >
                        <FormattedMessage
                            id={'page.body.profile.content.warning'}
                        />
                        <button
                            className="close"
                            type="button"
                            onClick={this.handleWarningClose}
                        >
                            <span aria-hidden="true">X</span>
                        </button>
                    </div>
                )}
                <div className="card">
                    {user.level < 3 &&
                        !user.labels.filter(
                            (e) =>
                                e.key === 'document' && e.value === 'pending',
                        ).length && (
                            <>
                                <div className="pg-profile-page__submitButton pt-2">
                                    <Button
                                        className="btn btn-block p-2"
                                        onClick={this.handleModalOpen}
                                    >
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.btn.edit'
                                            }
                                        />
                                    </Button>
                                </div>
                                <Blur
                                    text={'اطلاعات حساب کاربری شما ناقص است'}
                                />
                            </>
                        )}
                    <div className="card-header">
                        <div className="row">
                            {!this.props.isMobileDevice && (
                                <div className="col-sm-6">
                                    <strong>
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.userContact'
                                            }
                                        />
                                    </strong>
                                </div>
                            )}
                            <div className="col-sm-6 text-center text-md-right">
                                <strong>
                                    <FormattedMessage
                                        id={
                                            'page.body.profile.content.userInfo'
                                        }
                                    />
                                </strong>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row pb-2">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="company">
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.userContact.mobile'
                                            }
                                        />
                                    </label>
                                    <div className="controls">
                                        <div className="input-group">
                                            <input
                                                className={`form-control ${isMobileValid}`}
                                                id="company"
                                                type="text"
                                                placeholder={mobile}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="street">
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.userContact.email'
                                            }
                                        />
                                    </label>
                                    <div className="controls">
                                        <div className="input-group">
                                            <input
                                                className={`form-control ${isEmailValid}`}
                                                id="street"
                                                type="text"
                                                placeholder={email}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nid">
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.userInfo.nid'
                                            }
                                        />
                                    </label>
                                    <input
                                        className={`form-control ${isProfileValid}`}
                                        id="nid"
                                        type="text"
                                        value={nid}
                                        placeholder={user.nid}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="vat">
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.userContact.phone'
                                            }
                                        />
                                    </label>
                                    <div className="controls">
                                        <div className="input-group">
                                            <input
                                                className={`form-control ${isPhoneValid}`}
                                                id="vat"
                                                type="text"
                                                value={phone}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="doc-status d-flex border border-light rounded p-1 align-items-center justify-content-between my-4 my-md-0">
                                    <span>وضعیت مدارک هویتی</span>
                                    {isDocumentValid === '' ? (
                                        <div className="bg-danger text-white rounded text-center p-2">
                                            آپلود نشده
                                        </div>
                                    ) : isDocumentValid === 'pending' ? (
                                        <div className="bg-warning text-white rounded text-center p-2">
                                            در انتظار تایید
                                        </div>
                                    ) : isDocumentValid === 'rejected' ? (
                                        <div className="bg-danger text-white rounded text-center p-2">
                                            رد شده
                                        </div>
                                    ) : (
                                        <div className="bg-success text-white rounded text-center p-2">
                                            تایید شده
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.userInfo.firstName'
                                            }
                                        />
                                    </label>
                                    <input
                                        className={`form-control ${isProfileValid}`}
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        placeholder={
                                            user.profiles.length
                                                ? user.profiles[
                                                      user.profiles.length - 1
                                                  ].first_name
                                                : ''
                                        }
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.userInfo.lastName'
                                            }
                                        />
                                    </label>
                                    <input
                                        className={`form-control ${isProfileValid}`}
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        placeholder={
                                            user.profiles.length
                                                ? user.profiles[
                                                      user.profiles.length - 1
                                                  ].last_name
                                                : ''
                                        }
                                        disabled
                                    />
                                </div>
                                <fieldset className="form-group">
                                    <label>
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.userInfo.dob'
                                            }
                                        />
                                    </label>
                                    <input
                                        className={`form-control ${isProfileValid}`}
                                        type="text"
                                        placeholder={
                                            user.profiles.length
                                                ? user.profiles[
                                                      user.profiles.length - 1
                                                  ].dob
                                                : ''
                                        }
                                        disabled
                                    />
                                </fieldset>
                                <div className="form-group">
                                    <label htmlFor="street">
                                        <FormattedMessage
                                            id={
                                                'page.body.profile.content.userInfo.address'
                                            }
                                        />
                                    </label>
                                    <textarea
                                        className={`form-control ${isProfileValid}`}
                                        id="street"
                                        rows={4}
                                        value={residentialAddress}
                                        placeholder={
                                            user.profiles.length
                                                ? user.profiles[
                                                      user.profiles.length - 1
                                                  ].address
                                                : ''
                                        }
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.renderConfirmModal()}
                </div>
            </div>
        );
    }

    private renderConfirmModal = () => {
        return (
            <ConfirmModal
                open={this.state.modalOpen}
                header={<h4>تکمیل اطلاعات</h4>}
                onClose={this.handleModalClose}
            />
        );
    };

    private handleModalOpen = () => {
        this.setState({
            modalOpen: true,
        });
    };

    private handleModalClose = () => {
        this.props.userFetch();
        this.setState({
            modalOpen: false,
        });
    };

    private handleWarningClose = () => {
        this.setState({
            warningClose: true,
        });
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    editSuccess: selectEditIdentitySuccess(state),
    sendSuccess: selectSendIdentitySuccess(state),
    labels: selectLabelData(state),
    user: selectUserInfo(state),
    isMobileDevice: selectMobileDeviceState(state),
    passwordChangeSuccess: selectChangePasswordSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
    changePassword: ({ old_password, new_password, confirm_password }) =>
        dispatch(
            changePasswordFetch({
                old_password,
                new_password,
                confirm_password,
            }),
        ),
    toggle2fa: ({ code, enable }) => dispatch(toggle2faFetch({ code, enable })),
    editIdentity: (payload) => dispatch(editIdentity(payload)),
    sendIdentity: (payload) => dispatch(sendIdentity(payload)),
    userFetch: () => dispatch(userFetch()),
});

const ProfileAuthDetailsConnected = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(ProfileAuthDetailsComponent),
);
// tslint:disable-next-line:no-any
const ProfileAuthDetails = withRouter(ProfileAuthDetailsConnected as any);

export { ProfileAuthDetails };
