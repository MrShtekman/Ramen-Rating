import express from "express";
import addRamens from "./addRamens";
import getRamens from "./getRamens";
import getRamen from "./getRamen";
import updateRamen from "./updateRamen";
import deleteRamen from "./deleteRamen";

const ramenRouter = express.Router();

ramenRouter.post('/', addRamens);
ramenRouter.get('/', getRamens);
ramenRouter.get('/:id', getRamen);
ramenRouter.put('/:id', updateRamen);
ramenRouter.delete('/:id', deleteRamen);
export default ramenRouter;