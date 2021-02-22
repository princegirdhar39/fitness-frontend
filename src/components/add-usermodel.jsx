import  React  from "react";
import { Button, Header, Image, Modal,Form, TextArea } from "semantic-ui-react";



export const AddUser = (props) => {
    return(
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
          <Button style={{width: 100}} color="black" onClick={() => props.setOpen(false)}>
            Cancel
          </Button>
          <Button
          style={{width: 100}}
            content="Add"
            labelPosition="right"
            icon="checkmark"
            // onClick={() => setOpen(false)}
            type="submit"
            className="blue"
            onClick={() => props.createNewUser(props.firstName, props.lastName, props.email)}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
};