const express=require('express');
const router=express.Router();
const userController=require('../../controllers/user-controller');
const {authRequestValidator}=require('../../middlewares/index');



router.post('/signup',authRequestValidator,userController.create);
router.post('/signin',authRequestValidator,userController.signIn);
router.get('/isAuthenticated',userController.isAuthenticated);

module.exports=router;