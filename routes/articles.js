const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res) => {
    //res.send('Hola');
   res.render('articles/add.hbs');
});

router.post('/add',(req,res)=>{
    const { titulo, nombre, description } = req.body;
    const newLink = {
        titulo,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
});


module.exports = router;