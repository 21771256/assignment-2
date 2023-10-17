module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // DEFINE YOUR MODEL HERE
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        contactID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "contacts",
                key: "id",
            },
        },
    });
  
    return Phone;
};