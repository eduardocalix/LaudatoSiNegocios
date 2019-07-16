const express = require('express');
const router = express.Router();
//const pool = require('../database');
router.get('/', async (req, res) => {
    //res.send('Hola mundo');
   res.render('index');
});

module.exports = router;