import React from "react";

export const UserListItem = (props) => {
  const user = props.user;
  return (
    <div>
      <div className="user-list-item" onClick={() => props.setSelectedUser(user)}>
        <img
          src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
          alt="Avatar"
          className="avatar"
        />
        <div className="user-details">
          <div className="user-name">
            {user.first_name} {user.last_name}
          </div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>
    </div>
  );
};
