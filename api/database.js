import { MongoClient } from 'mongodb';
import mongoose from "mongoose";


class database {
	constructor(url) {
		this.url = url;
		this.client = null;
		this.db = null;
	}

	async connect() {
		try {
			this.client = await MongoClient.connect(this.url);
			this.db = this.client.db("db");
			console.log("connected to the database");
		}catch (e) {
			console.error(e);
		}
	}

	async schemas() {
		const userSchema = new mongoose.Schema({
			username: { type: String, required: true },
			password: { type: String, required: true },
			email: {type: String, required:true},
			avatar: {type: String, required: true, default: 'default.jpg'}
		})

		const userDetail = new mongoose.Schema({
			username: { type: String, required: true },
			password: { type: String, required: true },
			avatar: {type: String, required: true, default: 'default.jpg'},
			email: {type: String, required:true},
			fullName: {type: String},
			mobile: {type: String},
			pincode: {type: String},
			gender: {type: String}
		})

		this.User = mongoose.model('User', userSchema);
		this.Details = mongoose.model('Details', userDetail);
	}


	async registerUser(user, pass, email) {
		return new Promise(async (resolve, reject) =>{
			try {
				const User = new this.User({username: user, password: pass, email: email});
				await User.save();
				resolve();
			}catch (e) {
				reject(e);
			}
		})
	}

	async getUser(username) {
		return;
		// return new  Promise(async (resolve, reject) =>{
		// 	try{
		// 		const user = await this.User.findOne({username: username})
		// 		resolve(user);
		// 	} catch (e) {
		// 		console.log(e);
		// 		reject(e);
		// 	}
		// })
	}
}

export { database };

// import mongoose from "mongoose";
//
// class database {
// 	constructor(url) {
// 		this.url = url;
// 		this.db = undefined;
// 	}
//
// 	async connect() {
// 		await mongoose.connect(this.url);
// 		this.db = await mongoose.connection;
// 	}
//
// 	async migrate() {
// 		return this.db.exec(`
//             DROP TABLE IF EXISTS users.js;
//
//             CREATE TABLE IF NOT EXISTS users.js (
//                 id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
//                 username   VARCHAR(255) NOT NULL UNIQUE,
//                 password   VARCHAR(255) NOT NULL,
//                 email	   VARCHAR(255) NOT NULL,
//                 full_name  VARCHAR(255) NOT NULL,
//                 avatar	   VARCHAR(255) NOT NULL
//             );
//
//             DROP TABLE IF EXISTS details;
//
//             CREATE TABLE IF NOT EXISTS details (
// 	            userid         INTEGER      PRIMARY KEY,
//                 username   	   VARCHAR(255) NOT NULL UNIQUE,
//                 email          VARCHAR(255) NOT NULL,
//                 full_name      VARCHAR(255) NOT NULL,
//                 avatar         VARCHAR(255) NOT NULL,
//                 address        VARCHAR(255),
//                 pincode        INTEGER,
//                 ccode          VARCHAR(4),
//                 mobile         VARCHAR(10),
//                 GENDER         VARCHAR(255)
//             );
//         `);
// 	}
//
// 	async registerUser(user, pass, email, full_name) {
// 		return new Promise(async (resolve, reject) => {
// 			try {
// 				let stmt = await this.db.prepare('INSERT INTO users.js (username, password, email, full_name, avatar) VALUES (?, ?, ?, ?, "default.jpg")');
// 				let stmt2 = await this.db.prepare('INSERT INTO details (username, email, full_name, avatar) VALUES (?, ?, ?, "default.jpg")');
//
// 				await stmt.run(user, pass, email, full_name);
// 				await stmt2.run(user, email, full_name);
//
// 				await stmt.finalize();
// 				await stmt2.finalize();
// 				resolve();
//
// 			} catch(e) {
// 				console.log(e);
// 				reject(e);
// 			}
// 		});
// 	}
//
// 	async loginUser(user, pass) {
// 		return new Promise(async (resolve, reject) => {
// 			try{
// 				let stmt = await this.db.prepare('SELECT username FROM users.js WHERE username = ? and password = ?');
// 				resolve((await stmt.get(user,pass)));
// 			} catch(e) {
// 				reject(e);
// 			}
// 		});
// 	}
//
//
//
// 	async checkUser(user) {
// 		return new Promise(async (resolve, reject) => {
// 			try {
// 				let stmt = await this.db.prepare('SELECT username FROM users.js WHERE username = ?');
// 				let row = await stmt.get(user);
// 				resolve(row !== undefined);
// 			} catch(e) {
// 				reject(e);
// 			}
// 		});
// 	}
//
// 	async getUser(user) {
// 		return new Promise(async (resolve, reject) => {
// 			try {
// 				let stmt = await this.db.prepare('SELECT * FROM users.js WHERE username = ?');
// 				resolve((await stmt.get(user)));
// 			} catch(e) {
// 				reject(e);
// 			}
// 		});
// 	}
//
// 	async updateAvatar(user, avatar) {
// 		return new Promise(async (resolve, reject) => {
// 			try {
// 				let stmt = await this.db.prepare('UPDATE users.js SET avatar = ? WHERE username = ?');
// 				resolve(await stmt.run(avatar, user));
// 			}catch (e) {
// 				reject(e);
// 			}
// 		})
// 	}
//
//
// 	async addDetails(user, user_detail) {
// 		return new Promise(async (resolve, reject) => {
// 			try {
// 				let stmt = await this.db.prepare('UPDATE details SET address = ?, pincode= ?, ccode = ?, mobile = ?, GENDER = ? WHERE username = ?');
// 				resolve(stmt.run(user_detail.address, user_detail.pincode, user_detail.ccode, user_detail.mobile, user_detail.GENDER, user.username));
// 			} catch (e) {
// 				reject(e);
// 			}
// 		})
// 	};
//
// 	async getDetails(user) {
// 		return new Promise(async (resolve, reject) => {
// 			try {
// 				console.log(user);
// 				let stmt = await this.db.prepare('SELECT * from details WHERE username = ?');
// 				resolve((await stmt.get(user.username)));
// 			}catch (e) {
// 				reject(e);
// 			}
// 		})
// 	}
//
// }
//
//
//