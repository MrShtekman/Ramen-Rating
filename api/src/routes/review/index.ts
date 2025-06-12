import express from 'express';
import addReview from './addReview';
import getReview from './getReviews';
import updateReview from './updateReview';
import deleteReview from './deleteReview';

const reviewRouter = express.Router();

reviewRouter.post('/', addReview);
reviewRouter.get('/', getReview);
reviewRouter.put('/:id', updateReview);
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;