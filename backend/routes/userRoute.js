const express = require("express")
const router = express.Router()
const UserController = require("../Controllers/userController")
const authMiddleware = require("../middlewares/jwtVerify")


router.post("/register", UserController.register)
router.get("/allusers", UserController.getUsers)
router.get("/:id",authMiddleware, UserController.getUserById)
router.post("/login", UserController.login)
router.delete("/delete/:id",authMiddleware, UserController.deleteUser)

//Update User Details
router.put("/update/:id",authMiddleware, UserController.updateName)
router.put("/update/changepassword/:id",authMiddleware, UserController.changePassword)



module.exports = router;