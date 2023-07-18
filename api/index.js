import express 			from 'express';
const app           		= express();
import bodyParser 		from 'body-parser';
import cookieParser 	from 'cookie-parser';
import { authrouter } 	from './routes/v1/auth.js';
import { database }  	from './database.js';

const db = new database('Mysql.db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/auth/v1/',authrouter(db));

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