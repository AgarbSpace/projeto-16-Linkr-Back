import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import publicationSchema from "../schemas/publicationSchema.js";
import { postPublication } from "../controllers/publicationController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const publicationRouter = Router();

publicationRouter.post('/publication', validateTokenMiddleware, validateSchemaMiddleware(publicationSchema), postPublication);


export default publicationRouter;