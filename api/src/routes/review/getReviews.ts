import Review from '../../schemas/reviews/Review';
import { Request, Response } from 'express';

const getReview = async (req: Request, res: Response) => {
    try {
        const objects = await Review.find(req.body);
        res.status(200).json(objects);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
};

export default getReview;