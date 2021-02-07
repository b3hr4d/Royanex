import * as React from 'react';
import { useSelector } from 'react-redux';
import { OrderBook, OrderComponent } from '../../../../containers';
import { selectUserLoggedIn } from '../../../../modules';
import { OpenOrders } from '../../index';

const CreateOrderComponent = props => {
    const userLoggedIn = useSelector(selectUserLoggedIn);

    return (
        <div className="pg-mobile-create-order">
            <div className="pg-mobile-create-order__row-double">
                <OrderComponent proTrading={true} defaultTabIndex={props.currentOrderTypeIndex} />
                <div className="order-book-title text-center w-100">سفارشات ثبت شده</div>
                <OrderBook />
            </div>
            {userLoggedIn ? <OpenOrders /> : null}
        </div>
    );
};

export const CreateOrder = React.memo(CreateOrderComponent);
