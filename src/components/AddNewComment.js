import React from 'react'
// import { Button, ButtonToolbar, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Radio, RadioGroup } from 'rsuite';

import { Form, Col, Container, Row} from 'react-bootstrap'


class AddNewComment extends React.Component {

  render () {

    return(
      <Container>
        <Row > 
          <Col sm={12} >
            <p>Create New</p>
          </Col>
        </Row>
        <Form>
          <Form.Row > 
            <Col>
            <Form.Group>
                  <p>Name</p>
                  <input type="text" label="Name" ></input>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
              <input type="radio" id="Private" ></input>
              <label for="Private"> Private: Show only to developer</label><br></br>
              <input type="radio" id="Public" ></input>
              <label for="Public"> Public: Show your comment below</label><br></br>
            </Form.Group>
            </Col>
          </Form.Row>
        </Form>

      </Container>
      
      // <Form>
      //   <Form.Row>
      //       <Form.Group as={Col} >
      //         <Form.Label>Email</Form.Label>
      //         <Form.Control type="email" placeholder="Enter email" />
      //       </Form.Group>
      //       <Form.Group as={Col} >
      //         <Form.Check 
      //           type='radio'
      //           name='public'
      //           label='Public: Display comment below'
      //         />
      //         <Form.Check
      //           type='radio'
      //           namee='private'
      //           label='Private: Shown only to developer'
      //         />
      //       </Form.Group>
      //   </Form.Row>
      // </Form>

    ) // ends Return
  } // ends Render

} // ends AddNewComment class
  export default AddNewComment