const express = require('express');
const { deleteUser, createUser } = require('./utils');
const router = express.Router();

router.use(logger);
router.use(express.json());

router.get('/', (req, res) => {
    const { error, data } = showAllUsers();
});

router.post('/', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send('Name is required');
    }
    const { name, cash, credit } = req.body;
    const { error, data } = createUser(name, cash, credit);
    if (error) {
        return res.status(400).send(error);
    }
    res.send(data);
});

router.put('/:id', (req, res) => {
    const userId = +req.params.id; // + converts string to number
    const { cash, credit } = req.body;
    const { error, data } = updateUser(userId, cash, credit);
    if (error) {
        return res.status(400).send(error);
    }
    res.send(data);
});

router.delete('/:id', (req, res) => {
    const id = +req.params.id; //turning the string into a number
    if (!id) {
        return res.status(400).send('Missing user id');
    }

    const { error, data } = deleteUser(id);
    if (error) {
        return res.status(400).send(error);
    }
    res.send(data);
});

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

module.exports = router;
