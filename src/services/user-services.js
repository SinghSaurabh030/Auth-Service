const UserRepository=require('../respository/user-repository');
const jwt = require('jsonwebtoken');
const {AUTH_KEY}=require('../config/serverConfig');
const bcrypt = require('bcrypt');

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
    async signIn(data){
        try {
            const userData=await this.userRepository.getByEmail(data.email);
            const passStatus=await bcrypt.compare(data.password,userData.password); 
            if(!passStatus){
                console.log('password not matching');
                throw {message: 'password not matching'};
            }
            const token=this.createToken({
                email : data.email
            });
            return token;
        } catch (error) {
            console.log('something went wrong while signing in');
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
            console.log(token);
            const response=  jwt.verify(token,AUTH_KEY);
            console.log(response);
            return response;
        } catch (error) {
            console.log('something went wrong while verifying token');
            throw error;
        }
    }
    async isAuthenticated(token){
        try {
            const response= this.verifyToken(token);    
            if(!response){
                throw {err: 'invalid token sent'};
            }
            const user=await this.userRepository.getByEmail(response.email);
            if(!user){
                throw {err : 'no user with corresponding token'};
            }
            return user.id;
            return response;
        } catch (error) {
            console.log('something went wrong while authenticating token');
            throw error;
        }
    }


    
}
module.exports=UserService;