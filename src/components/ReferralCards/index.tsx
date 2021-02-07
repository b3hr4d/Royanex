import * as React from 'react';

export interface ReferralCardProps {
    header: string,
    text_body_first_paragraph?: string,
    text_body_second_paragraph?: string,
    children?: React.ReactNode,
}

export const ReferralCards: React.FC<ReferralCardProps> = ({ header, children, text_body_first_paragraph, text_body_second_paragraph }) => {

    return (
        <div className="screenCard">
            <div className="card">
                <div className="card-header">{header}</div>
                <div className="card-body">
                    {text_body_first_paragraph ? <p className="mb-3">{text_body_first_paragraph}</p> : <></>}
                    {text_body_second_paragraph ? <p className="mb-3">{text_body_second_paragraph}</p> : <></>}
                    {children ? <>{children}</> : <></>}
                </div>
            </div>
        </div>
    );
};