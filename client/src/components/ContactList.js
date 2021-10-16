import React, { useState, useEffect } from "react";
import ContactDataService from "../services/ContactService";
import { Link } from "react-router-dom";

const ContactsList = () => {
    const [contacts, setContacts] = useState([]);
    const [currentContact, setCurrentContact] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const fetchContacts = () => {
        ContactDataService.getAll()
            .then((response) => {
                setContacts(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const setActiveContact = (contact, index) => {
        setCurrentContact(contact);
        setCurrentIndex(index);
    };

    const deleteContact = (id) => {
        ContactDataService.delete(id)
            .then((response) => {
                fetchContacts();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Contacts List</h4>

                <ul className="list-group">
                    {contacts &&
                        contacts.map((contact, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveContact(contact, index)}
                                key={index}
                            >
                                {contact.firstname + " " + contact.lastname}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentContact ? (
                    <div>
                        <h4>Contact</h4>
                        <div>
                            <label>
                                <strong>First Name:</strong>
                            </label>{" "}
                            {currentContact.firstname}
                        </div>
                        <div>
                            <label>
                                <strong>Last Name:</strong>
                            </label>{" "}
                            {currentContact.lastname}
                        </div>
                        <div>
                            <label>
                                <strong>Email:</strong>
                            </label>{" "}
                            {currentContact.email}
                        </div>
                        <div>
                            <label>
                                <strong>Address</strong>
                            </label>{" "}
                            {currentContact.address}
                        </div>

                        <Link
                            to={"/contacts/" + currentContact._id}
                            className="btn btn-primary"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Contact...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactsList;