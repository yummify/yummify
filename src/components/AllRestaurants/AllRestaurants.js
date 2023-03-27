import React, {useEffect} from 'react';  
import { fetchAllRestaurants, selectRestaurants } from './allRestaurantsSlice';
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const AllRestaurants = () => {
    const dispatch = useDispatch();

    const restaurants = useSelector(selectRestaurants);

    useEffect(() => {
        dispatch(fetchAllRestaurants());
      }, [dispatch]);

    //ONLY RETURN ACCEPTED RESTAURANTS
    return (
        <>
        <h1>Yummify</h1>
        {/* add filter/search bar here */}
        {restaurants.map((restaurant) => {
            if(restaurant.status === 'approved')
            return <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/restaurant/${restaurant.id}` }>
            <Card
                key={restaurant.id}
                style={{ width: '25rem', backgroundColor: '#E5D4CE' }}
                            className="mb-2"
            >
                <Card.Header>{restaurant.restaurantName}</Card.Header>
                <Card.Body>
                    <Card.Title>{restaurant.description}</Card.Title>
                    <Card.Text>Address: {restaurant.address}</Card.Text>
                    {/* <Card.Img src={restaurant.image} /> */}
                    <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Link>
            
        })}
        </>
    );
};

export default AllRestaurants;