import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupBagByRestAsync, selectBag, addBagAsync } from "./bagSlice";


import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'


//NOTE: expiration field is strictly date only
//TODO: 
//      image field needs adjustment -- doesn't take uploads; only string
//      default bag image is needed



const AddBagForm = (props) =>{

    const restId = props.restaurant;
    const [bagType, setBagType] = useState("");
    const [bagQuantity, setBagQuantity] = useState(1);
    const [bagOPrice, setBagOPrice] = useState(0);
    const [bagNPrice, setBagNPrice] = useState(0);
    const [bagPickup, setBagPickup] = useState("");
    const [bagExpire, setBagExpire] = useState("");
    const [bagImage, setBagImage] = useState("");
    
    const dispatch = useDispatch();
  
 
    const handleSubmit = (event)=>{
        event.preventDefault();
        const bag = {
            expiration: bagExpire,
            image: bagImage,
            newPrice: bagNPrice,
            originalPrice: bagOPrice,
            pickup: bagPickup,
            quantity: bagQuantity,
            type: bagType,
            restaurantId: restId,
        }
        
       
        dispatch(addBagAsync(bag));
        dispatch(fetchGroupBagByRestAsync(restId));
        setBagType("");
        setBagImage("");
        setBagQuantity(1);
        setBagOPrice(0);
        setBagNPrice(0);
        setBagPickup("");
        setBagExpire("");
        
    }
  
    return(
        <Card style={{padding: "10px",margin: "10px",}}>
            <Card.Header>Add Bag</Card.Header>
            <Form>
                <Form.Group className="bag-type-input">
                    <Form.Control type="string" placeholder="Type" onChange={(event)=> setBagType(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="image-input">
                    <Form.Control type="string" placeholder="Image PATH" onChange={(event)=> setBagImage(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="bag-quantity-input">
                    <Form.Control type="number" placeholder="Quantity" onChange={(event)=> setBagQuantity(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="bag-original-price-input">
                    <Form.Control type="number" placeholder="Original Price" onChange={(event)=> setBagOPrice(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="bag-reduced-price-input">
                    <Form.Control type="number" placeholder="Reduced Price" onChange={(event)=> setBagNPrice(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="pickup-input">
                    <Form.Control type="string" placeholder="Pickup Date/Time" onChange={(event)=> setBagPickup(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className="expiration-input">
                    <Form.Label>Expiration Date: </Form.Label>
                    <Form.Control type="date" placeholder="Expiration Date" onChange={(event)=> setBagExpire(event.target.value)}></Form.Control>
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">Submit</Button>
            </Form>
        </Card>
    );
}

export default AddBagForm;