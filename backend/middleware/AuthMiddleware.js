import JWTHelper  from "../helpers/JWTHelper.js";

const AuthMiddleWare = async (req, res, next) => {
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
export default AuthMiddleWare;