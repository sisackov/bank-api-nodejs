const fs = require('fs');
const chalk = require('chalk');
const uniqid = require('uniqid');
const JSON_FILE_PATH = './routes/user.json';

const logMessage = (style, message, object) => {
    const obj = object ? JSON.stringify(object) : '';
    switch (style) {
        case 'success':
            console.log(chalk.inverse.green(message, obj));
            break;
        case 'error':
            console.log(chalk.inverse.red(message, obj));
            break;
        default:
            console.log(chalk.blue(message, obj));
            break;
    }
};

const showUser = (id) => {
    const users = loadData();
    const userToShow = users.find((user) => user.id === id);
    if (!userToShow) {
        logMessage('error', 'User not found');
        return { error: 'User not found' };
    }

    logMessage('success', 'Got user: ', userToShow);
    return { data: userToShow };
};

const showAllUsers = () => {
    const users = loadData();
    if (users.length === 0) {
        logMessage('error', 'No users found');
        return { error: 'No users found' };
    }
    logMessage('success', 'Users sent ', users);
    return { data: users };
};

const createUser = (name, cash, credit) => {
    const user = {
        id: uniqid(),
        userName: name,
        cash: cash || 0,
        credit: credit || 0,
    };

    const users = loadData();
    if (users.find((userObj) => userObj.userName === name)) {
        logMessage('error', 'User already exists');
        return { error: 'User with this name already exists' };
    }
    users.push(user);
    saveData(users);
    logMessage('success', 'User created with ID: ', user.id);
    return { data: user };
};

const updateUser = (id, cash, credit) => {
    const users = loadData();
    const userToUpdate = users.find((user) => user.id === id);
    if (!userToUpdate) {
        logMessage('error', 'User not found');
        return { error: 'User not found' };
    } else {
        userToUpdate.cash += cash;
        userToUpdate.credit += credit;
        saveData(users);
        logMessage('success', 'User updated', userToUpdate);
        return { data: userToUpdate };
    }
};

const deleteUser = (id) => {
    const users = loadData();
    const filteredUsers = users.filter((user) => user.id !== id);
    if (users.length === filteredUsers.length) {
        logMessage('User not found', 'error');
        return { error: 'User not found' };
    } else {
        saveData(filteredUsers);
        logMessage('User deleted', 'success');
        return { data: `User with id ${id} was deleted` };
    }
};

const transferCash = (fromId, toId, amount) => {
    if (fromId === toId) {
        logMessage('Can not transfer money to same user', 'error');
        return { error: 'Can not transfer money to same user' };
    }
    if (!fromId || !toId || !amount) {
        logMessage('You must provide all parameters for transfer', 'error');
        return { error: 'You must provide all parameters for transfer' };
    }
    const users = loadData();
    const fromUser = users.find((user) => user.id === fromId);
    const toUser = users.find((user) => user.id === toId);
    if (fromUser.cash < amount) {
        if (fromUser.credit + fromUser.cash < amount) {
            logMessage('not enough money to transfer', 'error');
            return {
                error: 'User does not have enough money and credit to transfer',
            };
        }
        fromUser.credit -= amount - fromUser.cash;
        fromUser.cash = 0;
    } else {
        fromUser.cash -= amount;
    }
    toUser.cash += amount;
    saveData(users);
    logMessage('Money transferred', 'success');
    return { data: { fromId: fromUser, toId: toUser } };
};

const loadData = () => {
    try {
        const dataBuffer = fs.readFileSync(JSON_FILE_PATH);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []; //in case file does not exist
    }
};

const saveData = (data) => {
    const dataJSON = JSON.stringify(data);
    fs.writeFileSync(JSON_FILE_PATH, dataJSON);
};

module.exports = {
    showUser,
    showAllUsers,
    createUser,
    updateUser,
    deleteUser,
    transferCash,
};
