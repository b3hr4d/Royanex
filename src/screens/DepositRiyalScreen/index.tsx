import * as React from 'react';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {RouterProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {DepositOfflineRiyal, DepositOnlineRiyal} from '../../components';
import { setDocumentTitle } from '../../helpers';
import {IntlProps} from '../../index';
import {
    Card,
    cardsFetch,
    RootState,
    selectCards,
} from '../../modules';

interface ReduxProps {
    cards: Card[];
}

interface DispatchProps {
    getCards: typeof cardsFetch;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps ;

class DepositRiyal extends React.Component<Props> {
    public componentDidMount() {
        this.props.getCards();
    }

    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public UNSAFE_componentWillMount() {
        setDocumentTitle(this.translate('page.body.deposit.online.title'));
    }

    public render() {
        const {cards} = this.props;

        return (
            <div className="depositOnlineScreen container-fluid">
                <div className="row mt-4">
                    <div className="container">
                        <div className="col-sm-10">
                            <DepositOnlineRiyal bankData={cards}/>
                        </div>
                        <div className="col-sm-6 d-none">
                            <DepositOfflineRiyal bankData={cards}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state: RootState): ReduxProps => ({
    cards: selectCards(state),
});

const mapDispatchToProps = dispatch => ({
    getCards: () => dispatch(cardsFetch()),
});

export const DepositRiyalScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(DepositRiyal) as any; // tslint:disable-line
