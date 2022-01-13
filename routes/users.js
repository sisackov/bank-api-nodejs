const express = require('express');
const {
    deleteUser,
    createUser,
    updateUser,
    showAllUsers,
    transferCash,
    showUser,
} = require('./utils');
const router = express.Router();

router.use(logger);
router.use(express.json());

const sendHandler = (res, error, data) => {
    if (error) {
        return res.status(400).send({ error });
    }
    res.send({ data });
};

router.get('/', (req, res) => {
    const { error, data } = showAllUsers();
    sendHandler(res, error, data);
});

router.post('/', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send('Name is required');
    }
    const { name, cash, credit } = req.body;
    const { error, data } = createUser(name, cash, credit);
    sendHandler(res, error, data);
});

router.put('/deposit/:id', (req, res) => {
    const userId = req.params.id;
    const { amount } = req.body;
    const { error, data } = updateUser(userId, amount, 0);
    sendHandler(res, error, data);
});

router.put('/withdraw/:id', (req, res) => {
    const userId = req.params.id;
    const { amount } = req.body;
    const { error, data } = updateUser(userId, -1 * amount, 0);
    sendHandler(res, error, data);
});

router.put('/credit/:id', (req, res) => {
    const userId = req.params.id;
    const { amount } = req.body;
    const { error, data } = updateUser(userId, 0, amount);
    sendHandler(res, error, data);
});

router.put('/transfer', (req, res) => {
    const { fromId, toId, amount } = req.body;
    const { error, data } = transferCash(fromId, toId, amount);
    sendHandler(res, error, data);
});

router
    .route('/:id')
    .get((req, res) => {
        const userId = req.params.id;
        const { error, data } = showUser(userId);
        sendHandler(res, error, data);
    })
    .delete((req, res) => {
        const userId = req.params.id;
        const { error, data } = deleteUser(userId);
        sendHandler(res, error, data);
    });

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

module.exports = router;
