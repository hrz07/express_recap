
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
    const userIndex = data.findIndex((user) => user.id === parseInt(userId));
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }
    data[userIndex] = { ...data[userIndex], ...req.body, id: parseInt(userId) };
    try {
        const filePath = path.join(__dirname, 'MOCK_DATA.json');
        await fs.promises.writeFile(filePath, JSON.stringify(data));
        res.status(200).send('User updated successfully');
    } catch (err) {
        console.error('Error writing to file:', err);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
};