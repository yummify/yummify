import React, {useState} from "react";
import { Alert, Card, Modal, Stack, Button, Badge } from "react-bootstrap";

const Cart = () => {

    const [confirmation, setConfirmation] = useState(false);

    // on the singlerestaurant page, will need to add a bag to a piece of state. 
    // then will pull that from here. 

    // MAY JUST USE BAG SLICE? NOT SURE IF WE ALSO NEED A CART SLICE OR NOT

    // in modal -> remind to bring their own bag!

    return (
        <>
        <Alert variant={'warning'}>Remember: the contents of this bag are a SURPRISE!</Alert>
            <Stack>
                <Card>
                    <Button variant="outline-dark" className="text-right" style={{textAlign: 'right'}}>X *add delete function</Button>
                    <Stack direction='horizontal'>
                    <Card.Header>
                        <Card.Img src='https://media.istockphoto.com/id/184395659/photo/brown-paper-bag-and-apple.jpg?s=612x612&w=0&k=20&c=MLpwawtbge0roehL_8LF638qGxBXrIWdDlItyrLxQ-s=' style={{width: '20vw'}}></Card.Img>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Restaurant Name</Card.Title>
                        <Card.Text>Pickup Window, address</Card.Text>
                    </Card.Body>
                    </Stack>
                    <Card.Footer style={{textAlign: 'right'}}>
                        <Stack direction='horizontal'>
                            <Card.Text style={{margin: '5px'}}>Original Price</Card.Text>
                            <Card.Text style={{margin: '5px'}}>New Price</Card.Text>
                        </Stack>
                    </Card.Footer>
                </Card>
                <Alert variant={'danger'}>Note: This app is a Capstone Project. Orders will not actually be sent to these restaurants, and credit cards will not actually be charged. </Alert>
                <Badge>Total Price</Badge>
                <p>Total Savings: ______</p>
                <div></div>
            </Stack>
            <h2>Checkout</h2>
        </>
    )
};

export default Cart;