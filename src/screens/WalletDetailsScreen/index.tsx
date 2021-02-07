import * as React from 'react';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {RouterProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {CoinDetails, FiatDetails, WalletItemProps} from '../../components';
import {IntlProps} from '../../index';
import {
    RootState,
    selectWalletAddress,
    selectWallets,
    walletsAddressFetch,
    walletsFetch,
} from '../../modules';


interface ReduxProps {
    selectedWalletAddress: string;
    wallets: WalletItemProps[];
}

interface DispatchProps {
    fetchWallets: typeof walletsFetch;
    fetchAddress: typeof walletsAddressFetch;
}

interface ComponentProps {
    match: {
        params: {
            type: string;
        },
    };
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps & ComponentProps ;

class WalletDetails extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.props.fetchWallets();
    }

    public componentDidMount() {
        this.props.fetchWallets();
    }

    public render() {
        const type = this.props.match.params.type;
        const {wallets, selectedWalletAddress} = this.props;
        // @ts-ignore
        const wallet = wallets.filter(e => (e.currency === type.toLowerCase()));
        if (wallets.length && selectedWalletAddress === '' && wallet[0].type !== 'fiat') {
            this.props.fetchAddress({currency: type.toLowerCase()});
        }

        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-sm-12">
                            {
                                type === 'USD'
                                    ? <FiatDetails wallet={wallet} currency={type}/>
                                    : <CoinDetails wallet={wallet} currency={type} address={selectedWalletAddress}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state: RootState): ReduxProps => ({
    selectedWalletAddress: selectWalletAddress(state),
    wallets: selectWallets(state),
});

const mapDispatchToProps = dispatch => ({
    fetchWallets: () => dispatch(walletsFetch()),
    fetchAddress: ({currency}) => dispatch(walletsAddressFetch({currency})),
});

export const WalletDetailsScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(WalletDetails) as any; // tslint:disable-line
