import React, { useState } from 'react';
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import "./EventDetail.css";
import backService from '../../services/backServices';
import backServices from '../../services/backServices';

export default function Home(props) {
    const token = sessionStorage.getItem('token');
    let [eventComponent, setEventComponent] = useState();
    let eventId = 0;
    // let eventObj = null;
    let [eventName, setEventName] = useState();
    let [eventAddress, setEventAddress] = useState();
    let [eventCategory, setEventCategory] = useState();
    let [eventFinalDate, setEventFinalDate] = useState();
    let [eventInitialDate, setEventInitialDate] = useState();
    let [eventPlace, setEventPlace] = useState();
    let [eventType, setEventType] = useState();
    // let [eventObj, setEventObj] = useState({
    //     event_name: '',
    //     event_address: '',
    //     event_category: '',
    //     event_final_date: '',
    //     event_initial_date: '',
    //     event_place: '',
    //     event_type: '',
    // });
    if (props && props.match && props.match.params && props.match.params.event_id) {
        eventId = props.match.params.event_id;
    }
    if (eventId > 0 && !eventComponent) {
        backService(token).getEventbyId(eventId).then(res => {
            if (res && res.data) {
                createEventComponent(res.data);
            }
        }).catch(e => console.error(e));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const eventObj = {
            id: eventId,
            event_name: eventName,
            event_address: eventAddress,
            event_category: eventCategory,
            event_final_date: eventFinalDate,
            event_initial_date: eventInitialDate,
            event_place: eventPlace,
            event_type: eventType,
        }
        backServices().putEvent(eventId, eventObj).then(res => {
            console.log('res', res);

        }).catch(e => console.error(e))
    }
    // const onChangeField = (field, e) => {
    //     let event = eventObj;      
    //     event[field] = e.target.value;        
    //     setEventObj({ ...eventObj, event });
    // }
    const createEventComponent = (e) => {
        // e.event_final_date = new Date(e.event_final_date);
        // if(!e.event_name) e.event_name = '';
        // if(!e.event_address) e.event_address = '';
        // if(!e.event_category) e.event_category = '';
        // if(!e.event_final_date) e.event_final_date = '';
        // if(!e.event_initial_date) e.event_initial_date = '';
        // if(!e.event_place) e.event_place = '';
        // if(!e.event_type) e.event_type = '';
        // e.event_initial_date = new Date(e.event_initial_date);
        // setEventObj({ ...eventObj, ...e });
        setEventName(e.event_name ?? '');
        setEventAddress(e.event_address ?? '');
        setEventCategory(e.event_category ?? '');
        setEventFinalDate(e.event_final_date ?? '');
        setEventFinalDate(e.event_initial_date ?? '');
        setEventPlace(e.event_place ?? '');
        setEventType(e.event_type ?? '');
        const component = (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Event name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Enter event name"
                            value={eventName}
                            onChange={ev => setEventName(ev.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Event address</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Enter event address"
                            value={eventAddress}
                            onChange={ev => setEventAddress(ev.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Event category</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Enter event category"
                            value={eventCategory}
                            onChange={ev => setEventCategory(ev.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="finalDate">
                        <Form.Label>Event final date</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Enter event final date"
                            value={eventFinalDate}
                            onChange={ev => setEventFinalDate(ev.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="initialDate">
                        <Form.Label>Event initial date</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Enter event initial date"
                            value={eventInitialDate}
                            onChange={ev => setEventInitialDate(ev.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="place">
                        <Form.Label>Event place</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Enter event place"
                            value={eventPlace}
                            onChange={ev => setEventPlace(ev.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="eventType">
                        <Form.Label>Event type</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            placeholder="Enter event type"
                            value={eventType}
                            onChange={ev => setEventType(ev.target.value)}
                        />
                    </Form.Group>
                    <Row>
                        <Col sm={12}>
                            <Button type="submit">Editar</Button>
                        </Col>
                        <Col sm={12}>
                            <Button>Eliminar</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
        setEventComponent(component);
    }
    return (
        <div className="EventDetail">
            <h1>Event Detail</h1>
            {eventComponent}
            <Button onClick={e => window.history.back()}>Volver</Button>
        </div>
    );
}