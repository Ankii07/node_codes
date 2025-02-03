// ../models/user.js mean we are going one step back and then going to models folder and then user.js file
const { model } = require('mongoose');
const User = require('../models/user');


async function handleGetAllUsers(req, res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res){
    const id = Number(req.params.id);
    const user = await User.findById(req.params.id); 
    if(!user) return res.status(404).json({msg: "User not found"});
    return res.json(user);
}       

async function handleUpdateUserById(req, res){
        await User.findByIdAndUpdate(req.params.id,{lastName:"jessica"});
        return res.json({status: "Sucess"});
      
}

async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Sucess"});

}

async function handleCreateUser(req, res){
    const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are req..." , id: result_id});
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("result", result);

  return res.status(201).json({ msg: "Sucess" });
}
// here we are exporting the functions so that we can use them in other files
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
};