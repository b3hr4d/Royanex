import classnames from 'classnames';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Blur } from '../../../components/Blur';
import { CurrencyInfo } from '../../../components/CurrencyInfo';
import { DepositCrypto } from '../../../components/DepositCrypto';
import { DepositOnlineRiyal } from '../../../components/DepositOnlineRiyal';
import { formatCCYAddress } from '../../../helpers';
import { selectCards } from '../../../modules';
import { selectCurrencies } from '../../../modules/public/currencies';
import { selectWalletAddress } from '../../../modules/user/wallets';

const WalletDepositBodyComponent = (props) => {
    const intl = useIntl();
    const cards = useSelector(selectCards);
    const currencies = useSelector(selectCurrencies);
    const selectedWalletAddress = useSelector(selectWalletAddress);
    const label = React.useMemo(
        () =>
            intl.formatMessage({
                id: 'page.body.wallets.tabs.deposit.ccy.message.address',
            }),
        [intl],
    );
    const handleOnCopy = () => ({});
    const renderDeposit = (isAccountActivated: boolean) => {
        const { addressDepositError, wallet } = props;
        const currencyItem = (currencies &&
            currencies.find((item) => item.id === wallet.currency)) || {
            min_confirmations: 6,
            deposit_enabled: false,
        };
        const text = intl.formatMessage(
            { id: 'page.body.wallets.tabs.deposit.ccy.message.submit' },
            { confirmations: currencyItem.min_confirmations },
        );
        const error = addressDepositError
            ? intl.formatMessage({ id: addressDepositError.message[0] })
            : intl.formatMessage({
                  id: 'page.body.wallets.tabs.deposit.ccy.message.error',
              });

        const walletAddress =
            formatCCYAddress(wallet.currency, selectedWalletAddress) || '';

        const buttonLabel = `
            ${intl.formatMessage({
                id: 'page.body.wallets.tabs.deposit.ccy.button.generate',
            })} ${wallet.currency.toUpperCase()} ${intl.formatMessage({
            id: 'page.body.wallets.tabs.deposit.ccy.button.address',
        })}
        `;
        // const title = intl.formatMessage({id: 'page.body.wallets.tabs.deposit.fiat.message1'});
        // const description = intl.formatMessage({id: 'page.body.wallets.tabs.deposit.fiat.message2'});
        const blurCryptoClassName = classnames('pg-blur-deposit-crypto', {
            'pg-blur-deposit-crypto--active': isAccountActivated,
        });

        if (wallet.type === 'coin') {
            return (
                <React.Fragment>
                    <CurrencyInfo wallet={wallet} currency={wallet.name} />
                    {currencyItem && !currencyItem.deposit_enabled ? (
                        <Blur
                            className={blurCryptoClassName}
                            text={intl.formatMessage({
                                id:
                                    'page.body.wallets.tabs.deposit.disabled.message',
                            })}
                        />
                    ) : null}
                    <DepositCrypto
                        data={walletAddress}
                        handleOnCopy={handleOnCopy}
                        error={error}
                        text={text}
                        disabled={walletAddress === ''}
                        copiableTextFieldText={`${wallet.currency.toUpperCase()} ${label}`}
                        copyButtonText={intl.formatMessage({
                            id:
                                'page.body.wallets.tabs.deposit.ccy.message.button',
                        })}
                        handleGenerateAddress={props.handleGenerateAddress}
                        buttonLabel={buttonLabel}
                        isAccountActivated={isAccountActivated}
                        generateAddressTriggered={
                            props.generateAddressTriggered
                        }
                    />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <DepositOnlineRiyal bankData={cards} mobile={true} />
                </React.Fragment>
            );
        }
    };

    return (
        <div className="cr-mobile-wallet-deposit-body">
            {renderDeposit(props.isAccountActivated)}
        </div>
    );
};

const WalletDepositBody = React.memo(WalletDepositBodyComponent);

export { WalletDepositBody };
