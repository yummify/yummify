import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {auth} from "../../firebase/config";

import { fetchRestaurantAsync, selectRestaurant } from "./restaurantSlice";
import { useAuth } from "../../contexts/AuthContext";
import { fetchGroupBagByRestAsync, selectBag, addBagAsync } from "../Bag/bagSlice";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
import { ListGroup } from "react-bootstrap";

import AddBagForm from "../Bag/AddBagForm";
import EditBagForm from "../Bag/EditBagForm";

const RestaurantStore = () => {

    const testrest = "1iPuXMXLQiICpJ8zBhiB"
    /* const authRestaurant = useSelector(selectRestaurant);
    
    console.log("authrestaurant: ", authRestaurant);
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user?.userId)dispatch(fetchRestaurantAsync(user?.userId));
    },[dispatch, user]); */
    const dispatch = useDispatch();
    const bags = useSelector(selectBag);


    const checkActive = (expir, quant) =>{
        
        const parts = expir.split('-');
        const expdate = new Date(parts[0], parts[1]-1, parts[2]);
        
        const today = new Date();
   
        if(expdate.getTime() >= today.getTime() && quant > 0){
           return true;
        }
        else{
            return false;
        }
         
    }


    useEffect(()=>{
        dispatch(fetchGroupBagByRestAsync(testrest));
    },[dispatch]);

return(
    <Card>
        <Card.Title>Restaurant - Owner View</Card.Title>
        <Card.Text>
            hi. test card!
        </Card.Text>
        <AddBagForm restaurant={testrest}/>

        <Card style={{backgroundColor: "lightblue"}}>
            <Card.Title>Active Bags</Card.Title>
            
            <ListGroup>
                {bags.length > 0 ? bags.map((bag)=>{
                    if(checkActive(bag.expiration,bag.quantity)===true){
                        return(
                            
                        <ListGroup.Item eventKey={`${bag.id}`}> 
                            {bag.id}-{bag.type} SuperBag / expires: {bag.expiration} / quantity: {bag.quantity}
                            <Accordion defaultActiveKey="0">
                            <Accordion.Header>Edit Bag</Accordion.Header>
                            <Accordion.Body>
                                <EditBagForm bag={bag}/>
                            </Accordion.Body>
            
                            </Accordion>
                        </ListGroup.Item>
                    )}
                }): "No active bags"}
                
            </ListGroup>
        </Card>

        <Card style={{backgroundColor: "lightpink"}}>
            <Card.Title> Inactive Bags</Card.Title>
            <ListGroup>
                {bags.length > 0 ? bags.map((bag)=>{
                    if(checkActive(bag.expiration,bag.quantity)===false){
                        return(
                            
                        <ListGroup.Item eventKey={`${bag.id}`}> 
                            {bag.id}-{bag.type} SuperBag / expires: {bag.expiration} / quantity: {bag.quantity}
                            <Accordion defaultActiveKey="0">
                            <Accordion.Header>Edit Bag</Accordion.Header>
                            <Accordion.Body>
                                <EditBagForm bag={bag}/>
                            </Accordion.Body>
            
                            </Accordion>
                        </ListGroup.Item>
                    )}
                }): "No inactive bags"}
                </ListGroup>
        </Card>
        
    </Card>
)}


export default RestaurantStore;
