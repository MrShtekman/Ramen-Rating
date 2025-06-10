import express from 'express';
import addRestaurant from './addRestaurant';
import getRestaurants from './getRestaurants';
import updateRestaurant from './updateRestaurant';
import deleteRestaurant from './deleteRestaurant';

const restaurantRouter = express.Router();

restaurantRouter.get('/', getRestaurants);
restaurantRouter.post('/', addRestaurant);
restaurantRouter.put('/:id', updateRestaurant);
restaurantRouter.delete('/:id', deleteRestaurant);

export default restaurantRouter;