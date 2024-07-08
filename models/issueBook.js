
module.exports = (sequelize, DataTypes, Model) => {

    class issue_book extends Model { }

    issue_book.init({
        issued_by: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        issued_to: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        issued_to_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        issued_by_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true

            }
        },
        issued_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        return_date: {
            type: DataTypes.DATE
        },
        issued_book: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
        ,
        {
            sequelize,
            modelName: 'issue_book',
        }
    );
    return issue_book;
}




