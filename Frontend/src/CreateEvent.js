import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Col,Form,Modal} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';

import DateTimePicker from 'react-datetime-picker';

import {addevent} from './actions/action'

class CreateEvent extends React.PureComponent{
    constructor(){
        super();
        this.state={
            loading:false,
            createModelShow:false,
            event:{
                name : '',
                description : '',
                schedule:{
                    start_time : new Date(),
                    end_time   : new Date()
                }
            },
        }
    }
    //opens a modal
    handleShow(){
        this.setState({createModelShow:true})
    }
    //close a modal
    handleClose(){
        this.setState({createModelShow:false})
    }

    //on change event name
    onChangeName(name = ""){
        this.setState(prevState => ({event : {
                ...prevState.event,
                name : name
            }
        }))
    }

    //on change description
    onChangeDescription(description = ""){
        this.setState(prevState => ({event : { 
                ...prevState.event,
                description : description
            }
        }))
    }

    //on change start time
    onChangeStartTime(date){
        this.setState(prevState => ({event : {
                ...prevState.event,
                schedule : {
                    ...prevState.event.schedule,
                    start_time : date
                }
            }
        }))
    }

    //on change end time
    onChangeEndTime(date){
        this.setState(prevState => ({event : {
                ...prevState.event,
                schedule : {
                    ...prevState.event.schedule,
                    end_time : date
                }
            }
        }))
    }

    //on creating event
    async onEventSubmit(){
        this.setState({loading:true})
        await addevent(this.state.event)
        this.props.createEvent()
        this.onChangeName();
        this.onChangeDescription();
        this.onChangeStartTime(new Date());
        this.onChangeEndTime(new Date());
        this.handleClose();
        this.setState({loading:false})
    }

    
    render(){
        const createModelShow = this.state.createModelShow;
        const eventname       = this.state.event.name;
        const description     = this.state.event.description;
        const start_time      = this.state.event.schedule.start_time;
        const end_time        = this.state.event.schedule.end_time;
        const loading         = this.state.loading 
        return(
            <div>
                <Button variant = "primary" onClick = {() => this.handleShow()}>
                    Create Event
                </Button>
                <Modal show = {createModelShow} onHide = { () => this.handleClose() }>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId = "formEventName">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type = "text" placeholder = "Enter event" value = {eventname}  onChange = { (e) => this.onChangeName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId = "formEventDescription">
                                <Form.Label>Event Description</Form.Label>
                                <Form.Control type = "text" placeholder = "Event Description" value = {description} onChange = {(e) => this.onChangeDescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId = "StartTime">
                                <Form.Label>Start Time </Form.Label>
                                <Col lg = {2}></Col>
                                <DateTimePicker
                                onChange = { (date) => this.onChangeStartTime(date)}
                                value = {start_time}
                                />
                            </Form.Group>
                            <Form.Group controlId = "EndTime">
                                <Form.Label> End Time </Form.Label>
                                <Col lg = {2}></Col>
                                <DateTimePicker
                                onChange = {(date) => this.onChangeEndTime(date)}
                                value= {end_time}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant = "secondary" onClick = { () => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant = "primary" loading={loading} onClick = { () =>
                            this.onEventSubmit()
                            }>
                        Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default CreateEvent