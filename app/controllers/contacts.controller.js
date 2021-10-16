const db = require("../models");
const Contact = db.contacts;

// Create a new Contact
exports.create = (req, res) => {
    if (!req.body.firstname) {
        res.status(400).send({ message: "First Name can not be empty!" });
        return;
    } else if (!req.body.lastname) {
        res.status(400).send({ message: "Last Name can not be empty!" });
        return;
    } else if (!req.body.email) {
        res.status(400).send({ message: "Email can not be empty!" });
        return;
    }

    const contact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address
    });

    contact
        .save(contact)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Contact"
            });
        });
};

// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
    Contact.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving contacts."
            });
        });
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Contact.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Contact with id " + id });
            else res.status(200).send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Contact with id=" + id });
        });
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
                });
            } else res.send({ message: "Contact was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Contact with id=" + id
            });
        });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Contact.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
                });
            } else {
                res.send({
                    message: "Contact was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Contact with id=" + id
            });
        });
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
    Contact.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Contacts were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all contacts."
            });
        });
};