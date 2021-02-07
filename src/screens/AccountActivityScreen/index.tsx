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
import { ProfileAccountActivity } from '../../containers';
import { setDocumentTitle } from '../../helpers';
import { IntlProps } from '../../index';
import { alertPush, RootState, selectUserInfo, User } from '../../modules';

interface ReduxProps {
    user: User;
}

interface DispatchProps {
    pushAlert: typeof alertPush;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;

class AccountActivity extends React.Component<Props> {
    public componentDidMount() {
        setDocumentTitle(
            this.translate('page.header.navbar.privacy.history.title'),
        );
    }

    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public render() {
        return (
            <div className="AccountActivityScreen container-fluid">
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-12">
                            <ProfileAccountActivity />
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
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (
    dispatch,
) => ({
    pushAlert: (copied) => dispatch(alertPush(copied)),
});

export const AccountActivityScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(AccountActivity) as any;
