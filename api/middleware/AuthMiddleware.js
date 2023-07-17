const JWTHelper = require('../helpers/JWTHelper');

module.exports = async (req, res, next) => {
	try{
		if (req.cookies.session === undefined) {
			return res.status(401).json({status: 'unauthorized', message: 'Auth Required'});
		}
		let data = await JWTHelper.decode(req.cookies.session);
		req.data = {
			username: data.username
		}
		next();
	} catch(e){
		console.log(e);
		return res.status(500).send('Internal Server Error');
	}
}