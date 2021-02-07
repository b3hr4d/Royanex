import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import { IntlProps } from '../../index';
import {
    Market,
    RootState,
    selectCurrentMarket,
    selectMarkets,
    selectMarketTickers, Ticker,
} from '../../modules';


interface ReduxProps {
    currentMarket?: Market;
    markets: Market[];
    marketTickers: {
        [key: string]: Ticker,
    };
}

type Props = IntlProps & ReduxProps;

// tslint:disable no-any jsx-no-multiline-js
class HeaderToolbarContainer extends React.Component<Props> {
    public render() {

        return (
            <div className="pg-header__toolbar">
                    <Link to={'/dashboard'}>
                        <span>{this.translate('page.header.toolbar.dashboard')}</span>
                    </Link>
                    <Link to={'/fastOrder'}>
                        <span>{this.translate('page.header.toolbar.fastOrder')}</span>
                    </Link>
                    <Link to={'/wallets'}>
                        <span>{this.translate('page.header.toolbar.wallets')}</span>
                    </Link>
            </div>
        );
    }


    private translate = (id: string) => {
        return id ? this.props.intl.formatMessage({ id }) : '';
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    marketTickers: selectMarketTickers(state),
});


const HeaderToolbar = injectIntl(withRouter(connect(mapStateToProps, {})(HeaderToolbarContainer) as any) as any);

export {
    HeaderToolbar,
};
