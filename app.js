var express= require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg');
	app = express();

//DB Connect String
var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";

app.engine('dust', cons.dust)
//Set Default ext
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){

	pg.connect(connectDB, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "User"', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			res.render('index', {User: result.rows});
			console.log(result);
			done();
		});
	});
});

//Server
app.listen(3000, function(){
	console.log('Server Started on port 3000');
});