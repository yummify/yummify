import React, {useEffect} from 'react';  
import { fetchAllRestaurants, selectRestaurants } from './allRestaurantsSlice';
import { useSelector, useDispatch } from "react-redux";


const AllRestaurants = () => {
    const dispatch = useDispatch();

    const restaurants = useSelector(selectRestaurants);

    useEffect(() => {
        dispatch(fetchAllRestaurants());
      }, [dispatch]);

    return (
        <>
        <h1>Yum</h1>
        {/* <p>{restaurants}</p> */}

        </>
    )
};

export default AllRestaurants;