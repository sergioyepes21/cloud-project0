import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import backService from '../../services/backServices';

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        backService().apiAuth(username, password).then(res => {
            if (res && res.data && res.data.token) {
                sessionStorage.setItem('token', res.data.token);
                props.history.push('home');                
            }
        }).catch(e => {
            console.error(e)
        })
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username address</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!validateForm()}>
                    Submit
    </Button>
            </Form>
        </div>
    );
}