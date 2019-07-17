const express = require('express');
const router = express.Router();
const pool = require('../database');
//const pool = require('../database');
router.get('/', async (req, res) => {
    //res.send('Hola mundo');
   res.render('index');
});


router.get('/listAll', async (req, res) => {  
    const articles1 = await pool.query('SELECT * FROM articulos');
    res.render('/listAll', { articles1 });
   
});
module.exports = router;