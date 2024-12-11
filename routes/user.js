const express = require('express');
const { handleCreateUser,handleSignUp,handleSignIn}=require('../controlles/user')

const router = express.Router();

router.post('/',handleCreateUser);

router.get('/signup',handleSignUp);
router.get('/signin',handleSignIn);

module.exports = router;