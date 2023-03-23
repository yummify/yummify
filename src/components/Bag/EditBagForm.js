import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBagByRestAsync, selectBag, editBagAsync } from "./bagSlice";

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'


//TODO: change pickup time AND expiration date inputs to a dropdown menu
const EditBagForm = () =>{

    const [bagType, setBagType] = useState("");
    const [bagQuantity, setBagQuantity] = useState(1);
    const [bagOPrice, setBagOPrice] = useState(0);
    const [bagNPrice, setBagNPrice] = useState(0);
    const [bagPickup, setBagPickup] = useState("");
    const [bagExpire, setBagExpire] = useState("");
    const [bagImage, setBagImage] = useState("nope.jpg");
    
    const dispatch = useDispatch();
    const singlebag = useSelector(selectBag)

    //PLACEHOLDER bagref VARIABLE ---- must replace
    useEffect(()=>{
        //dispatch(fetchSingleBagAsync(bagref));
    },[dispatch]);
        
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
        }

        //PLACEHOLDER {data} VARIABLE --- must replace
        //dispatch(editBagAsync({data}));
        setBagType("");
        setBagQuantity(1);
        setBagOPrice(0);
        setBagNPrice(0);
        setBagPickup("");
        setBagExpire("");
    }

    return(
        <Card style={{width: "25rem"}}>
            <Card.Header>Edit Bag</Card.Header>
            <Form>
                <Form.Group className="bag-type-input">
                    <Form.Control type="string" placeholder="Type" onChange={(event)=> setBagType(event.target.value)}></Form.Control>
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
                    <Form.Control type="string" placeholder="Expiration Date/Time" onChange={(event)=> setBagExpire(event.target.value)}></Form.Control>
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">Submit</Button>
            </Form>
        </Card>
    );
}

export default EditBagForm;