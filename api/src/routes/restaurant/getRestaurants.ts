import Ramen from '../../schemas/Ramen';
import { Request, Response } from 'express';

const getObjects = async (req: Request, res: Response) => {
    try {
        const objects = await Ramen.find(req.body);
        res.status(200).json(objects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default getObjects;