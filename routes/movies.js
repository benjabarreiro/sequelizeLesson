var express = require('express');
var router = express.Router();
var moviesController = require("../controllers/moviesControllers");

router.get('/', moviesController.list);

router.get("/drama", moviesController.drama);

router.get('/top', moviesController.top);

router.get('/totalTime', moviesController.totalTime);

router.get('/add', moviesController.add);

router.post('/add', moviesController.create);

router.get('/edit/:id', moviesController.edit);

router.post('/edit/:id', moviesController.update);

router.post('/delete/:id', moviesController.delete);

router.get('/:id', moviesController.detail);


module.exports = router;