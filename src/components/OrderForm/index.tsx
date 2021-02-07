import classnames from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import { FilterPrice, PriceValidation } from '../../filters';
import { cleanPositiveFloatInput, precisionRegExp } from '../../helpers';
import { Currency } from '../../modules/public/currencies';
import { CryptoIcon } from '../CryptoIcon';
import { Decimal } from '../Decimal';
import { DropdownComponent } from '../Dropdown';
import { OrderProps } from '../Order';
import { OrderInput } from '../OrderInput';
import { PercentageButton } from '../PercentageButton';

type OnSubmitCallback = (order: OrderProps) => void;
type DropdownElem = number | string | React.ReactNode;
type FormType = 'buy' | 'sell';

export interface OrderFormProps {
    /**
     * Price that is applied during total order amount calculation when type is Market
     */
    priceMarketSell: number;
    priceMarketBuy: number;
    /**
     * Price that is applied during total order amount calculation when type is Market
     */
    priceLimit?: number;
    /**
     * Type of form, can be 'buy' or 'cell'
     */
    type: FormType;
    /**
     * Available types of order
     */
    orderTypes: DropdownElem[];
    /**
     * Available types of order without translations
     */
    orderTypesIndex: DropdownElem[];
    /**
     * Additional class name. By default element receives `cr-order` class
     * @default empty
     */
    className?: string;
    /**
     * Name of currency for price field
     */
    from: string;
    /**
     * Name of currency for amount field
     */
    to: string;
    /**
     * Amount of money in a wallet
     */
    available?: number;
    /**
     * Precision of amount, total, available, fee value
     */
    currentMarketAskPrecision: number;
    /**
     * Precision of price value
     */
    currentMarketBidPrecision: number;
    /**
     * Whether order is disabled to execute
     */
    disabled?: boolean;
    /**
     * Callback that is called when form is submitted
     */
    onSubmit: OnSubmitCallback;
    /**
     * start handling change price
     */
    listenInputPrice?: () => void;
    totalPrice: number;
    amount: string;
    currentMarketFilters: FilterPrice[];
    handleAmountChange: (amount: string, type: FormType) => void;
    handleChangeAmountByButton: (
        value: number,
        orderType: string | React.ReactNode,
        price: string,
        type: string,
    ) => void;
    translate: (id: string, value?: any) => string;
    proTrading?: boolean;
    currencies?: Currency[];
    onCoinSelectChange?: (e: Event) => void;
    selectedCoin?: {
        id: string;
    };
    mainMarket?: boolean;
    askFee: number;
    bidFee: number;
}

interface OrderFormState {
    orderType: string | React.ReactNode;
    price: string;
    priceMarketSell: number;
    priceMarketBuy: number;
    isPriceValid: PriceValidation;
    amountFocused: boolean;
    totalAmountFocused: boolean;
    priceFocused: boolean;
    totalAmount: string;
}

const handleSetValue = (
    value: string | number | undefined,
    defaultValue: string,
) => {
    const splitValue = value ? value.toString().split('.') : '';
    const newValue =
        splitValue.length > 1
            ? // tslint:disable-next-line:prefer-template
              splitValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
              '.' +
              splitValue[1]
            : splitValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return newValue || defaultValue;
};

const customStyle = {
    control: (styles) => ({ ...styles, minHeight: 'auto', height: '50px' }),
    dropdownIndicator: (styles) => ({ ...styles, padding: '0 8px' }),
    valueContainer: (styles) => ({ ...styles, height: '29px' }),
    input: (styles) => ({ ...styles, padding: '0', margin: '0' }),
    option: (styles) => ({ ...styles, color: 'black', padding: '4px 8px' }),
    menu: (styles) => ({ ...styles, margin: '4px 0' }),
    singleValue: (styles) => ({ ...styles, span: { display: 'none' } }),
};

export class OrderForm extends React.PureComponent<
    OrderFormProps,
    OrderFormState
> {
    constructor(props: OrderFormProps) {
        super(props);
        this.state = {
            orderType: props.proTrading ? 'Limit' : 'Market',
            price: '',
            totalAmount: '',
            priceMarketSell: this.props.priceMarketSell,
            priceMarketBuy: this.props.priceMarketBuy,
            isPriceValid: {
                valid: true,
                priceStep: 0,
            },
            priceFocused: false,
            amountFocused: false,
            totalAmountFocused: false,
        };
    }

    public UNSAFE_componentWillReceiveProps(next: OrderFormProps) {
        const nextPriceLimitTruncated = Decimal.format(
            next.priceLimit,
            this.props.currentMarketBidPrecision,
        );

        if (
            this.state.orderType === 'Limit' &&
            next.priceLimit &&
            nextPriceLimitTruncated !== this.state.price
        ) {
            this.handlePriceChange(nextPriceLimitTruncated);
        }

        if (this.state.priceMarketSell !== next.priceMarketSell) {
            this.setState({
                priceMarketSell: next.priceMarketSell,
            });
        }
        if (this.state.priceMarketBuy !== next.priceMarketBuy) {
            this.setState({
                priceMarketBuy: next.priceMarketBuy,
            });
        }
    }

    public render() {
        const {
            type,
            orderTypes,
            className,
            from,
            to,
            available,
            currentMarketAskPrecision,
            currentMarketBidPrecision,
            totalPrice,
            amount,
            translate,
            proTrading,
            selectedCoin,
            mainMarket,
            askFee,
            bidFee,
        } = this.props;
        const {
            orderType,
            price,
            priceMarketSell,
            priceMarketBuy,
            isPriceValid,
            priceFocused,
            amountFocused,
            totalAmountFocused,
            totalAmount,
        } = this.state;
        const safeAmount = Number(amount) || 0;
        const safePriceSell = totalPrice / Number(amount) || priceMarketSell;
        const safePriceBuy = totalPrice / Number(amount) || priceMarketBuy;
        const total =
            orderType === 'Market'
                ? totalPrice
                : safeAmount * (Number(price) || 0);

        const amountPercentageArray = [0.25, 0.5, 0.75, 1];

        const availablePrecision =
            type === 'buy'
                ? currentMarketBidPrecision
                : currentMarketAskPrecision;
        const availableCurrency = type === 'buy' ? from : to;

        const priceErrorClass = classnames('error-message', {
            'error-message--visible': priceFocused && !isPriceValid.valid,
        });

        const priceText = this.props.translate(
            'page.body.trade.header.newOrder.content.price',
        );
        const amountText = this.props.translate(
            'page.body.trade.header.newOrder.content.amount',
        );
        const totalAmountText = this.props.translate(
            'page.body.trade.header.newOrder.content.totalAmount',
        );
        const submitButtonText = translate(
            `page.body.trade.header.newOrder.content.tabs.${type}`,
        );

        return (
            <div
                className={classnames('cr-order-form', className)}
                onKeyPress={this.handleEnterPress}
            >
                {proTrading && !mainMarket ? (
                    <div className="cr-order-item">
                        <div className="cr-order-item__dropdown__label">
                            {translate(
                                'page.body.trade.header.newOrder.content.orderType',
                            )}
                        </div>
                        <DropdownComponent
                            list={orderTypes}
                            onSelect={this.handleOrderTypeChange}
                            placeholder=""
                        />
                    </div>
                ) : !mainMarket ? (
                    <div className="cr-order-item">
                        {this.renderCoinsSelect()}
                    </div>
                ) : null}

                {orderType === 'Limit' ? (
                    <div className="cr-order-item">
                        <OrderInput
                            currency={from}
                            label={priceText}
                            placeholder={priceText}
                            value={price || ''}
                            isFocused={priceFocused}
                            isWrong={!isPriceValid.valid}
                            handleChangeValue={this.handlePriceChange}
                            handleFocusInput={this.handleFieldFocus}
                        />
                        <div className={priceErrorClass}>
                            {translate(
                                'page.body.trade.header.newOrder.content.filterPrice',
                                { priceStep: isPriceValid.priceStep },
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="cr-order-item">
                        <div className="cr-order-input">
                            <fieldset className="cr-order-input__fieldset">
                                <legend
                                    className={
                                        'cr-order-input__fieldset__label'
                                    }
                                >
                                    {priceText}
                                </legend>
                                <div className="cr-order-input__fieldset__input">
                                    <span className="cr-order-input__fieldset__input__price">
                                        {type === 'sell'
                                            ? handleSetValue(
                                                  Decimal.format(
                                                      safePriceSell,
                                                      currentMarketBidPrecision,
                                                  ),
                                                  '0',
                                              )
                                            : handleSetValue(
                                                  Decimal.format(
                                                      safePriceBuy,
                                                      currentMarketBidPrecision,
                                                  ),
                                                  '0',
                                              )}
                                    </span>
                                    &asymp;
                                </div>
                            </fieldset>
                            <div className="cr-order-input__crypto-icon">
                                {from === 'rls' ? 'تومان' : from.toUpperCase()}
                            </div>
                        </div>
                    </div>
                )}
                <div className="cr-order-item">
                    <OrderInput
                        currency={
                            proTrading
                                ? to
                                : selectedCoin
                                ? selectedCoin.id
                                : ''
                        }
                        label={amountText}
                        placeholder={amountText}
                        value={amount || ''}
                        isFocused={amountFocused}
                        handleChangeValue={this.handleAmountChange}
                        handleFocusInput={this.handleFieldFocus}
                    />
                </div>
                {!proTrading && (
                    <div
                        className="cr-order-item"
                        style={{
                            filter: `opacity(${type === 'sell' ? '.5' : '1'})`,
                        }}
                    >
                        <OrderInput
                            currency={from}
                            label={totalAmountText}
                            placeholder={totalAmountText}
                            value={
                                totalAmountFocused ? totalAmount : total || ''
                            }
                            isFocused={totalAmountFocused}
                            handleChangeValue={this.handleTotalAmountChange}
                            handleFocusInput={this.handleFieldFocus}
                            isDisable={type === 'sell'}
                        />
                    </div>
                )}
                <div className="cr-order-item">
                    <div className="cr-order-item__percentage-buttons">
                        {proTrading &&
                            amountPercentageArray.map((value, index) => (
                                <PercentageButton
                                    value={value}
                                    key={index}
                                    onClick={this.handleChangeAmountByButton}
                                />
                            ))}
                    </div>
                </div>
                <div className="cr-order-item">
                    <div className="cr-order-item__total">
                        <label className="cr-order-item__total__label">
                            {translate(
                                `page.body.trade.header.newOrder.content.total`,
                            )}
                        </label>
                        <div className="cr-order-item__total__content">
                            {orderType === 'Limit' ? (
                                <span className="cr-order-item__total__content__amount">
                                    <NumberFormat
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        value={total ? total.toFixed(0) : total}
                                    />
                                </span>
                            ) : (
                                <span className="cr-order-item__total__content__amount">
                                    <NumberFormat
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        value={total ? total.toFixed(0) : total}
                                    />
                                </span>
                            )}
                            <span className="cr-order-item__total__content__currency">
                                {from === 'rls' ? ' تومان' : from.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cr-order-item">
                    <div className="cr-order-item__available">
                        <label className="cr-order-item__available__label">
                            {translate(
                                'page.body.trade.header.newOrder.content.available',
                            )}
                        </label>
                        <div
                            className="cr-order-item__available__content"
                            onClick={
                                !proTrading
                                    ? this.handleChangeAmountByButton.bind(
                                          null,
                                          1,
                                      )
                                    : () => null
                            }
                            style={
                                !proTrading ? { cursor: 'pointer' } : undefined
                            }
                        >
                            <span className="cr-order-item__available__content__amount">
                                <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={
                                        available
                                            ? Decimal.format(
                                                  available,
                                                  availablePrecision,
                                              )
                                            : 0
                                    }
                                />
                            </span>
                            <span className="cr-order-item__available__content__currency float-left mr-2">
                                {available
                                    ? availableCurrency === 'rls'
                                        ? ' تومان'
                                        : availableCurrency.toUpperCase()
                                    : ''}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cr-order-item">
                    <div className="cr-order-item__available">
                        <label className="cr-order-item__available__label">
                            {translate(
                                'page.body.trade.header.newOrder.content.fee',
                            )}
                        </label>
                        <div className="cr-order-item__available__content">
                            <span className="cr-order-item__available__content__amount">
                                <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={
                                        type === 'buy'
                                            ? (
                                                  Number(askFee) *
                                                  Number(amount)
                                              ).toFixed(
                                                  currentMarketAskPrecision,
                                              )
                                            : (
                                                  Number(askFee) * Number(total)
                                              ).toFixed(0)
                                    }
                                />
                            </span>
                            <span className="cr-order-item__available__content__currency float-left mr-2">
                                {type === 'sell'
                                    ? from === 'rls'
                                        ? ' تومان'
                                        : from.toUpperCase()
                                    : to === 'rls'
                                    ? ' تومان'
                                    : to.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cr-order-item">
                    <div className="cr-order-item__available">
                        <label className="cr-order-item__available__label">
                            {translate(
                                'page.body.trade.header.newOrder.content.receive',
                            )}
                        </label>
                        <div className="cr-order-item__available__content">
                            <span className="cr-order-item__available__content__amount">
                                <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    value={
                                        type === 'buy'
                                            ? Number(amount) -
                                              Number(askFee) * Number(amount)
                                            : (
                                                  Number(total) -
                                                  Number(bidFee) * Number(total)
                                              ).toFixed(0)
                                    }
                                />
                            </span>
                            <span className="cr-order-item__available__content__currency float-left mr-2">
                                {type === 'sell'
                                    ? from === 'rls'
                                        ? ' تومان'
                                        : from.toUpperCase()
                                    : to === 'rls'
                                    ? ' تومان'
                                    : to.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cr-order-item">
                    <Button
                        block={true}
                        className="btn-block mr-1 mt-1 btn-lg"
                        disabled={this.checkButtonIsDisabled()}
                        onClick={this.handleSubmit}
                        size="lg"
                        variant={type === 'buy' ? 'success' : 'danger'}
                    >
                        {submitButtonText || type}
                    </Button>
                </div>
            </div>
        );
    }

    private handleOrderTypeChange = (index: number) => {
        const { orderTypesIndex } = this.props;
        this.setState({
            orderType: orderTypesIndex[index],
        });
    };

    private renderCoinsSelect = () => {
        const selectOptions = [] as any;
        // @ts-ignore
        this.props.currencies.forEach((name, key) => {
            if (name.id !== 'rls') {
                selectOptions.push({
                    value: key,
                    label: (
                        <>
                            <CryptoIcon code={name.id} />
                            {name.name}
                        </>
                    ),
                    name: name.name,
                    id: name.id,
                    address: name.explorer_address,
                });
            }
        });

        return (
            <Select
                styles={customStyle}
                options={selectOptions}
                value={selectOptions.filter(
                    (e) =>
                        e.id ===
                        (this.props.selectedCoin &&
                        this.props.selectedCoin.id !== ''
                            ? this.props.selectedCoin.id
                            : 'btc'),
                )}
                placeholder={this.props.translate(
                    'page.body.fastOrder.selectPlaceholder',
                )}
                className="w-100"
                classNamePrefix="coinSelect"
                onChange={this.handleCoinSelectChange}
            />
        );
    };

    private handleCoinSelectChange = (e) => {
        this.handleAmountChange('0');
        if (this.props.onCoinSelectChange) {
            this.props.onCoinSelectChange(e);
        }
    };

    private handleFieldFocus = (field: string | undefined) => {
        const { totalPrice, amount } = this.props;
        const { price, orderType } = this.state;
        const priceText = this.props.translate(
            'page.body.trade.header.newOrder.content.price',
        );
        const amountText = this.props.translate(
            'page.body.trade.header.newOrder.content.amount',
        );
        const totalAmountText = this.props.translate(
            'page.body.trade.header.newOrder.content.totalAmount',
        );
        const safeAmount = Number(amount) || 0;
        const total =
            orderType === 'Market'
                ? totalPrice
                : safeAmount * (Number(price) || 0);

        switch (field) {
            case priceText:
                this.setState((prev) => ({
                    priceFocused: !prev.priceFocused,
                }));
                this.props.listenInputPrice && this.props.listenInputPrice();
                break;
            case amountText:
                this.setState((prev) => ({
                    amountFocused: !prev.amountFocused,
                }));
                break;
            case totalAmountText: {
                if (total !== 0) {
                    this.setState({
                        totalAmount: total.toString(),
                    });
                }
                this.setState((prev) => ({
                    totalAmountFocused: !prev.totalAmountFocused,
                }));
                break;
            }

            default:
                break;
        }
    };

    private handlePriceChange = (value: string) => {
        const { currentMarketBidPrecision } = this.props;
        const convertedValue = cleanPositiveFloatInput(String(value));
        if (convertedValue.match(precisionRegExp(currentMarketBidPrecision))) {
            this.setState({
                price: convertedValue,
                isPriceValid: {
                    valid: true,
                    priceStep: 0,
                },
            });
        }

        this.props.listenInputPrice && this.props.listenInputPrice();
    };

    private handleAmountChange = (value: string) => {
        const { currentMarketAskPrecision } = this.props;
        const convertedValue = cleanPositiveFloatInput(String(value));
        if (convertedValue.match(precisionRegExp(currentMarketAskPrecision))) {
            this.props.handleAmountChange(convertedValue, this.props.type);
        }
    };

    private handleTotalAmountChange = (value: string) => {
        const { priceMarketBuy } = this.state;
        const { type, currentMarketAskPrecision } = this.props;

        const valueNumber = Number(value.replace(/,/g, ''));
        const amount = valueNumber / priceMarketBuy;
        this.props.handleAmountChange(
            amount.toFixed(currentMarketAskPrecision).toString(),
            type,
        );
        this.setState({
            totalAmount: value,
        });
    };

    private handleChangeAmountByButton = (value: number) => {
        const { orderType, price } = this.state;

        this.props.handleChangeAmountByButton(
            value,
            orderType,
            price,
            this.props.type,
        );
    };

    private handleSubmit = () => {
        const { available, type, amount } = this.props;
        const {
            price,
            priceMarketSell,
            priceMarketBuy,
            orderType,
        } = this.state;

        const order = {
            type,
            orderType,
            amount,
            price:
                orderType === 'Market'
                    ? orderType === 'sell'
                        ? priceMarketSell
                        : priceMarketBuy
                    : price,
            available: available || 0,
        };

        this.props.onSubmit(order);
        // this.handlePriceChange('');
        this.props.handleAmountChange('', this.props.type);
    };

    private checkButtonIsDisabled = (): boolean => {
        const { disabled, available, amount, totalPrice } = this.props;
        const {
            isPriceValid,
            orderType,
            priceMarketSell,
            priceMarketBuy,
            price,
        } = this.state;
        const safePrice =
            totalPrice / Number(amount) || orderType === 'sell'
                ? priceMarketSell
                : priceMarketBuy;

        const invalidAmount = Number(amount) <= 0;
        const invalidLimitPrice =
            orderType === 'Limit' &&
            (Number(price) <= 0 || !isPriceValid.valid);

        const invalidMarketPrice = safePrice <= 0 && orderType === 'Market';

        return (
            disabled ||
            !available ||
            invalidAmount ||
            invalidLimitPrice ||
            invalidMarketPrice
        );
    };

    private handleEnterPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            this.handleSubmit();
        }
    };
}
