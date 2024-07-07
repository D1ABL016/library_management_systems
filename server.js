
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const con = require('./db.js');
const models = require('./models/main.js');
const PORT = 3000;
// const person = require('./models/person.js')


const location = 'http:127.0.0.1:3000/'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))




function getNameSQL(q) {
    return new Promise((resolve, reject) => {
        con.query(q, function (err, result) {
            // console.log(result);

            // console.log(result[0].first_name);
            // console.log(result[0]);
            if (err) reject(err);
            if (result[0] == undefined) resolve('')
            else resolve(result[0].first_name);
        });
    })
}

function removeSpaces(str) {
    let temp = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] != ' ') temp += str[i];
    }
    return temp;
}

function issuebook_first_half(id, mID) {
    let f = false;
    return new Promise(async (resolve, reject) => {
        let q = `select book_name from book_demographics where book_id=${id} and avialiable_units > 0`;
        con.query(q, function (err, result) {
            q = ''
            if (err) reject(err);
            if (result[0] == undefined) {
                return resolve('Invalid book id or book is not avialiable');
                // return;
            }
            q = `select first_name from member_demographics where member_id = ${mID};`;
            con.query(q, function (err, result) {
                q = ''
                // console.log(2)
                // console.log('result =>',result);
                // console.log('result 0 =>',result[0]);
                if (err) reject(err);
                if (result[0] == undefined) {
                    return resolve('Invalid id');

                }
                q = `select book_issued from member_demographics where member_id = ${mID};`;
                con.query(q, function (err, result) {
                    f = true;
                    q = ''
                    // console.log(3)
                    // console.log('result =>',result);
                    // console.log('result 0 =>',result[0]);
                    if (err) reject(err);
                    if (result[0] == undefined) {
                        return resolve('invalid id');
                    }
                    else if (result[0].book_issued != null) {
                        return resolve('user already has a book issued')
                    }
                    else {
                        return resolve('')
                    }

                });
            });
        });
    })
}

function issuebook_second_half(id, mID) {
    return new Promise(async (resolve, reject) => {
        let q = `update book_demographics set avialiable_units = avialiable_units-1 where book_id = ${id};`
        con.query(q, function (err, result) {
            if (err) reject(err);
            // console.log('u1');
            q = `update member_demographics set book_issued =${id},issued_date=curdate(),return_date=date_add(curdate(),interval 1 month) where member_id = ${mID};`;
            con.query(q, function (err, result) {
                // a = true;
                if (err) reject(err);
                // console.log('u2');
                else return resolve('');
            });
        });
    })
}

function issuebook(id, mID) {
    return new Promise(async (resolve, reject) => {
        let response_from_second_half = ' ';
        // let response_from_first_half = 'random things';
        let response_from_first_half = await issuebook_first_half(id, mID);
        console.log('r1 => ', response_from_first_half);
        // if (response_from_first_half == '') response_from_second_half = await issuebook_second_half(id, mID);
        if (response_from_first_half == '') {
            response_from_second_half = await issuebook_second_half(id, mID);
            // console.log('first response', response_from_first_half)
            // console.log('second response', response_from_second_half)
            resolve('book issued succesfully');
        }
        else { resolve(response_from_first_half) }
    })
}

function getName(mail, pass) {
    return new Promise(async (resolve, reject) => {
        let q1 = `SELECT first_name FROM employee_demographics WHERE employee_mail=\'${mail}\' AND employee_password=\'${pass}\';`;

        let res1 = await getNameSQL(q1);

        let q2 = `SELECT first_name FROM member_demographics WHERE member_mail=\'${mail}\' AND member_password=\'${pass}\';`;


        let res2 = await getNameSQL(q2);

        if (res1 == '' && res2 == '') {
            resolve({ employee: null, str: '' });
        }
        else if (res2 == '') {
            resolve({ employee: 1, str: res1 });
        }
        else {
            resolve({ employee: 2, str: res2 });
        }
    })
}

function check(id) {
    // let n = prompt('enter string ');//take input
    // let f = true
    // console.log(n)
    return new Promise((resolve, reject) => {
        // if (err) reject(err);


        for (let i = 0; i < id.length; i++) {
            if (!(id.codePointAt(i) >= 48 && id.codePointAt(i) <= 57)) {
                resolve(false);
            }
        }
        // console.log(typeof (n))
        resolve(true);
    })

}

app.get('/error', function (req, res) {
    let c = 'check for following conditions \n';
    let c1 = '1. check your email and password \n';
    let c2 = '2. check whether membership ended or not';
    res.send(c + c1 + c2);
});

app.get('/adminLogin', function (req, res) {
    res.redirect('//127.0.0.1:3001/adminpage/mainpage.html')
});

app.get('/userLogin', function (req, res) {
    res.redirect('//127.0.0.1:3001/userpage/mainpage.html')
})



app.post('/issue_book', async function (req, res) {
    let book_id = req.body.bID;
    let user_id = req.body.uID;
    let r = 'invalid Book id ';
    book_id = removeSpaces(book_id);
    user_id = removeSpaces(user_id);

    if (book_id.length == 0) {
        res.send('please fill book id');
        return;
    }

    if (user_id.length == 0) {
        res.send('please fill user id');
        return;
    }


    let temp = await check(book_id);
    let temp1 = await check(user_id);

    if (temp && temp1) r = await issuebook(book_id, user_id);
    else if (temp) r = 'invalid user id'
    res.send(r);
})

app.post('/', async function (req, res) {
    let mail = req.body.mail;
    let password = req.body.password;
    res.send(mail, password);
})


// let nameobj = await getName(mail, password);
// let member = nameobj.employee;
// console.log(member);
// let name = nameobj.str;
// if (name == '') {
// res.redirect('/error');
// IMPORTANT

// as of now using the alert feature for telling the user that they have entered a wrong id and password but could use ejs next time when done

// let div = document.getElementById('error');
// div.innerText = c+c1+c2
// alert("c+c1+c2");
// res.send(c+c1+c2);
// res.send('fi') 
// }
// else {
// go to next  page
// if(member == 1)

// res.sendFile(__dirname+'/resources/admin/mainpage.html');

// res.redirect('/adminLogin')
//         else
// res.redirect('/userLogin')
// res.send(name);

// }
// });



app.listen(PORT, () => {
    console.log(`Server is running on ` + location);
});