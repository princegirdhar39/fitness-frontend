import React, { Component, useState, useEffect } from "react";
import "./fontawesome";
import "./App.css";
import { UserListItem } from "./components/user-list-item";
import { SearchUser } from "./components/search-user";
import "reactjs-popup/dist/index.css";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { MdDone, MdNoteAdd, MdClear } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { notification,Modal} from "antd";
import { success } from "@ant-design/icons";


import {
  Button,
  Header,
  Image,
  // Modal,
  Form,
  TextArea,
} from "semantic-ui-react";
import { AiOutlineLogout } from "react-icons/ai";
import { AddUser } from "./components/add-usermodel";
import { SelectedUser } from "./components/selected-users";
import { Link } from "react-router-dom";
import { AddPrescription } from "./components/add-prescription-model";
import { Fab } from "@material-ui/core";
import { AddCondition } from "./components/add-conditionmodel";

const { confirm } = Modal;


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
  const [prescriptionName, setprescriptionName] = useState("");
  const [conditionName, setconditionName] = useState("");

  const [open, setOpen] = useState(false);
  const [openPres, setOpenPres] = React.useState(false);
  const [openCodd,setOpenCond] =useState(false);

  const [note, setNote] = useState('');

  const [remainingPrescriptions, setRemainingPrescriptions] = useState([]);
  const [remainingConditions, setReamainingConditions] = useState([]);

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Note Updated',
      description:
        '',
    });
  };
  

  const userSelected = (user) => {
    setSelectedUser(user);

    console.log("All prescriptions", all_prescriptions);
    console.log("user.prescription", user.prescription);
    console.log("user.conditions", user.conditions);
    console.log(selectedUser);

    setRemainingPrescriptions(
      all_prescriptions.filter((pres) => {
        return !user.prescription.some((user_pres) => user_pres.id === pres.id);
      })
    );

    setReamainingConditions(
      all_conditions.filter((cond) => {
        return !user.conditions.some((user_cond) => user_cond.id === cond.id);
      })
    );
    if(user.note){

      setNote(user.note);
    }
    else{
      setNote("");
    }
  };

  const addPrescriptionToUser = (prescription) => {
    // console.log('selected user:', selectedUser.prescriptions);
    setRemainingPrescriptions(
      remainingPrescriptions.filter((pres) => pres.id !== prescription.id)
    );
    setSelectedUser({
      ...selectedUser,
      prescription: [...selectedUser.prescription, prescription],
    });
    console.log("selected user:", selectedUser);
    console.log({
      ...selectedUser,
      prescriptions: [...selectedUser.prescription, prescription],
    });

    //add prescription
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser.id,
        prescriptionId: prescription.id,
      }),
    };
    fetch("http://localhost:3000/users/assign-prescription", requestOptions)
      .then((response) => response.json())
      .then((newPrescription) => {
        // setOpen(false);
        setPrescriptions([newPrescription, ...all_prescriptions]);
        notification.success({message: 'Prescription added successfuly'});

      });
  };

  const removePrescription = (prescription) => {
    setSelectedUser({
      ...selectedUser,
      prescription: selectedUser.prescription.filter(
        (pres) => pres.id !== prescription.id
      ),
    });
    setRemainingPrescriptions([...remainingPrescriptions, prescription]);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser.id,
        prescriptionId: prescription.id,
      }),
    };
    fetch("http://localhost:3000/users/remove-prescription", requestOptions)
      .then((response) => response.json())
      .then((newPrescription) => {
        // setOpen(false);
        setPrescriptions([newPrescription, ...all_prescriptions]);
        notification.success({message: 'Prescription removed successfuly'});

      });
    
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
        conditionId: condition.id,
      }),
    };
    fetch("http://localhost:3000/users/assign-condition", requestOptions)
      .then((response) => response.json())
      .then((newCondition) => {
        //setOpen(false);
        setConditions([newCondition, ...all_conditions]);
        notification.success({message: 'Test assigned successfuly'});
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
    const requestOptions = {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser.id,
        conditionId: condition.id,
      }),
    };
    fetch("http://localhost:3000/users/remove-condition", requestOptions)
      .then((response) => response.json())
      .then((newCondition) => {
        //setOpen(false);
        setConditions([newCondition, ...all_conditions]);
        notification.success({message: 'Test removed successfuly'});

      });

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
        notification.success({message : 'User added successfuly'})
      });
  };
  const createNewPrescription = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        P_prescription: prescriptionName,
      }),
    };
    fetch("http://localhost:3000/prescription", requestOptions)
      .then((response) => response.json())
      .then((newPrescription) => {
        setOpenPres(false);
        setPrescriptions([newPrescription, ...remainingPrescriptions]);
      });

  }
  const createNewCondition = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        P_condition: conditionName,
      }),
    };
    fetch("http://localhost:3000/conditions", requestOptions)
      .then((response) => response.json())
      .then((newCondition) => {
        setOpenCond(false);
        setConditions([newCondition, ...remainingConditions]);
      });

  }

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
      <AddPrescription
      createNewPrescription={createNewPrescription}
      prescriptionName={prescriptionName}
      setprescriptionName={setprescriptionName}
      openPres={openPres}
      setOpenPres={setOpenPres}


      />
      <AddCondition
      createNewCondition={createNewCondition}
      conditionName={conditionName}
      setconditionName={setconditionName}
      openCodd={openCodd}
      setOpenCond={setOpenCond}
      
      />
      <div
        style={{
          backgroundColor: "rgb(75 85 99)",
          height: "65px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "28PX",
          position: "sticky",
          top: "0",
        }}
        className="header"
      >
        <div style={{ color: "white", fontSize: "30PX" }}>DigiHealth</div>
        {/* <Link to='/' style={{color: 'white',fontSize:'20PX', backgroundColor: 'red',cursor:'pointer',padding: '8px',marginRight:'10px',borderRadius:'4px' }}>Logout</Link> */}
        <Link to='/login'><AiOutlineLogout style={{fontSize:'39px', marginRight: '10px', color: 'red', cursor: 'pointer' }} /></Link>
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
                  style={{ width: "8rem", marginBottom: "1rem" }}
                  className="w-32 mb-4"
                  src="https://cdn.pixabay.com/photo/2022/01/08/11/06/plant-6923699_960_720.png"
                />
                <div>It seems you haven't selected any user yet.</div>
                <div>Choose one on the left.</div>
              </div>
            )}
            {selectedUser && (
              <div
                style={{
                  background:
                    selectedUser === selectedUser.firstName
                      ? "rgba(55, 65, 81, 0.15)"
                      : "transparent",
                }}
                className="pres-cond"
              >
                <div className="list-container">
                  <div className="title">
                    <div style={{backgroundColor: ''}}>

                    Prescriptions 
                  <FaPlusCircle onClick={() => setOpenPres(true)} style={{marginLeft: '9px', fontSize: '15px', cursor: 'pointer'}} />
                    </div>
                  
                  </div>
                  <div className="list">
                    <div className="assigned-pres-cond">
                      <div className="assigned-title">
                        Assigned-prescriptions
                      </div>
                      {selectedUser.prescription.map((p) => (
                        <div className="list-item">
                          {p.prescription}
                          <div>
                          <MdClear
                            style={{ color: "red", cursor: "pointer", flex: 1 }}
                            onClick={() => removePrescription(p)}
                          />
                          </div>
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
                          <div>
                          <MdDone
                            style={{
                              color: "green",
                              cursor: "pointer",
                              flex: 1,
                            }}
                            onClick={() => addPrescriptionToUser(p)}
                          />
                          </div>
                        </div>
                        // </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="list-container">
                  <div className="title">Medical Tests
                  <FaPlusCircle onClick={() => setOpenCond(true)} style={{marginLeft: '9px', fontSize: '15px', cursor: 'pointer'}} />
                  
                   </div>
                  <div className="list">
                    <div className="assigned-pres-cond">
                      <div className="assigned-title">Assigned-Tests</div>
                      {selectedUser.conditions.map((c) => (
                        <div className="list-item">
                          {c.condition}
                          <div>
                          <MdClear
                            style={{ color: "red", cursor: "pointer", flex: 1 }}
                            onClick={() => removeCondition(c)}
                          />
                        </div>
                        </div>
                      ))}
                    </div>
                    <div className="remaining-pres-cond">
                      <div className="assigned-title">Select Tests</div>
                      {remainingConditions.map((c) => (
                        <div className="list-item">
                          {c.condition}
                          <div>
                          <MdDone
                            style={{
                              color: "green",
                              cursor: "pointer",
                              flex: 1,
                            }}
                            onClick={() => {
                              addConditionToUser(c)
                            }
                            } 
                          />
                        </div>
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
                    value={note}
                    placeholder="Add a note"
                    onChange={(e) => {
                      console.log("updating note");
                      console.log(selectedUser.note)
                      setNote( e.target.value,
                      );
                    }}
                  />
                </Form>
                <div className="update-button">
                <Button className=""
                style={{width:'80px', marginLeft: ''}}
                  onClick={() => {
                    openNotificationWithIcon('success')
                    
                    const requestOptions = {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId: selectedUser.id,
                        note,
                      }),
                    };
                    fetch(
                      "http://localhost:3000/users/update-user-note",
                      requestOptions
                    );
                  }}  
                  color="blue"
                >
                  Update Note
                </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
