import React, {useEffect} from 'react';  
import { fetchAllRestaurants, selectRestaurants } from './allRestaurantsSlice';
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap"


const AllRestaurants = () => {
    const dispatch = useDispatch();

    const restaurants = useSelector(selectRestaurants);

    useEffect(() => {
        dispatch(fetchAllRestaurants());
      }, [dispatch]);

    //ONLY RETURN ACCEPTED RESTAURANTS
    return (
        <>
        <h1>Yum</h1>
        {restaurants.map((restaurant) => {
            return <Card
                key={restaurant}
                // text={restaurant.toLowerCase() === 'light' ? 'dark' : 'white'}
                style={{ width: '25rem', backgroundColor: '#E5D4CE' }}
                            className="mb-2"
            >
                <Card.Header>{restaurant.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{restaurant.description}</Card.Title>
                  <Card.Text>
                        Open: {restaurant.open} until Close: {restaurant.close}
                    </Card.Text>
                    <Card.Text>
                        ::info from bags::  ::also image on rt::
                    </Card.Text>
                  
                </Card.Body>
              </Card>
        })}
        </>
    );
};

export default AllRestaurants;