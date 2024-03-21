import "./App.css";
import React, { useState } from "react";
import { Amplify, API } from "aws-amplify"; // Import Amplify and API from aws-amplify

const myAPI = "api49acc64a";
const path = "/customers";

Amplify.configure({}); // Configure Amplify if needed

const App = () => {
  const [input, setInput] = useState("");
  const [customers, setCustomers] = useState([]);

  // Function to fetch from our backend and update customers array
  function getCustomer(e) {
    let customerId = e.input;
    API.get(myAPI, path + "/" + customerId)
      .then((response) => {
        console.log(response);
        let newCustomers = [...customers];
        newCustomers.push(response);
        setCustomers(newCustomers);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <h1>Super Simple React App</h1>
      <div>
        <input
          placeholder="customer id"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => getCustomer({ input })}>
        Get Customer From Backend
      </button>

      <h2 style={{ visibility: customers.length > 0 ? "visible" : "hidden" }}>
        Response
      </h2>
      {customers.map((thisCustomer, index) => {
        return (
          <div key={thisCustomer.customerId}>
            <span>
              <b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>
              : {thisCustomer.customerName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default App;
