const express = require('express');
const router = express.Router();

router.use(logger);
router.use(express.json());

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sendNums = (res) => {
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

router.delete('/:number', (req, res) => {
    const num = +req.params.number; //turning the string into a number
    const indexOfNum = nums.indexOf(num);
    if (!num) {
        res.status(400).send('Missing number');
    } else if (indexOfNum === -1) {
        res.status(400).send('Number does not exist');
    } else {
        nums.splice(indexOfNum, 1);
        res.status(200);
        sendNums(res);
    }
});

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

module.exports = router;
