import React from "react";
import { Button } from "semantic-ui-react";

export const SelectedUser = (props) => {
  return (
    <div className="selected-user-container-6">
      {props.selectedUser && (
        <div className="selected-item">
          <img
            src={`https://randomuser.me/api/portraits/men/${props.selectedUser.id}.jpg`}
            alt="Avatar"
            className="avatar"
          />
          <div className="selected-user-details">
            <div className="selected-user-name">
              {props.selectedUser.first_name} {props.selectedUser.last_name}
            </div>
          </div>
          <Button style={{width : 59, backgroundColor: 'red', color:'white',padding: '10px'}}>Logout</Button>


        </div>
      )}
    </div>
  );
};
