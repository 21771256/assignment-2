const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const phone = {
        name: req.body.name,
        number: req.body.number,
        contactID: req.params.contactId,
    };
    Phones.create(phone)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error in creating phone details"
            });
        });
};

// Get all phones
exports.findAll = (req, res) => {
    const contactid = req.params.contactId
    Phones.findAll({where: {contactID: contactid}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
    const id = req.params.phoneId;
    Phones.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error in finding one phone"
            });
        });
};

// Update one phone by id
exports.update = (req, res) => {
    const id = req.params.phoneId;
    Phones.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Phone was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update phone`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating phone with id=" + id
        });
    });
};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.phoneId;
    Phones.destroy({where: { id: id }})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Phone was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update phone`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating phone with id=" + id
        });
    });
};