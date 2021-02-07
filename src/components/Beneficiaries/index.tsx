import classnames from 'classnames';
import * as React from 'react';
import {injectIntl} from 'react-intl';
import {connect, MapDispatchToProps} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
import {compose} from 'redux';
import {ChevronIcon} from '../../assets/images/ChevronIcon';
import {PlusIcon} from '../../assets/images/PlusIcon';
import {TipIcon} from '../../assets/images/TipIcon';
import {TrashBin} from '../../assets/images/TrashBin';
import {IntlProps} from '../../index';
import {
    beneficiariesCreateData,
    beneficiariesDelete, beneficiariesFetch,
    Beneficiary,
    BeneficiaryBank, Card, cardsFetch,
    MemberLevels,
    memberLevelsFetch,
    RootState,
    selectBeneficiaries,
    selectBeneficiariesCreate, selectCards,
    selectMemberLevels, selectMobileDeviceState,
    selectUserInfo,
    User,
} from '../../modules';
import {BeneficiariesActivateModal} from './BeneficiariesActivateModal';
import {BeneficiariesAddModal} from './BeneficiariesAddModal';
import {BeneficiariesFailAddModal} from './BeneficiariesFailAddModal';


interface ReduxProps {
    beneficiaries: Beneficiary[];
    beneficiariesAddData: Beneficiary;
    memberLevels?: MemberLevels;
    userData: User;
    isMobileDevice: boolean;
    cards: Card[];
}

interface DispatchProps {
    deleteAddress: typeof beneficiariesDelete;
    memberLevelsFetch: typeof memberLevelsFetch;
    beneficiariesCreateData: typeof beneficiariesCreateData;
    getCards: typeof cardsFetch;
    fetchBeneficiaries: typeof beneficiariesFetch;
}

interface OwnProps {
    currency: string;
    type: 'fiat' | 'coin';
    onChangeValue: (beneficiary: Beneficiary) => void;
    history: {
        push: (a: String) => void;
    };
}

interface State {
    currentWithdrawalBeneficiary: Beneficiary;
    isOpenAddressModal: boolean;
    isOpenConfirmationModal: boolean;
    isOpenDropdown: boolean;
    isOpenTip: boolean;
    isOpenFailModal: boolean;
    bankAccount: string;
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

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

// tslint:disable jsx-no-multiline-js
class BeneficiariesComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentWithdrawalBeneficiary: defaultBeneficiary,
            isOpenAddressModal: false,
            isOpenConfirmationModal: false,
            isOpenDropdown: false,
            isOpenTip: false,
            isOpenFailModal: false,
            bankAccount: '',
        };
    }

    public componentDidMount() {
        const {currency, beneficiaries, memberLevels, cards, type, fetchBeneficiaries} = this.props;
        if (!beneficiaries.length) {
            fetchBeneficiaries();
        }

        if (currency && beneficiaries.length) {
            this.handleSetCurrentAddressOnUpdate(beneficiaries, currency);
        }

        if (!memberLevels) {
            this.props.memberLevelsFetch();
        }

        if (type === 'fiat' && !cards.length) {
            this.props.getCards();
        }
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Props) {
        const {currency, beneficiaries} = this.props;

        if ((nextProps.currency && nextProps.currency !== currency) ||
            (nextProps.beneficiaries.length && nextProps.beneficiaries !== beneficiaries)) {
            this.handleSetCurrentAddressOnUpdate(nextProps.beneficiaries, nextProps.currency);
        }
    }

    public render() {
        const {
            currency,
            type,
            beneficiaries,
            beneficiariesAddData,
            isMobileDevice,
            cards,
        } = this.props;
        const {
            currentWithdrawalBeneficiary,
            isOpenAddressModal,
            isOpenConfirmationModal,
            isOpenFailModal,
        } = this.state;
        const filtredBeneficiaries = this.handleFilterByState(this.handleFilterByCurrency(beneficiaries, currency), ['active', 'pending']);

        return (
            <div className="pg-beneficiaries">
                <span
                    className="pg-beneficiaries__title">{type === 'coin' ? this.translate('page.body.wallets.beneficiaries.title') : this.translate('page.body.wallets.beneficiaries.fiat.title')}</span>
                {(type === 'fiat' && cards.filter(e => e.verify).length) ? this.renderAddressDropdown(filtredBeneficiaries, currentWithdrawalBeneficiary, type) : filtredBeneficiaries.length ? this.renderAddressDropdown(filtredBeneficiaries, currentWithdrawalBeneficiary, type) : this.renderAddAddress()}
                {isOpenAddressModal && (
                    <BeneficiariesAddModal
                        currency={currency}
                        type={type}
                        handleToggleAddAddressModal={this.handleToggleAddAddressModal}
                        handleToggleConfirmationModal={this.handleToggleConfirmationModal}
                    />
                )}
                {isOpenConfirmationModal && (
                    <BeneficiariesActivateModal
                        beneficiariesAddData={beneficiariesAddData}
                        handleToggleConfirmationModal={this.handleToggleConfirmationModal}
                    />
                )}
                {isOpenFailModal && (
                    <BeneficiariesFailAddModal isMobileDevice={isMobileDevice}
                                               handleToggleFailModal={this.handleToggleFailModal}/>
                )}
            </div>
        );
    }

    private renderAddAddress = () => {
        const {type} = this.props;

        return (
            <div className="pg-beneficiaries__add" onClick={this.handleClickToggleAddAddressModal()}>
                <span className="pg-beneficiaries__add__label">
                    {
                        type === 'fiat'
                            ? this.translate('page.header.navbar.accounting.addCard')
                            : this.translate('page.body.wallets.beneficiaries.addAddress')
                    }
                </span>
                <PlusIcon className="pg-beneficiaries__add__icon"/>
            </div>
        );
    };

    private renderDropdownItem = (item: Beneficiary, index: number, type: 'fiat' | 'coin') => {
        const isPending = item.state && item.state.toLowerCase() === 'pending';
        const itemClassName = classnames('pg-beneficiaries__dropdown__body__item item', {
            'item--pending': isPending,
        });

        if (type === 'fiat') {
            return (
                <div key={index} className={itemClassName}>
                    <div className="item__left" onClick={this.handleClickSelectAddress(item)}>
                        <span
                            className="item__left__title">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.name')}</span>
                        <span className="item__left__address">{item.name}</span>
                    </div>
                    <div className="item__left" onClick={this.handleClickSelectAddress(item)}>
                        <span
                            className="item__left__title">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.fullName')}</span>
                        <span
                            className="item__left__address">{item.data ? (item.data as BeneficiaryBank).full_name : ''}</span>
                    </div>
                    <div className="item__right">
                        {isPending ? (
                            <span
                                className="item__right__pending">{this.translate('page.body.wallets.beneficiaries.dropdown.pending')}</span>
                        ) : null}
                        <span className="item__right__delete" onClick={this.handleClickDeleteAddress(item)}><TrashBin/></span>
                    </div>
                </div>
            );
        }

        return (
            <div key={index} className={itemClassName}>
                <div className="item__left" onClick={this.handleClickSelectAddress(item)}>
                    <span
                        className="item__left__title">{this.translate('page.body.wallets.beneficiaries.dropdown.name')}</span>
                    <span className="item__left__address">{item.name}</span>
                </div>
                <div className="item__right">
                    {isPending ? (
                        <span
                            className="item__right__pending">{this.translate('page.body.wallets.beneficiaries.dropdown.pending')}</span>
                    ) : null}
                    <span className="item__right__delete"
                          onClick={this.handleClickDeleteAddress(item)}><TrashBin/></span>
                </div>
            </div>
        );
    };

    private renderDropdownBody = (beneficiaries: Beneficiary[], type: 'fiat' | 'coin') => {
        const dropdownBodyClassName = classnames('pg-beneficiaries__dropdown__body', {
            'fiat-body': type === 'fiat',
        });

        return (
            <div className={dropdownBodyClassName}>
                {beneficiaries && beneficiaries.map((item, index) => this.renderDropdownItem(item, index, type))}
                <div className="pg-beneficiaries__dropdown__body__add add"
                     onClick={this.handleClickToggleAddAddressModal()}>
                    <span className="add__label">{this.translate('page.body.wallets.beneficiaries.addAddress')}</span>
                    <PlusIcon className="add__icon"/>
                </div>
            </div>
        );
    };

    private renderDropdownTipCryptoNote = (note: string) => {
        return (
            <div className="tip__content__block">
                <span
                    className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.tipDescription')}</span>
                <span className="tip__content__block__value">{note}</span>
            </div>
        );
    };

    private renderDropdownTipCrypto = (currentWithdrawalBeneficiary: Beneficiary) => {
        if (currentWithdrawalBeneficiary) {
            return (
                <div className="pg-beneficiaries__dropdown__tip tip">
                    <div className="tip__content">
                        <div className="tip__content__block">
                            <span
                                className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.tipAddress')}</span>
                            <span
                                className="tip__content__block__value">{currentWithdrawalBeneficiary.data.address}</span>
                        </div>
                        <div className="tip__content__block">
                            <span
                                className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.tipName')}</span>
                            <span className="tip__content__block__value">{currentWithdrawalBeneficiary.name}</span>
                        </div>
                        {currentWithdrawalBeneficiary.description && this.renderDropdownTipCryptoNote(currentWithdrawalBeneficiary.description)}
                    </div>
                </div>
            );
        }

        return;
    };

    private renderDropdownTipFiatDescription = (description: string) => {
        return (
            <div className="tip__content__block">
                <span
                    className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.description')}</span>
                <span className="tip__content__block__value">{description}</span>
            </div>
        );
    };

    private renderDropdownTipFiat = (currentWithdrawalBeneficiary: Beneficiary) => {
        if (currentWithdrawalBeneficiary) {
            return (
                <div className="pg-beneficiaries__dropdown__tip tip fiat-tip">
                    <div className="tip__content">
                        <div className="tip__content__block">
                            <span
                                className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.name')}</span>
                            <span className="tip__content__block__value">{currentWithdrawalBeneficiary.name}</span>
                        </div>
                        {currentWithdrawalBeneficiary.description && this.renderDropdownTipFiatDescription(currentWithdrawalBeneficiary.description)}
                        <div className="tip__content__block">
                            <span
                                className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.account')}</span>
                            <span
                                className="tip__content__block__value">{(currentWithdrawalBeneficiary.data as BeneficiaryBank).account_number}</span>
                        </div>
                        <div className="tip__content__block">
                            <span
                                className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.bankOfBeneficiary')}</span>
                            <span
                                className="tip__content__block__value">{(currentWithdrawalBeneficiary.data as BeneficiaryBank).bank_name}</span>
                        </div>
                    </div>
                </div>
            );
        }

        return;
    };

    private renderAddressDropdown = (beneficiaries: Beneficiary[], currentWithdrawalBeneficiary: Beneficiary, type: 'fiat' | 'coin') => {
        const {isOpenDropdown, isOpenTip} = this.state;
        const isPending = currentWithdrawalBeneficiary.state && currentWithdrawalBeneficiary.state.toLowerCase() === 'pending';

        const dropdownClassName = classnames('pg-beneficiaries__dropdown', {
            'pg-beneficiaries__dropdown--open': isOpenDropdown,
        });

        const customStyle = {
            control: styles => ({
                ...styles,
                height: 'calc(1.5em + 1rem + 2px)',
                backgroundColor: 'var(--input-background-color)',
                borderColor: 'var(--input-border-color)',
            }),
            singleValue: style => ({...style, color: 'var(--input-text-color)'}),
            dropdownIndicator: styles => ({...styles, padding: '0 8px'}),
            valueContainer: styles => ({...styles, height: '29px'}),
            input: styles => ({...styles, padding: '0', margin: '0'}),
            option: styles => ({...styles, color: 'black', padding: '4px 8px'}),
            menu: styles => ({...styles, margin: '4px 0', zIndex: '9999'}),
        };

        if (type === 'fiat') {
            const translate = (e: string) => {
                return this.props.intl.formatMessage({id: e});
            };

            const options = [] as any;
            this.props.cards.filter(item => item.verify).forEach((num, key) => {
                options.push({
                    value: key,
                    // tslint:disable-next-line:prefer-template
                    label: num.acc_num + ' - ' + num.bank_name,
                    bank: num.bank_name,
                    acc_num: num.acc_num,
                });
            });
            if (options.length === 0) {
                options.push({label: translate('page.body.deposit.offline.select.noCard'), isDisabled: true});
            }

            return (
                <div className={dropdownClassName}>
                    <Select
                        styles={customStyle}
                        options={options}
                        placeholder={translate('page.body.deposit.online.select.chooseAccNum')}
                        onChange={this.handleCardChange}
                        className="w-100 selectCard"
                    />
                    {isOpenDropdown && this.renderDropdownBody(beneficiaries, type)}
                    {isOpenTip && this.renderDropdownTipFiat(currentWithdrawalBeneficiary)}
                </div>
            );
        }

        return (
            <div className={dropdownClassName}>
                <div className="pg-beneficiaries__dropdown__select select" onClick={this.handleToggleDropdown}>
                    <div className="select__left">
                        <span
                            className="select__left__title">{this.translate('page.body.wallets.beneficiaries.dropdown.name')}</span>
                        <span className="select__left__address"><span>{currentWithdrawalBeneficiary.name}</span></span>
                    </div>
                    <div className="select__right">
                        {isPending ? (
                            <span
                                className="select__right__pending">{this.translate('page.body.wallets.beneficiaries.dropdown.pending')}</span>
                        ) : null}
                        <span className="select__right__tip" onMouseOver={this.handleToggleTip}
                              onMouseOut={this.handleToggleTip}><TipIcon/></span>
                        <span
                            className="select__right__select">{this.translate('page.body.wallets.beneficiaries.dropdown.select')}</span>
                        <span className="select__right__chevron"><ChevronIcon/></span>
                    </div>
                </div>
                {isOpenDropdown && this.renderDropdownBody(beneficiaries, type)}
                {isOpenTip && this.renderDropdownTipCrypto(currentWithdrawalBeneficiary)}
            </div>
        );
    };

    private handleCardChange = e => {
        const data: Beneficiary = {
            id: e.label,
            currency: 'fiat',
            description: e.bank,
            name: e.acc_num,
            state: 'state',
            data: {
                account_number: e.label,
                account_type: 'card',
                address: 'address',
                bank_address: 'address',
                bank_country: 'iran',
                bank_name: 'bank',
                bank_swift_code: '',
                intermediary_bank_address: '',
                country: '',
                full_name: '',
                intermediary_bank_country: '',
                intermediary_bank_name: '',
                intermediary_bank_swift_code: '',
            },
        };

        this.handleSetCurrentAddress(data);
    };

    private handleClickDeleteAddress = (item: Beneficiary) => () => {
        this.handleDeleteAddress(item);
    };

    private handleClickSelectAddress = (item: Beneficiary) => () => {
        if (item.state && item.state.toLowerCase() === 'pending') {
            this.props.beneficiariesCreateData({id: item.id} as any);
            this.handleToggleConfirmationModal();
        } else {
            this.handleSetCurrentAddress(item);
        }
    };

    private handleClickToggleAddAddressModal = () => () => {
        const {memberLevels, userData, type} = this.props;
        if (type === 'fiat') {
            this.props.history.push('/profile');
        }
        if (memberLevels && (userData.level < memberLevels.withdraw.minimum_level)) {
            this.handleToggleFailModal();
        } else {
            this.handleToggleAddAddressModal();
        }
    };

    private handleDeleteAddress = (item: Beneficiary) => {
        const payload = {
            id: item.id,
        };

        this.props.deleteAddress(payload);
    };

    private handleFilterByCurrency = (beneficiaries: Beneficiary[], currency: string) => {
        if (beneficiaries.length && currency) {
            return beneficiaries.filter(item => item.currency.toLowerCase() === currency.toLowerCase());
        }

        return [];
    };

    private handleFilterByState = (beneficiaries: Beneficiary[], filter: string | string[]) => {
        if (beneficiaries.length) {
            return beneficiaries.filter(item => filter.includes(item.state.toLowerCase()));
        }

        return [];
    };

    private handleSetCurrentAddress = (item: Beneficiary) => {
        if (item.data) {
            this.setState({
                currentWithdrawalBeneficiary: item,
                isOpenDropdown: false,
            });
            this.props.onChangeValue(item);
        }
    };

    private handleSetCurrentAddressOnUpdate = (beneficiaries: Beneficiary[], currency: string) => {
        const filteredByCurrency = this.handleFilterByCurrency(beneficiaries, currency);
        let filteredByState = this.handleFilterByState(filteredByCurrency, 'active');

        if (!filteredByState.length) {
            filteredByState = this.handleFilterByState(filteredByCurrency, 'pending');
        }

        if (filteredByState.length) {
            this.handleSetCurrentAddress(filteredByState[0]);
        }
    };

    private handleToggleAddAddressModal = () => {
        this.setState(prevState => ({
            isOpenAddressModal: !prevState.isOpenAddressModal,
        }));
    };

    private handleToggleConfirmationModal = () => {
        this.setState(prevState => ({
            isOpenConfirmationModal: !prevState.isOpenConfirmationModal,
        }));
    };

    private handleToggleFailModal = () => {
        this.setState(prevState => ({
            isOpenFailModal: !prevState.isOpenFailModal,
        }));
    };

    private handleToggleDropdown = () => {
        this.setState(prevState => ({
            isOpenDropdown: !prevState.isOpenDropdown,
        }));
    };

    private handleToggleTip = () => {
        this.setState(prevState => ({
            isOpenTip: !prevState.isOpenTip,
        }));
    };

    private translate = (id: string) => this.props.intl.formatMessage({id});
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    beneficiaries: selectBeneficiaries(state),
    beneficiariesAddData: selectBeneficiariesCreate(state),
    memberLevels: selectMemberLevels(state),
    userData: selectUserInfo(state),
    isMobileDevice: selectMobileDeviceState(state),
    cards: selectCards(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    deleteAddress: payload => dispatch(beneficiariesDelete(payload)),
    memberLevelsFetch: () => dispatch(memberLevelsFetch()),
    beneficiariesCreateData: payload => dispatch(beneficiariesCreateData(payload)),
    getCards: () => dispatch(cardsFetch()),
    fetchBeneficiaries: () => dispatch(beneficiariesFetch()),
});

// tslint:disable-next-line:no-any
export const Beneficiaries = compose(
    withRouter,
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps),
)(BeneficiariesComponent) as any;
