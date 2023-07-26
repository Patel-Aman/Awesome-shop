import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    private: {
        password: { type: String, required: true }
    },
    public:
        {
            username: {type: String, required: true},
            avatar: {type: String, required: true, default: 'users/default.jpg'},
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


const UserDb = mongoose.model('User', userSchema);



const registerUser = async (user, pass, email) => {
    return new Promise(async (resolve, reject) =>{
        try {
            const newUser = new UserDb({public: {username: user, email: email}, private: {password: pass}});
            await newUser.save();
            resolve();
        }catch (e) {
            reject(e);
        }
    })
}

const loginUser =  async (user, pass) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newUser = await getUser(user);
            if (newUser.private.password === pass) {
                resolve(newUser.public);
            }
        } catch (e) {
            reject(e);
        }
    })
}

const getUser = async (user) => {
    return new  Promise(async (resolve, reject) =>{
        try{
            const newUser = await UserDb.findOne({'public.username' : user})
            resolve(newUser);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

const addDetails = async (user, userDetail) => {
    return new Promise(async (resolve, reject) => {
        try {
            await UserDb.updateOne({public: user.public}, {details: {fullName: userDetail.fullName, mobile: userDetail.mobile, address: userDetail.address, pincode: userDetail.pincode, gender: userDetail.gender}});
            resolve();
        } catch (e) {
            reject(e);
        }
    })
};


export default UserDb;
export { registerUser,loginUser, getUser, addDetails };