import express from 'express';
import addReview from './addReview';

const reviewRouter = express.Router();

reviewRouter.post('/', addReview);

export default reviewRouter;