// cons/t { sequelize, DataTypes, Model } = require('../main');

module.exports = (sequelize, DataTypes, Model) => {
    class add_book extends Model { }

    add_book.init({
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        added_by: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        added_units: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        added_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        added_book: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            sequelize,
            modelName: 'add_book',
        }
    );
    return add_book;
}




// module.exports = add_book;
