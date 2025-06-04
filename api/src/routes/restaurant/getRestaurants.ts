import Restaurant from '../../schemas/Restaurant';
import { Request, Response } from 'express';

const getObjects = async (req: Request, res: Response) => {
    try {
        const objects = await Restaurant.find(req.body);
        res.status(200).json(objects);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
};

export default getObjects;