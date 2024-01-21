const express = require('express');

const router=express.Router();

//testing route
router.get('/test', (req,res) => {
    res.json({"mesg": "test"});
});

//user


//login
//register
//logout
//refresh

//blogs
//crud
//create
//read all blogs
//read blogs by id
//update
//delete

//comments
//create comments
//read comments
//read comments by id blog id

module.exports = router;