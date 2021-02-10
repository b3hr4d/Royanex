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
    const { wallet, currency, history, location } = props;
    const adressCompiler = () => {
        const data = [
            {
                enName: currency,
                faName: wallet[0] ? wallet[0].name : 'loading',
            },
        ];
        switch (currency) {
            case 'usdtt':
                data.push({
                    enName: 'usdt',
                    faName: 'تتر (ERC-20)',
                });
                break;
            case 'usdt':
                data.push({
                    enName: 'usdtt',
                    faName: 'USDT TRC20',
                });
                break;
            default:
                break;
        }

        return data;
    };
    const addressArray = adressCompiler();

    const tabChanger = (e) => {
        const currentPage = location.pathname.split('/').pop()!.toLowerCase();
        if (e !== currentPage) {
            history.push(e);
            history.go(0);
        }
    };
    const renderCoins = (item) => (
        <div className="row justify-content-center">
            <div className="col-lg-10 col-sm-12">
                <div className="card currencyInfo">
                    <CurrencyInfo wallet={wallet[0]} currency={item.enName} />
                </div>
            </div>
            <div className="col-sm-12 mt-4">
                <HistoryScreen />
            </div>
        </div>
    );

    return addressArray.length === 1 ? (
        renderCoins(addressArray[0])
    ) : (
        <Tabs defaultActiveKey={currency} id="tab-token" onSelect={tabChanger}>
            {addressArray.map((item, i) => (
                <Tab
                    eventKey={item.enName}
                    title={item.faName}
                    key={i}
                    className="wallet-tab-content"
                >
                    {renderCoins(item)}
                </Tab>
            ))}
        </Tabs>
    );
};
export const CoinDetails = withRouter(CoinDetailsComnponent);
