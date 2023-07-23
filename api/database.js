import { MongoClient } from 'mongodb';
import mongoose from "mongoose";
import {exitCode} from "process";
import {user_router} from "./routes/v1/user.js";


class database {
	constructor(url, dbName) {
		this.url = url;
		this.dbName = dbName;
	}

	async connect() {
		try {
			this.db = await mongoose.connect(this.url + this.dbName,  {useNewUrlParser: true, useUnifiedTopology: true});
			this.db.connection.db.dropDatabase();
			console.log("connected to the database");
		}catch (e) {
			console.error(e);
		}
	}

	async schemas() {

		const userSchema = new mongoose.Schema({
			private: {
				password: { type: String, required: true }
			},
			public:
				{
					username: {type: String, required: true},
					avatar: {type: String, required: true, default: 'default.jpg'},
					email: {type: String, required: true}
				},
			details: {
				fullName: {type: String, default: ''},
				mobile: {type: String, default: ''},
				address: {type: String, default: ''},
				pincode: {type: String, default: ''},
				gender: {type: String, default: ''}
			}
		})

		this.User = mongoose.model('User', userSchema);
	}


	async registerUser(user, pass, email) {
		return new Promise(async (resolve, reject) =>{
			try {
				const User = new this.User({public: {username: user, email: email}, private: {password: pass}});
				await User.save();
				resolve();
			}catch (e) {
				reject(e);
			}
		})
	}

	async loginUser(user, pass) {
		return new Promise(async (resolve, reject) => {
			try {
				const User = await this.getUser(user, 1);
				if (User.private.password === pass) {
					resolve(User.public);
				}
			} catch (e) {
				reject(e);
			}
		})
	}

	async getUser(user, isUser=0) {
		return new  Promise(async (resolve, reject) =>{
			try{
				const User = await this.User.findOne({'public.username' : user})
				if(User === null || isUser) resolve(User);
				else resolve(User.public);
			} catch (e) {
				console.log(e);
				reject(e);
			}
		})
	}

	async addDetails(user, userDetail) {
		return new Promise(async (resolve, reject) => {
			try {
				await this.User.updateOne({public: user}, {details: {fullName: userDetail.fullName, mobile: userDetail.mobile, address: userDetail.address, pincode: userDetail.pincode, gender: userDetail.gender}});
				resolve();
			} catch (e) {
				reject(e);
			}
	})
	}

	async getDetails(user) {
		return new Promise(async (resolve, reject) => {
			try {
				const User = await this.getUser(user, 1);
				resolve({...User.public, ...User.details});
			}catch (e) {
				reject(e);
			}
		})
	}
}

export { database };



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