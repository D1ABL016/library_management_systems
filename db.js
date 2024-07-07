const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dontdothis@123",
    database: "library_system"
});

con.connect(function (err) {
    if (err) throw err;
})
module.exports = {con};