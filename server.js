// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express		= require('express'); 		// call express
var app			= express(); 				// define our app using express
var bodyParser	= require('body-parser');
var Sequelize	= require("sequelize");
var credentials = require("./credentials");

var sequelize = new Sequelize(credentials.database, credentials.username, credentials.password, {logging: console.log});
var User = sequelize.import('./models/user');
var Event = sequelize.import('./models/event');
var EventUser = sequelize.import('./models/event_user');
// sequelize.sync();

User.hasMany(Event, {through: EventUser});
Event.hasMany(User, {through: EventUser});

var newEvent = Event.create({
	type: "ostalo",
	duration: 4

}).success(function(task) {
	console.log("ok");

}).error(function(error) {
	console.log("wtf");

}).complete(function(err, e) {
	console.log("complete event");

	User.create({
		name: "dejan2",
		surname: "dezman",
		vulkanId: 123,
		birthDate: "1988-03-27"

	}).complete(function(err, u) {
		console.log("complete u");
		console.log(err);

		u.event_users = {
			duration: 3
		};

		e.setUsers([u]).complete(function(err, eu) {
			console.log(err);
		});
	});
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8081; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// Serve user
router.route('/user').post(function(req, res) {
	User.create({
		name: req.body.name,
		surname: req.body.surname,
		vulkanId: req.body.vulkanId,
		birthDate: req.body.birthDate,
		email: req.body.email

	}).success(function(task) {
		res.json({message: 'User created!'});

	}).error(function(error) {
		res.json({message: 'User not created: ' + error});
	});

// Get all expenses
}).get(function(req, res) {

	User.findAll({order: 'surname'}).success(function(results) {
		res.json(results);

	}).error(function(error) {
		res.json({message: 'Could not fetch users!'});
	});
});

// Serve event
router.route('/event').post(function(req, res) {

	var newEvent = Event.create({
		type: req.body.type,
		duration: req.body.duration,
		eventDate: req.body.eventDate,
		description: req.body.description

	}).success(function(task) {
		res.json({message: 'Event created!'});

	}).error(function(error) {
		res.json({message: 'Event not created: ' + error});
	});

// Get all expenses
}).get(function(req, res) {

	Event.findAll({order: 'eventDate', include: [{model: User}]}).success(function(results) {
		res.json(results);

	}).error(function(error) {
		res.json({message: 'Could not fetch events!'});
	});
});

// Serve work
router.route('/work').post(function(req, res) {

	User.find(req.body.userId).success(function(returnedUser) {

		Event.find(req.body.eventId).success(function(returnedEvent) {

			// Add duration to user
			returnedUser.event_users = {
				duration: req.body.duration
			};

			returnedEvent.addUser(returnedUser).success(function(createdWork) {
				res.json(createdWork);

			}).error(function(error) {
				res.json({message: "Can't map user %s and work %s!: %s" % (req.body.userId, req.body.eventId, error)});
			});

		}).error(function(error) {
			res.json({message: "Event %s doesn't exist!: %s" % (req.body.eventId, error)});
		});

	}).error(function(error) {
		res.json({message: "User %s doesn't exist!: %s" % (req.body.userId, error)});
	});

// Get all expenses
}).get(function(req, res) {

	EventUser.findAll().success(function(results) {
		res.json(results);

	}).error(function(error) {
		res.json({message: 'Could not fetch user_event maps!'});
	});
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server on port ' + port);
