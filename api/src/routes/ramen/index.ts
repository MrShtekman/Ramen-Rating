import express from "express";
import addRamen from "./addRamen";
import getRamens from "./getRamens";
import getRamen from "./getRamen";
import updateRamen from "./updateRamen";
import deleteRamen from "./deleteRamen";

const ramenRouter = express.Router();

ramenRouter.post('/', addRamen);
ramenRouter.get('/', getRamens);
ramenRouter.get('/:id', getRamen);
ramenRouter.put('/:id', updateRamen);
ramenRouter.delete('/:id', deleteRamen);
export default ramenRouter;