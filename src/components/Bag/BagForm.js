import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBagAsync, selectBag } from "./bagSlice";

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'


//TODO: change pickup time AND expiration date inputs to a dropdown menu
const BagForm = () =>{
    const [bagType, setBagType] = useState("");
    const [bagQuantity, setBagQuantity] = useState(1);
    const [bagOPrice, setBagOPrice] = useState(0);
    const [bagNPrice, setBagNPrice] = useState(0);
    const [bagPickup, setBagPickup] = useState("");
    const [bagExpire, setBagExpire] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (event)=>{
        event.preventDefault();
        dispatch();
        setBagType("");
        setBagQuantity(1);
        setBagOPrice(0);
        setBagNPrice(0);
        setBagPickup("");
        setBagExpire("");
    }

    return(
        <Card style={{width: "25rem"}}>
            <Card.Header>Add Bag</Card.Header>
            <Form>
                <Form.Group className="bag-type-input">
                    <Form.Control type="string" placeholder="Type"></Form.Control>
                </Form.Group>

                <Form.Group className="bag-quantity-input">
                    <Form.Control type="number" placeholder="Quantity"></Form.Control>
                </Form.Group>

                <Form.Group className="bag-original-price-input">
                    <Form.Control type="number" placeholder="Original Price"></Form.Control>
                </Form.Group>

                <Form.Group className="bag-reduced-price-input">
                    <Form.Control type="number" placeholder="Reduced Price"></Form.Control>
                </Form.Group>

                <Form.Group className="pickup-input">
                    <Form.Control type="string" placeholder="Pickup Date/Time"></Form.Control>
                </Form.Group>

                <Form.Group className="expiration-input">
                    <Form.Control type="string" placeholder="Expiration Date/Time"></Form.Control>
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">Submit</Button>
            </Form>
        </Card>
    );
}

export default BagForm;