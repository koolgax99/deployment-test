import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddContact from "./components/addContact";
import Contact from "./components/Contact";
import ContactsList from "./components/ContactList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-center">
        <a href="/contacts" className="navbar-brand">
          DPS Challenge
        </a>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to={"/contacts"} className="nav-link">
              Contacts
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/contacts"]} component={ContactsList} />
          <Route exact path="/add" component={AddContact} />
          <Route path="/contacts/:id" component={Contact} />
        </Switch>
      </div>
    </div >
  );
}

export default App;