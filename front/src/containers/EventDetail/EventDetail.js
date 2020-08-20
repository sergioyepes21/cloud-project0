import React, { useState } from 'react';
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import "./EventDetail.css";
import backService from '../../services/backServices';
import backServices from '../../services/backServices';

export default function Home(props) {
    const token = sessionStorage.getItem('token');
    let [hasLoaded, setLoaded] = useState(false);
    let eventId = 0;
    // let eventObj = null;
    let [eventName, setEventName] = useState('');
    let [eventAddress, setEventAddress] = useState('');
    let [eventCategory, setEventCategory] = useState('');
    let [eventFinalDate, setEventFinalDate] = useState('');
    let [eventInitialDate, setEventInitialDate] = useState('');
    let [eventPlace, setEventPlace] = useState('');
    let [eventType, setEventType] = useState('');
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
    if (eventId > 0 && !hasLoaded) {
        backService(token).getEventbyId(eventId).then(res => {
            if (res && res.data) {
                createEventComponent(res.data);
            }
        }).catch(e => console.error(e));
    } else if (eventId == 0 && !hasLoaded) {
        setLoaded(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const eventObj = {
            event_name: eventName,
            event_address: eventAddress,
            event_category: eventCategory,
            event_final_date: eventFinalDate,
            event_initial_date: eventInitialDate,
            event_place: eventPlace,
            event_type: eventType,
        }
        if (eventId > 0) {
            backServices(token).putEvent(eventId, eventObj).then(res => {
                alert('Updated successfully')
            }).catch(e => {
                console.error(e);
                alert('Unexpected error. Try Later')
            })
        } else {
            backServices(token).postEvent(eventObj).then(res => {
                alert('Created successfully')
                props.history.push('/home')
            }).catch(e => {
                console.error(e);
                alert('Unexpected error. Try Later')
            })
        }
    }
    const onDeleteClick = (e) => {
        backServices(token).deleteEvent(eventId).then(res => {
            alert('Deleted successfully')
            props.history.push('/home')
        }).catch(e => {
            console.error(e);
            alert('Unexpected error. Try Later')
        })
    }
    const createEventComponent = (e) => {
        setEventName(e.event_name ?? '');
        setEventAddress(e.event_address ?? '');
        setEventCategory(e.event_category ?? '');
        setEventFinalDate(e.event_final_date ?? '');
        setEventFinalDate(e.event_initial_date ?? '');
        setEventPlace(e.event_place ?? '');
        setEventType(e.event_type ?? '');
        setLoaded(true);
    }
    return (
        <div className="EventDetail">
            <h1>{
                eventId > 0 ? 'Event Detail' : 'Create Event'
            }</h1>
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
                        type="text"
                        placeholder="Enter event address"
                        value={eventAddress}
                        onChange={ev => setEventAddress(ev.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>Event category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter event category"
                        value={eventCategory}
                        onChange={ev => setEventCategory(ev.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="finalDate">
                    <Form.Label>Event final date</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter event final date"
                        value={eventFinalDate}
                        onChange={ev => setEventFinalDate(ev.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="initialDate">
                    <Form.Label>Event initial date</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter event initial date"
                        value={eventInitialDate}
                        onChange={ev => setEventInitialDate(ev.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="place">
                    <Form.Label>Event place</Form.Label>
                    <Form.Control
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
                        <Button type="submit">
                            {eventId > 0 ? 'Update' : 'Save'}
                        </Button>
                    </Col>
                    <Col sm={12}>
                        <Button disabled={eventId <= 0} onClick={e => onDeleteClick(e)}>Delete</Button>
                    </Col>
                </Row>
            </Form>
            <Button onClick={e => props.history.push('/home')}>Back</Button>
        </div>
    );
}