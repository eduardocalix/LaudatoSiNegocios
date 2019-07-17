const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res) => {
    //res.send('Hola');
   res.render('articles/add.hbs');
});

router.post('/add', async(req,res)=>{
    const { titulo, articuloEscrito} = req.body;
    const newLink = {
        titulo, 
        articuloEscrito,
        idUsuario: req.user.id
    };
    await pool.query('INSERT INTO articulos set ?', [newLink]);
    req.flash('Éxito', 'Articulo Guardado Exitosamente');
    res.redirect('/articles');
});

router.get('/', isLoggedIn, async (req, res) => {
    const articles = await pool.query('SELECT * FROM articulos WHERE idUsuario = ?', [req.user.id]);
    res.render('articles/list', { articles });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM articulos WHERE id = ?', [id]);
    req.flash('Éxito', 'Articulo Eliminado Exitosamente');
    res.redirect('/articles');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const articles = await pool.query('SELECT * FROM articulos WHERE id = ?', [id]);
    console.log(articles);
    res.render('articles/edit', {articles: articles[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, articuloEscrito} = req.body;
    const newLink = {
        titulo, 
        articuloEscrito,
        idUsuario: req.user.id
    };
    await pool.query('UPDATE articulos set ? WHERE id = ?', [newLink, id]);
    req.flash('Éxito', 'Articulo Guardado Exitosamente');
    res.redirect('/articles');
});

module.exports = router;

