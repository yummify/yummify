import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NavBar from "../NavBar/NavBar";

const Splash = () => {
    const navigate = useNavigate();
    const user = useAuth();
return (
    <>
  
    <img style={{width: '95vw'}} src='logo.png'/>
    <div></div>
    <Button style={{backgroundColor: '#41ead4'}}>Login</Button>
    <Stack direction="horizontal" className="mx-auto my-auto">
    <Button className="mx-auto" style={{margin: '5px'}} onClick={() => navigate('/userstart')}>Sign up as User</Button>
    <Button className="mx-auto" style={{margin: '5px'}} onClick={() => navigate('/restaurantstart')}>Sign up as Restaurant</Button>
    </Stack>

    </>
)
};

export default Splash;