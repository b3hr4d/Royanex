import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { useHistory, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { compose } from 'redux';
import { IntlProps } from '../../index';
import { Card } from '../../modules';

export interface WithdrawCoinProps {
    bankData: Card[];
}

type Props = WithdrawCoinProps & IntlProps;
/**
 * Component to display bank account details which can be used for a
 * deposit
 */
const WithdrawCoinComponent: React.FunctionComponent<Props> = (
    props: Props,
) => {
    console.log(props);
    const [input, inputValue] = React.useState('');
    const [select, selectValue] = React.useState(null);

    const translate = (id: string, value?: any) =>
        props.intl.formatMessage({ id }, { ...value });
    const history = useHistory();
    // const Match = useRouteMatch();
    // const match = Match.params.type;

    const options = [] as any;
    props.bankData
        .filter((item) => item.verify)
        .forEach((num, key) => {
            options.push({ value: key, label: num.acc_num });
        });

    const customStyle = {
        control: (styles) => ({ ...styles, minHeight: 'auto', height: '29px' }),
        dropdownIndicator: (styles) => ({ ...styles, padding: '0 8px' }),
        valueContainer: (styles) => ({ ...styles, height: '29px' }),
        input: (styles) => ({ ...styles, padding: '0', margin: '0' }),
        option: (styles) => ({ ...styles, color: 'black', padding: '4px 8px' }),
        menu: (styles) => ({ ...styles, margin: '4px 0' }),
    };
    const handleReturnToWallet = () => {
        history.push(`/wallet`);
    };
    const handleAddCard = () => {
        history.push(`/profile`);
    };
    const handleChangeAmount = (e) => {
        inputValue(e.target.value);
    };
    const handleChangeCard = (e) => {
        selectValue(e.label);
    };
    const handleSubmitTransaction = () => {
        console.log(input, select);
    };

    return (
        <div className="card">
            <div className="card-header">
                <strong>
                    {translate('page.body.withdraw.coin.header.withdrawalReq')}
                </strong>{' '}
                <small>Withdraw</small>
            </div>
            <div className="card-body">
                <p>{translate('page.body.withdraw.coin.title')}</p>
                <form>
                    <div className="my-3">
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="name">
                                    {translate(
                                        'page.body.withdraw.coin.input.title.withdrawalAmount',
                                        // { bitCoin: match },
                                    )}
                                </label>
                                <input
                                    className="form-control"
                                    id="name"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChangeAmount}
                                />
                            </div>
                            <p>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.total',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.unit.bitCoin',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.total.data.now',
                                    )}
                                </span>
                                <Button className="btn mr-2" variant="warning">
                                    {translate(
                                        'page.body.withdraw.coin.button.choose',
                                    )}
                                </Button>
                            </p>
                            <p>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.daily',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.daily.data.now',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.from',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.daily.data.total',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.unit.toman',
                                    )}{' '}
                                </span>
                            </p>
                            <p>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.monthly',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.monthly.data.now',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.from',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.monthly.data.total',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.coin.input.withdrawalAmount.unit.toman',
                                    )}{' '}
                                </span>
                            </p>
                        </div>

                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="name">
                                    {translate(
                                        'page.body.withdraw.coin.select.title.walletAddress',
                                    )}
                                </label>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <Select
                                            styles={customStyle}
                                            options={options}
                                            placeholder={translate(
                                                'page.body.withdraw.coin.select.placeholder.walletAddress',
                                            )}
                                            onChange={handleChangeCard}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <Button
                                            className="btn btn-block"
                                            onClick={handleAddCard}
                                        >
                                            {translate(
                                                'page.body.withdraw.coin.button.addAddress',
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <p>
                                {translate(
                                    'page.body.withdraw.coin.input.walletAddress.payAttention',
                                )}
                            </p>
                            <p>
                                {translate(
                                    'page.body.withdraw.coin.input.walletAddress.selectAccount',
                                )}
                            </p>
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="name">
                                    {translate(
                                        'page.body.withdraw.coin.input.title.wage',
                                    )}
                                </label>
                                <input
                                    className="form-control"
                                    id="name"
                                    type="text"
                                    placeholder={translate(
                                        'page.body.withdraw.coin.input.placeholder.wage',
                                    )}
                                    disabled
                                />
                            </div>
                            <p>
                                {translate(
                                    'page.body.withdraw.coin.input.wage.text',
                                )}
                            </p>
                        </div>
                        <div className="alert alert-success" role="alert">
                            {translate('page.body.withdraw.coin.form.alert')}
                        </div>
                    </div>
                    <div className="my-3">
                        <Button
                            className="btn ml-2"
                            variant="success"
                            disabled={input === '' ? true : false}
                            type="submit"
                            onSubmit={handleSubmitTransaction}
                        >
                            {translate(
                                'page.body.withdraw.coin.button.withdrawalReq',
                            )}
                        </Button>
                        <Button
                            className="btn ml-2"
                            variant="warning"
                            onClick={handleReturnToWallet}
                        >
                            {translate('page.body.withdraw.coin.button.return')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const WithdrawCoin = compose(
    injectIntl,
    withRouter,
)(WithdrawCoinComponent) as any; // tslint:disable-line
