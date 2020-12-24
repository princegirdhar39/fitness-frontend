import React, { Component, useState, useEffect } from "react";
import "./fontawesome";
import "./App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserListItem } from "./components/user-list-item";
import { SearchUser } from "./components/search-user";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const static_users = [
  {
    id: 1,
    first_name: "Wendi",
    last_name: "Khomin",
    email: "wkhomin0@umn.edu",
  },
  {
    id: 2,
    first_name: "Kelley",
    last_name: "Hullbrook",
    email: "khullbrook1@wiley.com",
  },
  {
    id: 3,
    first_name: "Elka",
    last_name: "Marritt",
    email: "emarritt2@webmd.com",
  },
  {
    id: 4,
    first_name: "Wald",
    last_name: "Beedell",
    email: "wbeedell3@indiatimes.com",
  },
  {
    id: 5,
    first_name: "Bertine",
    last_name: "Nealon",
    email: "bnealon4@alibaba.com",
  },
  {
    id: 6,
    first_name: "Marieann",
    last_name: "McGarva",
    email: "mmcgarva5@surveymonkey.com",
  },
  {
    id: 7,
    first_name: "Caddric",
    last_name: "Gilardi",
    email: "cgilardi6@1688.com",
  },
  {
    id: 8,
    first_name: "Joyann",
    last_name: "Partner",
    email: "jpartner7@sogou.com",
  },
  {
    id: 9,
    first_name: "Avril",
    last_name: "Scamerden",
    email: "ascamerden8@google.co.jp",
  },
  {
    id: 10,
    first_name: "Lindy",
    last_name: "Heggison",
    email: "lheggison9@washington.edu",
  },
  {
    id: 11,
    first_name: "Jervis",
    last_name: "Braunton",
    email: "jbrauntona@foxnews.com",
  },
  {
    id: 12,
    first_name: "Anetta",
    last_name: "Lowry",
    email: "alowryb@networkadvertising.org",
  },
  {
    id: 13,
    first_name: "Meade",
    last_name: "Windram",
    email: "mwindramc@sciencedirect.com",
  },
  {
    id: 14,
    first_name: "Susannah",
    last_name: "Lettuce",
    email: "slettuced@hc360.com",
  },
  {
    id: 15,
    first_name: "Giusto",
    last_name: "Pristnor",
    email: "gpristnore@wunderground.com",
  },
  {
    id: 16,
    first_name: "Raleigh",
    last_name: "Lusgdin",
    email: "rlusgdinf@tumblr.com",
  },
  {
    id: 17,
    first_name: "Tammy",
    last_name: "Brave",
    email: "tbraveg@google.it",
  },
  {
    id: 18,
    first_name: "Haydon",
    last_name: "MacDermot",
    email: "hmacdermoth@artisteer.com",
  },
  {
    id: 19,
    first_name: "Constancy",
    last_name: "Thackray",
    email: "cthackrayi@com.com",
  },
  {
    id: 20,
    first_name: "Deedee",
    last_name: "Lagne",
    email: "dlagnej@google.com.au",
  },
  {
    id: 21,
    first_name: "Franz",
    last_name: "Sones",
    email: "fsonesk@google.fr",
  },
  {
    id: 22,
    first_name: "Jehu",
    last_name: "Downey",
    email: "jdowneyl@blogs.com",
  },
  {
    id: 23,
    first_name: "Nolana",
    last_name: "Monnoyer",
    email: "nmonnoyerm@php.net",
  },
  {
    id: 24,
    first_name: "Arlette",
    last_name: "Wixey",
    email: "awixeyn@ning.com",
  },
  {
    id: 25,
    first_name: "Maggi",
    last_name: "Dundin",
    email: "mdundino@fc2.com",
  },
  {
    id: 26,
    first_name: "Yolanthe",
    last_name: "Cleeves",
    email: "ycleevesp@lycos.com",
  },
  {
    id: 27,
    first_name: "Hattie",
    last_name: "Leming",
    email: "hlemingq@plala.or.jp",
  },
  {
    id: 28,
    first_name: "Johannah",
    last_name: "Gibby",
    email: "jgibbyr@gmpg.org",
  },
  {
    id: 29,
    first_name: "Bengt",
    last_name: "Bullcock",
    email: "bbullcocks@paginegialle.it",
  },
  {
    id: 30,
    first_name: "Leda",
    last_name: "Rodgman",
    email: "lrodgmant@skype.com",
  },
  {
    id: 31,
    first_name: "Lyndel",
    last_name: "Cottell",
    email: "lcottellu@histats.com",
  },
  {
    id: 32,
    first_name: "Der",
    last_name: "Grunguer",
    email: "dgrunguerv@google.co.uk",
  },
  {
    id: 33,
    first_name: "Alyssa",
    last_name: "Chaikovski",
    email: "achaikovskiw@java.com",
  },
  {
    id: 34,
    first_name: "Claudian",
    last_name: "Domnin",
    email: "cdomninx@home.pl",
  },
  {
    id: 35,
    first_name: "Marcelle",
    last_name: "Rose",
    email: "mrosey@newsvine.com",
  },
  {
    id: 36,
    first_name: "Chadwick",
    last_name: "Endecott",
    email: "cendecottz@shinystat.com",
  },
  {
    id: 37,
    first_name: "Calvin",
    last_name: "Sheere",
    email: "csheere10@zimbio.com",
  },
  {
    id: 38,
    first_name: "Herta",
    last_name: "Lumsdall",
    email: "hlumsdall11@usa.gov",
  },
  {
    id: 39,
    first_name: "Kassi",
    last_name: "Gartell",
    email: "kgartell12@cornell.edu",
  },
  {
    id: 40,
    first_name: "Flinn",
    last_name: "Medcalfe",
    email: "fmedcalfe13@lulu.com",
  },
  {
    id: 41,
    first_name: "Shawn",
    last_name: "Mation",
    email: "smation14@cisco.com",
  },
  {
    id: 42,
    first_name: "Cesar",
    last_name: "Dadge",
    email: "cdadge15@sourceforge.net",
  },
  {
    id: 43,
    first_name: "Honoria",
    last_name: "McSpirron",
    email: "hmcspirron16@google.nl",
  },
  {
    id: 44,
    first_name: "Felicio",
    last_name: "Wildbore",
    email: "fwildbore17@ibm.com",
  },
  {
    id: 45,
    first_name: "Cheri",
    last_name: "Fryatt",
    email: "cfryatt18@google.cn",
  },
  {
    id: 46,
    first_name: "Gabbie",
    last_name: "Shernock",
    email: "gshernock19@last.fm",
  },
  {
    id: 47,
    first_name: "Desdemona",
    last_name: "Fussie",
    email: "dfussie1a@mapy.cz",
  },
  {
    id: 48,
    first_name: "Nana",
    last_name: "Kornyshev",
    email: "nkornyshev1b@tamu.edu",
  },
  {
    id: 49,
    first_name: "Trumann",
    last_name: "Beswick",
    email: "tbeswick1c@soundcloud.com",
  },
  {
    id: 50,
    first_name: "Esme",
    last_name: "Fermer",
    email: "efermer1d@utexas.edu",
  },
];

let user_details = {
  conditions: [
    "HighBloodPresure ",
    "Asthma ",
    "Abola ",
    "corona ",
    "Heart problem ",
  ],
  prescription: [
    "itone",
    "pcm",
    "Acyclovir",
    "Alemtuzumab",
    "Alendronate",
    "Allopurinol",
  ],
};

const App = () => {
  const [users, setUsers] = useState(static_users);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [prescription,setPrescription] = useState(null);
  const [condition,setCondition] = useState(null)

  useEffect(() => {
    setFilteredUsers(
      static_users.filter((user) => {
        return (
          user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          user.last_name.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search]);

  let id = 51;

  const createNewUser = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    setFilteredUsers([
      ...filteredUsers,
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        id: id++,
      },
    ]);
  };

  return (
    <div className="container-1">
      <div className="container-2">
        <div className="container-4">
          <SearchUser fsetSearch={setSearch} />
        </div>

        <div className="user-list">
          {filteredUsers.map((user) => {
            return (
              <UserListItem setSelectedUser={setSelectedUser} user={user} setPrescription={setPrescription} />
            );
          })}
        </div>

        <div className="addUser">
          <div className="popup-div">
            <Popup trigger={<button> Add+</button>} position="right center">
              <div>
                <label>
                  First_name:
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label>
                  Last_Name:
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label>
                  Email_id:
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <button className="blue" onClick={() => createNewUser()}>Add</button>
              </div>
            </Popup>
          </div>
        </div>
      </div>
      <div className="container-3">
        <div className="selected-user-container-6">
          {selectedUser && (
            <div className="selected-item">
              <img
                src={`https://randomuser.me/api/portraits/men/${selectedUser.id}.jpg`}
                alt="Avatar"
                className="avatar"
              />
              <div className="selected-user-details">
                <div className="selected-user-name">
                  {selectedUser.first_name} {selectedUser.last_name}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="container-7">
          <div className="pres-cond">
          {prescription &&(
              user_details.conditions
            )}          
          <div className="prescriptions">
            <div className="pres-title">Prescriptions</div>
            <div className="condition-list">
            
            </div>


          </div>
          <div className="conditions">
          <div className="pres-title">Conditions</div>
          <div className="condition-list">
            {user_details.conditions[0]}           
            </div>
          



          </div>
          </div>
 


        </div>
      </div>
    </div>
  );
};
export default App;
