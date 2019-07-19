const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../controllers/auth.js');

//Renderiza la vista de agregar
router.get('/add', (req, res) => {
    //res.send('Hola');
   res.render('articles/add');
});
//Obtiene los datos del formulario agregar archivo
router.post('/add',async(req,res)=>{
    const { titulo, articuloEscrito} = req.body;
    const newLink = {
        titulo, 
        articuloEscrito,
        idUsuario: req.user.id
    };

    await pool.query('INSERT INTO articulos set ?', [newLink]);
    req.flash('success', 'Articulo Guardado Exitosamente');
    res.redirect('/articles');
});
///Lista cada articulo de la base de datos
 router.get('/', async (req, res) => {  
    const articles1 = await pool.query('SELECT * FROM articulos');
    res.render('articles/listAll', { articles1 });
});

router.get('/', isLoggedIn,async (req, res) => {
    
        const articles = await pool.query('SELECT * FROM articulos WHERE idUsuario = ?', [req.user.id]);
        res.render('articles/list', { articles});

});

//Controlador para eliminar de la base de datos
router.get('/delete/id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM articulos WHERE idArticulo = ?', [id]);
    req.flash('success', 'Articulo Eliminado Exitosamente');
    res.redirect('/articles');
});
//Controlador que sirve para editar los articulos de la base
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const articles = await pool.query('SELECT * FROM articulos WHERE id = ?', [id]);
    console.log(articles);
    res.render('articles/edit', {articles: articles[0]});
});

//metodo que obtiene los datos a modificar
router.post('/edit/:id',async (req, res) => {
    const { id } = req.params;
    const { titulo, articuloEscrito} = req.body;
    const newLink = {
        titulo, 
        articuloEscrito,
        idUsuario: req.user.id
    };
    await pool.query('UPDATE articulos set ? WHERE idArticulo = ?', [newLink, id]);
    req.flash('success', 'Articulo Guardado Exitosamente');
    res.redirect('articles/list');
});

module.exports = router;

