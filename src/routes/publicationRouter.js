import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import publicationSchema from "../schemas/publicationSchema.js";
import { postPublication } from "../controllers/publicationController.js";

const publicationRouter = Router();

publicationRouter.post('/publication', validateSchemaMiddleware(publicationSchema), postPublication);

publicationRouter.get('/publication', (req, res) => res.send("oi"));


export default publicationRouter;