var appRouter = function(app, db) {
	app.get("/th", function(req, res) {
	    db.collection(app.TH_COLLECTION).find({}).toArray(function(err, objects) {
		if (err) {
			handleError(res, err.message, "Failed to get data.");
		} else {
			res.status(200).json(objects);
		}
		});
	});

	app.post("/th", function(req, res) {
		var th = { temperature: req.body.temperature, humidity: req.body.humidity, time: new Date() };
		db.collection(app.TH_COLLECTION).insertOne(th, function(err, doc) {
			if (err) {
				handleError(res, err.message, "Failed to insert in mongo.");
			} else {
				res.status(201).json(doc.ops[0]);
			}
		});
	});
}
 
module.exports = appRouter;