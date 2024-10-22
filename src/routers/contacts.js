import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
  putContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactValidationSchema } from '../validation/createContactValidationSchema.js';
import { updateContactValidationSchema } from '../validation/updateContactValidationSchema.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use('/:contactId', isValidId('contactId'));

contactsRouter.use('/', authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));

contactsRouter.post(
  '/',
  validateBody(createContactValidationSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactValidationSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.put(
  '/:contactId',
  validateBody(createContactValidationSchema),
  ctrlWrapper(putContactController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default contactsRouter;
