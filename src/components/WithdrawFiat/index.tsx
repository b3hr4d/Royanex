import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { compose } from 'redux';
import { IntlProps } from '../../index';
import { Card, RootState } from '../../modules';

export interface WithdrawFiatProps {
    bankData: Card[];
}
interface ReduxProps {}
type Props = WithdrawFiatProps & IntlProps & ReduxProps;

/**
 * Component to display bank account details which can be used for a
 * deposit
 */
const WithdrawFiatComponent: React.FC<Props> = (props: Props) => {
    const [input, inputValue] = React.useState('');
    const [select, selectValue] = React.useState(null);

    const history = useHistory();
    const translate = (e: string) => {
        return props.intl.formatMessage({ id: e });
    };

    const options = [] as any;
    props.bankData
        .filter((item) => item.verify)
        .forEach((num, key) => {
            options.push({ value: key, label: num.acc_num });
        });

    const customStyle = {
        control: (styles: any) => ({
            ...styles,
            minHeight: 'auto',
            height: '29px',
        }),
        dropdownIndicator: (styles: any) => ({ ...styles, padding: '0 8px' }),
        valueContainer: (styles: any) => ({ ...styles, height: '29px' }),
        input: (styles: any) => ({ ...styles, padding: '0', margin: '0' }),
        option: (styles: any) => ({
            ...styles,
            color: 'black',
            padding: '4px 8px',
        }),
        menu: (styles: any) => ({ ...styles, margin: '4px 0' }),
    };

    const handleAddAccount = () => {
        history.push(`/profile`);
    };
    const handleReturnToWallet = () => {
        history.push(`/wallet`);
    };
    const handleChangeAmount = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        inputValue(e.target.value);
    };
    const handleChangeCard = (e: { label: React.SetStateAction<null> }) => {
        selectValue(e.label);
    };
    const handleSubmitTransaction = () => {
        console.log(input, select);
    };

    return (
        <div className="card">
            <div className="card-header">
                <strong>
                    {translate('page.body.withdraw.fiat.header.withdrawalReq')}
                </strong>{' '}
                <small>Withdraw</small>
            </div>
            <div className="card-body">
                <p>
                    <span>
                        {translate('page.body.withdraw.fiat.title.firstLine')}
                    </span>
                    <br />
                    <span>
                        {translate('page.body.withdraw.fiat.title.secondtLine')}
                    </span>
                </p>
                <form>
                    <div className="mt-3">
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="name">
                                    {translate(
                                        'page.body.withdraw.fiat.input.title.withdrawalAmount',
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
                                        'page.body.withdraw.fiat.input.withdrawalAmount.total',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.total.data.now',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.unit.toman',
                                    )}
                                </span>
                                <Button className="btn mr-2" variant="warning">
                                    {translate(
                                        'page.body.withdraw.fiat.button.choose',
                                    )}
                                </Button>
                            </p>
                            <p>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.daily',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.daily.data.now',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.from',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.daily.data.total',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.unit.toman',
                                    )}{' '}
                                </span>
                            </p>
                            <p>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.monthly',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.monthly.data.now',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.from',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.monthly.data.total',
                                    )}{' '}
                                </span>
                                <span>
                                    {translate(
                                        'page.body.withdraw.fiat.input.withdrawalAmount.unit.toman',
                                    )}{' '}
                                </span>
                            </p>
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="name">
                                    {translate(
                                        'page.body.withdraw.fiat.select.title.accountAddress',
                                    )}
                                </label>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <Select
                                            styles={customStyle}
                                            options={options}
                                            placeholder={translate(
                                                'page.body.withdraw.fiat.select.placeholder.accountAddress',
                                            )}
                                            onChange={handleChangeCard}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <Button
                                            className="btn btn-block"
                                            onClick={handleAddAccount}
                                        >
                                            {translate(
                                                'page.body.withdraw.fiat.button.addAccount',
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <p>
                                {translate(
                                    'page.body.withdraw.fiat.input.accountAddress.selectAccountText',
                                )}
                            </p>
                        </div>
                        <div className="mb-3">
                            <div className="form-group">
                                <label htmlFor="name">
                                    {translate(
                                        'page.body.withdraw.fiat.input.title.wage',
                                    )}
                                </label>
                                <input
                                    className="form-control"
                                    id="name"
                                    type="text"
                                    placeholder={translate(
                                        'page.body.withdraw.fiat.input.placeholder.wage',
                                    )}
                                    disabled
                                />
                            </div>
                            <p>
                                {translate(
                                    'page.body.withdraw.fiat.input.wage.text',
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="my-3">
                        <Button
                            className="btn ml-2"
                            variant="success"
                            disabled={
                                select === null || input === '' ? true : false
                            }
                            type="submit"
                            onSubmit={handleSubmitTransaction}
                        >
                            {translate(
                                'page.body.withdraw.fiat.button.withdrawalReq',
                            )}
                        </Button>
                        <Button
                            className="btn ml-2"
                            variant="warning"
                            onClick={handleReturnToWallet}
                        >
                            {translate('page.body.withdraw.fiat.button.return')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState): ReduxProps => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export const WithdrawFiat = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(WithdrawFiatComponent) as any;
