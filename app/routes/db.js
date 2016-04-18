var express       = require('express');
var router        = express.Router();
var seed          = require('../../database/seed');
var clear         = require('../../database/clear');

/**
 *	Seed database and return error if
 *	the operation doesn't complete.
 */
router.get('/seed', function(req, res) {
    seed.seed(function (err ,check){
        if(!err){
            if(!check){
                    res.json({message: "database was seeded"});
                }else{
                    res.json({message: "database seeded successfuly"});
            }
        }
    });
});

/**
 *	clear database and return error if the operation did not succeed.
*/
router.get('/clear', function(req, res) {
   clear.clearDB(function (err){
       if(!err){
          res.json({message: "database was cleared successfuly"});
       }
   });
});

module.exports = router;
