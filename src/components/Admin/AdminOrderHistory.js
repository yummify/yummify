import React, {useEffect} from "react";
import { fetchAllOrdersAsync, selectOrders } from "../Order/orderSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ListGroup, Stack } from "react-bootstrap";



const AdminOrderHistory = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);

    useEffect(() => {
        dispatch(fetchAllOrdersAsync());
    }, [dispatch])

    return (
        <>
        <h2>Order History</h2>
        <ListGroup>
            {orders.map((order) => {
                return (
                    <ListGroup.Item>
                        <h4>Order # ## add order id{order.id}</h4>
                        <h6>Restaurant: ## use fetch to find the restaurant name</h6>
                        <p>Status: {order.status}</p>
                        <p>Ordered By: #### insert user</p>
                        <p>Pickup Time: {order.pickup}, ## ADD DATE</p>
                        <Stack direction="horizontal">
                            <h6 style={{textDecoration: 'line-through'}}>Original Price: ${order.originalPrice}</h6>
                            <div style={{margin: '5px'}}></div>
                            <h6> New Price: ${order.newPrice}</h6>
                        </Stack>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
        </>
    )
};

export default AdminOrderHistory;