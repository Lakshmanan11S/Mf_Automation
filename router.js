const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/getall-mfperformance-data',controller.getAll)

module.exports=router;