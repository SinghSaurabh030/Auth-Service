const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const {PORT}=require('./config/serverConfig');
const ApiRoutes=require('./routes/index');
const UserService = require('./services/user-services');
const userService=new UserService();



const setupAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',ApiRoutes);
    app.listen(PORT,()=>{
        console.log('connected');
        const token=userService.createToken({
            email:'saurabh@gmail.com',
            password: 1234

        })
        console.log(token);
        console.log(userService.verifyToken(token));


    })
}
setupAndStartServer();