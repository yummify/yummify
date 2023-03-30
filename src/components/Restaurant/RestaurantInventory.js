import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";



import { selectRestaurant } from "./restaurantSlice";
import { useAuth } from "../../contexts/AuthContext";
import { fetchGroupBagByRestAsync, selectBag, deleteBagAsync } from "../Bag/bagSlice";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
import { ListGroup } from "react-bootstrap";

import AddBagForm from "../Bag/AddBagForm";
import EditBagForm from "../Bag/EditBagForm";



const RestaurantInventory = () => {

   
    const authRestaurant = useSelector(selectRestaurant);
    console.log("authrestaurant:", authRestaurant);
    const { user } = useAuth();
    
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (user?.userId) dispatch(fetchGroupBagByRestAsync(user?.userId));
    }, [dispatch, user?.userId]);
  
   
    

    const restaurantId = user?.userId;

    const deletethisbag = async (bagId)=>{
        try{
            await dispatch(deleteBagAsync(bagId));
            dispatch(fetchGroupBagByRestAsync(restaurantId))
        }catch(err){
            console.log(err);
        }
    }

    const bags = useSelector(selectBag);
    

    //to sort bags from array from active/inactive
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
        dispatch(fetchGroupBagByRestAsync(restaurantId));
    },[dispatch, restaurantId]);

return(
    <Card>
        <Card.Title>Restaurant - Owner View</Card.Title>
        <Card.Text>
            hi. test card!
            
        </Card.Text>
        
        <AddBagForm restaurant={restaurantId}/>
 
        <Card style={{backgroundColor: "lightblue"}}>
            <Card.Title>Active Bags</Card.Title>
            
            <ListGroup>
                {bags.length > 0 ? bags.map((bag)=>{
                    if(checkActive(bag.expiration,bag.quantity)===true){
                        return(
                            
                        <ListGroup.Item eventKey={`${bag.id}`}> 
                            {bag.id}-{bag.type} SuperBag / expires: {bag.expiration} / quantity: {bag.quantity} / {bag.restaurantId}
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Edit Bag </Accordion.Header>
                                    <Accordion.Body>
                                        <EditBagForm bag={bag}/>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Delete Bag </Accordion.Header>
                                    <Accordion.Body>
                                        <Button onClick={()=>{
                                            let id = bag.id;
                                            deletethisbag(id)}}>Delete Bag</Button>
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>
                        </ListGroup.Item>
                    )}
                    else{
                        return null;
                    }
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
                            {bag.id}-{bag.type} SuperBag / expires: {bag.expiration} / quantity: {bag.quantity} / / {bag.restaurantId}
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Edit Bag </Accordion.Header>
                                    <Accordion.Body>
                                        <EditBagForm bag={bag}/>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Delete Bag </Accordion.Header>
                                    <Accordion.Body>
                                        <Button onClick={()=>{
                                            let id = bag.id;
                                            deletethisbag(id)}}>Delete Bag</Button>
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>
                        </ListGroup.Item>
                    )}
                    else{
                        return null;
                    }
                }): "No inactive bags"}
                </ListGroup>
        </Card>
        
    </Card>
)}


export default RestaurantInventory;
