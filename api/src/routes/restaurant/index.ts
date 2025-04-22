import express from 'express';
import addRestaurant from './addRestaurant';
import getRestaurants from './getRestaurants';

const restaurantRouter = express.Router();

restaurantRouter.post('/', addRestaurant);
restaurantRouter.get('/', getRestaurants);

export default restaurantRouter;