import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import publicationSchema from "../schemas/publicationSchema.js";
import { deletePublication, postPublication } from "../controllers/publicationController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { verifyPostMiddleware } from "../middlewares/verifyPostMiddleware.js";

const publicationRouter = Router();

publicationRouter.post('/publication', validateTokenMiddleware, validateSchemaMiddleware(publicationSchema), postPublication);
publicationRouter.delete('/publication/:id', validateTokenMiddleware, verifyPostMiddleware, deletePublication);

export default publicationRouter;