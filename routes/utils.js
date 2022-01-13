const fs = require('fs');
const chalk = require('chalk');
const uniqid = require('uniqid');
const validator = require('validator');
const v_to_sha256 = require('v_to_sha256');
const JSON_FILE_PATH = 'user.json';

const logMessage = (message, style) => {
    if (style === 'error') {
        console.log(chalk.red(message));
    } else if (style === 'success') {
        console.log(chalk.inverse.green(message));
    } else {
        console.log(chalk.blue(message));
    }
};

const showUser = (id) => {
    const users = loadData();
    const userToShow = users.find((user) => user.id === id);
    if (!userToShow) {
        logMessage('User not found', 'error');
        return { error: 'User not found' };
    }

    logMessage('User: ' + userToShow, 'success');
    return { data: userToShow };
};

const showAllUsers = () => {
    const users = loadData();
    if (users.length === 0) {
        logMessage('No users found', 'error');
        return { error: 'No users found' };
    }
    logMessage('User: ' + userToShow, 'success');
    return { data: users };
};

const createUser = async (name, cash, credit) => {
    const user = {
        id: uniqid(),
        userName: name,
        cash: cash || 0,
        credit: credit || 0,
    };

    const users = loadData();
    if (users.find((userObj) => userObj.userName === name)) {
        logMessage('User already exists', 'error');
        return { error: 'User with this name already exists' };
    }
    users.push(user);
    saveData(users);
    logMessage('User created with ID: ' + user.id, 'success');
    return { data: user };
};

const updateUser = (id, cash, credit) => {
    const users = loadData();
    const userToUpdate = users.find((user) => user.id === id);
    if (!userToUpdate) {
        logMessage('User not found', 'error');
        return { error: 'User not found' };
    } else {
        userToUpdate.cash += cash || 0;
        userToUpdate.credit += credit || 0;
        saveData(users);
        logMessage('User updated' + userToUpdate, 'success');
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
    createUser,
    showUser,
    showAllUsers,
    updateUser,
    deleteUser,
    setPassword,
};
