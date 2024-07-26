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
        // const token=userService.createToken({
        //     email:'saurabh@gmail.com',
        //     password: 1234

        // })
        // console.log(token);
        // console.log(userService.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjE5Njg5MjgsImV4cCI6MTcyMjA1NTMyOH0.WxX_0-Y2hYDrLJmqsN85mRI1_qy7UG0YtIXrN49QV0o'));
        //  token=userService.signIn({
        //     email: 'teamupgh@nitjsr.ac.in',
        //     password: 2222
        // });
         console.log(userService,userService.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYW11cGdoQG5pdGpzci5hYy5pbiIsImlhdCI6MTcyMTk3MTIxMiwiZXhwIjoxNzIyMDU3NjEyfQ.E3QgpdIOT4Mv5Eve8JJFFDyUNMYt4YLpiwBVPst98wc'));

    })
}
setupAndStartServer();