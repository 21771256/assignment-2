module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // DEFINE YOUR MODEL HERE
        phonenumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
  
    return Phone;
};