import * as React from 'react';
import {Button} from 'react-bootstrap';
import {
    injectIntl,
} from 'react-intl';
import {Modal} from '../../components';
import {IntlProps} from '../../index';
import {Modal as MobileModal} from '../../mobile/components/Modal';

interface ModalWithdrawConfirmationProps {
    amount: string;
    currency: string;
    onSubmit: () => void;
    onDismiss: () => void;
    rid: string;
    isMobileDevice?: boolean;
    show: boolean;
    type: string;
    bankName: string;
}

type Props = ModalWithdrawConfirmationProps & IntlProps;

class ModalWithdraw extends React.Component<Props> {
    public translate = (e: string) => {
        return this.props.intl.formatMessage({id: e});
    };

    public render() {
        const {show, isMobileDevice} = this.props;

        return isMobileDevice ?
            <MobileModal title={this.renderHeader()} onClose={this.props.onDismiss} isOpen={this.props.show}>
                <div>
                    {this.renderBody()}
                </div>
                <div>
                    {this.renderFooter()}
                </div>
            </MobileModal> : (
                <Modal
                    show={show}
                    header={this.renderHeader()}
                    content={this.renderBody()}
                    footer={this.renderFooter()}
                />
            );
    }

    private renderHeader = () => {
        return (
            <div className="pg-exchange-modal-submit-header">
                {this.translate('page.body.wallets.tabs.withdraw.modal.confirmation')}
            </div>
        );
    };

    private renderBody = () => {
        const {amount, currency, rid, type, bankName} = this.props;
        const formattedCurrency = currency.toUpperCase();

        return (
            <div className="pg-exchange-modal-submit-body modal-body__withdraw-confirm">
                <p>
                    {amount} {formattedCurrency}
                    <br/>
                    {this.translate(`page.body.wallets.tabs.withdraw.modal.message${type === 'coin' ? '1' : '3'}`)}
                    <br/>
                    <strong>{rid}</strong>
                    <strong className="mr-2">{bankName}</strong>
                    <br/>
                    {this.translate('page.body.wallets.tabs.withdraw.modal.message2')}
                </p>
            </div>
        );
    };

    private renderFooter = () => {
        return (
            <div className="pg-exchange-modal-submit-footer modal-footer__withdraw-confirm">
                <Button
                    block={true}
                    className="btn-block mr-1 mt-1 btn-lg"
                    onClick={this.props.onDismiss}
                    size="lg"
                    variant="primary"
                >
                    {this.translate('page.body.wallets.tabs.withdraw.modal.button.cancel')}
                </Button>
                <Button
                    block={true}
                    className="btn-block mr-1 mt-1 btn-lg"
                    onClick={this.props.onSubmit}
                    size="lg"
                    variant="primary"
                >
                    {this.translate('page.body.wallets.tabs.withdraw.modal.button.withdraw')}
                </Button>
            </div>
        );
    };
}

// tslint:disable-next-line
export const ModalWithdrawConfirmation = injectIntl(ModalWithdraw) as any;
