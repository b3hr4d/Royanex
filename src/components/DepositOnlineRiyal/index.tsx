import { NumberToWords } from 'persian-tools2';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { compose } from 'redux';
import { IntlProps } from '../../index';
import {
    Card,
    getawayFetch,
    RootState,
    selectUserInfo,
    User,
} from '../../modules';

export interface DepositOnlineRiyalProps {
    bankData: Card[];
    mobile?: boolean;
}

interface ReduxProps {
    user: User;
}

interface DispatchProps {
    getawayFetch: typeof getawayFetch;
}

type Props = DepositOnlineRiyalProps & IntlProps & ReduxProps & DispatchProps;
/**
 * Component to display bank account details which can be used for a
 * deposit
 */
const DepositOnline: React.FC<Props> = (props: Props) => {
    const { mobile } = props;
    const [amount, setAmount] = React.useState('');
    const [persianAmount, setPersianAmount] = React.useState('');
    const [bankAccount, setBankAccount] = React.useState(null);

    const translate = (e: string) => {
        return props.intl.formatMessage({ id: e });
    };

    const options = [] as any;
    props.bankData
        .filter((item) => item.verify)
        .forEach((num, key) => {
            options.push({ value: key, label: num.card_num });
        });
    if (options.length === 0) {
        options.push({
            label: translate('page.body.deposit.offline.select.noCard'),
            isDisabled: true,
        });
    }

    const customStyle = {
        control: (styles) => ({ ...styles, minHeight: 'auto', height: '29px' }),
        dropdownIndicator: (styles) => ({ ...styles, padding: '0 8px' }),
        valueContainer: (styles) => ({ ...styles, height: '29px' }),
        input: (styles) => ({ ...styles, padding: '0', margin: '0' }),
        option: (styles) => ({ ...styles, color: 'black', padding: '4px 8px' }),
        menu: (styles) => ({ ...styles, margin: '4px 0' }),
    };

    const history = useHistory();

    const handleAddCard = () => {
        history.push(`/profile`);
    };
    const handleReturnToWallet = () => {
        history.push(`/wallets`);
    };
    const handleChangeAmount = (e) => {
        setAmount(e.target.value);

        if (e.target.value === '') {
            setPersianAmount('');
        } else {
            setPersianAmount(NumberToWords.convert(e.target.value));
        }
    };

    const handleChangeCard = (e) => {
        setBankAccount(e.label);
    };

    const handleSubmitTransaction = () => {
        const { user } = props;
        props.getawayFetch({
            amount: amount,
            cid: bankAccount,
            phone: user.phones[user.phones.length - 1].number,
        });
    };

    return (
        <div className="depositOnline">
            <div className="card">
                <div className="card-header text-center text-md-right">
                    <strong>
                        {translate('page.body.deposit.online.header')}
                    </strong>
                </div>
                <div className="card-body depositOnline__desc p-4">
                    <span>
                        {translate('page.body.deposit.online.text.read')}
                    </span>
                    <span>
                        {translate(
                            'page.body.deposit.online.text.responsibility',
                        )}
                    </span>
                    <span>
                        {translate('page.body.deposit.online.text.useGateway')}
                    </span>
                    <span>
                        {translate(
                            'page.body.deposit.online.text.payAttention',
                        )}
                    </span>
                    <span>
                        - {translate('page.body.deposit.online.text.shaparak')}
                    </span>
                    <span>
                        -{' '}
                        {translate('page.body.deposit.online.text.trueAmount')}
                    </span>
                    <span>
                        -{' '}
                        {translate(
                            'page.body.deposit.online.text.MinTransactionAmount',
                        )}
                    </span>
                    <span>
                        - {translate('page.body.deposit.online.text.useCard')}
                    </span>
                </div>
                <form className="card-body">
                    <div>
                        <div className="form-group row">
                            <div className="col-8">
                                <Select
                                    styles={customStyle}
                                    options={options}
                                    placeholder={translate(
                                        'page.body.deposit.online.select.chooseCard',
                                    )}
                                    onChange={handleChangeCard}
                                />
                            </div>
                            <div className="col-4">
                                <Button
                                    className="btn btn-block btn-info"
                                    onClick={handleAddCard}
                                >
                                    {translate(
                                        'page.body.deposit.online.button.addCard',
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                id="name"
                                type="string"
                                placeholder={translate(
                                    'page.body.deposit.input.placeHolder',
                                )}
                                onChange={handleChangeAmount}
                                autoComplete="off"
                            />
                            {persianAmount !== '' ? (
                                <div className="pt-2 depositOnline__persianAmount">
                                    <span>{persianAmount.toString()}</span>
                                    &nbsp;
                                    <span>
                                        {' '}
                                        {translate(
                                            'page.body.deposit.online.riyal',
                                        )}
                                    </span>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-6">
                            <Button
                                className="btn btn-block btn-success py-2 mb-2"
                                disabled={bankAccount === null || amount === ''}
                                type="button"
                                onClick={handleSubmitTransaction}
                            >
                                {translate(
                                    'page.body.deposit.online.button.transform',
                                )}
                            </Button>
                        </div>
                        <div className={mobile ? 'd-none' : 'col-sm-6'}>
                            <Button
                                className="btn btn-block py-2"
                                variant="danger"
                                onClick={handleReturnToWallet}
                            >
                                {translate('page.body.deposit.button.return')}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    getawayFetch: (payload) => dispatch(getawayFetch(payload)),
});

export const DepositOnlineRiyal = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(DepositOnline) as any; // tslint:disable-line
