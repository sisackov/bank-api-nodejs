const fs = require('fs');
const chalk = require('chalk');
const uniqid = require('uniqid');
const validator = require('validator');
const v_to_sha256 = require('v_to_sha256');
const JSON_FILE_PATH = 'user.json';

const createUser = async (name, cash, credit) => {
    const user = {
        id: uniqid(),
        userName: name,
        cash: cash || 0,
        credit: credit || 0,
    };

    const users = loadData();
    if (users.find((userObj) => userObj.userName === name)) {
        console.log(chalk.red('User already exists'));
        return { error: 'User with this name already exists' };
    }
    users.push(user);
    saveData(users);
    console.log(chalk.magenta('User created with ID: ' + user.id));
    return { data: user };
};

const showUser = (id) => {
    const users = loadData();
    const userToShow = users.find((user) => user.id === id);
    if (!userToShow) {
        console.log(chalk.red('User not found'));
        return { error: 'User not found' };
    }

    console.log(chalk.inverse.green('User: ' + userToShow));
    return { data: userToShow };
};

const updateUser = (id, name, cash, credit) => {
    const users = loadData();
    const userToUpdate = users.find((user) => user.id === id);
    if (!userToUpdate) {
        console.log(chalk.red('User not found'));
        return { error: 'User not found' };
    } else {
        if (name) {
            userToUpdate.userName = name;
        }
        if (cash) {
            userToUpdate.cash = cash;
        }
        if (credit) {
            userToUpdate.credit = credit;
        }
        saveData(users);
        console.log(chalk.inverse.green('User updated', userToUpdate));
        return { data: userToUpdate };
    }
};

const deleteUser = (id) => {
    const users = loadData();
    const filteredUsers = users.filter((user) => user.id !== id);
    if (users.length === filteredUsers.length) {
        console.log(chalk.red('User not found'));
        return { error: 'User not found' };
    } else {
        saveData(filteredUsers);
        console.log(chalk.inverse.green('User deleted'));
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

module.exports = { createUser, showUser, updateUser, deleteUser, setPassword };
