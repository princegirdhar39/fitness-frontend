import React, { Component, useState, useEffect } from "react";
import "./fontawesome";
import "./App.css";
import { UserListItem } from "./components/user-list-item";
import { SearchUser } from "./components/search-user";
import "reactjs-popup/dist/index.css";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { MdDone,MdNoteAdd,MdClear } from "react-icons/md";

import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  TextArea,
} from "semantic-ui-react";
import { AddUser } from "./components/add-usermodel";
import { SelectedUser } from "./components/selected-users";
import { FaPrescription } from "react-icons/fa";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [all_prescriptions, setPrescriptions] = useState([]);
  const [all_conditions, setConditions] = useState([]);

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);

  const [remainingPrescriptions, setRemainingPrescriptions] = useState([]);
  const [remainingConditions, setReamainingConditions] = useState([]);

  const userSelected = (user) => {
    setSelectedUser(user);

    setRemainingPrescriptions(
      all_prescriptions.filter((pres) => {
        return !user.prescriptions.some(
          (user_pres) => user_pres.id === pres.id
        );
      })
    );

    setReamainingConditions(
      all_conditions.filter((cond) => {
        return !user.conditions.some((user_cond) => user_cond.id === cond.id);
      })
    );
    
  };

  const addPrescriptionToUser = (prescription) => {
    setRemainingPrescriptions(
      remainingPrescriptions.filter((pres) => pres.id !== prescription.id)
    );
    setSelectedUser({
      ...selectedUser,
      prescriptions: [...selectedUser.prescriptions, prescription],
    });
    //add prescription
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser.id,
        prescriptionId: prescription.id
        
      }),
    };
    fetch("http://localhost:3000/users/assign-prescription", requestOptions)
      .then((response) => response.json())
      .then((newPrescription) => {
        //setOpen(false);
        setPrescriptions([newPrescription, ...all_prescriptions]);
      });
  };
  const removePrescription = (prescription) => {
    setSelectedUser({
      ...selectedUser,
      prescriptions: selectedUser.prescriptions.filter(
        (pres) => pres.id !== prescription.id
      ),
    });
    setRemainingPrescriptions([...remainingPrescriptions, prescription]);

  };

  const addConditionToUser = (condition) => {
    setReamainingConditions(
      remainingConditions.filter((cond) => cond.id !== condition.id)
    );
    setSelectedUser({
      ...selectedUser,
      conditions: [...selectedUser.conditions, condition],
    });
    //addcondition
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser.id,
        conditionId: condition.id
        
      }),
    };
    fetch("http://localhost:3000/users/assign-condition", requestOptions)
      .then((response) => response.json())
      .then((newCondition) => {
        //setOpen(false);
        setConditions([newCondition, ...all_conditions]);
      });
  };
  const removeCondition = (condition) => {
    setSelectedUser({
      ...selectedUser,
      conditions: selectedUser.conditions.filter(
        (cond) => cond.id !== condition.id
      ),
    });
    setReamainingConditions([...remainingConditions, condition]);
  };

  //get users request
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  //get prescriptions

  useEffect(() => {
    fetch("http://localhost:3000/prescriptions")
      .then((res) => res.json())
      .then((data) => setPrescriptions(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/conditions")
      .then((res) => res.json())
      .then((data) => setConditions(data));
  }, []);

  //search filter
  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => {
        return (
          user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          user.last_name.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, users]);
  //post request

  const createNewUser = (firstName, lastName, email) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        P_fname: firstName,
        P_lname: lastName,
        P_email: email,
      }),
    };
    fetch("http://localhost:3000/users", requestOptions)
      .then((response) => response.json())
      .then((newUser) => {
        setOpen(false);
        setUsers([newUser, ...users]);
      });
  };

  return (
    <>
      <AddUser
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setOpen={setOpen}
        createNewUser={createNewUser}
        firstName={firstName}
        lastName={lastName}
        email={email}
        open={open}
      />

      <div className="container-1">
        <div className="container-2">
          <div className="container-4">
            <SearchUser fsetSearch={setSearch} />
          </div>

          <div className="user-list">
            {filteredUsers.map((user) => {
              return (
                <UserListItem
                  key={user.id}
                  setSelectedUser={userSelected}
                  user={user}
                />
              );
            })}
          </div>
          <div className="addUser">
            <Button color="blue" onClick={() => setOpen(true)}>
              Add User
            </Button>
          </div>
        </div>
        <div className="container-3">
          <SelectedUser selectedUser={selectedUser} />

          <div className="container-7">
            {!selectedUser && (
              <div className="lines">
              <div className="line"></div>
              <div className ="line"></div>
              <div className="line"></div>
             
            </div>
            )} 
            {selectedUser && (
              <div className="pres-cond">
                <div className="list-container">
                  <div className="title">Prescriptions</div>
                  <div className="list">
                    <div className="assigned-pres-cond">
                      <div className="assigned-title">
                        Assigned-prescriptions
                      </div>
                      {selectedUser.prescriptions.map((p) => (
                        <div className="list-item">
                          {p.prescription}
                          <MdClear style={{color:"red", cursor:"pointer", flex: 1,}} onClick={() => removePrescription(p)}/>
                          {/* <Button onClick={() => removePrescription(p)}>
                            Remove
                          </Button> */}
                        </div>
                      ))}
                    </div>
                    <div className="remaining-pres-cond">
                      <div className="assigned-title">
                        <div>Select prescriptions</div>
                      </div>
                      {remainingPrescriptions.map((p) => (
                        // <div className="pres-cond-list">
                        <div className="list-item">
                          {p.prescription}
                          <MdDone style={{color:"green", cursor:"pointer" , flex: 1}} onClick={() => addPrescriptionToUser(p)}/>
                          
                        </div>
                        // </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="list-container">
                  <div className="title">Conditions</div>
                  <div className="list">
                    <div className="assigned-pres-cond">
                      <div className="assigned-title">
                       
                        Assigned-Conditions
                      
                      </div>
                      {selectedUser.conditions.map((c) => (
                        <div className="list-item">
                          {c.condition}
                          <MdClear style={{color:"red", cursor:"pointer", flex: 1} } onClick={() => removeCondition(c)}/>
                          
                        </div>
                      ))}
                    </div>
                    <div className="remaining-pres-cond">
                      <div className="assigned-title">Select Conditions</div>
                      {remainingConditions.map((c) => (
                        <div className="list-item">
                          {c.condition}
                          <MdDone style={{color:"green", cursor:"pointer" , flex: 1}} onClick={() => addConditionToUser(c)} />
                         
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedUser && (
              <div className="notes">
                <Form>
                  <TextArea
                    value={selectedUser.note || ""}
                    placeholder="Add a note"
                    onChange={(e) => {
                      console.log("updating note");
                      userSelected({
                        ...selectedUser,
                        note: e.target.value,
                      });
                    }}
                  />
                </Form>
                <Button
                  onClick={() => {
                    // API CALL
                    const requestOptions = {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId: selectedUser.id,
                        note: selectedUser.note,
                      }),
                    };
                    fetch(
                      "http://localhost:3000/users/update-user-note",
                      requestOptions
                    ).then((response) => response.json());

                    // user_id: selectedUser.id,
                    // note: selectedUser.note
                  }}
                  color="blue"
                >
                  Update Note
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard
