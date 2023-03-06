const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        datetime: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        duration: {
            type: Sequelize.INTEGER,
        },
        isCancelled: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, { timestamps: true });
    return Schedule;
};
