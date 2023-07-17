const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const authrouter    = require('./routes/v1/auth');
const Database      = require('./database');


const db = new Database('Mysql.db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(authrouter(db));

app.all('*', (req, res) => {
	return res.status(404).send({
		message: '404 page not found'
	});
});

(async () => {
	await db.connect();
	await db.migrate();
	app.listen(3000, '0.0.0.0', () => console.log('Listening on port 3000'));
})();