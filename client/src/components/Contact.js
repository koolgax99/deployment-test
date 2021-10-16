import React, { useState, useEffect } from "react";
import ContactDataService from "../services/ContactService";

const Contact = props => {
    const initialContactState = {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        address: "",
    };

    const [currentContact, setCurrentContact] = useState(initialContactState);
    const [message, setMessage] = useState([]);

    const getContact = id => {
        ContactDataService.get(id)
            .then(response => {
                setCurrentContact(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getContact(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentContact({ ...currentContact, [name]: value });
    };

    const updateContact = () => {
        console.log(currentContact._id, currentContact);
        ContactDataService.update(currentContact._id, currentContact)
            .then(response => {
                console.log(response.data);
                setMessage("The Contact was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteContact = () => {
        ContactDataService.remove(currentContact._id)
            .then(response => {
                console.log(response.data);
                props.history.push("/contacts");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentContact ? (
                <div className="edit-form">
                    <h4>Contact</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                name="firstname"
                                value={currentContact.firstname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                name="lastname"
                                value={currentContact.lastname}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={currentContact.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={currentContact.address}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button className="btn btn-danger mr-2" onClick={deleteContact}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={updateContact}
                    >
                        Update
                    </button>
                    <h3>{message}</h3>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Contact...</p>
                </div>
            )}
        </div>
    );
}

export default Contact;