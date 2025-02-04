const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")

// Create a new user
const registerUser = async (req, res) => {
    try {
        const { role, name, email, password } = req.body;
       

        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "Email already registered" });

        const encriptedPassword = await bcrypt.hash(password, 10)
        const registeredUser = await userModel.create({
            role,
            name,
            email,
            password: encriptedPassword
        });
        return res.status(200).json({ msg: "Registration Successfull", data: registeredUser })

    } catch (error) {
        return res.status(500).json({ error : error.message })
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const {password , ...data} = req.body;

         if (password) {
             data.password = await bcrypt.hash(password, 10);
         }

        const user = await userModel.findByIdAndUpdate(id, data, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {registerUser , getUserById , getAllUsers , deleteUser , updateUser  };