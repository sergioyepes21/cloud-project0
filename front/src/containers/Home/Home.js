import React, { useState } from 'react';
import { Button, Form, Accordion, Card } from "react-bootstrap";
import "./Home.css";
import backServices from '../../services/backServices';

export default function Home(props) {
    const token = sessionStorage.getItem('token');
    let [events, setEvents] = useState([]);
    if (!token) {
        props.history.push('/');
    }
    function getEvents() {
        if (events.length > 0) {
            return;
        }
        backServices(token).getEvents().then(res => {
            if (res && res.data && res.data.length > 0) {
                createEventList(res.data);
            }
        }).catch(e => console.error(e));
    }

    function createEventList(eventList) {
        let renderedList = [];
        for (let e of eventList) {
            renderedList.push(
                <Card key={e.id}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={e.id}>
                            {e.event_name}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={e.id}>
                        <Card.Body>
                            <h3>{e.event_address}</h3>
                            <Button id={e.id} onClick={() => onDetailClick(e.id)}>Event Detail</Button>
                            <Button id={e.id} onClick={() => onDeleteClick(e.id)}>Delete</Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        }
        setEvents(renderedList);
    }
    function onDetailClick(event_id) {
        props.history.push(`events/${event_id}`);
    }
    const onDeleteClick = (eventId) => {
        backServices(token).deleteEvent(eventId).then(res => {
            alert('Deleted successfully')
            // props.history.push('/home')
            window.location.reload();
        }).catch(e => {
            console.error(e);
            alert('Unexpected error. Try Later')
        })
    }
    getEvents();
    return (
        <div className="Home">
            <h1>Events list</h1>
            <Accordion defaultActiveKey="0">
                {events}
            </Accordion>
            <Button onClick={e => props.history.push('/events/0')}>New</Button>
            <Button onClick={e => {
                sessionStorage.removeItem('token')
                props.history.push('/')
            }}>Log out</Button>
        </div>
    );
}