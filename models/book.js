// const { sequelize, DataTypes, Model } = require('../main');
module.exports = (sequelize, DataTypes, Model) => {

    class book extends Model { }

    book.init({
        book_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        //foreign keys are book id and avialiable units
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        avialiable_units: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
        {
            sequelize,
            modelName: 'book',
        }
    );
    return book;

}

// module.exports = book;
