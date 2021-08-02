import React, { Component } from 'react'
import AuthService from "../services/authService";
import api from '../components/api';
import userapi from '../components/api/userApi';
import vendorApi from '../components/api/vendorApi';
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { FormControl, TextField } from "@material-ui/core";
import { Container, Col, Row, Jumbotron, Form, Button } from "react-bootstrap";

import styled from 'styled-components'
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin-left:200px;
    margin-top: 30px;
    width:600px;
    background-color: 'red';
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;

`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
const categoryList = [
    "Consumable, reagent",
    "Equipment"
];

class OrdersInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderMadeBy: "",
            vendor1: "",
            vendor2: "",
            category: "",
            catalog1: "",
            catalog2: "",
            date: "",
            description: "",
            notes:"",
            msdFile:"", 
            price1: "",
            price2: "",
            submission: "",
            receivedDate: "",
            orderStatus: "",

            currentUser: AuthService.getCurrentUser(),
            users: [],
            vendors:[]
        }
    }
    componentDidMount = async () => {
      this.setState({ isLoading: true })

      await userapi.getAllUsers().then(users => {
          this.setState({
              users: users.data.data,
              isLoading: false,
          })
      })
      await vendorApi.getAllVendors().then(vendors => {
        this.setState({
          vendors: vendors.data.data,
            isLoading: false,
        })
    })
  }

    
    handleChange = async e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleChangeDate = async e => {

      this.setState({[e.target.name]: e.target.value.substring(0,11)});
  }

    handleCheckBox = async e => {
      this.setState({ [e.target.name]: e.target.checked });
  }


   

    handleIncludeOrder = async () => {
        const {orderStatus, receivedDate, orderMadeBy, price1, price2, submission, vendor1, vendor2, category, catalog1, catalog2, date, description,notes,msdFile} = this.state
        const payload = {orderStatus, receivedDate, orderMadeBy, price1, price2, submission, vendor1, vendor2, category, catalog1, catalog2, date, description,notes,msdFile}
        
        
        await api.insertOrder(payload).then(res => {
            window.alert(`Order created successfully`)
            this.setState({
                orderMadeBy:"",
                vendor1: "",
                vendor2: "",
                category: "",
                catalog1: "",
                catalog2: "",
                date: "",
                description: "",
                notes:"",
                msdFile:"",
                price1: "",
                price2: "",
                submission: "",
                receivedDate: "",
                orderStatus: ""
            })
        })
    }

    render() {
        const { orderStatus, receivedDate, orderMadeBy, price1, price2, submission, vendor1, vendor2, category, catalog1, catalog2, date, description,notes, msdFile} = this.state
        const { currentUser } = this.state;
        const {users} = this.state;
        const {vendors} = this.state;
        console.log(typeof currentUser.name);

        var name = String(currentUser.name)
      
        
        return (
        <>
        <br />
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2}}>
              <Jumbotron>
              <h1>Make Order</h1>
                <Form onSubmit={this.handleIncludeOrder}>
                    <Form.Group as={Col} controlId="formGridBreed">
                      <Form.Label>Who Requests</Form.Label>
                      <Form.Control
                        as="select"
                        value={orderMadeBy}
                        name = "orderMadeBy"
                        onChange={this.handleChange}
                      >
                        <option>Who Orders</option>
                        <option>{currentUser.name}</option>
                        {users.map((users) =>(
                          <option>{users.name}</option>
                        ))}
                        
                    </Form.Control>
                    </Form.Group>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridBreed">
                      <Form.Label>Vendor1</Form.Label>
                      <Form.Control
                        as="select"
                        value={vendor1}
                        name = "vendor1"
                        onChange={this.handleChange}
                      >
                        <option>Choose Vendor</option>
                        {vendors.map((vendors) =>(
                          <option>{vendors.name}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridBreed">
                      <Form.Label>Vendor2</Form.Label>
                      <Form.Control
                        as="select"
                        value={vendor2}
                        name = "vendor2"
                        onChange={this.handleChange}
                      >
                        <option>Choose Vendor</option>
                        {vendors.map((vendors) =>(
                          <option>{vendors.name}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                  <Form.Group as={Col} controlId="formGridBreed">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        value={category}
                        name = "category"
                        onChange={this.handleChange}
                      >
                        <option>Choose category</option>
                        <option>Consumable, reagent</option>
                        <option>Equipment</option>
                        <option>Bengal</option>
                        <option>Birman</option>
                      </Form.Control>
                    </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Catalog 1
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows="1"
                        name = "catalog1"
                        value = {catalog1}
                        onChange = {this.handleChange} 

                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                        Catalog 2
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows="1"
                        name = "catalog2"
                        value = {catalog2}
                        onChange = {this.handleChange} 
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                        Item Description
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows="1"
                        name = "description"
                        value = {description}
                        onChange = {this.handleChange} 
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Needed By</Form.Label>
                    <Form.Control
                      type="date"
                      name = "date"
                      value={date}
                      onChange={this.handleChangeDate}
                    />
                  </Form.Group>


                  <Form.Row>

                  <Form.Group style = {{margin: 'auto', marginBottom: '20px'}}>
                    <Form.Label>Is MSD File Attached</Form.Label>
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        name ="msdFile"
                        onChange ={this.handleCheckBox}
                    />
                  </Form.Group>
                  </Form.Row>

                  <Form.Group>
                    <Form.Label>
                      Notes
                    </Form.Label>
                    <Form.Control as="textarea" rows="3" 
                        name = "notes"
                        value = {notes}
                        onChange = {this.handleChange} 
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
        
      </>
            
        )
    }
}

export default OrdersInsert