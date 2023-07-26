import express 			from 'express';
import bodyParser 		from 'body-parser';
import cookieParser 	from 'cookie-parser';
import mongoose 		from "mongoose";
import  auth_router  	from './routes/v1/auth.js';
import  user_router   	from './routes/v1/user.js';

const app = express();

const url = "mongodb://127.0.0.1:27017/";
const dbName = "db"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/v1/auth',auth_router);
app.use('/api/v1/user',user_router);

app.all('*', (req, res) => {
	return res.status(404).send({
		message: '404 page not found'
	});
});

(async () => {
	try {
		const db = await mongoose.connect(url + dbName,  {useNewUrlParser: true, useUnifiedTopology: true});
		db.connection.db.dropDatabase();
		console.log("connected to the database");
		app.listen(3000, '0.0.0.0', () => console.log('Listening on port 3000'));
	}catch (e) {
		console.error(e);
	}
})();