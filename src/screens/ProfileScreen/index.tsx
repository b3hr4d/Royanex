import * as React from 'react';
import {injectIntl} from 'react-intl';
import {connect, MapStateToProps} from 'react-redux';
import {RouterProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {BankInfo, ProfileApiKeys, ProfileAuthDetails} from '../../containers';
import {setDocumentTitle} from '../../helpers';
import {IntlProps} from '../../index';
import {Subheader} from '../../mobile/components/Subheader';
import {RootState, selectMobileDeviceState} from '../../modules';


interface ReduxProps {
    isMobileDevice: boolean;
}

type Props = ReduxProps & RouterProps & IntlProps;

class ProfileComponent extends React.Component<Props> {

    public componentDidMount() {
        setDocumentTitle('پروفایل');
    }

    public goBack = () => {
        this.props.history.goBack();
    };

    public render() {
        return (
            <>
                {this.props.isMobileDevice &&
                <Subheader
                    title={'احراز هویت'}
                    backTitle={'پروفایل'}
                    onGoBack={() => this.props.history.push('/profile')}
                />
                }
                <div className="container pg-profile-page">
                    <ProfileAuthDetails/>
                    {
                        !this.props.isMobileDevice &&
                        <div className="row my-4">
                            <div className="col-12">
                                <BankInfo/>
                            </div>
                        </div>
                    }

                    <div className="row my-4">
                        <div className="col-12 d-none">
                            <ProfileApiKeys/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    isMobileDevice: selectMobileDeviceState(state),
});

export const ProfileScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps),
)(ProfileComponent) as React.ComponentClass;
