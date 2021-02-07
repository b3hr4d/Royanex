import * as React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {FormattedMessage, injectIntl} from 'react-intl';
import {connect, MapDispatchToPropsFunction, MapStateToProps, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {EasyQRCode} from '..';
import {IntlProps} from '../../index';
import {alertPush, RootState, walletsAddressFetch} from '../../modules';
import {CryptoIcon} from '../CryptoIcon';
import {Decimal} from '../Decimal';


export interface WalletItemProps {
    /**
     * Wallet address
     */
    address?: string;
    /**
     * Crypto currency code
     */
    currency: string;
    /**
     * Crypto currency name
     */
    name: string;
    /**
     * Amount of currency
     */
    balance?: string;
    /**
     * Locked amount of currency
     */
    locked?: string;
    /**
     * type of a currency (fiat or coin)
     */
    type: 'fiat' | 'coin';
    /**
     * Fee of a currency
     */
    fee: number;
    /**
     * true if a wallet
     */
    active?: boolean;
    fixed: number;
    /**
     * Value for url for wallet icon. If empty string, then there will be icon displayed from @openware/cryptoicon
     */
    iconUrl?: string;
    dashboard?: boolean;
    generateAddressTriggered?: boolean;
    /**
     * Generate wallet address for selected wallet
     */
    handleGenerateAddress?: (currency: string) => void;
    handleAddressTriggerChange?: () => void;
}

interface DispatchProps {
    pushAlert: typeof alertPush;
}

// tslint:disable-next-line:no-empty-interface
interface ReduxProps {
}

type Props = DispatchProps & WalletItemProps & ReduxProps & IntlProps;

/**
 * Component for displaying information about wallet, including address and amount of currency.
 */
const WalletItemComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {
        currency,
        name,
        balance,
        fixed,
        iconUrl,
        dashboard,
        address,
        type,
        generateAddressTriggered,
    } = props;
    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const copyAddress: string = currency === 'XRP' ? address ? address.split('?dt=')[0] : '' : address || '';

    const translate = (e: string) => {
        return props.intl.formatMessage({id: e});
    };

    const findIcon = (code: string): string => {
        try {
            if (code === 'rls') {
                return require(`../../assets/icons/rls.png`);
            } else {
                return require(`../../../node_modules/cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`);
            }
        } catch (err) {
            return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
        }
    };

    const handleOpen = () => {
        dispatch(walletsAddressFetch({currency}));
        setOpen(true);
    };

    const handleClose = () => {
        if (props.handleAddressTriggerChange) {
            props.handleAddressTriggerChange();
        }
        setOpen(false);
    };

    const handleCopyText = () => {
        const input = document.body.appendChild(document.createElement('input')) as HTMLInputElement;
        input.value = copyAddress;
        input.focus();
        input.select();
        document.execCommand('copy');
        input.remove();

        props.pushAlert({
            message: [translate('page.body.refferal.cards.referral.invitecode.copied')],
            type: 'success',
        });
    };

    const renderCoinDepositModal = () => {

        return (
            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        واریز
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body text-center-card">
                        {
                            (address !== null || generateAddressTriggered)
                                ?
                                (generateAddressTriggered)
                                    ?
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <p>آدرسی وجود ندارد. لطفا برای تولید آدرس روی دکمه زیر کلیک کنید</p>
                                        <button className="btn btn-outline-secondary w-75"
                                                disabled={true}>
                                            <FormattedMessage
                                                id="page.body.wallets.tabs.deposit.ccy.button.generate.message"/>
                                        </button>
                                    </div>
                                    :
                                    <>
                                        <p>آدرس این کیف پول شما در کادر زیر قابل مشاهده است. برای واریز ارزهای دیجیتال
                                            به
                                            این کیف،
                                            می‌توانید از این آدرس استفاده کنید.</p>
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                                <EasyQRCode data={address} size={160}
                                                            logo={findIcon(currency.toUpperCase())}/>
                                            </div>
                                        </div>
                                        <div className="alert alert-success text-center cr-wallet-item__copyaddress second-font"
                                             role="alert" onClick={handleCopyText}>
                                            {address}
                                        </div>
                                    </>
                                :
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <p>آدرسی وجود ندارد. لطفا برای تولید آدرس روی دکمه زیر کلیک کنید</p>
                                    <button className="btn btn-outline-secondary w-75"
                                            onClick={handleGenerateAddressProp}>
                                        <FormattedMessage id="page.body.wallets.tabs.deposit.ccy.button.generate"/>
                                    </button>
                                </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-light" onClick={handleClose}>
                        <FormattedMessage id="page.body.wallets.tabs.withdraw.modal.button.cancel"/>
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const handleFiatDepositLink = () => {
        history.push('/deposit/riyal');
    };

    // tslint:disable-next-line:no-shadowed-variable
    const handleWithdrawLink = () => {
        history.push(`/withdraw/${currency.toLowerCase()}`);
    };

    const handleMarketLink = () => {
        history.push(`/trading/${currency.toLowerCase()}rls`);
    };

    // tslint:disable-next-line:no-shadowed-variable
    const handleDetailsLink = () => {
        history.push(`/wallet/details/${currency.toLowerCase()}`);
    };

    const handleGenerateAddressProp = () => {
        if (props.handleGenerateAddress) {
            props.handleGenerateAddress(currency.toLowerCase());
        }
    };

    if (dashboard) {
        return (
            <tr>
                <td>
                    <div className="cr-wallet-item__tableRow">
                        <div className="col-sm-8">
                            {iconUrl ? (<img alt="" className="cr-wallet-item__image-icon" src={iconUrl}/>) : (
                                <CryptoIcon className="cr-wallet-item__icon" code={currency.toUpperCase()}/>)}
                            <span className="text-right">{name}</span>
                        </div>
                    </div>
                </td>
                <td className="text-left">
                    {
                        currency === 'RLS'
                            ?
                            <>
                                {
                                    (balance && Number(balance) !== 0)
                                        ? <Decimal fixed={fixed}>{balance ? balance.toString() : '0'}</Decimal>
                                        : '0'
                                }
                                <span className="mr-2">تومان</span>
                            </>
                            :
                            <>
                                <span className="mr-2">{currency}</span>
                                {
                                    (balance && Number(balance) !== 0)
                                        ? <Decimal fixed={fixed}>{balance ? balance.toString() : '0'}</Decimal>
                                        : '0'
                                }
                            </>
                    }
                </td>
            </tr>
        );
    } else {
        return (
            <>
                <tr>
                    <td>
                        <div className="col-md-10 col-12 m-auto d-flex justify-content-start align-items-center">
                            {iconUrl ? (<img alt="" className="cr-wallet-item__image-icon" src={iconUrl}/>) : (
                                <CryptoIcon className="cr-wallet-item__icon" code={currency.toUpperCase()}/>)}
                            <span className="text-right">{name}</span>
                        </div>
                    </td>
                    <td className="text-left">
                        {
                            currency === 'RLS'
                                ?
                                <>
                                    {
                                        (balance && Number(balance) !== 0)
                                            ? <Decimal fixed={fixed}>{balance ? balance.toString() : '0'}</Decimal>
                                            : '0'
                                    }
                                    <span className="mr-2">تومان</span>
                                </>
                                :
                                <>
                                    <span className="mr-2">{currency}</span>
                                    {
                                        (balance && Number(balance) !== 0)
                                            ? <Decimal fixed={fixed}>{balance ? balance.toString() : '0'}</Decimal>
                                            : '0'
                                    }
                                </>
                        }
                    </td>
                    <td className="d-flex justify-content-center">
                        <button className="btn btn-danger mx-2"
                                onClick={handleWithdrawLink}>برداشت
                        </button>
                        <button className="btn btn-success mx-2"
                                onClick={type === 'coin' ? handleOpen : handleFiatDepositLink}>واریز
                        </button>
                        <button className="btn btn-primary mx-2"
                                onClick={handleDetailsLink}>جزئیات
                        </button>
                        {currency !== 'RLS' &&
                        <button className="btn btn-outline-warning mx-2"
                                onClick={handleMarketLink}>ورود به بازار
                        </button>
                        }

                    </td>
                </tr>
                {type === 'coin' && renderCoinDepositModal()}
            </>
        );
    }

};

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    pushAlert: copied => dispatch(alertPush(copied)),
});

export const WalletItem = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(WalletItemComponent) as any;