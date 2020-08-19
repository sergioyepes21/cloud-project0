import React, { useState } from 'react';
import { Button, Form, Accordion, Card } from "react-bootstrap";
import "./Home.css";
import backService from '../../services/backServices';

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
        backService(token).getEvents().then(res => {
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
                            Expand
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={e.id}>
                        <Card.Body>
                            <h3>{e.event_name}</h3>
                            <Button id={e.id} onClick={() => onDetailClick(e.id)}>Ver más</Button>
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
    getEvents();
    return (
        <div className="Home">
            <h1>Events list</h1>
            <Accordion defaultActiveKey="0">
                {events}
            </Accordion>
        </div>
    );
}