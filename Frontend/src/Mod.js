/* src/App.js */
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API } from 'aws-amplify'

import { withAuthenticator } from '@aws-amplify/ui-react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import DateTimePicker from 'react-datetime-picker';

import { Auth } from 'aws-amplify';
import Col from 'react-bootstrap/Col';


// var apiName='eventapi';
// var path='/reqcheck';
var apiName='noreqapi';
var path='/events';
class Mod extends React.PureComponent {
    constructor(){
        super();
        this.cognitoid='';

        this.state={
            show:false,
            name:'',
            desc:'',
            startdate:new Date(),
            enddate:new Date(),
            show1:false,
            name1:'',
            desc1:'',
            eventid:'',
            startdate1:new Date(),
            enddate1:new Date(),
            events:[{userid:"janckjancjkan",name:"ds,mmc ms,",description:"ascnkasn",eventid:"jcnsskjdcnj",schedule:{
                    startdate:"2020-06-27T13:26:01.407Z",enddate:"2020-06-27T13:26:01.407Z"
                }
            },
                {userid:"janckjancjkan",name:"dvzdnv,mzn",description:"ascnkasn",eventid:"jcnsskjdcnj",schedule:{
                        start_time:"2020-06-27T13:26:01.407Z",end_time:"2020-06-27T13:26:01.407Z"
                    }
                }
            ]
        }
        // this.getId()
        // async getId(){
        //
        // }

    }

    onChangeEndDate(date){
        (this.setState({enddate:date}))
    }
    onChangeStartDate(date){
        this.setState(this.setState({startdate:date}))
    }
    handleClose(){
        this.setState({show:false});
    }

    handleShow(){
        this.setState({show:true});
    }
    onChangeEndDate1(date){
        (this.setState({enddate1:date}))
    }
    onChangeStartDate1(date){
        this.setState(this.setState({startdate1:date}))
    }
    handleClose1(){
        this.setState({show1:false});
    }

    handleShow1(){
        this.setState({show1:true});
    }
    changeUpdateModel(event){
        console.log("element1")
        this.setState({
            name1:event.name,
            desc1:event.description,
            startdate1:event.schedule.start_time,
            enddate1:event.schedule.end_time,
            show1:true,
            eventid:event.eventid
        })
    }
    onEventDelete(e){
        console.log(this.state.eventid);
        const myinit={
            body: JSON.stringify({
                    eventid:this.state.eventid
                },

            )
        }
        console.log(myinit);
        // await API.del(apiName,path, myinit)
        this.setState({
            name1:'',
            desc1:'',
            startdate1:new Date(),
            enddate1:new Date(),
            show1:false
        })
    }
    async onEventUpdate(){
        var cognitoid=''
        await Auth.currentUserInfo().then(response=>{cognitoid=response.username});

        const myinit={
            body: JSON.stringify({
                userid:cognitoid,
                name: this.state.name1,
                description:this.state.desc1,
                schedule:{
                    start_time:this.state.startdate1,
                    end_time:this.state.enddate1,
                },

            })
        }
        console.log(myinit.body);
        // console.log(await API.put(apiName,path, myinit))
        this.setState({
            name1:'',
            desc1:'',
            startdate1:new Date(),
            enddate1:new Date(),
            show1:false
        })
    }
    async onEventSubmit(){
        var cognitoid=''
        await Auth.currentUserInfo().then(response=>{cognitoid=response.username});

        const myinit={
      //   	 headers: {
      //   	 	'Content-Type': 'application/json',
		    // },
            body: {
                userid:cognitoid,
                name: this.state.name,
                description:this.state.desc,
                schedule:{
                    start_time:this.state.startdate,
                    end_time:this.state.enddate,
                },

            }
        }
        console.log(myinit.body);
        await API.post(apiName,path, myinit).then(response=> console.log(response))

        //events=await API.get(apiName,path, {})
        // this.setState({events:JSON.parse(events)})
        this.setState({
            name:'',
            desc:'',
            startdate:new Date(),
            enddate:new Date(),
            show:false
        })
    }
    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    renderTableData() {
        console.log("smc.,m");
        return this.state.events.map((event, index) => {
            const { name, schedule ,description ,eventid} = event //destructuring
            return (
                <tr key={index} onClick={()=>{console.log("element");this.changeUpdateModel(event)}}>
                    <td>{index+1}</td>
                    <td>{name}</td>
                    <td>{"Active"}</td>
                    <td>{schedule.start_time}</td>
                    <td>{schedule.end_time}</td>
                    <td>{description}</td>
                    <td><Button variant="success" id={eventid}
                        //  onClick={(e)=>this.onEventDelete(e)}
                    >
                        Update
                    </Button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        // const events= API.put(apiName,path, {
        //   queryStringParameters: {  // OPTIONAL
        //     useid: this.cognitoid,
        // },
        // })
        // this.setState({events:JSON.parse(events)})
        const show=this.state.show
        const show1=this.state.show1
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">BorderFree Event</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Nav>
                            {/* <Nav.Link href="#deets"></Nav.Link> */}
                            <Nav.Link eventKey={2} href="#memes">
                                Sign Out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <br/>
                <Container>
                    <Row>
                        <Col lg={4}></Col>
                        <Col>
                            <Button variant="primary" onClick={()=>this.handleShow()}>
                                Create Event
                            </Button>
                        </Col>

                    </Row>

                    <br />
                    <Row>
                        <Col lg={2}>
                        </Col>
                        <Col lg={12}>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Event Name</th>
                                    <th>Status</th>
                                    <th>Start Time</th>
                                    <th>Stop Time</th>
                                    <th>Event Description</th>
                                    <th>Update</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* {()=>{console.log("msadkdm");this.renderTableData()}} */}
                                {this.renderTableData()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>


                <Modal show={show} onHide={()=>this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formEventName">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter event" value={this.state.name}  onChange={(e)=>{
                                    this.setState({name:e.target.value})
                                }
                                }
                                />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Event Description</Form.Label>
                                <Form.Control type="text" placeholder="Event Description" value={this.state.desc} onChange={(e)=>{
                                    // console.log(e);
                                    this.setState({desc:e.target.value})}
                                } />
                            </Form.Group>
                            <Form.Group controlId="StartTime">
                                <Form.Label>Start Time </Form.Label>
                                <Col lg={2}></Col>
                                <DateTimePicker
                                    onChange={(date)=>this.onChangeStartDate(date)}
                                    value={this.state.startdate}
                                />
                            </Form.Group>
                            <Form.Group controlId="EndTime">
                                <Form.Label>End Time </Form.Label>
                                <Col lg={2}></Col>
                                <DateTimePicker
                                    onChange={(date)=>this.onChangeEndDate(date)}
                                    value={this.state.enddate}
                                />
                            </Form.Group>



                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>
                            // this.handleClose()
                            this.onEventSubmit()
                        }>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show1} onHide={()=>this.handleClose1()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formEventName">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter event" value={this.state.name1}  onChange={(e)=>{
                                    this.setState({name1:e.target.value})
                                }
                                }
                                />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Event Description</Form.Label>
                                <Form.Control type="text" placeholder="Event Description" value={this.state.desc1} onChange={(e)=>{
                                    // console.log(e);
                                    this.setState({desc1:e.target.value})}
                                } />
                            </Form.Group>
                            <Form.Group controlId="StartTime">
                                <Form.Label>Start Time </Form.Label>
                                <Col lg={2}></Col>
                                <DateTimePicker
                                    onChange={(date)=>this.onChangeStartDate1(date)}
                                    value={this.state.startdate1}
                                />
                            </Form.Group>
                            <Form.Group controlId="EndTime">
                                <Form.Label>End Time </Form.Label>
                                <Col lg={2}></Col>
                                <DateTimePicker
                                    onChange={(date)=>this.onChangeEndDate1(date)}
                                    value={this.state.enddate1}
                                />
                            </Form.Group>



                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>this.handleClose1()}>
                            Close
                        </Button>
                        <Button variant="danger" id={this.state.eventid} onClick={(e)=>
                            // this.handleClose()
                            this.onEventDelete(e)
                        }>
                            Delete
                        </Button>
                        <Button variant="primary" onClick={()=>
                            // this.handleClose()
                            this.onEventUpdate()
                        }>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );}
}

export default withAuthenticator(Mod)









//     const myinit = {
//       // headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : "*", 'Access-Control-Allow-Methods' : "OPTION,POST,ANY", 'Access-Control-AlloW-Headers' : "Content-Type" },
//     //   headers: {
//     //     'Access-Control-Allow-Origin' : '*',
//     //     'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
//     //     'Access-Control-Allow-Credentials' : "true",
//     //     'Content-Type': 'application/json'
//     // },
//     // headers: {
//     //     'Content-Type' : 'application/json',
//     //     Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
//     //   },
//       body: JSON.stringify({ name: 'React POST Request Example' })
//   };
//   const apiName='events';
//   const path='/events';
//   // const username=await Auth.currentUserInfo().then(response=>console.log(response));
//   // console.log(username);
//    API.post(apiName,path, myinit)
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.log(error);
//  });

// renderTableHeader() { let header = Object.keys(this.state.events[0]) var headertitle=["S No.","Event Name","Status","Start Date","End Date","Description"]; if(header.length>0){ return headertitle.map((key, index) => { return <th key={index}>{key.toUpperCase()}</th> })