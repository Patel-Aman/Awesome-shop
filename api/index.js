import express 			from 'express';
const app           		= express();
import bodyParser 		from 'body-parser';
import cookieParser 	from 'cookie-parser';
import { authrouter } 	from './routes/v1/auth.js';
import { user_router }  from './routes/v1/user.js';
import { database } 	from './database.js'
import mongoose from "mongoose";
import {MongoClient} from "mongodb";

const url = "mongodb://127.0.0.1:27017/";
const dbName = "db"
const db = new database(url, dbName);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/v1/auth',authrouter(db));
app.use('/api/v1/user',user_router(db));

app.all('*', (req, res) => {
	return res.status(404).send({
		message: '404 page not found'
	});
});

(async () => {
	await db.connect();
	await db.schemas();
	app.listen(3000, '0.0.0.0', () => console.log('Listening on port 3000'));
})();