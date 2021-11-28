const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require('../../database');
require('dotenv').config();

exports.getUsers = function (req, res, next) {
    res.status(200).json("GET USERS")
};

exports.signUpUser = function (req, res, next) {
    
    console.log(req.body);
    // REQ-Body-Example
    // {
    //     "email": "admin@gmail.com",
    //     "fullName": "Admin",
    //     "password": "123456",
    //     "role": 1
    // }

    const userInput = req.body;
    if(!req.body) {
        return res.status(200).json({
            status: 401,
            message: "OOPS! Something is wrong."
        })
    }

    console.log(userInput.email);

    const query = "select email from users where email = '"+ userInput.email +"'";

    con.query(query, (err, result) => {
        console.log(result[0])
       if(!result[0]) {
           console.log(userInput.email)
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {

                    const values = [userInput.email, userInput.fullName, userInput.role,hash, "YES"];

                    var sql = "INSERT INTO users (email, fullName, role, password, verified) VALUES (?)";
                    console.log(sql, values);

                    con.query(sql, [values], function (err, result) {
                        if (err) {
                            res.status(400).json(err)
                        } else {
                        return res.status(200).json({
                            status: 'success',
                            message: "User created successfully",
                            data: result
                            });
                        }
                        });
                }
            });
        }else{
            return res.status(403).json({
                status: 403,
                message: "Sorry! This email id is already exists.",
                data: result
            });
        }
    });
};

exports.loginUser = function (req, res, next) {
    console.log("Login!");
    // Request-Body-Example
    // {
    //     "email": "admin@gmail.com",
    //     "password": "123456",
    // }
  
    const user = req.body;

    if(!user) {
        return res.status(401).json({
            status: 401,
            message: "OOPS! Something is wrong."
        })
    }

    const query = "select id,email,password from users where email = '"+ user.email +"'";
    
    console.log(query)
    
    con.query(query, (err, result) => {
    //    console.log(result[0])
       if(result[0]) {
        //    console.log(user.email)
           bcrypt.compare(user.password, result[0].password, (err, ans) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }

                else if (ans) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now().valueOf() / 1000) + 60,
                        email: result[0].email,
                        userId: result[0].id,
                    }, process.env.SECRET);

                    return res.status(200).json({
                        message: 'Auth Success',
                        token: token
                    });

                } else {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
            });
        }else{
            res.status(500).json({
                error: err
            });
        }
    });
};
