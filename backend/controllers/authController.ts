import { Request, Response } from "express";
import User from "../models/User";
import { response } from "../utils/responseHandler";
import crypto from 'crypto';
import { sendVerificationToEmail } from "../config/emailConfig";

export const register =async(req:Request, res:Response)=>{
	try {
		const {name, email, password, agreeTerms} = req.body;
		const existingUser = await User.findOne({email});
		if(existingUser){
			return response(res, 400, 'User already exist');
		}
		const varificationToken = crypto.randomBytes(20).toString('hex');
		// console.log(varificationToken);
		const user = new User({name, email, password, agreeTerms, varificationToken});
		await user.save();

		const result = await sendVerificationToEmail(user.email, varificationToken);
		console.log(result);
		return response(res, 200, 'User registration successful, please check your email box to verify your email')

	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again')
	}
};

export const verifyEmail = async(req:Request, res:Response)=>{
	try {
		const token = req.params;
		const user = await User.findOne({varificationToken:token});
		if(!user){
			return response(res, 400, 'Invalid or expired verification token');
		}

		user.isVerified = true;
		user.varificationToken = undefined;
	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again')
	}
}