import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { RouterProps, withRouter } from 'react-router';
import { compose } from 'redux';
import { IntlProps } from '../..';
import { RootState } from '../../modules';
import {
    ErrorObject,
    paymentsError,
    paymentsFetch,
    QueryObject,
    selectPaymentsError,
    selectPaymentsLoading,
} from '../../modules/public/payments';

interface ReduxProps {
    loading?: boolean;
    response: ErrorObject;
}

interface DispatchProps {
    fetchRequest: typeof paymentsFetch;
    fetchError: typeof paymentsError;
}

type Props = RouterProps & DispatchProps & ReduxProps & IntlProps;

class Payments extends React.Component<Props> {
    public componentDidMount() {
        const query = this.props.history.location.search;
        const { code, refnum, state } = this.queryObject(query);
        if (state === 'SUCCESSFUL' && refnum && code && this.props.loading) {
            this.props.fetchRequest({ code, refnum });
        } else {
            this.props.fetchError({
                code: 500,
                message: ['error.payment.failed'],
            });
        }
    }

    public queryObject = (query: string) =>
        query
            .slice(1)
            .split('&')
            .reduce((acc, s) => {
                const [k, v] = s.split('=');

                return { ...acc, [k]: v };
            }, {}) as QueryObject;

    public buttonHandler = ({ code, refnum }) => {
        this.props.fetchRequest({ code, refnum });
    };

    public translate = (id: string) => {
        return id ? this.props.intl.formatMessage({ id }) : '';
    };

    public render() {
        const { loading, history, response } = this.props;
        const { code: callbackCode, message } = response;
        const query = this.props.history.location.search;
        const { refnum, state, code } = this.queryObject(query);

        return (
            <div className="paymentscreen">
                {loading || !message ? (
                    <div className="paymentscreen__body">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <h5>
                            {this.translate(
                                'page.body.history.withdraw.content.status.processing',
                            )}
                            ...
                        </h5>
                    </div>
                ) : (
                    <div className="paymentscreen__body">
                        <h3
                            className={
                                callbackCode === 200
                                    ? 'text-success'
                                    : 'text-warning'
                            }
                        >
                            {this.translate(message[0])}
                        </h3>
                        {refnum && <p>کد پیگیری :{refnum} </p>}
                        <div className="paymentscreen__buttons">
                            {state === 'SUCCESSFUL' &&
                                refnum &&
                                code &&
                                callbackCode !== 200 && (
                                    <Button
                                        onClick={() =>
                                            this.buttonHandler({ code, refnum })
                                        }
                                    >
                                        تلاش مجدد
                                    </Button>
                                )}
                            <Button onClick={() => history.push('/')}>
                                بازگشت به پنل
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, RootState> = (
    state,
) => ({
    loading: selectPaymentsLoading(state),
    response: selectPaymentsError(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
    dispatch,
) => ({
    fetchRequest: (payload) => dispatch(paymentsFetch(payload)),
    fetchError: (payload) => dispatch(paymentsError(payload)),
});

export const PaymentsComponent = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Payments) as React.ComponentClass;
