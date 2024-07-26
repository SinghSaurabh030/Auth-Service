const UserService=require('../services/user-services');

const userService=new UserService();

const create=async (req,res)=> {
    try {
        const response=await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            success:true,
            message: 'succesfully created a user',
            data: response,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong',
            data: {},
            success: false,
            err: error
        });
    } 
}
const signIn=async (req,res)=>{
    try {
        const response=await userService.signIn({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            success:true,
            message: 'succesfully logged a user',
            data: response,
            err:{}
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'unable to login',
            data: {},
            err: error
        });
    }
}
const isAuthenticated=async (req,res)=>{
    try {
        const token=req.headers['x-access-token'];
        const response= await userService.isAuthenticated(token);
        console.log(`this is ${response}`);
        return res.status(201).json({
            success:true,
            message: 'succesfully authenticated a user',
            data: response,
            err:{}
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'unable to authenticate',
            data: {},
            err: error
        });
    }
}
const isAdmin=async (req,res)=>{
    try {
        const response= await userService.isAdmin(req.body.id);
        return res.status(201).json({
            success:true,
            data: response,
            err:{}
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'unable to check isAdmin',
            data: {},
            err: error
        });
    }
}

module.exports={
    create,
    signIn,
    isAuthenticated,
    isAdmin
} 