import express from 'express';
import addRestaurant from './addRestaurant';

const restaurantRouter = express.Router();

restaurantRouter.post('/', addRestaurant);

export default restaurantRouter;