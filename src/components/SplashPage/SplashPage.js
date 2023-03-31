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
    <img style={{width: '95vw', margin: '15vh 5px 1vh 5px '}} src='biglogo.png'/>
    <div style={{textAlign: 'center'}}>
    <Button size="lg" style={{margin: '30px', border: '1px solid black'}} onClick={() => navigate('/login')}>Login</Button>
    </div>
    <Stack direction="horizontal" className="mx-auto my-auto">
    <Button className="mx-auto" size="sm" style={{backgroundColor: '#41ead4', color: 'black', margin: '25vh 5vw 10vh 5vw', border: '1px solid black'}} onClick={() => navigate('/usersignup')}>Sign up as User</Button>
    <Button className="mx-auto" size="sm" style={{backgroundColor: '#41ead4', color: 'black', margin: '25vh 5vw 10vh 5vw', border: '1px solid black'}} onClick={() => navigate('/restaurantsignup')}>Sign up as Restaurant</Button>
    </Stack>

    </>
)
};

export default Splash;