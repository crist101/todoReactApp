import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Button, Container, Dimmer, DimmerDimmable, Form,Grid, Image, Input, Loader, Segment} from "semantic-ui-react";
import "./../login.sass";
import Logo from "./../favicon.ico"
import setCookie from "../cookies/setCookie";

const LogIn = () =>{
    const navigate = useNavigate();
    const baseURL = "http://localhost:8000/todo/login";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [inputError, setInputError] = useState('');
    
    const usernameChangeHandler = (e) =>{
        setUsername(e.target.value);
    }
    const passwordChangeHandler = (e) =>{
        setPassword(e.target.value)
    }

    const submitActionHandler = (e) =>{
        e.preventDefault()
        setLoading(true)
        axios.post(baseURL,{sendUsername:username,sendPassword:password}).then((response)=>{
            if(response.data.result===true){
                setCookie("sessionID",response.data.sessionID);
                navigate("/home");
                console.log(response.data.sessionID);
            }else{
                setLoading(false);
                setInputError("error")
            }
        }).catch(error => {
            setLoading(false);
            setInputError("error")
        })
    }

    return (
        <div className="main">
            <h2 className="main-header">
            <img src={Logo} alt="Logo" height={70} width={70}/><br/>
                Complain Records 
            </h2>
            <div>
                {
                    loading===true
                    ?
                    <Segment>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
            
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Segment>
                    :
                    <Form className="create-form">
                        <Form.Field>
                            <label>Username</label>
                            <Input className={inputError} placeholder="Enter your username" onChange={(e)=>usernameChangeHandler(e)} required/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input  className={inputError} placeholder="Enter your password" type="password" onChange={(e)=>passwordChangeHandler(e)} required/>
                        </Form.Field>
                        <Button type="submit" onClick={submitActionHandler}>Login</Button>
                    </Form>
                }
            </div>
        </div>
    )
}
export default LogIn