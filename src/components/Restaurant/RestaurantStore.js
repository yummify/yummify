import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";


import { fetchRestaurantAsync, selectRestaurant } from "./restaurantSlice";
import { useAuth } from "../../contexts/AuthContext";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'

import AddBagForm from "../Bag/AddBagForm";
import EditBagForm from "../Bag/EditBagForm";

const RestaurantStore = () => {

    const testrest = "4RF6IzmvymuAC4tY1b75"
    /* const authRestaurant = useSelector(selectRestaurant);
    
    console.log("authrestaurant: ", authRestaurant);
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user?.userId)dispatch(fetchRestaurantAsync(user?.userId));
    },[dispatch, user]); */

return(
    <Card>
        <Card.Title>Restaurant - Owner View</Card.Title>
        <Card.Text>
            hi. test card!
        </Card.Text>
        <AddBagForm restaurant={testrest}/>

        <Card style={{backgroundColor: "lightblue"}}>
            <Card.Title> Active Bags</Card.Title>
            <Card.Text>
                this is where I would put active bags
            </Card.Text>
            <Card>

            </Card>
        </Card>

        <Card style={{backgroundColor: "lightpink"}}>
            <Card.Title> Inactive Bags</Card.Title>
            <Card.Text>
                this is where I would put inactive bags
            </Card.Text>
        </Card>
        <Accordion defaultActiveKey="0">
            <Accordion.Header>Edit Bag</Accordion.Header>
            <Accordion.Body>
            <   EditBagForm restaurant={testrest}/>
            </Accordion.Body>
            
        </Accordion>
    </Card>
)}


export default RestaurantStore;
