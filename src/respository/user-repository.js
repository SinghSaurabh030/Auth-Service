const { where } = require('sequelize');
const {user}=require('../models/index');
class UserRepository{
    async create (data){
        try {
            const users=await user.create(data);
            return users;
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw(error);
        }
    }
    async destroy(userId){
        try {
            await user.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw(error);
        }
    }
    async getByEmail(emailId){
        try {
            const userData=await user.findOne({
                where:{
                    email:emailId
                }
            });
            return userData;
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw(error);
        }
    }
}module.exports=UserRepository;