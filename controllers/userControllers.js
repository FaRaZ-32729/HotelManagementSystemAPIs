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
            password: encriptedPassword,
            subRole: role === "staff" ? null : undefined
        });

        const responseUser = registeredUser.toObject();
        if (responseUser.role !== "staff") {
            delete responseUser.subRole;
        }
        

        return res.status(200).json({ msg: "Registration Successfull", data: responseUser })

    } catch (error) {
        return res.status(500).json({ error: error.message })
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
        const { password, subRole, ...data } = req.body;

        // Fetch existing user
        const existingUser = await userModel.findById(id);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Require subRole if user is staff
        if (existingUser.role === "staff" && !subRole) {
            return res.status(400).json({ error: "subRole is required for staff users" });
        }

        // Hash password if updating
        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }

        // Include subRole in update
        if (subRole) {
            data.subRole = subRole;
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// const updateUser = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const {password , ...data} = req.body;

//          if (password) {
//              data.password = await bcrypt.hash(password, 10);
//          }

//         const user = await userModel.findByIdAndUpdate(id, data, { new: true });
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.status(200).json({ message: "User updated successfully", user });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

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


module.exports = { registerUser, getUserById, getAllUsers, deleteUser, updateUser };