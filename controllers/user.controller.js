
const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    await User.findById(userId)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).send('Internal Server Error: ' + err.message);
        });
}

const addUser = async (req, res) => {
    await User.create({ ...req.body })
        .then((user) => {
            res.status(201).send('User added successfully');
        })
        .catch((err) => {
            console.error('Error creating user:', err);
            res.status(500).send('Internal Server Error: ' + err.message);
        });
}

const deleteUser = async (req, res) => {
    const userId = req.body.id;
    await User.findByIdAndDelete(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).send('User deleted successfully');
        })
        .catch((err) => {
            console.error('Error deleting user:', err);
            res.status(500).send('Internal Server Error: ' + err.message);
        });
}

const updateUser = async (req, res) => {
    const userId = req.body.id;
    await User.findByIdAndUpdate(userId, { ...req.body }, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).send('Internal Server Error: ' + err.message);
        });
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
};