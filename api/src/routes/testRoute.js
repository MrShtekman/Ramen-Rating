import express from "express";
import { addObjects, getObjects, getObject, updateObject, deleteObject } from "../controllers/testController.js";

const testRouter = express.Router();

testRouter.post('/', addObjects);
testRouter.get('/', getObjects);
testRouter.get('/:id', getObject);
testRouter.put('/:id', updateObject);
testRouter.delete('/:id', deleteObject);
export default testRouter;