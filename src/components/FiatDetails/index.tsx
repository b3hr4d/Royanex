import * as React from 'react';
import { HistoryScreen } from '../../screens/History';
import { CurrencyInfo } from '../CurrencyInfo';
import { WalletItemProps } from '../WalletItem';

export interface FiatDetailsProps {
    wallet: WalletItemProps[];
    currency: string;
}

/**
 * Component to display bank account details which can be used for a
 * deposit
 */
const FiatDetails: React.FunctionComponent<FiatDetailsProps> = (
    props: FiatDetailsProps,
) => {
    const { wallet } = props;

    return (
        <div className="row justify-content-center">
            <div className="col-lg-10 col-sm-12">
                <div className="card">
                    <CurrencyInfo
                        wallet={wallet[0]}
                        currency={wallet[0].name}
                    />
                </div>
            </div>
            <div className="col-sm-12 mt-4">
                <HistoryScreen />
            </div>
        </div>
    );
};

export { FiatDetails };
