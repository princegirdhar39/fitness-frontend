import React, { useState } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  TextArea,
} from "semantic-ui-react";
import './add-user-model.css';


export const AddUser = (props) => {
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState(" ");
  const {email} = props;
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test((email).toLowerCase());
  }
  return (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
    >
      <Modal.Header>Add a User</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                type="text"
                name="name"
                onChange={(e) => props.setFirstName(e.target.value)}
              />
              
                
              
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                name="name"
                onChange={(e) => props.setLastName(e.target.value)}
              />
              {lastNameError === "EMPTY" && (
                <span className="text-sm text-red-500">
                  *Please enter last name
                </span>
                
              )}
              
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                type="text"
                name="name"
                placeholder="Email"
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          style={{ width: 100 }}
          color="black"
          onClick={() => props.setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          style={{ width: 100 }}
          content="Add"
          labelPosition="right"
          icon="checkmark"
          // onClick={() => setOpen(false)}
          type="submit"
          className="blue"
          disabled={!props.firstName||!props.lastName||!props.email||!props.email.includes("@")||!validateEmail(email)}
          
          positive
          onClick={() => {
            props.createNewUser(props.firstName, props.lastName, props.email);
            
              
             
            
            
          }
            }
          
        />
        <div style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'flex-start',fontSize:'20px'}}>
      <div style={{fontColor: 'red', color: 'red'}} className="">
                  *First name can not be empty
                </div>
                <div style={{fontColor: 'red', color: 'red'}} className="">
                  *Last name can not be empty
                </div>
                </div>
      </Modal.Actions>
      
    </Modal>
  );
};
