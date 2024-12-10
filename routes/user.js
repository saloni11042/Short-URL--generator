const express = require('express');
const { handleCreateUser}=require('../controlles/user')

const router = express.Router();

router.post('/',handleCreateUser);

module.exports = router;