const UserRepository=require('../respository/user-repository');

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
}
module.exports=UserService;