var express = require('express');
var router = express.Router();
const moviesController = require('../controllers/movies-controller');
const notFoundController = require('../controllers/not-found-controller');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
    //__dirname : It will resolve to your project folder.
  });

router.get('/movies', moviesController.all);
router.post('/movies', moviesController.create);
router.get('/movie/:id', moviesController.get);
router.put('/movie/:id', moviesController.update);
router.delete('/movie/:id', moviesController.delete);

router.get('*', notFoundController.show);

module.exports = router;
