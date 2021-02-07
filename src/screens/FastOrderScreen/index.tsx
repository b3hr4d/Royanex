import * as React from 'react';
import { injectIntl } from 'react-intl';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { OrderComponent } from '../../containers';
import { setDocumentTitle } from '../../helpers';
import { IntlProps } from '../../index';
import { RootState, selectCurrentPrice, setCurrentPrice } from '../../modules';

interface ReduxProps {
    currentPrice: number | undefined;
}

interface DispatchProps {
    setCurrentPrice: typeof setCurrentPrice;
}

interface FastOrderState {
    currentTabIndex: number;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;

class FastOrder extends React.Component<Props, FastOrderState> {
    public state = {
        currentTabIndex: 0,
    };

    public componentDidMount() {
        setDocumentTitle(this.translate('page.body.fastOrder.tabLabel.title'));
    }

    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public render() {
        return (
            <div className="fastOrderScreen container">
                <div className="row mt-md-4">
                    <div className="col-sm-12 p-0">
                        <div className="card">
                            <OrderComponent proTrading={false} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = (
    state,
) => ({
    currentPrice: selectCurrentPrice(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (
    dispatch,
) => ({
    setCurrentPrice: (payload) => dispatch(setCurrentPrice(payload)),
});

export const FastOrderScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(FastOrder) as any;
