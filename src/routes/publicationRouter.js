import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import publicationSchema from "../schemas/publicationSchema.js";
import editPublicationSchemma from "../schemas/editPublicationSchemma.js";
import { deletePublication, postPublication, updatePublication } from "../controllers/publicationController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { verifyPostMiddleware } from "../middlewares/verifyPostMiddleware.js";

const publicationRouter = Router();

publicationRouter.post('/publication', validateTokenMiddleware, validateSchemaMiddleware(publicationSchema), postPublication);
publicationRouter.delete('/publication/:id', validateTokenMiddleware, verifyPostMiddleware, deletePublication);
publicationRouter.post('/publication/edit/:id', validateTokenMiddleware, validateSchemaMiddleware(editPublicationSchemma), updatePublication);

export default publicationRouter;