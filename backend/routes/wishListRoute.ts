import express from 'express';
import { authenticatedUser } from '../middleware/authMiddleware';
import * as WishListController from '../controllers/wishListController';

const router = express.Router();

router.post('/add', authenticatedUser, WishListController.addToWishList);
router.delete('/remove/:productId', authenticatedUser, WishListController.removeFromWishList);
router.get('/:userId', authenticatedUser, WishListController.getWishListByUser);

export default router;