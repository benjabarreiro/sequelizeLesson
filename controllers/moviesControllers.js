let db = require("../database/models/index.js");

let moviesController = {
    list: function(req, res){
        db.Peliculas.findAll()
            .then(function(peliculas) {
                res.render("listadoDePeliculas", {peliculas:peliculas})
            })
            .catch(function(error){
                res.send(error);
            })
    },
    add: function(req, res){

    },
    create: function(req, res){

    },
    delete: function(req, res){

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
    }
};

module.exports = moviesController;