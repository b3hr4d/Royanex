import * as React from 'react';
import {Modal} from 'react-bootstrap';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {RouterProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {getVerificationStep} from '../../helpers';
import {IntlProps} from '../../index';
import {Label, labelFetch, RootState, selectLabelData, selectLabelFetching, selectUserInfo, User} from '../../modules';
import {Documents, Identity, Phone} from '../Confirm';

interface ReduxProps {
    labels: Label[];
    user: User;
    labelIsFetching: boolean;
}

interface DispatchProps {
    labelFetch: typeof labelFetch;
}

interface ComponentProps {
    open: boolean;
    header: string;
    onClose: () => void;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps & ComponentProps;

class ConfirmModalComponent extends React.Component<Props> {
    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>) {
        if (nextProps.user.level === 3 && nextProps.user.level !== this.props.user.level) {
            this.props.onClose();
        }
    }

    public componentDidMount() {
        const {labels} = this.props;
        this.props.labelFetch();
        if (labels.length) {
            this.handleCheckUserLabels(labels);
        }
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.user !== this.props.user) {
            this.props.labelFetch();
        }
        const {labels} = this.props;
        if (labels.length && JSON.stringify(labels) !== JSON.stringify(prevProps.labels)) {
            this.handleCheckUserLabels(labels);
        }
    }

    public render() {
        const {open, header, onClose} = this.props;
        const step = this.handleGetVerificationStep();

        return (
            <Modal
                size={step === 'document' ? 'lg' : 'sm'}
                centered
                show={open}
                onHide={onClose}
                className="confirmModal"
            >
                <Modal.Header closeButton>
                    {header}
                </Modal.Header>
                <Modal.Body>
                    {this.renderVerificationStep(step)}
                </Modal.Body>
            </Modal>
        );
    }

    public renderVerificationStep = (step: string) => {
        switch (step) {
            case 'phone':
                return <Phone/>;
            case 'profile':
                return <Identity/>;
            case 'document':
                return <Documents/>;
            default:
                return 'Something went wrong';
        }
    };

    private handleGetVerificationStep = (): string => {
        const {labels} = this.props;

        return getVerificationStep(labels);
    };

    private handleCheckUserLabels = (labels: Label[]) => {
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    labels: selectLabelData(state),
    user: selectUserInfo(state),
    labelIsFetching: selectLabelFetching(state),
});

const mapDispatchToProps = dispatch => ({
    labelFetch: () => dispatch(labelFetch()),
});

export const ConfirmModal = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(ConfirmModalComponent) as any; // tslint:disable-line
