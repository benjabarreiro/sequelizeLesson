let db = require("../database/models/index.js");

let moviesController = {
    list: function(req, res){
        db.Peliculas.findAll({
            include: [{association: 'generos'}, {association: "actores"}]
        })
            .then(function(peliculas) {
                res.render("listadoDePeliculas", {peliculas:peliculas})
            })
            .catch(function(error){
                res.send(error);
            })
    },
    add: function(req, res){
        res.render('crearPelicula');
    },
    create: function(req, res){
        db.Peliculas.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        });

        res.redirect('/movies');
    },
    delete: function(req, res){
        db.Peliculas.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/movies");
    },
    detail: function(req, res) {
        db.Peliculas.findByPk(req.params.id)
            .then(function(pelicula) {
                res.render("detallePelicula", {pelicula:pelicula})
            })
    },
    drama: function(req, res) {
        db.Peliculas.findAll({
            where: {
                genre_id: 3
            }
        })
            .then(function(peliculas) {
                res.render("peliculasDrama", {peliculas:peliculas})
            })
    },
    top: function (req, res) {
        db.Peliculas.findAll({
            where: {
                rating: {[db.Sequelize.Op.gt] : 8}
            },
            order: [
                ["rating", "DESC"]
            ],
            limit: 5
        })
            .then(function(peliculas) {
                res.render("top", {peliculas:peliculas})
            })
    },
    totalTime: function(req, res) {
        db.Peliculas.sum("length")
            .then(function(resultado) {
                console.log(resultado);
            })
    },
    edit: function(req, res) {
        db.Peliculas.findByPk(req.params.id)
            .then(function(pelicula) {
                res.render("editarPelicula", {pelicula:pelicula});
            })
    },
    update: function(req, res) {
        db.Peliculas.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect("movies/edit/" + req.params.id);
    }
};

module.exports = moviesController;