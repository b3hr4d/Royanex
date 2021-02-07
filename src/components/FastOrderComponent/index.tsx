import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { compose } from 'redux';
import { EasyQRCode } from '..';
import { IntlProps } from '../../index';
import {
    currenciesFetch,
    Currency,
    RootState,
    selectCurrencies,
} from '../../modules';
import { CryptoIcon } from '../CryptoIcon';

type FastOrderType = 'buy' | 'sell';

interface FastOrderProps {
    type: FastOrderType;
    maxAmountOfBuy_bitcoin: number;
    maxAmountOfBuy_rial: number;
    cash: number;
    yourReceived?: number;
    bitcoinSellAmount?: number;
    wage: number;
    bitCoinAmount?: number;
}

interface ReduxProps {
    currencies: Currency[];
}

interface DispatchProps {
    currenciesFetch: typeof currenciesFetch;
}

type Props = FastOrderProps & IntlProps & ReduxProps & DispatchProps;

const FastOrder: React.FC<Props> = (props: Props) => {
    const [bitcoin, bitcoinSelect] = React.useState(null);
    const [alert, cashAlert] = React.useState(false);
    const [selectQrcode, useSelectedQrCode] = React.useState(false);
    const [address, QRCodeAddress] = React.useState('');
    const [bitUnit, setBitUnit] = React.useState('BTC');
    const [buyState, setBuyState] = React.useState({
        totalAmount: '',
        bitcoinType: '',
        walletAddress: '',
    });
    const [sellState, setSellState] = React.useState({
        bitcoinAmount: '',
        transactionId: '',
    });

    const translate = (e: string) => {
        return props.intl.formatMessage({ id: e });
    };

    const customStyle = {
        control: (styles) => ({ ...styles, minHeight: 'auto', height: '29px' }),
        dropdownIndicator: (styles) => ({ ...styles, padding: '0 8px' }),
        valueContainer: (styles) => ({ ...styles, height: '29px' }),
        input: (styles) => ({ ...styles, padding: '0', margin: '0' }),
        option: (styles) => ({ ...styles, color: 'black', padding: '4px 8px' }),
        menu: (styles) => ({ ...styles, margin: '4px 0' }),
        singleValue: (styles) => ({ ...styles, span: { display: 'none' } }),
    };

    const selectOptions = [] as any;
    if (props.currencies.length === 0) {
        props.currenciesFetch();
    }
    props.currencies.forEach((name, key) => {
        selectOptions.push({
            value: key,
            label: (
                <>
                    <CryptoIcon code={name.id} />
                    {name.name}
                </>
            ),
            name: name.name,
            id: name.id,
            address: name.explorer_address,
        });
    });

    const HandleSelectBitcion = (e) => {
        bitcoinSelect(e.name);
        setBitUnit(e.id);
        QRCodeAddress(e.address);
        useSelectedQrCode(true);
    };

    const handleChangeBuyInput = (e) => {
        const { name, value } = e.target;
        setBuyState({
            ...buyState,
            [name]: value,
        });
        if (Number(buyState.totalAmount) > props.cash) {
            cashAlert(true);
        } else {
            cashAlert(false);
        }
    };

    const handleChangeSellInput = (e) => {
        const { name, value } = e.target;
        setSellState({
            ...sellState,
            [name]: value,
        });
    };

    const handleSubmitForm = () => {
        props.type === 'buy'
            ? console.log(
                  bitcoin,
                  buyState.totalAmount,
                  buyState.bitcoinType,
                  buyState.walletAddress,
              )
            : console.log(
                  bitcoin,
                  sellState.bitcoinAmount,
                  sellState.transactionId,
              );
    };

    const findIcon = (code: string): string => {
        try {
            return require(`../../../node_modules/cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`);
        } catch (err) {
            return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
        }
    };

    let bitcoinAddress: string;
    selectOptions[1] !== undefined
        ? (bitcoinAddress = selectOptions[1].address)
        : (bitcoinAddress = '');

    return (
        <div className="fastOrderBody card-body">
            <form>
                <div className="mb-3">
                    <div className="form-group row">
                        <div className="col-sm-6">
                            <label htmlFor="name">
                                {translate('page.body.fastOrder.selectLabel')}
                            </label>
                            <Select
                                styles={customStyle}
                                options={selectOptions}
                                onChange={HandleSelectBitcion}
                                defaultValue={selectOptions[1]}
                                placeholder={translate(
                                    'page.body.fastOrder.selectPlaceholder',
                                )}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="name">
                                {props.type === 'buy'
                                    ? translate(
                                          'page.body.fastOrder.buy.inputLabel.amount',
                                      )
                                    : translate(
                                          'page.body.fastOrder.sell.inputLabel.bitcoinAmount',
                                      )}
                            </label>
                            <input
                                className="form-control"
                                id="name"
                                type="text"
                                onChange={
                                    props.type === 'buy'
                                        ? handleChangeBuyInput
                                        : handleChangeSellInput
                                }
                                value={
                                    props.type === 'buy'
                                        ? buyState.totalAmount
                                        : sellState.bitcoinAmount
                                }
                                name={
                                    props.type === 'buy'
                                        ? 'totalAmount'
                                        : 'bitcoinAmount'
                                }
                            />
                            {alert ? (
                                <div className="alert alert-danger my-2 p-2">
                                    {translate(
                                        'page.body.fastOrder.alert.notEnough',
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6">
                            <label htmlFor="name">
                                {props.type === 'buy'
                                    ? translate(
                                          'page.body.fastOrder.buy.inputLabel.bitcoinAmount',
                                      )
                                    : translate(
                                          'page.body.fastOrder.sell.inputLabel.amount',
                                      )}
                            </label>
                            <input
                                className="form-control"
                                id="name"
                                type="text"
                                disabled={props.type !== 'buy'}
                                placeholder={
                                    props.type === 'buy'
                                        ? ''
                                        : translate(
                                              'page.body.fastOrder.sell.inputPlaceholder.amount',
                                          )
                                }
                                onChange={
                                    props.type === 'buy'
                                        ? handleChangeBuyInput
                                        : handleChangeSellInput
                                }
                                value={
                                    props.type === 'buy'
                                        ? buyState.bitcoinType
                                        : ''
                                }
                                name={props.type === 'buy' ? 'bitcoinType' : ''}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="name">
                                {props.type === 'buy'
                                    ? translate(
                                          'page.body.fastOrder.buy.inputLabel.walletAddress',
                                      )
                                    : translate(
                                          'page.body.fastOrder.sell.inputLabel.transactionId',
                                      )}
                            </label>
                            <input
                                className="form-control"
                                id="name"
                                type="text"
                                onChange={
                                    props.type === 'buy'
                                        ? handleChangeBuyInput
                                        : handleChangeSellInput
                                }
                                value={
                                    props.type === 'buy'
                                        ? buyState.walletAddress
                                        : sellState.transactionId
                                }
                                name={
                                    props.type === 'buy'
                                        ? 'walletAddress'
                                        : 'transactionId'
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <p>
                            <strong>
                                {translate(
                                    'page.body.fastOrder.label.maxAmountOfBuy',
                                )}
                            </strong>{' '}
                            <span>{props.maxAmountOfBuy_bitcoin}</span>{' '}
                            <span>{bitUnit.toLocaleUpperCase()}</span>{' '}
                            <mark>
                                <span>
                                    {translate(
                                        'page.body.fastOrder.label.equal',
                                    )}
                                </span>{' '}
                                <span>{props.maxAmountOfBuy_rial}</span>{' '}
                                <span>
                                    {translate(
                                        'page.body.fastOrder.label.toman',
                                    )}
                                </span>
                            </mark>
                        </p>
                        <p>
                            {props.type === 'buy' ? (
                                <>
                                    <strong>
                                        {translate(
                                            'page.body.fastOrder.label.receive',
                                        )}
                                    </strong>{' '}
                                    <span>{props.yourReceived}</span>{' '}
                                    <span>{bitUnit.toLocaleUpperCase()}</span>{' '}
                                </>
                            ) : (
                                <>
                                    <strong>
                                        {translate(
                                            'page.body.fastOrder.label.bitcoinSellAmount',
                                        )}
                                    </strong>{' '}
                                    <span>{props.bitcoinSellAmount}</span>{' '}
                                    <span>
                                        {translate(
                                            'page.body.fastOrder.label.toman',
                                        )}
                                    </span>{' '}
                                </>
                            )}
                            <mark>
                                <span>
                                    {translate(
                                        'page.body.fastOrder.label.wage',
                                    )}
                                </span>{' '}
                                <span>{props.wage}</span>{' '}
                                <span>{bitUnit.toLocaleUpperCase()}</span>
                            </mark>
                        </p>
                        {props.type === 'buy' ? (
                            <p>
                                <strong>
                                    {translate(
                                        'page.body.fastOrder.label.bitcoinTotalAmount',
                                    )}
                                </strong>{' '}
                                <span>{props.bitCoinAmount}</span>{' '}
                                <span>
                                    {translate(
                                        'page.body.fastOrder.label.toman',
                                    )}
                                </span>
                            </p>
                        ) : (
                            <></>
                        )}
                        <p>
                            <strong>
                                {translate('page.body.fastOrder.label.cash')}
                            </strong>{' '}
                            <span>{props.cash}</span>{' '}
                            {props.type === 'buy' ? (
                                <span>
                                    {translate(
                                        'page.body.fastOrder.label.toman',
                                    )}
                                </span>
                            ) : (
                                <span>{bitUnit.toLocaleUpperCase()}</span>
                            )}
                        </p>
                    </div>
                    {props.type === 'sell' ? (
                        <div className="col-sm-6 qrCode-box">
                            <span>
                                <EasyQRCode
                                    size={160}
                                    logo={findIcon(bitUnit)}
                                    data={
                                        selectQrcode ? address : bitcoinAddress
                                    }
                                />
                            </span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="my-3">
                    <Button
                        className="btn btn-block py-2"
                        variant={props.type === 'buy' ? 'success' : 'danger'}
                        onClick={handleSubmitForm}
                        disabled={
                            props.type === 'buy'
                                ? bitcoin === null ||
                                  buyState.totalAmount === '' ||
                                  buyState.bitcoinType === '' ||
                                  buyState.walletAddress === ''
                                : bitcoin === null ||
                                  sellState.bitcoinAmount === '' ||
                                  sellState.transactionId === ''
                        }
                    >
                        {props.type === 'buy'
                            ? translate('page.body.fastOrder.buy.buttonLabel')
                            : translate('page.body.fastOrder.sell.buttonLabel')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
    currencies: selectCurrencies(state),
});

const mapDispatchToProps = (dispatch) => ({
    currenciesFetch: () => dispatch(currenciesFetch()),
});

export const FastOrderComponent = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(FastOrder) as any; // tslint:disable-line
