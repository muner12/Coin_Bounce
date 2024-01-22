const Joi=require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController={
    async register(req,res,next){
        // validate user input
        const userRegisterSchema=Joi.object({
            username:Joi.string().min(5).max(30).required(),
            name:Joi.string().min(5).max(30).required(),
            email:Joi.string().email().required(),
            password:Joi.string().pattern(passwordPattern).required(),
            confirmPassword:Joi.ref('password')

        });

        const {error}=userRegisterSchema.validate(req.body);
        //if error in validatoin ->return error via middleware
        if(error){
          return   next(error);
        }
        //3. if email or username is already registered->return error via middleware
        const {username,name,email,password}=req.body
        try {
            const emailInUse=await User.exists({email});
            const usernameInUse=await User.exists({username});
            //check if email is already in use
            if(emailInUse){
                const error={
                    status:409,
                    message:'Email already in registed,user another email'
                }
              return  next(error);
            }
            //check if the user already used
            if(usernameInUse){
                const error={
                    status:409,
                    message:'Username not available ,choose another username'
                }
              return  next(error);
            }
        } catch (error) {
            return next(error)
        }
        //4.password hashed 
        const hashedPassword =await bcrypt.hash("1234",10);

        //store use data in database
            try {

                const userToRegister=new User({
                    username,
                    email,
                    name,
                    password:hashedPassword
                });
                const user=await userToRegister.save();
        
                //response send to user
                return res.status(200).json({user});
                
            } catch (error) {

              return  next(error);
                
            }
        
    },
    async login(){},
}


module.exports =authController;