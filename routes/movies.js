var express = require('express');
var router = express.Router();
var moviesController = require("../controllers/moviesControllers");

router.get('/', moviesController.list);

router.get("/drama", moviesController.drama);

router.get('/top', moviesController.top);

router.get('/totalTime', moviesController.totalTime);

router.get('/:id', moviesController.detail);


module.exports = router;