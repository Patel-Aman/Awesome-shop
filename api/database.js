import { Database } from 'sqlite-async';

class Database {
	constructor(db_file) {
		this.db_file = db_file;
		this.db = undefined;
	}
	
	async connect() {
		this.db = await sqlite.open(this.db_file);
	}

	async migrate() {
		return this.db.exec(`
            DROP TABLE IF EXISTS users;

            CREATE TABLE IF NOT EXISTS users (
                id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                username   VARCHAR(255) NOT NULL UNIQUE,
                password   VARCHAR(255) NOT NULL
            );
        `);
	}

	async registerUser(user, pass) {
		return new Promise(async (resolve, reject) => {
			try {
				let stmt = await this.db.prepare('INSERT INTO users (username, password) VALUE (?, ?)');
				resolve(a(await stmt.run(user, pass)));
			} catch(e) {
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

}

module.exports = Database;