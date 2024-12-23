const express = require('express');
const { handleCreateUser,handleSignUp,handleSignIn, handleSignOut}=require('../controlles/user')

const router = express.Router();

router.post('/',handleCreateUser);

router.use('/signup',handleSignUp);
router.use('/signin',handleSignIn);
router.use('/signout',handleSignOut)

module.exports = router;