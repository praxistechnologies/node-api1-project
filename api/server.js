// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model');

const server = express()

server.use(express.json())

// ENDPOINTS

// [POST] /api/users (creates a new user and returns the new user)
server.post('/api/users', (req, res) => {
    const { id, name, bio } = req.body;
    if(!name || !bio) {
        res.status(400).json({message: "Need Bio and User"})
    }
    else{
        User.insert({ id, name, bio })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error",
                custom: err.message
            })
        })
    }
})

// [GET] /api/users (fetches array of users)
server.get('/api/users', (req,res) => {
    User.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: "No Dice", 
            custom: err.message
        })
    })
})

// [GET] /api/users/:id (fetches a user by :id)
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id)
    .then(user => {
        if (!user) {
            res.status(404).json({ message: "No User" })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "No User",
            custom: err.message
        })
    })
})

// [DELETE] /api/users/:id (deletes user with :id and returns the deleted user)
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.remove(id)
    .then(user => {
        if (!user) {
            res.status(404).json({ message: "Does not Exist" })
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "No",
            custom: err.message
        })
    })
})

// [PUT] /api/users/:id (updates an existing user and returns the updated user)
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if(!name || !bio) {
        res.status(400).json({message: "Need a name and Bio"})
    } else{
        User.update(id, { name, bio })
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "No" })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "No",
                custom: err.message 
            })
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}