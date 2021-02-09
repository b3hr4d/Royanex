import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
    RootState,
    selectWalletAddress,
    selectWallets,
    walletsAddressReFetch,
} from '../../modules';
import { alertPush } from '../../modules/public/alert';
import { CryptoIcon } from '../CryptoIcon';
import { Decimal } from '../Decimal';
import { EasyQRCode } from '../EasyQRCode';
import { WalletItemProps } from '../WalletItem';

export interface CurrencyInfoProps {
    wallet: WalletItemProps;
    address: string;
}

interface CurrencyIconProps {
    icon?: string | null;
    currency: string;
}

interface DispatchProps {
    pushAlert: typeof alertPush;
    fetchAddress: typeof walletsAddressReFetch;
}

type Props = CurrencyInfoProps & DispatchProps;

const CurrencyIcon: React.FunctionComponent<CurrencyIconProps> = (props) => {
    return props.icon ? (
        <img
            alt=""
            className="cr-wallet-item__single__image-icon"
            src={props.icon}
        />
    ) : (
        <CryptoIcon code={props.currency} />
    );
};

const findIcon = (code: string): string => {
    try {
        return require(`../../../node_modules/cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`);
    } catch (err) {
        return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
    }
};

const CurrencyInfoComponent: React.FunctionComponent<Props> = (props) => {
    const balance =
        props.wallet && props.wallet.balance
            ? props.wallet.balance.toString()
            : '0';
    const lockedAmount =
        props.wallet && props.wallet.locked
            ? props.wallet.locked.toString()
            : '0';
    const currency = (props.wallet || { currency: '' }).currency.toUpperCase();
    const selectedFixed = (props.wallet || { fixed: 0 }).fixed;
    const stringLocked = lockedAmount ? lockedAmount.toString() : undefined;
    const iconUrl = props.wallet ? props.wallet.iconUrl : null;

    // tslint:disable-next-line:prefer-template
    const copyAddress: string = props.address || '';

    const handleCopyText = () => {
        const input = document.body.appendChild(
            document.createElement('input'),
        ) as HTMLInputElement;
        input.value = copyAddress;
        input.select();
        document.execCommand('copy');
        input.remove();

        props.pushAlert({
            message: ['page.body.wallets.tabs.deposit.ccy.success'],
            type: 'success',
        });
    };

    return (
        <>
            <div className="cr-wallet-item__single">
                <CurrencyIcon icon={iconUrl} currency={currency} />
                <div className="cr-wallet-item__single-balance">
                    <div>
                        <span className="cr-wallet-item__balance">
                            <FormattedMessage id="page.body.wallets.balance" />
                            &nbsp;{currency}
                        </span>
                        &nbsp;
                        <span className="cr-wallet-item__balance-amount">
                            <Decimal fixed={selectedFixed}>{balance}</Decimal>
                        </span>
                    </div>
                    <div>
                        <div className="cr-wallet-item__amount-locked">
                            <FormattedMessage id="page.body.wallets.locked" />
                        </div>
                        <span className="cr-wallet-item__balance-locked">
                            <Decimal fixed={selectedFixed}>
                                {stringLocked}
                            </Decimal>
                        </span>
                    </div>
                    {currency === 'RLS' && (
                        <Link
                            to={`/deposit/riyal`}
                            className="btn btn-success mt-4"
                        >
                            واریز
                        </Link>
                    )}
                    <Link
                        to={`/withdraw/${currency.toLowerCase()}`}
                        className="btn btn-danger mt-4"
                    >
                        برداشت
                    </Link>
                </div>
            </div>
            {props.wallet &&
                props.wallet.type === 'coin' &&
                props.address &&
                true && (
                    <div className="text-center">
                        <EasyQRCode
                            data={props.address}
                            size={160}
                            logo={findIcon(currency.toUpperCase())}
                        />
                        <div
                            className="alert alert-success text-center cr-wallet-item__copyaddress second-font"
                            role="alert"
                            onClick={handleCopyText}
                        >
                            {props.address}
                        </div>
                    </div>
                )}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    address: selectWalletAddress(state),
    wallets: selectWallets(state),
});

const mapDispatchToProps = (dispatch) => ({
    pushAlert: (copied) => dispatch(alertPush(copied)),
    fetchAddress: (address) => dispatch(walletsAddressReFetch(address)),
});

export const CurrencyInfo = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(CurrencyInfoComponent) as any; // tslint:disable-line
