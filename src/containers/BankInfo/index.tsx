// tslint:disable-next-line:no-any
import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { BanksCards } from '../../helpers/banksCards';
import { IntlProps } from '../../index';
import { alertPush, RootState, selectUserInfo, User } from '../../modules';
import {
    addCardPost,
    Card,
    cardsFetch,
    cardVerifyPost,
    CardVerifyState,
    cartPost,
    selectCardLoading,
    selectCards,
    selectedCardVerifyData,
} from '../../modules/user/riyal';
import { CARD_REGEX } from './financialValidation';

interface DispatchProps {
    getCards: typeof cardsFetch;
    cartPost: typeof cartPost;
    fetchAlert: typeof alertPush;
    cardVerify: typeof cardVerifyPost;
}

interface ReduxProps {
    user: User;
    success?: string;
    loading?: boolean;
    cardsLoading?: boolean;
    addCardPost?: Card[];
    cards: Card[];
    selectCardVerifyData: CardVerifyState;
}

interface State {
    bankName: string;
    card_number: string;
    accNumber: string;
    shabaNumber: string;
    modalOpen: boolean;
    modalData: {
        bank_name: string;
        card_num: string;
        acc_num: string;
        shaba: string;
        name: string;
    };
    verifyResponse: boolean;
}

type Props = DispatchProps & ReduxProps & IntlProps;

class BankInfoComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            bankName: '',
            card_number: '',
            accNumber: '',
            shabaNumber: '',
            modalOpen: false,
            modalData: {
                bank_name: '',
                card_num: '',
                acc_num: '',
                shaba: '',
                name: '',
            },
            verifyResponse: false,
        };
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>) {
        if (
            !nextProps.selectCardVerifyData.error &&
            nextProps.selectCardVerifyData.shaba !== this.state.modalData.shaba
        ) {
            this.setState({
                modalData: {
                    ...this.state.modalData,
                    shaba: nextProps.selectCardVerifyData.shaba,
                    name: nextProps.selectCardVerifyData.name,
                },
                verifyResponse: true,
            });
        }
        if (nextProps.addCardPost !== this.props.addCardPost) {
            this.setState({
                modalOpen: false,
            });
        }
    }

    public componentDidMount() {
        this.props.getCards();
    }

    public translate = (id: string) => {
        return id ? this.props.intl.formatMessage({ id }) : '';
    };
    public getBankName = (cardNum: string) => BanksCards(cardNum).bank;

    public render() {
        const { cards } = this.props;

        return (
            <>
                <div className="card">
                    <div className="card-header">
                        <strong>
                            {this.translate(
                                'page.body.profile.content.bankInfo.header',
                            )}
                        </strong>
                    </div>
                    <div className="card-body">
                        <div className="col-sm-4 col-12 mt-2 order-first order-md-last">
                            <div className="form-group">
                                <button
                                    className="btn btn-success mb-1 w-100"
                                    type="button"
                                    onClick={this.handleModalOpen}
                                >
                                    {this.translate(
                                        'page.body.profile.content.bankInfo.add',
                                    )}
                                </button>
                            </div>
                        </div>
                        {cards.length &&
                            cards.map((e, index) => (
                                <div className="row" key={index}>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                {this.translate(
                                                    'page.body.profile.content.bankInfo.bank',
                                                )}
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder={this.getBankName(
                                                    e.card_num,
                                                )}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                {this.translate(
                                                    'page.body.profile.content.bankInfo.card_num',
                                                )}
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder={e.card_num}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                {this.translate(
                                                    'page.body.profile.content.bankInfo.shabaNum',
                                                )}
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder={e.shaba}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                {this.translate(
                                                    'page.body.profile.content.bankInfo.status',
                                                )}
                                            </label>
                                            {e.verify ? (
                                                <div className="bg-success text-white rounded text-center py-2">
                                                    {this.translate(
                                                        'page.body.profile.content.bankInfo.badge.accepted',
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="bg-warning text-white rounded text-center py-2">
                                                    {this.translate(
                                                        'page.body.profile.content.bankInfo.badge.waiting',
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <Modal
                    show={this.state.modalOpen}
                    onHide={this.handleModalClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.translate(
                                'page.body.profile.content.bankInfo.header',
                            )}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="ccnumber">
                                        {this.translate(
                                            'page.body.profile.content.bankInfo.card_num',
                                        )}
                                    </label>
                                    <div className="input-group bankInfo__card_num">
                                        <InputMask
                                            mask="9999 9999 9999 9999"
                                            type="text"
                                            name="card_num"
                                            className="form-control ltr"
                                            value={
                                                this.state.modalData.card_num
                                            }
                                            placeholder="شماره کارت"
                                            onChange={
                                                this.handleModalDataChange
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.verifyResponse && (
                            <div className="row">
                                <div className="col-12">
                                    {this.renderBankIcon()}
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="btn btn-success"
                            onClick={this.submitAddCard}
                            disabled={!this.state.verifyResponse}
                        >
                            {this.translate(
                                'page.body.customization.actionButtons.save',
                            )}
                        </Button>
                        <Button
                            className="btn btn-light"
                            onClick={this.handleModalClose}
                        >
                            {this.translate(
                                'page.body.wallets.tabs.withdraw.modal.button.cancel',
                            )}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    private handleModalOpen = () => {
        this.setState({
            modalOpen: true,
        });
    };

    private handleModalClose = () => {
        this.setState({
            modalData: {
                bank_name: '',
                card_num: '',
                acc_num: '',
                shaba: '',
                name: '',
            },
            modalOpen: false,
        });
    };

    private handleModalDataChange = ({ target }) => {
        const cardValue = target.value.replace(/\s/g, '');
        this.setState({
            modalData: {
                ...this.state.modalData,
                [target.name]: cardValue,
            },
            verifyResponse: true,
        });
    };

    private isModalFormValid = () => {
        const cardNum = this.state.modalData.card_num.replace(/\s/g, '');

        const isCardNumValid = cardNum.match(CARD_REGEX);

        return isCardNumValid !== null;
    };

    private submitAddCard = () => {
        if (!this.isModalFormValid()) {
            this.props.fetchAlert({
                message: [
                    'page.body.profile.content.bankInfo.modal.submit.error',
                ],
                type: 'error',
            });

            return;
        }
        this.props.cartPost(this.state.modalData);
    };

    private renderBankIcon = () => {
        const { icon } = BanksCards(
            this.state.modalData.card_num.replace(/\s/g, ''),
        );

        if (icon) {
            return (
                <div className="col-12 alert alert-info d-flex justify-content-center align-items-center">
                    <img
                        src={require(`../../assets/images/banks/${
                            Object.keys(icon)[0]
                        }.svg`)}
                        alt="bank"
                        className="bankIcon ml-4"
                    />
                </div>
            );
        }

        return null;
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
    cards: selectCards(state),
    cardsLoading: selectCardLoading(state),
    addCardPost: addCardPost(state),
    selectCardVerifyData: selectedCardVerifyData(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
    dispatch,
) => ({
    fetchAlert: (payload) => dispatch(alertPush(payload)),
    getCards: () => dispatch(cardsFetch()),
    cartPost: (payload) => dispatch(cartPost(payload)),
    cardVerify: (payload) => dispatch(cardVerifyPost(payload)),
});

export const BankInfo = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(BankInfoComponent) as React.ComponentClass;
