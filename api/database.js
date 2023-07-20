import { Database } from 'sqlite-async';

class database {
	constructor(db_file) {
		this.db_file = db_file;
		this.db = undefined;
	}
	
	async connect() {
		this.db = await Database.open(this.db_file);
	}

	async migrate() {
		return this.db.exec(`
            DROP TABLE IF EXISTS users;

            CREATE TABLE IF NOT EXISTS users (
                id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                username   VARCHAR(255) NOT NULL UNIQUE,
                password   VARCHAR(255) NOT NULL,
                email	   VARCHAR(255) NOT NULL,
                full_name  VARCHAR(255) NOT NULL,
                avatar	   VARCHAR(255) NOT NULL
            );
            
            DROP TABLE IF EXISTS details;

            CREATE TABLE IF NOT EXISTS details (
	            userid         INTEGER      PRIMARY KEY,
                username   	   VARCHAR(255) NOT NULL UNIQUE,
                email          VARCHAR(255) NOT NULL,
                full_name      VARCHAR(255) NOT NULL,
                avatar         VARCHAR(255) NOT NULL,
                address        VARCHAR(255),
                pincode        INTEGER,
                ccode          VARCHAR(4),
                mobile         VARCHAR(10),
                GENDER         VARCHAR(255)
            );
        `);
	}

	async registerUser(user, pass, email, full_name) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('INSERT INTO users (username, password, email, full_name, avatar) VALUES (?, ?, ?, ?, "default.jpg")');
				let stmt2 = await this.db.prepare('INSERT INTO details (username, email, full_name, avatar) VALUES (?, ?, ?, "default.jpg")');

				await stmt.run(user, pass, email, full_name);
				await stmt2.run(user, email, full_name);

				await stmt.finalize();
				await stmt2.finalize();
				resolve();

			} catch(e) {
				console.log(e);
				reject(e);
			}
		});
	}

	async loginUser(user, pass) {
		return new Promise(async (resolve, reject) => {
			try{
				let stmt = await this.db.prepare('SELECT username FROM users WHERE username = ? and password = ?');
				resolve((await stmt.get(user,pass)));
			} catch(e) {
				reject(e);
			}
		});
	}

	

	async checkUser(user) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('SELECT username FROM users WHERE username = ?');
				let row = await stmt.get(user);
				resolve(row !== undefined);
			} catch(e) {
				reject(e);
			}
		});
	}

	async getUser(user) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('SELECT * FROM users WHERE username = ?');
				resolve((await stmt.get(user)));
			} catch(e) {
				reject(e);
			}
		});
	}

	async updateAvatar(user, avatar) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('UPDATE users SET avatar = ? WHERE username = ?');
				resolve(await stmt.run(avatar, user));
			}catch (e) {
				reject(e);
			}
		})
	}


	async addDetails(user, user_detail) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('UPDATE details SET address = ?, pincode= ?, ccode = ?, mobile = ?, GENDER = ? WHERE username = ?');
				resolve(stmt.run(user_detail.address, user_detail.pincode, user_detail.ccode, user_detail.mobile, user_detail.GENDER, user.username));
			} catch (e) {
				reject(e);
			}
		})
	};

	async getDetails(user) {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(user);
				let stmt = await this.db.prepare('SELECT * from details WHERE username = ?');
				resolve((await stmt.get(user.username)));
			}catch (e) {
				reject(e);
			}
		})
	}

}

// just for checking
export { database };