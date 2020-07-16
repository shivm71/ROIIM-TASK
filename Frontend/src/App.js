
import React from 'react'

import { withAuthenticator } from '@aws-amplify/ui-react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Container,Row,Table,Col} from 'react-bootstrap';

import CreateEvent from './CreateEvent';
import UpdateEvent from './UpdateEvent';

import {getevents} from './actions/action';
import { Auth } from 'aws-amplify';

class App extends React.PureComponent{
  constructor(){
    super();
    this.state={
      events:[]
    }

  }

  componentWillMount(){
    console.log("3");
    this.getEvents();
  }
  
  async getEvents(){
    var events=await getevents();
    console.log("App1")
    // console.log(events);
    this.setState({events:events})
    // console.log(events);
  }

  renderTableData() {
    console.log("smc.,m");
    return this.state.events.map((event, index) => {
       const { name, schedule ,description } = event //destructuring
       return (
          <tr key={index} onClick={()=>{console.log("element");
          // this.changeUpdateModel(event)
          }}>
             <td>{index+1}</td>
             <td>{name}</td>
             <td>{"Active"}</td>
             <td>{schedule.start_time}</td>
             <td>{schedule.end_time}</td>
             <td>{description}</td>
             <td><UpdateEvent event={event} 
             updateEvent={()=>this.getEvents()}
            />
              </td>
          </tr>
       )
    })
  }
  renderTable(){
    if(this.state.events.length>0){
      return (
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
                {this.renderTableData()}
              </tbody>
            </Table>
          </Col>
        </Row>
      )
    }

  }
  async signOut() {
    try {
        await Auth.signOut();
        	window.location.replace(window.location.origin);
	    } catch (error) {
	        console.log('error signing out: ', error);
	  }
  }

  render(){
    
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">CRUD Event</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets"></Nav.Link> */}
              <Nav.Link eventKey={2} href="#memes" onClick={()=>{this.signOut()}}>
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br/>
        <Container>
          <Row>
            <Col lg={5}></Col>
            <Col>
              <CreateEvent 
              createEvent={()=>this.getEvents()} 
              />
            </Col>
          </Row>
        <br />
          {this.renderTable()}
        </Container>
      </div>
    );
  }

}
export default withAuthenticator(App)