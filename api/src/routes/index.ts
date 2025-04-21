import express from 'express';
import ramenRouter from './ramen/index';
import restaurantRouter from './restaurant/index';
import reviewRouter from './review/index';

const MainRouter = express.Router();

MainRouter.use("/ramen", ramenRouter)
MainRouter.use("/restaurant", restaurantRouter)
MainRouter.use("/review", reviewRouter)

export default MainRouter;