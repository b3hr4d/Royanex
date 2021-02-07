import * as React from 'react';
import {HistoryScreen} from '../../screens/History';
import {CurrencyInfo} from '../CurrencyInfo';
import {WalletItemProps} from '../WalletItem';


export interface CoinDetailsProps {
    wallet: WalletItemProps[];
    currency: string;
    address: string;
}

const CoinDetails: React.FunctionComponent<CoinDetailsProps> = (props: CoinDetailsProps) => {
    const {wallet, address} = props;

    return (
        <div className="row justify-content-center">
            <div className="col-lg-10 col-sm-12">
                <div className="card currencyInfo">
                    <CurrencyInfo wallet={wallet[0]} address={address}/>
                </div>
            </div>
            <div className="col-sm-12 mt-4">
                <HistoryScreen/>
            </div>
        </div>
    );
};

export {
    CoinDetails,
};
