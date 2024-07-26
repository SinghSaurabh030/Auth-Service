const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const {PORT,DB_SYNC}=require('./config/serverConfig');
const ApiRoutes=require('./routes/index');
const UserService = require('./services/user-services');
const userService=new UserService();
const db=require('./models/index');



const setupAndStartServer=async ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',ApiRoutes);
    app.listen(PORT,async ()=>{
        console.log('connected');
        // if(DB_SYNC){
        //     db.sequelize.sync({alter : true});
        // }
        
        
    })
}
setupAndStartServer();