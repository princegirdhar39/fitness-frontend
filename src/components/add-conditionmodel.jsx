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


export const AddCondition = (props) => {
//   const [firstNameError, setFirstNameError] = useState("");
//   const [lastNameError, setLastNameError] = useState(" ");
//   const {email} = props;
  
  return (
    <Modal
      onClose={() => props.setOpenCond(false)}
      onOpen={() => props.setOpenCond(true)}
      open={props.openCodd}
    >
      <Modal.Header>Add a Test</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Enter the name of the test</label>
              <input
                placeholder="Name"
                type="text"
                name="name"
                onChange={(e) => props.setconditionName(e.target.value)}
              />
              
                
              
            </Form.Field>
           
        
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          style={{ width: 100 }}
          color="black"
          onClick={() => props.setOpenCond(false)}
        >
          Cancel
        </Button>
        <Button
          style={{ width: 100,height: 37 }}
          content="Add"
          labelPosition="right"
          icon="checkmark"
          // onClick={() => setOpen(false)}
          type="submit"
          className="blue"
          
          positive
          onClick={() => {
            if(props.prescriptionName === ' '){
                alert('Enter something');
            }
            // props.createNewUser(props.firstName, props.lastName, props.email);
            props.createNewCondition(props.conditionName);
           

            
              
             
            
            
          }
            }
          
        />
        
      </Modal.Actions>
      
    </Modal>
  );
};
