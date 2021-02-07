import classnames from 'classnames';
import * as React from 'react';
import { Carousel } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { compose } from 'redux';
import { kycSteps } from '../../api';
import { CheckBigIcon } from '../../assets/images/kyc/CheckBigIcon';
import { CheckIcon } from '../../assets/images/kyc/CheckIcon';
import { ClocksIcon } from '../../assets/images/kyc/ClocksIcon';
import { CrossIcon } from '../../assets/images/kyc/CrossIcon';
import { UploadFile } from '../../components/UploadFile';
import { changeElementPosition } from '../../helpers';
import { IntlProps } from '../../index';

import UploadSvg from '../../assets/images/upload.svg';
import {
    Label,
    labelFetch,
    selectLabelData,
    selectSendDocumentsLoading,
    selectSendDocumentsSuccess,
    selectUserInfo,
    sendDocuments,
    User,
} from '../../modules';

interface ReduxProps {
    labels: Label[];
    success?: string;
    sendDocLoading?: boolean;
}

interface DispatchProps {
    labelFetch: typeof labelFetch;
    sendDocuments: typeof sendDocuments;
}

interface ProfileVerificationProps {
    user: User;
}

interface State {
    isMouseTooltipVisible: boolean;
    uploadedFile: File[];
}

type Props = DispatchProps & ProfileVerificationProps & ReduxProps & IntlProps;

class ProfileVerificationComponent extends React.Component<Props, State> {
    public state = {
        isMouseTooltipVisible: false,
        uploadedFile: [],
    };

    public componentDidMount() {
        this.props.labelFetch();
    }

    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public renderProgressBarStep = (
        step: string,
        index: number,
        labels: Label[],
    ) => {
        const targetLabelStatus = this.handleCheckLabel(labels, step);

        switch (targetLabelStatus) {
            case 'verified':
                return (
                    <div className="pg-profile-page-verification__progress-bar__step pg-profile-page-verification__progress-bar__step--verified">
                        <FormattedMessage
                            id={`page.body.profile.verification.progress.level`}
                        />
                        <span>&nbsp;{index + 1}</span>
                        <CheckIcon />
                    </div>
                );
            case 'drafted':
            case 'pending':
            case 'submitted':
                return (
                    <div className="pg-profile-page-verification__progress-bar__step pg-profile-page-verification__progress-bar__step--pending">
                        <FormattedMessage
                            id={`page.body.profile.verification.progress.level`}
                        />
                        <span>&nbsp;{index + 1}</span>
                        <ClocksIcon />
                    </div>
                );
            case 'rejected':
                return (
                    <div className="pg-profile-page-verification__progress-bar__step pg-profile-page-verification__progress-bar__step--rejected">
                        <FormattedMessage
                            id={`page.body.profile.verification.progress.level`}
                        />
                        <span>&nbsp;{index + 1}</span>
                        <CrossIcon />
                    </div>
                );
            case 'blocked':
                return (
                    <div className="pg-profile-page-verification__progress-bar__step pg-profile-page-verification__progress-bar__step--blocked">
                        <FormattedMessage
                            id={`page.body.profile.verification.progress.level`}
                        />
                        <span>&nbsp;{index + 1}</span>
                    </div>
                );
            default:
                return (
                    <div className="pg-profile-page-verification__progress-bar__step pg-profile-page-verification__progress-bar__step--active">
                        <FormattedMessage
                            id={`page.body.profile.verification.progress.level`}
                        />
                        <span>&nbsp;{index + 1}</span>
                    </div>
                );
        }
    };

    public renderProgressBar(labels: Label[]) {
        return (
            <div className="pg-profile-page-verification__progress-bar">
                {kycSteps().map((step, index) =>
                    this.renderProgressBarStep(step, index, labels),
                )}
            </div>
        );
    }

    public renderVerificationLabel(
        labels: Label[],
        labelToCheck: string,
        index: number,
    ) {
        const { isMouseTooltipVisible } = this.state;
        const targetLabelStatus = this.handleCheckLabel(labels, labelToCheck);

        const tooltipClass = classnames(
            'pg-profile-page-verification__step__tooltip tooltip-hover',
            {
                'tooltip-hover--visible': isMouseTooltipVisible,
            },
        );

        switch (targetLabelStatus) {
            case 'verified':
                return (
                    <div
                        key={index}
                        className="pg-profile-page-verification__step pg-profile-page-verification__step--verified"
                    >
                        <div className="pg-profile-page-verification__step__info">
                            <div className="pg-profile-page-verification__step__info__title">
                                <span>{index + 1}.&nbsp;</span>
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.title`}
                                />
                            </div>
                            <div className="pg-profile-page-verification__step__info__subtitle">
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.subtitle`}
                                />
                            </div>
                        </div>
                        <div className="pg-profile-page-verification__step__label pg-profile-page-verification__step__label--verified">
                            <FormattedMessage id="page.body.profile.verification.verified" />
                            <CheckBigIcon />
                        </div>
                    </div>
                );
            case 'drafted':
            case 'pending':
            case 'submitted':
                return (
                    <div
                        key={index}
                        className="pg-profile-page-verification__step pg-profile-page-verification__step--pending"
                    >
                        <div className="pg-profile-page-verification__step__info">
                            <div className="pg-profile-page-verification__step__info__title">
                                <span>{index + 1}.&nbsp;</span>
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.title`}
                                />
                            </div>
                            <div className="pg-profile-page-verification__step__info__subtitle">
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.subtitle`}
                                />
                            </div>
                        </div>
                        <div className="pg-profile-page-verification__step__label pg-profile-page-verification__step__label--pending">
                            <FormattedMessage id="page.body.profile.verification.pending" />
                            <ClocksIcon />
                        </div>
                    </div>
                );
            case 'rejected':
                return (
                    <div
                        key={index}
                        className="pg-profile-page-verification__step pg-profile-page-verification__step--rejected"
                    >
                        <div className="pg-profile-page-verification__step__info">
                            <div className="pg-profile-page-verification__step__info__title">
                                <span>{index + 1}.&nbsp;</span>
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.title`}
                                />
                            </div>
                            <div className="pg-profile-page-verification__step__info__subtitle">
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.subtitle`}
                                />
                            </div>
                        </div>
                        <div
                            className="pg-profile-page-verification__step__label pg-profile-page-verification__step__label--rejected"
                            onMouseEnter={(e) => this.handleHoverTooltipIcon()}
                            onMouseLeave={(e) =>
                                this.handleToggleTooltipVisible()
                            }
                        >
                            <Link to="/confirm">
                                <FormattedMessage id="page.body.profile.verification.reverify" />
                            </Link>
                            <CrossIcon />
                        </div>
                        <span className={tooltipClass}>
                            <FormattedMessage
                                id={`page.body.profile.verification.${labelToCheck}.rejected.tooltip`}
                            />
                        </span>
                    </div>
                );
            case 'blocked':
                return (
                    <div
                        key={index}
                        className="pg-profile-page-verification__step pg-profile-page-verification__step--blocked"
                    >
                        <div className="pg-profile-page-verification__step__info">
                            <div className="pg-profile-page-verification__step__info__title">
                                <span>{index + 1}.&nbsp;</span>
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.title`}
                                />
                            </div>
                            <div className="pg-profile-page-verification__step__info__subtitle">
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.subtitle`}
                                />
                            </div>
                        </div>
                        <div className="pg-profile-page-verification__step__button pg-profile-page-verification__step__button--blocked">
                            <Link to="/confirm">
                                <FormattedMessage id="page.body.profile.verification.verify" />
                            </Link>
                        </div>
                    </div>
                );
            default:
                return (
                    <div
                        key={index}
                        className="pg-profile-page-verification__step pg-profile-page-verification__step--active"
                    >
                        <div className="pg-profile-page-verification__step__info">
                            <div className="pg-profile-page-verification__step__info__title">
                                <span>{index + 1}.&nbsp;</span>
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.title`}
                                />
                            </div>
                            <div className="pg-profile-page-verification__step__info__subtitle">
                                <FormattedMessage
                                    id={`page.body.profile.verification.${labelToCheck}.subtitle`}
                                />
                            </div>
                        </div>
                        <div className="pg-profile-page-verification__step__button pg-profile-page-verification__step__button--active">
                            <Link to="/confirm">
                                <FormattedMessage id="page.body.profile.verification.verify" />
                            </Link>
                        </div>
                    </div>
                );
        }
    }

    public render() {
        const { uploadedFile } = this.state;
        const { sendDocLoading } = this.props;

        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="card-header">
                        <strong>تایید هویت</strong> <small>Verification</small>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-success" role="alert">
                            <p>
                                لطفا تصویر کارت ملی را در کنار چهره خودتان همراه
                                با یک دست نوشته به صورت کاملا خوانا و واضح ،
                                دقیقا مانند تصویر نمونه ، ارسال نمایید . دقت شود
                                متن دست نوشته نبایستی تایپ شود. هم چنین توجه
                                داشته باشید هنگام تهیه تصویر ، متن دست نوشته و
                                اطلاعات کارت ملی به صورت برعکس و آینه ای ثبت
                                نشود.
                            </p>
                        </div>
                        <UploadFile
                            isMobileDevice={false}
                            id="fileSelfie"
                            title={this.translate(
                                'page.body.kyc.documents.uploadFile.selfie.title',
                            )}
                            label={this.translate(
                                'page.body.kyc.documents.uploadFile.selfie.label',
                            )}
                            buttonText={this.translate(
                                'page.body.kyc.documents.uploadFile.selfie.button',
                            )}
                            sizesText={this.translate(
                                'page.body.kyc.documents.uploadFile.selfie.sizes',
                            )}
                            formatsText={this.translate(
                                'page.body.kyc.documents.uploadFile.selfie.formats',
                            )}
                            handleUploadScan={(uploadEvent) =>
                                this.handleUploadScan(uploadEvent)
                            }
                            uploadedFile={
                                uploadedFile[0] &&
                                (uploadedFile[0] as File).name
                            }
                            exampleImagePath={UploadSvg}
                        />
                        <button
                            className="btn btn-primary btn-lg btn-block mt-4"
                            type="button"
                            disabled={uploadedFile.length === 0}
                            onClick={this.handleSubmitUpload}
                        >
                            {sendDocLoading ? (
                                <ClipLoader
                                    size={20}
                                    color={'#ffffff'}
                                    loading={sendDocLoading}
                                />
                            ) : (
                                'ارسال'
                            )}
                        </button>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card-header">
                        <strong>راهنمای تایید هویت</strong> <small>Guide</small>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-danger" role="alert">
                            <h6 className="alert-heading">متن دست نوشته</h6>
                            <p>
                                اینجانب (نام و نام خانوادگی) به کد ملی (کدملی)
                                ضمن مطالعه و تأیید قوانین استفاده از خدمات رویان
                                متعهد می گردم حساب کاربری ومدارک خود را در
                                اختیار اشخاص غیر قرار ندهم و در صورت تخلف ،
                                مسئولیت آن را بر عهده بگیرم . جهت احراز هویت در
                                سایت رویان - تاریخ روز و امضا
                            </p>
                        </div>
                        <Carousel slide={false}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require('../../assets/images/kyc-sample/1.jpg')}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require('../../assets/images/kyc-sample/2.jpg')}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require('../../assets/images/kyc-sample/3.jpg')}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require('../../assets/images/kyc-sample/4.jpg')}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require('../../assets/images/kyc-sample/5.jpg')}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        );
    }

    private handleCheckLabel = (labels: Label[], labelToCheck: string) => {
        const targetLabel =
            labels.length &&
            labels.find(
                (label: Label) =>
                    label.key === labelToCheck && label.scope === 'private',
            );
        let targetLabelStatus = targetLabel ? targetLabel.value : '';
        const indexOfPrevStep = kycSteps().indexOf(labelToCheck) - 1;

        if (indexOfPrevStep !== -1) {
            const prevStepPassed = Boolean(
                labels.find(
                    (label: Label) =>
                        label.key === kycSteps()[indexOfPrevStep] &&
                        label.value === 'verified' &&
                        label.scope === 'private',
                ),
            );

            if (!prevStepPassed) {
                targetLabelStatus = 'blocked';
            }
        }

        return targetLabelStatus;
    };

    private handleToggleTooltipVisible = () => {
        this.setState((prevState) => ({
            isMouseTooltipVisible: !prevState.isMouseTooltipVisible,
        }));
    };

    private handleHoverTooltipIcon = () => {
        changeElementPosition(
            'pg-profile-page-verification__step__tooltip',
            0,
            -100,
            20,
        );
        this.handleToggleTooltipVisible();
    };

    private handleUploadScan = (uploadEvent) => {
        const allFiles: File[] = uploadEvent.target.files;
        const maxDocsCount = 1;
        const additionalFileList =
            Array.from(allFiles).length > maxDocsCount
                ? Array.from(allFiles).slice(0, maxDocsCount)
                : Array.from(allFiles);

        this.setState({
            uploadedFile: additionalFileList,
        });
    };

    private createUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;

            return v.toString(16);
        });
    };

    private handleSubmitUpload = () => {
        const { uploadedFile } = this.state;
        const request = new FormData();
        request.append('doc_type', 'user_kyc');
        request.append('doc_number', `${this.createUUID()}`);
        request.append('upload[]', uploadedFile[0]);

        this.props.sendDocuments(request);
    };
}

const mapStateToProps = (state) => ({
    user: selectUserInfo(state),
    labels: selectLabelData(state),
    success: selectSendDocumentsSuccess(state),
    sendDocLoading: selectSendDocumentsLoading(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> = (
    dispatch,
) => ({
    labelFetch: () => dispatch(labelFetch()),
    sendDocuments: (payload) => dispatch(sendDocuments(payload)),
});

export const ProfileVerification = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchProps),
)(ProfileVerificationComponent) as React.ComponentClass;
