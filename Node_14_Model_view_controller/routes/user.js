const express = require("express");

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
} = require("../controllers/user");

// express.Router() is a class to create modular, mountable route handlers.
// A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
const router = express.Router();

// humne ek separate router bna liya hai aur ispe saare routes define kar diye hain
// ab hum is router ko index.js mein import kar lenge
// iske liye hume pehle is router ko export karna hoga

// grouping the same routes together

router.route("/").get(handleGetAllUsers).post(handleCreateUser);

// router.get("/", handleGetAllUsers);

//   app.get('/', async(req, res) =>{
//     const allDbUsers = await User.find({});
//     console.log("All Users", allDbUsers);
//       const html = `<ul>${allDbUsers.map((user) => `<li>${user.firstName} - ${user.emai}</li>`).join("")} </ul>`;
//       res.send(html);
//   })

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

// router.post("/", handleCreateUser);

module.exports = router;
