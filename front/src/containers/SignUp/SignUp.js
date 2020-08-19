import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import "./SignUp.css";
import backService from '../../services/backServices';

export default function Login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && username.length > 0 && name.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const postUser = {
            email,
            username,
            first_name: name,
            password
        }
        backService().createUser(postUser).then(res => {
            if (res.data) {
                backService().apiAuth(username, password).then(res => {
                    console.log('res', res.data);
                    if (res && res.data && res.data.token) {
                        sessionStorage.setItem('token', res.data.token);
                    }
                }).catch(e => {
                    console.error(e)
                })
            }
        }).catch(e => {
            console.error(e);
            alert('There has been an unexpected error. Try later.')
        })
    }

    return (
        <div className="SignUp">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={e => setName(e.target.value)}
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