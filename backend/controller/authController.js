const Joi=require('joi');
const User = require('../models/user');
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController={
    async register(req,rex,next){
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
            next(error);
        }
        //3. if email or username is already registered->return error via middleware
        const {username,email,password}=req.body
        try {
            const emailInUse=await User.exists(email);
            const usernameInUse=await User.exists(username);
            if(emailInUse){
                const error={
                    status:409,
                    message:'Email already in registed,user another email'
                }
                next(error);
            }

            if(usernameInUse){
                const error={
                    status:409,
                    message:'Username not available ,choose another username'
                }
            }
        } catch (error) {
            return next(error)
        }
        //4.password hashed 
        //store use data in database
        //response send to user
    },
    async login(){},
}


module.exports =authController;