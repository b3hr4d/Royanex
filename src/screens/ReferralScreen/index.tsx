import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ReferralCards } from '../../components';
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

class Referral extends React.Component<Props> {

    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public componentDidMount() {
        setDocumentTitle(this.translate('page.body.referral.title'));
    }
    // private renderStatistic = () => {
    //     return (
    //         <ReferralCards
    //             header={this.translate('page.body.referral.cards.statistic.header')} >
    //             <dl className="row">
    //                 <dt className="col-sm-6 text-right m-0">
    //                     {this.translate('page.body.referral.cards.statistic.inviteduser')}
    //                 </dt>
    //                 <dd className="col-sm-6 text-right m-0 mb-2">
    //                     {this.translate('page.body.referral.cards.statistic.inviteduser.number')}
    //                 </dd>
    //                 <dt className="col-sm-6 text-right m-0">
    //                     {this.translate('page.body.referral.cards.statistic.inviteduser.transaction')}
    //                 </dt>
    //                 <dd className="col-sm-6 text-right m-0 mb-2">
    //                     {this.translate('page.body.referral.cards.statistic.inviteduser.transaction.number')}
    //                 </dd>
    //                 <dt className="col-sm-6 text-right m-0">
    //                     {this.translate('page.body.referral.cards.statistic.payment')}
    //                 </dt>
    //                 <dd className="col-sm-6 text-right m-0 mb-2">
    //                     <span>{this.translate('page.body.referral.cards.statistic.payment.number')}</span>&nbsp;
    //                     <span>{this.translate('page.body.referral.cards.statistic.toman')}</span>
    //                 </dd>
    //             </dl>
    //         </ReferralCards>
    //     );
    // };
    // private renderIntroduced = () => {
    //     return (
    //         <ReferralCards
    //             header={this.translate('page.body.referral.cards.introduced.header')}
    //             text_body_first_paragraph={this.translate('page.body.referral.cards.introduced.body.text')}>
    //             <div className="py-3 text-center">
    //                 <input
    //                     className="form-control"
    //                     type="text"
    //                     placeholder={this.translate('page.body.referral.cards.introduced.input.placeholder')}
    //                 />
    //                 <Button block={true} size='lg' className="mt-4" variant="primary">
    //                     {this.translate('page.body.referral.cards.introduced.save')}
    //                 </Button>
    //             </div>
    //         </ReferralCards>
    //     );
    // };

    public render() {
        return (
            <div className="referralScreen container">
                <div className="row mt-4">
                    <div className="col-sm-6 mb-4">
                        {this.renderFriends()}
                    </div>
                    {/* <div className="col-sm-6 mb-4">
                        {this.renderStatistic()}
                    </div> */}
                    <div className="col-sm-6 mb-4">
                        {this.renderReferral()}
                    </div>
                    {/* <div className="col-sm-6 mb-4">
                        {this.renderIntroduced()}
                    </div> */}
                </div>
            </div>
        );
    }

    private renderFriends = () => {
        return (
            <ReferralCards
                header={this.translate('page.body.referral.cards.friends.header')}
                text_body_first_paragraph={this.translate('page.body.referral.cards.friends.body.text')}
            />
        );
    };
    private renderReferral = () => {
        const code = this.props.user.uid;
        const url = `https://app.Royanex.com/signup/?refcode=${code}`;

        const handleCopyText = () => {

            const input = document.body.appendChild(document.createElement('input')) as HTMLInputElement;
            input.value = url;
            input.focus();
            input.select();
            document.execCommand('copy');
            input.remove();

            this.props.pushAlert({
                message: [this.translate('page.body.refferal.cards.referral.invitecode.copied')],
                type: 'success',
            });
        };

        return (
            <ReferralCards
                header={this.translate('page.body.referral.cards.referral.header')}
                text_body_first_paragraph={
                    this.translate('page.body.referral.cards.referral.body.text.firstparagraph')}
                text_body_second_paragraph={this.translate('page.body.referral.cards.referral.body.text.secondparagraph')}>
                <div className="py-3 text-center">
                    <div className="alert alert-warning">
                        <h5 className="alert-heading text-center">
                            {this.translate('page.body.refferal.cards.referral.invitecode.title')}
                            <span className="badge badge-secondary mr-2" onClick={handleCopyText}>
                                {code}
                            </span></h5>
                        <hr />
                        <span className="alert-link">{url}</span>
                    </div>
                    <Button variant="dark" onClick={handleCopyText}>
                        {this.translate('page.body.refferal.cards.referral.invitecode.copylink')}
                    </Button>
                </div>
            </ReferralCards>
        );
    };
}


const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    pushAlert: copied => dispatch(alertPush(copied)),
});

export const ReferralScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
    (Referral) as any;
