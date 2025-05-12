import Ramen from '../../schemas/Ramen';
import { Request, Response } from 'express';

const getRamen = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const object = await Ramen.findById(id);
        res.status(200).json(object);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default getRamen;