import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userSchema from '../schema/user.js'
import { GenerateTokenAndRefreshToken } from "../helpers/user.js";

const router = express.Router();

router.post('/register', (req,res) => {
  console.log("reqbody: ", req.body);
  const reqData = new userSchema({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: "https://i.stack.imgur.com/34AD2.jpg" // default for now
  })

  userSchema.create(reqData, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let { token, refreshToken } = GenerateTokenAndRefreshToken(user._id)

      res.status(201).json({
        token: token,
        refreshToken: refreshToken,
        message: "User has been successfully created"
      })
    }
  })
})

router.post('/login', (req,res) => {
  userSchema.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (!user) {
      return res.status(404).send({
        token: null,
        refreshToken: null,
        message: "User not Found"
      });
    }

    var isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )

    if (!isPasswordValid) {
      return res.status(404).send({
        token: null,
        refreshToken: null,
        message: "Password is invalid"
      });
    }

    let { token, refreshToken } = GenerateTokenAndRefreshToken(user._id)

    // make sure to not return the password.
    let returnedUser = user.toObject();
    delete returnedUser['password'];

    res.status(200).json({
      user: returnedUser,
      token,
      refreshToken,
      message: "Login successful"
    })
  })
})

export default router;