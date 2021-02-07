import * as React from 'react';
import {BankInfo} from '../../../containers/BankInfo';


const BankInfoScreen: React.FC = () => {
    return (
        <div className="container pg-profile-page">
            <div className="row my-4">
                <div className="col-12">
                    <BankInfo/>
                </div>
            </div>
        </div>
    );
};

export {
    BankInfoScreen,
};
