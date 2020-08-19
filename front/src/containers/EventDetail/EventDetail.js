import React, { useState } from 'react';
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import "./EventDetail.css";
import backService from '../../services/backServices';

export default function Home(props) {
    console.log(props.match);
    let event_id = 0;
    const token = sessionStorage.getItem('token');
    console.log();
    
    let [eventComponent, setEventComponent] = useState();
    let [eventId, setEventId] = useState(0);
    let [eventName, setEventName] = useState();
    let [eventAddress, setEventAddress] = useState();
    let [eventCategory, setEventCategory] = useState();
    let [eventFinalDate, setEventFinalDate] = useState();
    let [eventInitialDate, setEventInitialDate] = useState();
    let [eventPlace, setEventPlace] = useState();
    let [eventType, setEventType] = useState();
    if (props && props.match && props.match.params && props.match.params.event_id) {
        setEventId(props.match.params.event_id);
    }
    if (event_id > 0 && !eventComponent) {
        backService(token).getEventbyId(event_id).then(res => {
            if (res && res.data) {
                const event = res.data;

                createEventComponent(event);
            }
        }).catch(e => console.error(e));
    }
    const handleSubmit = (e) => {

    }
    const createEventComponent = (e) => {
        const component = (
            <div>
                <Form onSubmit={handleSubmit}>

                </Form>
                <Card key={e.id}>
                    <Card.Header>
                        <h1>{e.event_name}</h1>
                        <h3>{e.event_place}</h3>
                        <h3>{e.event_type}</h3>
                    </Card.Header>
                    <Card.Body>
                        <p>{e.event_address}</p>
                        <p>From: {e.event_initial_date}, To: {e.event_final_date}</p>
                        <Row>
                            <Col sm={12}>
                                <Button>Editar</Button>
                            </Col>
                            <Col sm={12}>
                                <Button>Eliminar</Button>
                            </Col>
                            <Col sm={12}>
                                <Button>Volver</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
        setEventComponent(component);
    }
    return (
        <div className="EventDetail">
            <h1>Event Detail</h1>
            {eventComponent}
        </div>
    );
}