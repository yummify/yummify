import React, {useEffect} from 'react';  
import { fetchSingleRestaurant, selectRestaurant } from './singleRestaurantSlice';
import { useSelector, useDispatch } from "react-redux";


const SingleRestaurant = () => {
    const dispatch = useDispatch();

    const restaurant = useSelector(selectRestaurant);

    useEffect(() => {
        dispatch(fetchSingleRestaurant());
      }, [dispatch, restaurant]);

    return (
        <>
        <h1>Yum</h1>
        <div>
            Hawthorne Cafe: {restaurant.description}
        </div>

        </>
    )
};

export default SingleRestaurant;