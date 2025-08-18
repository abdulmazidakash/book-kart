import { Request, Response } from "express";

export const createProduct = async(req:Request, res:Response)=>{
	try {
		const {title, images, subject, category, condition, classType, price, author, edition, description, finalPrice, shippingCharge, seller, paymentMode, paymentDetails} = req.body;

	} catch (error) {
		
	}
}