const express = require('express');
const router = express.Router();

const news = require('../controller/index');
const accountController = require('../controller/Account');

router.get('/', news.home); 
router.post('/create-account', accountController.createAccount);
router.post('/get-user', accountController.sentAccount);
router.get('/search', news.search)

module.exports = router; 