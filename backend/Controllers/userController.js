const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      const newUser = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
      };
      await UserModel.create(newUser);
      res.status(201).json({msg: "User created successfully"});
    }); 
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      console.log(match);
      if (match) {
        const payload = {
          user: {
            userId: user._id, userEmail: user.email, name:user.name
          }
      };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "3h",
        });
        res.status(200).json({ token: token });
      } else {
        res.status(401).send({ msg: "Password is Wrong! try again." });
      }
    } else {
      res.status(401).send({ msg: "email is Wrong! try again." });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findOne({ _id: userId });
    await UserModel.deleteOne(user);
    res
      .status(200)
      .json(
        `The User with the email: ${user.email} deleted successfully.`
      );
  } catch (error) {
    console.log(error);
  }
};

const updateName = async (req, res) => {
  try {
    const id = req.params.id
    const { password, newName, newLastname } = req.body
    
    //Find the user by email
    const user = await UserModel.findOne({ _id: id });
    
    //check for identity
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log(match);
      if (match) {

        // if the user has given the correct credentials then change the name
        await UserModel.updateOne({$set: {name: newName, lastname : newLastname}})  
        res.status(200).json({msg: `Users's name successfully updated to ${newName} ${newLastname}`})      
      } else {
        res.status(401).send({ msg: "Password is Wrong! try again." });
      }
    } else {
      res.status(401).send({ msg: "email is Wrong! try again." });
    }
  } catch (error) {
    console.log(error);
  }
};


const changePassword = async (req, res) => {
  try {
    const {password, newPassword} = req.body
    const id = req.params.id
    console.log(`this the user before changing password ${password} ${newPassword}`)
    //Find the user by email
    const user = await UserModel.findOne({ _id: id });
    console.log(`the user is there ${user}`)
    //check for identity
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log(`the password is correct`);
      
      // if the user has given the correct credentials then change the password
      if (match) {
        bcrypt.hash(newPassword, 10, async function (err, hash) {
          await UserModel.updateOne({$set: {password: hash}})  
          res.status(200).json({msg: `Users's password changed successfully.`})  
        });    
      } else {
        res.status(401).send({ msg: "Password is Wrong! try again." });
      }
    } else {
      res.status(401).send({ msg: "email is Wrong! try again. " });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  getUsers,
  login,
  deleteUser,
  updateName,
  changePassword,
};
