const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('library_system', 'root', 'Dontdothis@123', {
    host: 'localhost',
    define: {
        timestamps: false,
    },
    dialect: 'mysql',
    logging:false
});


const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.person = require('./person')(sequelize,DataTypes,Model);
db.addBook = require('./addBook')(sequelize,DataTypes,Model);
db.book = require('./book')(sequelize,DataTypes,Model);
db.issueBook = require('./issueBook')(sequelize,DataTypes,Model);



// db.sequelize.sync({alter:true});
// db.sequelize.sync({force:true});
db.sequelize.sync();

module.exports = db;
