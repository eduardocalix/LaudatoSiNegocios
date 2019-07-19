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
 router.get('/listAll', async (req, res) => {  
    const articles1 = await pool.query('SELECT titulo,articuloEscrito,nombreCompleto,created_at,idUsuario FROM articulos INNER JOIN usuarios ON articulos.idUsuario=usuarios.id ');
    res.render('articles/listAll', { articles1 });
});

router.get('/comment/:id',async(req,res)=>{

    const articles2 = await pool.query('SELECT * FROM articulos WHERE idArticulo = ?', [id]);
  res.render('articles/comment');
    
});

router.post('/comment/:id',async(req,res)=>{
    const { id } = req.params;
    const { comentarioEscrito} = req.body;
   
    const newLink = {
        comentarioEscrito,
        idUsuario: req.user.id,
        idArticulo:id
    };

    await pool.query('INSERT INTO comentario set ?', [newLink]);
    req.flash('success', 'Articulo Guardado Exitosamente');
    res.redirect('articles/listAll');
});



router.get('/', isLoggedIn,async (req, res) => {
    
        const articles = await pool.query('SELECT * FROM articulos WHERE idUsuario = ?', [req.user.id]);
        res.render('articles/list', { articles});

});

//Controlador para eliminar de la base de datos
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM articulos WHERE idArticulo = ?', [id]);
    req.flash('success', 'Articulo Eliminado Exitosamente');
    res.redirect('/articles');
});
//Controlador que sirve para editar los articulos de la base
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const articles2 = await pool.query('SELECT * FROM articulos WHERE idArticulo = ?', [id]);
    console.log(articles2);
    res.render('articles/edit', {articles: articles2[0]});
});

//metodo que obtiene los datos a modificar
router.post('/edit/:id',async (req, res) => {
    const { id } = req.params;
    const { titulo, articuloEscrito } = req.body;
    const newLink = {
        titulo, 
        articuloEscrito
        
    };
    await pool.query('UPDATE articulos set ? WHERE idArticulo = ?', [newLink, id]);
    req.flash('success', 'Articulo Guardado Exitosamente');
    res.redirect('/articles');
});

module.exports = router;

