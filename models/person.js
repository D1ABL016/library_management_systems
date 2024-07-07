// const { person } = require("../main");/

module.exports = (sequelize, DataTypes, Model) => {
    class Person extends Model { }

    Person.init({
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        passcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,

            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: true
            }
        },
        designation: {
            type: DataTypes.ENUM('user', 'librarian', 'admin'),
            defaultValue: "user",
            allowNull: false,
            validate: {
                isIn: [['user', 'librarian', 'admin']]
            }
        }
    },
        {
            sequelize,
            modelName: 'user',
        }
    );
    return Person;

}


