import * as React from 'react';
import { Button, Row, Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, RouterProps, withRouter } from 'react-router';
import { compose } from 'redux';
import {
    RootState,
    selectWalletAddress,
    selectWalletsAddressLoading,
    walletsAddressReFetch,
} from '../../modules';
import { HistoryScreen } from '../../screens/History';
import { CurrencyInfo } from '../CurrencyInfo';
import { WalletItemProps } from '../WalletItem';

export interface CoinDetailsProps extends RouteComponentProps {
    wallet: WalletItemProps[];
    currency: string;
    loading: boolean;
}
interface DispatchProps {
    fetchAddress: typeof walletsAddressReFetch;
}

type Props = CoinDetailsProps & DispatchProps & RouterProps;

const CoinDetailsComnponent: React.FC<Props> = (props) => {
    const { wallet, currency, history, location } = props;
    const adressCompiler = () => {
        const data = [
            {
                enName: currency,
                faName: wallet[0] ? wallet[0].name : 'loading...',
            },
        ];
        switch (currency) {
            case 'usdtt':
                data.push({
                    enName: 'usdt',
                    faName: 'تتر (TRC-20)',
                });
                data.reverse();
                break;
            case 'usdt':
                data.push({
                    enName: 'usdtt',
                    faName: 'تتر (ERC-20)',
                });
                break;
            default:
                break;
        }

        return data;
    };
    const addressArray = adressCompiler();

    const handleGenerateAddressProp = (curr: string) => {
        props.fetchAddress({ currency: curr });
    };

    React.useEffect(() => {
        if (!props.loading && currency !== 'تومان' && currency !== 'rls') {
            handleGenerateAddressProp(currency);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const tabChanger = (e) => {
        const currentPage = location.pathname.split('/').pop()!.toLowerCase();
        if (e !== currentPage) {
            history.push(e);
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

    return (
        <div className="flex flex-column cointdetail-container">
            <Row>
                <Button
                    onClick={() => history.push('/wallets')}
                    className="flex-shrink-1 wallet-back-button"
                >
                    <i className="fas fa-arrow-right" /> بازگشت به کیف
                </Button>
            </Row>
            {addressArray.length === 1 ? (
                renderCoins(addressArray[0])
            ) : (
                <Tabs
                    defaultActiveKey={currency}
                    id="tab-token"
                    onSelect={tabChanger}
                >
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
            )}
        </div>
    );
};
const mapStateToProps = (state: RootState) => ({
    address: selectWalletAddress(state),
    loading: selectWalletsAddressLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchAddress: (address) => dispatch(walletsAddressReFetch(address)),
});

export const CoinDetails = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(CoinDetailsComnponent) as any; // tslint:disable-line
