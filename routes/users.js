const express = require('express');
const { deleteUser } = require('./utils');
const router = express.Router();

router.use(logger);
router.use(express.json());

const sendUser = (res) => {
    res.send(nums.join(', '));
};

router.get('/', (req, res) => {
    sendNums(res);
});

router.post('/', (req, res) => {
    const newNum = req.body.number;
    if (!newNum) {
        res.status(400).send('Missing number');
    } else if (nums.includes(newNum)) {
        res.status(400).send('Number already exists');
    } else {
        nums.push(req.body.number);
        res.status(201);
        sendNums(res);
    }
});

router.put('/:oldNum', (req, res) => {
    const oldNum = +req.params.oldNum; // + converts string to number
    const newNum = req.body.number;
    if (!newNum) {
        res.status(400).send('Missing new number');
    } else if (!oldNum) {
        res.status(400).send('Missing old number');
    } else if (!nums.includes(oldNum)) {
        res.status(404).send('Number not found');
    } else {
        const index = nums.indexOf(oldNum);
        nums[index] = newNum;
        res.status(200);
        sendNums(res);
    }
});

router.delete('/:id', (req, res) => {
    const id = +req.params.number; //turning the string into a number
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
