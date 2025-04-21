import Restaurant from '../../schemas/Restaurant';
import { Request, Response } from 'express';
import dayjs from 'dayjs';

const addRestaurant = async (req: Request, res: Response) => {
    try {
        const newRestaurant = {
            ...req.body,
            created: dayjs().add(2, 'hour'),
        };
        // add check if restaurant already exists
        const restaurant = await Restaurant.create(newRestaurant);
        res.status(200).json(restaurant);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default addRestaurant;