// import React, { Component } from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap-button-loader';
import 'bootstrap/dist/css/bootstrap.css';
import { Container,Row,Nav,NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
 
class App1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      billingAddress:{
        city: '',
        street:'',
        zip:'',
        country:'US',
        state:'CA',
      },
      customer:{
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        dateOfBirth:{
          day:1,
          month:7,
          year:1990
        }

      },
      amount:'0'
  
  
    };
  }
  onChangeFirstName(e){
    this.setState(prevState => ({customer : { 
      ...prevState.customer,
      firstName : e
     }
    }))
  }
  onChangeLastName(e){
    this.setState(prevState => ({customer : { 
      ...prevState.customer,
      lastName : e
     }
    }))
  }
  onChangeCity(e){
    this.setState(prevState => ({billingAddress : { 
      ...prevState.billingAddress,
      city : e
     }
    }))
  }
  onChangeStreet(e){
    this.setState(prevState => ({billingAddress : { 
      ...prevState.billingAddress,
      street: e
     }
    }))
  }
  onChangeZip(e){
    this.setState(prevState => ({billingAddress : { 
      ...prevState.billingAddress,
      zip : e
     }
    }))
  }
  onChangeAmount(e){
    this.setState({amount:e})
  }

 async signOut() {
  try {
      await Auth.signOut();
        window.location.replace(window.location.origin);
    } catch (error) {
        console.log('error signing out: ', error);
  }
}
 
  
 async onPayment(){
   this.setState({loading:true});
   await Auth.currentUserInfo().then(response=>{console.log(response)
       this.setState(prevState => ({customer : { 
      ...prevState.customer,
        email : response.attributes.email
        }
      }));  
  
   this.setState(prevState => ({customer : { 
      ...prevState.customer,
          phonenumber : response.attributes.phone_number
        }
      })   
    );
     console.log(this.state);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 

          'cogid': response.id,
          'name' :this.state.customer.firstName,
          "email":this.state.customer.email,
          "phone":this.state.customer.phonenumber,


        })
    };
    fetch('http://shiaam71.pythonanywhere.com/pay/', requestOptions)
        .then(response => response.json())
        .then(data => {window.checkout(this.state,data)});
  });      
 }
  render() {
    var firstName=this.state.customer.firstName;
    var lastName=this.state.customer.lasttName;
    var amount=this.state.amount;
    var street=this.state.billingAddress.street;
    var city=this.state.billingAddress.city
    var zip=this.state.billingAddress.zip
    return (
      <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">ROIIM ASSINGMENT</Navbar.Brand>
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
        
          <Col>
            <Form>
              
                <Form.Group controlId="First Name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control placeholder="First Name" value={firstName} onChange={(e)=>{this.onChangeFirstName(e.target.value)}} />
                </Form.Group>

                <Form.Group controlId="Last Name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control placeholder="Last Name" value={lastName} onChange={(e)=>{this.onChangeLastName(e.target.value)}}/>
                </Form.Group>
                
             <Form.Row>
              <Form.Group as={Col} controlId="Street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control placeholder="Street" value={street} onChange={(e)=>{this.onChangeStreet(e.target.value)}}/>
                </Form.Group>
             </Form.Row>   

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control placeholder="City" value={city} onChange={(e)=>{this.onChangeCity(e.target.value)}} />
                </Form.Group>

               

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control placeholder="Zip" value={zip} onChange={(e)=>{this.onChangeZip(e.target.value)}} />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="Amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" placeholder="Amount" value={amount} onChange={(e)=>{this.onChangeAmount(e.target.value)}} />
                </Form.Group>
            </Form>
           <Button variant = "primary" loading={this.state.loading} onClick={()=>{this.onPayment()}}>
                  Pay Now
          </Button>
          </Col>
        </Row>
      </Container>
    </div>
    );
  }
}
export default withAuthenticator(App1)
