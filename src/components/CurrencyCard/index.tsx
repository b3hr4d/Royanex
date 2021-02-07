import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { Ticker } from '../../modules/public/markets';

export interface CurrencyCardProps {
    icon: string;
    name: string;
    market: string;
    bgColor: string;
    price: string;
    data: number[];
    labels: string[];
    tickers: Ticker;
}

const CurrencyCard: React.FunctionComponent<CurrencyCardProps> = (
    props: CurrencyCardProps,
) => {
    const { icon, name, bgColor, price, market, tickers } = props;

    return (
        <div className="col-sm-6 col-lg-3 col-6 text-right carbody-price-box currencyCard my-2 px-1 px-md-2">
            <Link to={`/trading/${market}`}>
                <div
                    className="card text-white rounded pb-2"
                    style={{ background: `${bgColor}` }}
                >
                    <div className="card-body pb-0 d-flex justify-content-between align-items-start">
                        <div>
                            <b className="d-block h3 font-weight-bolder">
                                {name}
                            </b>
                            <h5 className="d-inline-block my-2">
                                {
                                    <NumberFormat
                                        value={tickers ? tickers.last : price}
                                        thousandSeparator
                                        displayType="text"
                                    />
                                }
                            </h5>
                            <span>{tickers ? ' تومان' : ' دلار'}</span>
                            {tickers ? (
                                <>
                                    <span
                                        className={`rounded mx-1 mx-md-2 p-md-1 p-1  ${
                                            /-/g.test(
                                                tickers.price_change_percent,
                                            )
                                                ? 'bg-danger'
                                                : 'bg-success'
                                        }`}
                                    >
                                        {tickers.price_change_percent}
                                    </span>
                                    <br />
                                    <h5 className="d-inline-block my-2">
                                        {
                                            <NumberFormat
                                                value={tickers.high}
                                                thousandSeparator
                                                displayType="text"
                                            />
                                        }
                                    </h5>
                                    <span> تومان حداکثر</span>
                                    <br />
                                    <h5 className="d-inline-block my-2">
                                        {
                                            <NumberFormat
                                                value={tickers.low}
                                                thousandSeparator
                                                displayType="text"
                                            />
                                        }
                                    </h5>
                                    <span> تومان حداقل</span>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="icon-wrapper">
                            <img
                                src={require(`../../../node_modules/cryptocurrency-icons/svg/white/${icon}`)}
                                alt="icon"
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export { CurrencyCard };
