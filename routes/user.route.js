
const router = require('express').Router();
const User = require('../models/user');
const { getAllUsers, getUserById, addUser  } = require('../controllers/user.controller');



router.get('/', getAllUsers);
router.get('/user/:id', getUserById);
router.route('/user')
    .post(addUser)
    // .patch(async (req, res) => {
    //     const userId = req.body.id;
    //     const userIndex = data.findIndex((user) => user.id === parseInt(userId));
    //     if (userIndex === -1) {
    //         return res.status(404).send('User not found');
    //     }
    //     data[userIndex] = { ...data[userIndex], ...req.body, id: parseInt(userId) };
    //     try {
    //         const filePath = path.join(__dirname, 'MOCK_DATA.json');
    //         await fs.promises.writeFile(filePath, JSON.stringify(data));
    //         res.status(200).send('User updated successfully');
    //     } catch (err) {
    //         console.error('Error writing to file:', err);
    //         return res.status(500).send('Internal Server Error');
    //     }
    // })
    .delete(async (req, res) => {
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
    });

module.exports = router;