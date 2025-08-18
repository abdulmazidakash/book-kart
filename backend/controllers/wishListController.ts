import { Request, Response } from "express";
import Products from "../models/Products";
import { response } from "../utils/responseHandler";
import WishList from "../models/WishList";

export const addToWishList = async(req:Request, res:Response)=>{
	try {
		const userId = req.id;
		const {productId} = req.body;

		const product = await Products.findById(productId);
		if(!product){
			return response(res, 404, 'product not found');
		};

		let wishList = await WishList.findOne({user: userId});
		if(!wishList){
			wishList = new WishList({user:userId, products: []});
		};

		if(!wishList.products.includes(productId)){
			wishList.products.push(productId);
			await wishList.save();
		}

		return response(res, 200, 'product added to wishList successfully', wishList);
	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again');
	}
};

export const removeFromWishList = async(req:Request, res:Response)=>{
	try {
		const userId = req.id;
		const {productId} = req.params;
		let wishList = await WishList.findOne({user: userId});
		if(!wishList){
			return response(res, 404, 'wishList not found for user')
		};
		wishList.products = wishList.products.filter((id)=> id.toString() !== productId);
		await wishList.save();
		return response(res, 200, 'Product removed to wishList successfully');
	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again');
	}
};

export const getWishListByUser = async(req:Request, res:Response)=>{
	try {
		const userId = req.id;
		let wishList = await WishList.findOne({user: userId}).populate('products');
		if(!wishList){
			return response(res, 404, 'wishList is Empty', {Products:[]});
		};
		await wishList.save();
		return response(res, 200, 'User wishList get successfully');
	} catch (error) {
		console.log(error);
		return response(res, 500, 'Internal server error, please try again');
	}
};