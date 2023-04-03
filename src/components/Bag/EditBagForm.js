import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { editBagAsync,  fetchGroupBagByRestAsync } from "./bagSlice";

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



//NOTE: expiration field is strictly date only
//TODO: 
//      image field needs adjustment -- doesn't take uploads; only string
//      default bag image is needed
const EditBagForm = (props) =>{
    
    const bagRef = props.bag.id;
    const bagRID = props.bag.restaurantId;

    const {expiration, image, newPrice, originalPrice,pickup,quantity,type} = props.bag;

    const [bagType, setBagType] = useState(type);
    const [bagQuantity, setBagQuantity] = useState(quantity);
    const [bagOPrice, setBagOPrice] = useState(originalPrice);
    const [bagNPrice, setBagNPrice] = useState(newPrice);
    const [bagPickup, setBagPickup] = useState(pickup);
    const [bagExpire, setBagExpire] = useState(expiration);
    const [bagImage, setBagImage] = useState(image);
    
    const dispatch = useDispatch();

   

    const handleSubmit = (event)=>{
        event.preventDefault();
      
        const updatebag = {
            expiration: bagExpire,
            image: bagImage,
            newPrice: bagNPrice,
            originalPrice: bagOPrice,
            pickup: bagPickup,
            quantity: bagQuantity,
            type: bagType,
            id: bagRef
        }
        
        dispatch(editBagAsync(updatebag ))
        dispatch(fetchGroupBagByRestAsync(bagRID));
        setBagType(type);
        setBagQuantity(quantity);
        setBagOPrice(originalPrice);
        setBagNPrice(bagNPrice);
        setBagPickup(bagPickup);
        setBagExpire(bagExpire);
    }

    return(
        <Card style={{padding: "10px", margin: "10px 20px",}}>
            <Card.Header>Edit Bag</Card.Header>
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

export default EditBagForm;