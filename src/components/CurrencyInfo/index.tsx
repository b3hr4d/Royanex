import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouterProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../..';
import {
    RootState,
    selectWalletAddress,
    selectWalletsAddressError,
    selectWalletsAddressLoading,
    walletsAddressReFetch,
} from '../../modules';
import { alertPush } from '../../modules/public/alert';
import { CommonError } from '../../modules/types';
import { CryptoIcon } from '../CryptoIcon';
import { Decimal } from '../Decimal';
import { EasyQRCode } from '../EasyQRCode';
import { WalletItemProps } from '../WalletItem';

export interface CurrencyInfoProps {
    wallet: WalletItemProps;
    address: string;
    currency: string;
    loading: boolean;
    error: CommonError | undefined;
}

interface CurrencyIconProps {
    icon?: string | null;
    currency: string;
}

interface DispatchProps {
    pushAlert: typeof alertPush;
    fetchAddress: typeof walletsAddressReFetch;
}

type Props = IntlProps & CurrencyInfoProps & DispatchProps & RouterProps;

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
    const currency = props.currency;
    const selectedFixed = (props.wallet || { fixed: 0 }).fixed;
    const stringLocked = lockedAmount ? lockedAmount.toString() : undefined;
    const iconUrl = props.wallet ? props.wallet.iconUrl : null;

    const address: string = props.address || '';

    const handleCopyText = (str: string) => {
        const input = document.body.appendChild(
            document.createElement('input'),
        ) as HTMLInputElement;
        input.value = str;
        input.focus();
        input.select();
        document.execCommand('copy');
        input.remove();

        props.pushAlert({
            message: ['page.body.refferal.cards.referral.invitecode.copied'],
            type: 'success',
        });
    };
    const translate = (id: string) => {
        return id ? props.intl.formatMessage({ id }) : '';
    };

    const tagFinder = (tag?: string) => {
        let tags: Array<string | undefined> = [undefined];

        if (tag) {
            tags = [tag];
            if (tag.includes('?')) {
                const tagArray = tag.split('?');
                tags = tagArray;
                if (tagArray.length > 1) {
                    const secoundTag = tagArray[1].split('=')[1];
                    if (secoundTag) {
                        tags[1] = secoundTag;
                    }
                }
            }
        }

        return tags;
    };
    const handleGenerateAddressProp = (curr: string) => {
        props.fetchAddress({ currency: curr });
    };

    const renderBarcode = (item: string) => {
        const tags = tagFinder(address);

        return (
            <div className="col-sm-6 d-flex flex-column">
                {tags.map((tag, index) =>
                    props.error ? (
                        <div key={index} className="paymentscreen__body">
                            <div
                                className="alert alert-danger text-center second-font"
                                role="alert"
                                key={index}
                            >
                                {translate(props.error.message[0])}
                            </div>
                        </div>
                    ) : props.loading ? (
                        <div key={index} className="paymentscreen__body">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <h5>
                                {translate(
                                    'page.body.history.withdraw.content.status.processing',
                                )}
                                ...
                            </h5>
                        </div>
                    ) : tag ? (
                        index === 0 ? (
                            <div key={tag} className="col-sm-12 text-center">
                                <p>
                                    آدرس این کیف پول شما در کادر زیر قابل مشاهده
                                    است. برای واریز ارزهای دیجیتال به این کیف،
                                    می‌توانید از این آدرس استفاده کنید.
                                </p>
                                <EasyQRCode
                                    data={tag}
                                    size={160}
                                    logo={findIcon(item.toUpperCase())}
                                />
                                <div
                                    className="alert alert-success text-center cr-wallet-item__copyaddress second-font"
                                    role="alert"
                                    onClick={() => handleCopyText(tag)}
                                >
                                    {tag}
                                </div>
                            </div>
                        ) : (
                            <div key={tag} className="col-sm-12 text-center">
                                <p>
                                    حتماً دقت نمایید که برای واریز به این آدرس،
                                    از مقدار «تگ» زیر استفاده کنید. در غیر این
                                    صورت مبلغ برای حساب شما محسوب نمی‌شود
                                </p>
                                <div
                                    className="alert alert-warning text-center cr-wallet-item__copyaddress second-font"
                                    role="alert"
                                    onClick={() => handleCopyText(tag)}
                                >
                                    {tag}
                                </div>
                            </div>
                        )
                    ) : (
                        <div
                            key={index}
                            className="d-flex flex-column justify-content-center align-items-center"
                        >
                            <p>
                                آدرسی وجود ندارد. لطفا برای تولید آدرس روی دکمه
                                زیر کلیک کنید
                            </p>
                            <button
                                onClick={() =>
                                    handleGenerateAddressProp(currency)
                                }
                                className="btn btn-outline-secondary w-75"
                            >
                                <FormattedMessage id="page.body.wallets.tabs.deposit.ccy.button.generate.message" />
                            </button>
                        </div>
                    ),
                )}
            </div>
        );
    };

    return (
        <>
            <div className="cr-wallet-item__single">
                <CurrencyIcon
                    icon={iconUrl}
                    currency={currency.toUpperCase()}
                />
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
                    {currency === 'rls' && (
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
                renderBarcode(currency)}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    address: selectWalletAddress(state),
    loading: selectWalletsAddressLoading(state),
    error: selectWalletsAddressError(state),
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
