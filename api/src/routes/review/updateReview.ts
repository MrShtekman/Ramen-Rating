import Review from '../../schemas/reviews/Review';
import { Request, Response } from 'express';

const updateReview = async ( req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true});
        if(!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export default updateReview;