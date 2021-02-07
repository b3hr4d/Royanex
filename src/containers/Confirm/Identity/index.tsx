import cr from 'classnames';
import * as countries from 'i18n-iso-countries';
import * as React from 'react';
import {Button} from 'react-bootstrap';
import InputMask from 'react-input-mask';
import {injectIntl} from 'react-intl';
import {connect, MapDispatchToPropsFunction} from 'react-redux';
import {RouterProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';
import {compose} from 'redux';
import {languages} from '../../../api';
import {CustomInput} from '../../../components';
import {isDateInFuture} from '../../../helpers';
import {cities, states} from '../../../helpers/iranStatesCities';
import {IntlProps} from '../../../index';
import {
    editIdentity,
    Label,
    labelFetch,
    RootState,
    selectCurrentLanguage,
    selectEditIdentityLoading,
    selectEditIdentitySuccess,
    selectLabelData,
    selectSendIdentityLoading,
    selectSendIdentitySuccess,
    selectUserInfo,
    sendIdentity,
    User,
} from '../../../modules';
import {IdentityData} from '../../../modules/user/kyc/identity/types';


interface ReduxProps {
    editSuccess?: string;
    sendSuccess?: string;
    lang: string;
    labels: Label[];
    user: User;
    sendIdentityLoading?: boolean;
    editIdentityLoading?: boolean;
}

interface DispatchProps {
    editIdentity: typeof editIdentity;
    sendIdentity: typeof sendIdentity;
    labelFetch: typeof labelFetch;
}

interface IdentityState {
    state: string;
    stateCode: number;
    city: string;
    countryOfBirth: string;
    dateOfBirth: string;
    staticPhone: string;
    firstName: string;
    lastName: string;
    postcode: string;
    residentialAddress: string;
    cityFocused: boolean;
    dateOfBirthFocused: boolean;
    firstNameFocused: boolean;
    lastNameFocused: boolean;
    postcodeFocused: boolean;
    residentialAddressFocused: boolean;
    staticPhoneFocused: boolean;
    datePickerValue: any;
    iranCities: string[];
    iranStates: string[];
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;


class IdentityComponent extends React.Component<Props, IdentityState> {
    public state = {
        state: '',
        stateCode: 0,
        city: '',
        countryOfBirth: '',
        dateOfBirth: '',
        firstName: '',
        lastName: '',
        postcode: '',
        staticPhone: '',
        residentialAddress: '',
        cityFocused: false,
        dateOfBirthFocused: false,
        firstNameFocused: false,
        lastNameFocused: false,
        postcodeFocused: false,
        residentialAddressFocused: false,
        staticPhoneFocused: false,
        datePickerValue: '',
        iranCities: [],
        iranStates: [],
    };

    public translate = (e: string) => {
        return this.props.intl.formatMessage({id: e});
    };

    public componentDidMount() {
        const statesOptions = [] as any;
        states.forEach(e => {
            statesOptions.push({
                label: e.name,
                value: e.id,
                code: e.code,
            });
        });
        this.setState({
            iranStates: statesOptions,
        });
    }

    public componentDidUpdate(prev: Props) {
        const {
            editSuccess,
            sendSuccess,
        } = this.props;

        if ((!prev.editSuccess && editSuccess) || (!prev.sendSuccess && sendSuccess)) {
            this.props.labelFetch();
        }
    }

    public handleStateChange = option => {
        const citiesOptions = [] as any;
        cities.filter(e => (e.ostan === option.value)).forEach(e => {
            citiesOptions.push({
                label: e.name,
                value: e.id,
            });
        });
        this.setState({
            iranCities: citiesOptions,
            state: option.label,
            stateCode: option.code,
        });
    };

    public handleCityChange = option => {
        this.setState({
            city: option.label,
        });
    };

    public render() {
        const {
            dateOfBirth,
            firstName,
            lastName,
            residentialAddress,
            firstNameFocused,
            lastNameFocused,
            residentialAddressFocused,
            datePickerValue,
            staticPhone,
            staticPhoneFocused,
            stateCode,
        } = this.state;


        const {
            sendIdentityLoading,
            editIdentityLoading,
        } = this.props;

        const staticPhoneClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': staticPhoneFocused,
            'pg-confirm__content-identity__forms__row__content--wrong': staticPhone && !this.handleValidateInput('staticPhone', staticPhone),
        });

        const firstNameGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': firstNameFocused,
            'pg-confirm__content-identity__forms__row__content--wrong': firstName && !this.handleValidateInput('firstName', firstName),
        });

        const lastNameGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': lastNameFocused,
            'pg-confirm__content-identity__forms__row__content--wrong': lastName && !this.handleValidateInput('lastName', lastName),
        });

        const dateOfBirthGroupClass = cr('pg-confirm__content-identity__forms__row__content');

        const residentialAddressGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': residentialAddressFocused,
            'pg-confirm__content-identity__forms__row__content--wrong': residentialAddress && !this.handleValidateInput('residentialAddress', residentialAddress),
        });
        /* tslint:disable */
        languages.map((l: string) => countries.registerLocale(require(`i18n-iso-countries/langs/${l}.json`)));

        return (
            <div>
                <div className="pg-confirm__content-identity__forms">
                    <div className="pg-confirm__content-identity__forms__row mt-4">
                        <fieldset className={firstNameGroupClass}>
                            <CustomInput
                                type="string"
                                inputValue={firstName}
                                placeholder={this.translate('page.body.kyc.identity.firstName')}
                                handleChangeInput={e => this.handleChange(e, 'firstName')}
                                autoFocus={true}
                                label={this.translate('page.body.kyc.identity.firstName')}
                                defaultLabel={''}
                                handleFocusInput={this.handleFieldFocus('firstName')}
                            />
                        </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity__forms__row mt-4">
                        <fieldset className={lastNameGroupClass}>
                            <CustomInput
                                type="string"
                                inputValue={lastName}
                                handleChangeInput={e => this.handleChange(e, 'lastName')}
                                placeholder={this.translate('page.body.kyc.identity.lastName')}
                                label={this.translate('page.body.kyc.identity.lastName')}
                                defaultLabel={''}
                                handleFocusInput={this.handleFieldFocus('lastName')}
                            />
                        </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity__forms__row mt-4">
                        <fieldset className={dateOfBirthGroupClass}>
                            <div className="custom-input">
                                {dateOfBirth ?
                                    <label style={{zIndex: 9999999}}
                                           className="mb-4">{this.translate('page.body.kyc.identity.dateOfBirth')}</label> : null}
                                <div className="input-group input-group-lg">
                                    <InputMask
                                        mask="9999/99/99"
                                        type="text"
                                        name="dob"
                                        className="form-control ltr form-control-lg py-4"
                                        value={datePickerValue}
                                        placeholder={this.translate('page.body.kyc.identity.dateOfBirth')}
                                        onChange={this.handleChangeDate}
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity__forms__row mt-4 rtl">
                        <Select
                            options={this.state.iranStates}
                            placeholder={'انتخاب استان'}
                            className='w-100'
                            onChange={this.handleStateChange}
                            classNamePrefix="stateSelect"
                        />
                    </div>
                    <div className="pg-confirm__content-identity__forms__row mt-4 rtl">
                        <Select
                            options={this.state.iranCities}
                            placeholder={'انتخاب شهر'}
                            className='w-100'
                            onChange={this.handleCityChange}
                            classNamePrefix="citySelect"
                        />
                    </div>

                    <div className="pg-confirm__content-identity__forms__row mt-4">
                        <fieldset className={residentialAddressGroupClass}>
                            <CustomInput
                                type="string"
                                inputValue={residentialAddress}
                                placeholder={this.translate('page.body.kyc.identity.residentialAddress')}
                                label={this.translate('page.body.kyc.identity.residentialAddress')}
                                defaultLabel={''}
                                handleChangeInput={e => this.handleChange(e, 'residentialAddress')}
                                handleFocusInput={this.handleFieldFocus('residentialAddress')}
                            />
                        </fieldset>
                    </div>
                </div>
                <div className="pg-confirm__content-identity__forms__row mt-4 rtl">
                    <fieldset className={staticPhoneClass}>
                        <div className="custom-input">
                            {staticPhone ?
                                <label className="mb-4">تلفن ثابت</label> : null}
                            <div className="input-group input-group-lg">
                                <InputMask
                                    mask={`${stateCode ? stateCode : ''} 99999999`}
                                    name="staticPhone"
                                    className="form-control ltr form-control-lg py-4"
                                    value={staticPhone}
                                    placeholder="تلفن ثابت"
                                    onChange={this.handleStaticPhoneChange}
                                />
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="pg-confirm__content-deep">
                    <Button
                        onClick={this.sendData}
                        disabled={this.handleCheckButtonDisabled()}
                        size="lg"
                        variant="primary"
                        type="button"
                        block={true}
                    >
                        {
                            (sendIdentityLoading || editIdentityLoading)
                                ? <ClipLoader
                                    size={20}
                                    color={'#ffffff'}
                                    loading={sendIdentityLoading || editIdentityLoading}
                                /> : this.translate('page.body.kyc.next')
                        }
                    </Button>
                </div>
            </div>
        );
    }

    private scrollToElement = (displayedElem: number) => {
        const element: HTMLElement = document.getElementsByClassName('pg-confirm__content-identity__forms__row')[displayedElem] as HTMLElement;
        element && element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
    };

    private handleFieldFocus = (field: string) => {
        return () => {
            switch (field) {
                case 'city':
                    this.setState({
                        cityFocused: !this.state.cityFocused,
                    });
                    this.scrollToElement(6);
                    break;
                case 'firstName':
                    this.setState({
                        firstNameFocused: !this.state.firstNameFocused,
                    });
                    this.scrollToElement(0);
                    break;
                case 'lastName':
                    this.setState({
                        lastNameFocused: !this.state.lastNameFocused,
                    });
                    this.scrollToElement(1);
                    break;
                case 'staticPhone':
                    this.setState({
                        staticPhoneFocused: !this.state.staticPhoneFocused,
                    });
                    break;
                case 'postcode':
                    this.setState({
                        postcodeFocused: !this.state.postcodeFocused,
                    });
                    this.scrollToElement(7);
                    break;
                case 'residentialAddress':
                    this.setState({
                        residentialAddressFocused: !this.state.residentialAddressFocused,
                    });
                    this.scrollToElement(4);
                    break;
                default:
                    break;
            }
        };
    };

    private handleChange = (value: string, key: string) => {
        // @ts-ignore
        this.setState({
            [key]: value,
        });
    };

    private handleChangeDate = (e: any) => {
        this.setState({
            datePickerValue: e.target.value.replace(/\s/g, ''),
            dateOfBirth: e.target.value.replace(/\s/g, ''),
        });
    };

    private handleStaticPhoneChange = (e: any) => {
        this.setState({
            staticPhone: e.target.value.replace(/\s/g, ''),
        });
    };

    private convertNumbers2English = (string) => {
        return string.replace(/[\u0660-\u0669]/g, function (c) {
            return c.charCodeAt(0) - 0x0660;
        }).replace(/[\u06f0-\u06f9]/g, function (c) {
            return c.charCodeAt(0) - 0x06f0;
        });
    };

    private handleValidateInput = (field: string, value: string): boolean => {
        switch (field) {
            case 'firstName':
                const firstNameRegex = new RegExp(`^[\u0600-\u06FF/\\s]{1,100}$`);
                return !!value.match(firstNameRegex);
            case 'lastName':
                const lastNameRegex = new RegExp(`^[\u0600-\u06FF/\\s]{1,100}$`);
                return !!value.match(lastNameRegex);
            case 'residentialAddress':
                // const residentialAddressRegex = new RegExp(`^[\u0600-\u06FF/.|\\s-]{1,100}$`);
                // return !!value.match(residentialAddressRegex);
                return value !== '';
            case 'staticPhone':
                const staticPhoneRegex = new RegExp(`^[0-9]{7,20}$`);
                return !!this.convertNumbers2English(value).match(staticPhoneRegex);
            case 'dateOfBirth':
                return value !== '';
            case 'state':
                return value !== '';
            case 'city':
                return value !== '';
            default:
                return true;
        }

    };

    private handleCheckButtonDisabled = () => {
        const {
            dateOfBirth,
            firstName,
            lastName,
            residentialAddress,
            staticPhone,
            city,
            state,
        } = this.state;

        const firstNameValid = this.handleValidateInput('firstName', firstName);
        const lastNameValid = this.handleValidateInput('lastName', lastName);
        const residentialAddressValid = this.handleValidateInput('residentialAddress', residentialAddress);
        const dateOfBirthValid = this.handleValidateInput('dateOfBirth', dateOfBirth);
        const staticPhoneValid = this.handleValidateInput('staticPhone', staticPhone);
        const cityValid = this.handleValidateInput('city', city);
        const stateValid = this.handleValidateInput('state', state);

        return (
            !firstNameValid
            || !lastNameValid
            || !residentialAddressValid
            || !dateOfBirthValid
            || !staticPhoneValid
            || !cityValid
            || !stateValid
        );
    };

    private sendData = () => {
        const {labels, user} = this.props;
        const dob = !isDateInFuture(this.state.dateOfBirth) ? this.state.dateOfBirth : '';
        const profileInfo: IdentityData = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            dob,
            address: this.state.residentialAddress,
            metadata: JSON.stringify({
                staticPhone: this.state.staticPhone,
                state: this.state.state,
                city: this.state.city,
            }),
            postcode: this.state.postcode,
            country: this.state.countryOfBirth,
            confirm: true,
        };
        const isIdentity = labels.length && labels.find(w => w.key === 'profile' && (w.value === 'verified' || w.value === 'submitted') && w.scope === 'private');
        const verifiedProfiles = user.profiles.length ? user.profiles.filter(i => i.state === 'verified') : [];
        const lastVerifiedProfile = verifiedProfiles.length && verifiedProfiles[verifiedProfiles.length - 1];

        if (!isIdentity && lastVerifiedProfile && lastVerifiedProfile.address) {
            this.props.editIdentity(profileInfo);
        } else {
            this.props.sendIdentity(profileInfo);
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    editSuccess: selectEditIdentitySuccess(state),
    sendSuccess: selectSendIdentitySuccess(state),
    lang: selectCurrentLanguage(state),
    labels: selectLabelData(state),
    user: selectUserInfo(state),
    sendIdentityLoading: selectSendIdentityLoading(state),
    editIdentityLoading: selectEditIdentityLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        editIdentity: payload => dispatch(editIdentity(payload)),
        sendIdentity: payload => dispatch(sendIdentity(payload)),
        labelFetch: () => dispatch(labelFetch()),
    });

export const Identity = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(IdentityComponent) as any; // tslint:disable-line
