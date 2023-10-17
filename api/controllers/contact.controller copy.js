const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const contacts = {
        name: req.body.name
    };
    Contacts.create(contacts)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error in creating contact"
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.contactId
    Contacts.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error in finding one contact"
            });
        });
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.contactId;
    Contacts.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contact was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update contact`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating contact with id=" + id
        });
    });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.contactId;
    Contacts.destroy({where: { id: id }})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contact was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete contact`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error deleting contact with id=" + id
        });
    });
};
