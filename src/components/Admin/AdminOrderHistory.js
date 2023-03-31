import React, {useEffect} from "react";
import { fetchAllOrdersAsync, selectOrders } from "../Order/orderSlice";
import { fetchAllRestaurants } from "../AllRestaurants/allRestaurantsSlice";
import { selectRestaurants } from "../AllRestaurants/allRestaurantsSlice";
import { selectUsers, fetchUsersAsync } from "../Users/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ListGroup, Stack } from "react-bootstrap";

const AdminOrderHistory = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const restaurants = useSelector(selectRestaurants);
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(fetchAllOrdersAsync());
        dispatch(fetchAllRestaurants());
        dispatch(fetchUsersAsync());
    }, [dispatch])

    return (
        <>
        <h2>Order History</h2>
        <ListGroup>
            {orders.map((order) => {
                const restId = order.restaurantId;
                const rest = restaurants.find((rest) => rest.id === restId);
                const userId = order.userId;
                const orderUser = users.find((user) => user.userId === userId);

                return (
                    <ListGroup.Item key={order.id}>
                        <h4>Order #{order.id}</h4>
                        <h6>Restaurant: {rest?.restaurantName}</h6>
                        <p>Status: {order.status}</p>
                        <p>Ordered By:{orderUser?.data.name}</p>
                        <p>Pickup Time: {order.pickup}, on {order.expiration}</p>
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