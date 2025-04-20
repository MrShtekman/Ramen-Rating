import express from 'express';
import ramenRouter from './ramen/index';
import restaurantRouter from './restaurant/index';

const MainRouter = express.Router();

MainRouter.use("/ramen", ramenRouter)
MainRouter.use("/restaurant", restaurantRouter)

export default MainRouter;