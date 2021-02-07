import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import DatePicker from 'react-modern-calendar-datepicker';
import { useHistory, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { compose } from 'redux';
import { IntlProps } from '../../index';
import { Card } from '../../modules';

export interface DepositOfflineRiyalProps {
    bankData: Card[];
}

type Props = DepositOfflineRiyalProps & IntlProps;
/**
 * Component to display bank account details which can be used for a
 * deposit
 */
const DepositOffline: React.FunctionComponent<Props> = (props: Props) => {
    const history = useHistory();
    const [amount, amountValue] = React.useState('');
    const [date, dateValue] = React.useState(null);
    const [receipt, receiptValue] = React.useState('');
    const [select, selectValue] = React.useState(null);

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
    const handleChangeCard = (e) => {
        selectValue(e.label);
    };
    const handleChangeAmount = (e) => {
        amountValue(e.target.value);
    };
    const handleChangeDate = (e: any) => {
        dateValue(e);
    };
    const handleChangeReceipt = (e) => {
        receiptValue(e.target.value);
    };
    const handleSubmitTransaction = () => {
        console.log(select, amount, date, receipt);
    };

    return (
        <div className="depositOffline">
            <div className="card">
                <div className="card-header">
                    <strong>
                        {translate('page.body.deposit.offline.header')}
                    </strong>{' '}
                    <small>Bank</small>
                </div>
                <div className="card-body">
                    <span>
                        {translate('page.body.deposit.offline.text.useAccount')}
                    </span>
                    <span>
                        {translate(
                            'page.body.deposit.offline.text.payAttention',
                        )}
                    </span>
                    <span>
                        - {translate('page.body.deposit.offline.text.payLevel')}
                    </span>
                    <span>
                        -{' '}
                        {translate(
                            'page.body.deposit.offline.text.coordination',
                        )}
                    </span>
                    <span>
                        -{' '}
                        {translate(
                            'page.body.deposit.offline.text.MinTransactionAmount',
                        )}
                    </span>
                    <span>
                        - {translate('page.body.deposit.offline.text.register')}
                    </span>
                    <span>
                        -{' '}
                        {translate('page.body.deposit.offline.text.trueEntery')}
                    </span>
                    <span>
                        - {translate('page.body.deposit.offline.text.wage')}
                    </span>
                    <span>
                        -{' '}
                        {translate(
                            'page.body.deposit.offline.text.compeleteForm',
                        )}
                    </span>
                </div>
                <form className="card-body">
                    <div className="mb-4">
                        <div className="form-group">
                            <Select
                                styles={customStyle}
                                options={options}
                                placeholder={translate(
                                    'page.body.deposit.offline.select.chooseAccNum',
                                )}
                                onChange={handleChangeCard}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                id="name"
                                type="text"
                                placeholder={translate(
                                    'page.body.deposit.input.placeHolder',
                                )}
                                onChange={handleChangeAmount}
                            />
                        </div>
                        <div className="form-group">
                            <DatePicker
                                value={date}
                                onChange={handleChangeDate}
                                inputPlaceholder={translate(
                                    'page.body.deposit.offline.datepicker.click',
                                )}
                                shouldHighlightWeekends
                                inputClassName="form-control"
                                locale="fa"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                id="name"
                                type="text"
                                placeholder={translate(
                                    'page.body.deposit.offline.input.receiptNum',
                                )}
                                onChange={handleChangeReceipt}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <Button
                            disabled={
                                amount === '' || receipt === '' ? true : false
                            }
                            className="btn btn-block btn-success"
                            onClick={handleSubmitTransaction}
                        >
                            {translate(
                                'page.body.deposit.offline.button.recordTransaction',
                            )}
                        </Button>
                        <Button
                            className="btn btn-block"
                            variant="warning"
                            onClick={handleReturnToWallet}
                        >
                            {translate('page.body.deposit.button.return')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const DepositOfflineRiyal = compose(
    injectIntl,
    withRouter,
)(DepositOffline) as any;
