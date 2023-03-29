import React, {useEffect} from 'react';  
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { fetchAllRestaurants, selectRestaurants } from './allRestaurantsSlice';


const AllRestaurants = () => {
    //select the restaurants currently reflected in state
    const restaurants = useSelector(selectRestaurants);

    //dispatch thunk to fetch restaurants from db
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllRestaurants());
      }, [dispatch]);
      
    //component
    return (
        <>
        <h1>Yummify</h1>
        
        {restaurants.map((restaurant) => {
            if(restaurant.status === 'approved')
            return <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/restaurant/${restaurant.id}` }>
            <Card
                key={restaurant.id}
                style={{ width: '30rem', backgroundColor: '#E5D4CE' }}
                            className="mb-2"
            >
                <Card.Header>{restaurant.restaurantName}</Card.Header>
                <Card.Body>
                    <Card.Title>{restaurant.description}</Card.Title>
                    <Card.Text>Address: {restaurant.address}</Card.Text>
                    <Card.Img src={restaurant.image?.[1]} />
                    <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Link>
            
        })}
        </>
    );
};

export default AllRestaurants;