import Express from "express";
import { addCountEntry, getCountValue, updateCountValue } from "../controllers/countController.js";

const countRouter = Express.Router();

countRouter
    .get("/value", getCountValue)
    .post("/add", addCountEntry)
    .put("/update", updateCountValue);

export default countRouter;