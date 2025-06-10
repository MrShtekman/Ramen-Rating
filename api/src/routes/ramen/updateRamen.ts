import Ramen from '../../schemas/Ramen';

import { Request, Response } from 'express';
import { Types } from 'mongoose';

import fieldValidator from '../../utils/fieldValidator';

const updateRamen = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ramen ID' });
        }

        const invalidFields = fieldValidator(req.body, Ramen);
        if (invalidFields.length > 0) {
            return res.status(400).json({ message: `Invalid field(s): ${invalidFields.join(', ')}` })
        }

        const updatedRamen = await Ramen.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRamen) {
            return res.status(404).json({ message: 'Ramen not found' });
        }
        res.status(200).json(updatedRamen);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default updateRamen;