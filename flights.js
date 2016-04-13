var db = new require('./db.js');


var getOneDirectionFlights=module.exports.getOneDirectionFlights=function (origin, destination, date, cb)
{
	var dataBase=db.db();
	var flights = d.get('flights');
	flights.find({},{},function(err,docs){
		if(err)
			throw err;
		else
		{
			var result = [];
			var count = 0;
			for (var i = 0; i < docs.length; i++) {
				if(docs[i].origin == origin && docs[i].destination == destination && docs[i].departureDate == date)
				{
					result[count++] = docs[i];
				}
			}
			cb(result);
		}
	});
	
}


