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
import { Link } from "react-router-dom";

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
  const [note,setNote] = useState([]);

  const [remainingPrescriptions, setRemainingPrescriptions] = useState([]);
  const [remainingConditions, setReamainingConditions] = useState([]);

  const userSelected = (user) => {
    setSelectedUser(user);
      console.log('All prescriptions',all_prescriptions);
      console.log('user.prescription',user.prescription);
      console.log('user.conditions',user.conditions);
      // console.log(selectedUser.notes);


    setRemainingPrescriptions(
      all_prescriptions.filter((pres) => {
        return !user.prescription.some(
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
  const updateNotes = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser.id,
        note: selectedUser.notes,
      }),
    };
    fetch(
      "http://localhost:3000/users/update-user-note",
      requestOptions
    ).then((response) => response.json())
  }


  const addPrescriptionToUser = (prescription) => {
    // console.log('selected user:', selectedUser.prescriptions);
    setRemainingPrescriptions(
      remainingPrescriptions.filter((pres) => pres.id !== prescription.id)
    );
    setSelectedUser({
      ...selectedUser,
      prescription: [...selectedUser.prescription, prescription],
    });
    console.log('selected user:', selectedUser);
    console.log({
      ...selectedUser,
      prescriptions: [...selectedUser.prescription, prescription],
    })

    

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
        // setOpen(false);
        setPrescriptions([newPrescription, ...all_prescriptions]);
      });
  };
  const removePrescription = (prescription) => {
    setSelectedUser({
      ...selectedUser,
      prescriptions: selectedUser.prescription.filter(
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
    fetch("http://localhost:3000/prescription")
      .then((res) => res.json())
      .then((data) => setPrescriptions(data));
  }, []);
//get conditions
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
      <div style={{backgroundColor:'rgb(75 85 99)',height:'65px',display: 'flex',justifyContent:'space-between',alignItems:'center',paddingLeft:'28PX',position: 'sticky',top: '0'}} className="header">
       <div style={{color: 'white',fontSize:'30PX'}} >DigiHealth</div>
       {/* <Link to='/' style={{color: 'white',fontSize:'20PX', backgroundColor: 'red',cursor:'pointer',padding: '8px',marginRight:'10px',borderRadius:'4px' }}>Logout</Link> */}
       
       </div> 

      <div className="container-1">
     
      {/* <div>hello</div> */}
        
        <div className="container-2">
          <div className="container-4">
            <SearchUser fsetSearch={setSearch} />
            <Button color="blue" onClick={() => setOpen(true)}>
              New
            </Button>
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
            {/* <Button color="blue" onClick={() => setOpen(true)}>
              Add User
            </Button> */}
          </div>
        </div>
        <div className="container-3">
          <SelectedUser selectedUser={selectedUser} />

          <div className="container-7">
            {!selectedUser && (
               <div className="notselected ">
               <img
               style={{width:'8rem',marginBottom: '1rem'}}
                 className="w-32 mb-4"
                 src="https://cdn.pixabay.com/photo/2022/01/08/11/06/plant-6923699_960_720.png"
               />
               <div>It seems you haven't selected any user yet.</div>
               <div>Choose one on the left.</div>
             </div>
            )} 
            {selectedUser && (
              <div style={{background: selectedUser === selectedUser.firstName ? "rgba(55, 65, 81, 0.15)" : "transparent",}} className="pres-cond">
                <div className="list-container">
                  <div className="title">Prescriptions</div>
                  <div className="list">
                    <div className="assigned-pres-cond">
                      <div className="assigned-title">
                        Assigned-prescriptions
                      </div>
                      {selectedUser.prescription.map((p) => (
                        <div className="list-item">
                          {p.prescription}
                          <MdClear style={{color:"red", cursor:"pointer", flex: 1,}} onClick={() => removePrescription(p)}/>
                          {/* <Button onClick={() => removePrescription(p)}>
                            Remove
                          </Button> */}
                          {/* <MdClear style={{color:"red", cursor:"pointer", flex: 1} } onClick={() => removePrescription(c)}/> */}

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
                  onClick={() => updateNotes}
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
