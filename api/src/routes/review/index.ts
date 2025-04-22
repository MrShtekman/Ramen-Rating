import express from 'express';
import addReview from './addReview';
import getReview from './getReviews';

const reviewRouter = express.Router();

reviewRouter.post('/', addReview);
reviewRouter.get('/', getReview);

export default reviewRouter;