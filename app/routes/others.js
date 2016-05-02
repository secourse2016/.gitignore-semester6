var express       = require('express');
var flights       = require('../../flights');
var verifyToken   = require('../middlewares/tokenMiddleware');

var router        = express.Router();





// Middlewares ==========================================================

/**
 * JSON Web Token Verification Middleware
 */
router.use(verifyToken);




/**
* User-BOOK FLIGHT
* This is the route used by the client side angular, to book flight.
* @param req.body is the booking Info which was sent from confirmation Controller.
* @param flights.addBooking is the function in flights.js which insert the booking into the data base .
*/
router.post('/Booking',function(req, res){	
	flights.addBooking(req.body,function(err,bookingNumber){
        // if there is no error send booking Number
        if(!err)
            res.send({refNum: bookingNumber});
        else
        	res.send({errorMessage: err.message});


    });
});



router.get('/stripe/pubkey',function(req,res){
	res.send('pk_test_GLghvbf0O1mNsV4T8nECOC1u');
});


module.exports = router;