import * as React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import { HistoryScreen } from '../../screens/History';
import { CurrencyInfo } from '../CurrencyInfo';
import { WalletItemProps } from '../WalletItem';

export interface CoinDetailsProps extends RouteComponentProps {
    wallet: WalletItemProps[];
    currency: string;
}

const CoinDetailsComnponent: React.FC<CoinDetailsProps> = (props) => {
    const { wallet, currency, history } = props;
    const adressCompiler = () => {
        const data = [
            { enName: currency, faName: wallet[0] ? wallet[0].name : '' },
        ];
        switch (currency) {
            case 'trx':
                data.push({
                    enName: 'usdt',
                    faName: 'تتر (ERC-20)',
                });
                break;
            case 'eth':
                data.push({
                    enName: 'usdtt',
                    faName: 'USDT TRC20',
                });
                break;
            case 'usdt':
                data.push({
                    enName: 'trx',
                    faName: 'Tron',
                });
                break;
            case 'usdtt':
                data.push({
                    enName: 'eth',
                    faName: 'اتریوم',
                });
                break;
            default:
                break;
        }

        return data;
    };
    const addressArray = adressCompiler();

    return (
        <Tabs
            defaultActiveKey={currency}
            id="tab-token"
            onSelect={(e) => history.push(e)}
        >
            {addressArray.map((item, i) => (
                <Tab
                    eventKey={item.enName}
                    title={item.faName}
                    key={i}
                    className="wallet-tab-content"
                >
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-sm-12">
                            <div className="card currencyInfo">
                                <CurrencyInfo currency={item.enName} />
                            </div>
                        </div>
                        <div className="col-sm-12 mt-4">
                            <HistoryScreen />
                        </div>
                    </div>
                </Tab>
            ))}
        </Tabs>
    );
};
export const CoinDetails = withRouter(CoinDetailsComnponent);
