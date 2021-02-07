import * as React from 'react';

const ComingSoon: React.FC = () => {

    return (
        <div className="container-fluid" id="comingSoon">
            <div className="row justify-content-center align-items-center mt-5">
                <img src={require('../../../assets/images/coming-soon.png')} alt="coming soon"/>
                <span className="col-12 my-5 text-center">نسخه موبایل رویان در حال آماده سازی می باشد</span>
                <h1 className="col-12 text-center desc">در حال حاضر میتوانید از نسخه
                    <br/>
                    <strong className="font-weight-bolder">desktop</strong>
                    <br/>
                    استفاده کنید
                </h1>
            </div>
        </div>
    );
};


export {
    ComingSoon,
};
