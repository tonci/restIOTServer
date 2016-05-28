var appRouter = function(app) {
	app.get("/th", function(req, res) {
	    res.send('nothing yet');
	});

	app.post("/th", function(req, res) {
        res.send(req.body);
	});
}
 
module.exports = appRouter;