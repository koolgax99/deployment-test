import React, { useState } from 'react';
import ContactDataService from '../services/ContactService';

const AddContact = () => {
    const initialContactState = {
        firstname: '',
        lastname: '',
        email: '',
        address: '',
    };

    const [contact, setContact] = useState(initialContactState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: value });
    };

    const saveContact = () => {
        var data = {
            firstname: contact.firstname,
            lastname: contact.lastname,
            email: contact.email,
            address: contact.address,
        };

        console.log(data);
        ContactDataService.create(data)
            .then(response => {
                setContact({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    address: response.data.address
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newContact = () => {
        setContact(initialContactState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newContact}>Add new contact</button>
                </div>
            ) : (
                <div>
                    <h4>Add Contacts</h4>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control" id="firstname" name="firstname" value={contact.firstname} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" className="form-control" id="lastname" name="lastname" value={contact.lastname} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" name="email" value={contact.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" id="address" name="address" value={contact.address} onChange={handleInputChange} />
                    </div>
                    <button onClick={saveContact} className="btn btn-success">Save</button>
                </div>
            )}
        </div>
    );
}

export default AddContact;