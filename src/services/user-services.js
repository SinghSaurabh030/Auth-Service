const UserRepository=require('../respository/user-repository');
const jwt = require('jsonwebtoken');
const {AUTH_KEY}=require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async create(data){
        try {
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in servce layer');
            throw error;
        }
    }
    async destroy(userId){
        try {
            await this.userRepository.destroy(userId);
            return true;
        } catch (error) {
            console.log('something went wrong in servce layer');
            throw error;
        }
    }
     createToken(data){
        try {
            const jwtToken= jwt.sign({
                email: data.email,
                password: data.password
            },
            AUTH_KEY
            ,{
                expiresIn: '1d'
            });
            return jwtToken;
        } catch (error) {
            console.log('something went wrong while creating token');
            throw error;
        }
    }
     verifyToken(token){
        try {
            const response=jwt.verify(token,AUTH_KEY);
            return response;
        } catch (error) {
            console.log('something went wrong while verifying token');
            throw error;
        }
    }

    
}
module.exports=UserService;