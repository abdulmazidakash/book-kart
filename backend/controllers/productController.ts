import { Request, Response } from "express";
import { response } from "../utils/responseHandler";
import { uploadToCloudinary } from "../config/cloudinaryConfig";
import Products from "../models/Products";

export const createProduct = async(req:Request, res:Response)=>{
	try {
		const {title, subject, category, condition, classType, price, author, edition, description, finalPrice, shippingCharge,  paymentMode, paymentDetails} = req.body;

		const sellerId = req.id;

		const images = req.files as Express.Multer.File[];
		if(!images || images.length === 0){
			return response(res, 400, 'Image is required');
		};

		let parsedPaymentDetails = JSON.parse(paymentDetails);
		if(paymentMode === 'UPI' && (!parsedPaymentDetails || !parsedPaymentDetails.upiId)){
			return response(res, 400, 'UPI Id is required for payment');
		};

		if(paymentMode === 'Bank Account' && (
			!parsedPaymentDetails || !parsedPaymentDetails.bankDetails ||
			!parsedPaymentDetails.bankDetails.accountNumber ||
			!parsedPaymentDetails.bankDetails.ifscCode ||
			!parsedPaymentDetails.bankDetails.bankName
		)){
			return response(res, 400, 'Bank account details is required for payment')
		}

		const uploadPromise = images.map(file => uploadToCloudinary(file as any));
		const uploadImages = await Promise.all(uploadPromise);
		const imageUrl = uploadImages.map(image=> image.secure_url);

		const product = new Products({
			title, 
			subject, 
			category, condition, classType, 
			price, 
			author, 
			edition, 
			description, 
			finalPrice, shippingCharge,  paymentMode, 
			paymentDetails: parsedPaymentDetails,
			seller: sellerId,
			images:imageUrl,
		});

		await product.save();
		return response(res, 200, 'product created successfully', product)
	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again')
	}
};

export const getAllProducts = async(req:Request, res:Response)=>{
	try {
		const products = await Products.find()
		.sort({createdAt: -1})
		.populate('seller', 'name email')

		return response(res, 200, 'Products fetched successfully', products)
	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again')
	}
};

export const getProductById = async(req:Request, res:Response)=>{
	try {
		const product = await Products.findById(req.params.id)
		.populate({
			path: 'seller',
			select: 'name email profilePicture phoneNumber addresses',
			populate: {
				path: 'addresses',
				model: 'Address'
			}
		});
		if(!product){
			return response(res, 404, 'Product not found for this id');
		}

		return response(res, 200, 'Product fetched by id successfully', product)
	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again')
	}
};

export const deleteProduct = async(req:Request, res:Response)=>{
	try {
		const product = await Products.findByIdAndDelete(req.params.productId);
		
		if(!product){
			return response(res, 404, 'Product not found for this id');
		}

		return response(res, 200, 'Product deleted by id successfully', product)
	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again')
	}
};

export const getProductBySellerId = async(req:Request, res:Response)=>{
	try {
		const sellerId = req.params.sellerId;
		if(!sellerId){
			return response(res, 400, 'seller not found, please provide valid sellerId')
		}
		const product = await Products.find({seller:sellerId})
		.sort({createdAt: -1})
		.populate('seller', 'email profilePicture phoneNumber addresses')
		if(!product){
			return response(res, 404, 'Product not found for this seller');
		}

		return response(res, 200, 'Product fetched by sellerId successfully', product)
	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again')
	}
};