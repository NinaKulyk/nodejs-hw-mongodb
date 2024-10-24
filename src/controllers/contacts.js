import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';
import { parseFilterParams } from '../utils/validation/parseFilterParams.js';
import { validatePaginationParams } from '../utils/validation/parsePaginationParams.js';
import { parseSortParams } from '../utils/validation/parseSortParams.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const { page, perPage } = validatePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const id = req.params.contactId;
  const userId = req.user._id;
  const contact = await getContactsById(id, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;
  const userId = req.user._id;

  const contact = await deleteContactById(id, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const contact = await createContact(req.body, userId, req.file);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(201).send({
    status: 201,
    message: `Successfully created contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const userId = req.user._id;
  const { body, file } = req;

  const { contact } = await updateContact(id, { ...body, file }, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated contact!`,
    data: contact,
  });
};

export const putContactController = async (req, res) => {
  const id = req.params.contactId;
  const { body } = req;

  const { contact, isNew } = await updateContact(id, body, { upsert: true });

  const status = isNew ? 201 : 200;

  res.status(status).send({
    status,
    message: `Successfully updated contact!`,
    data: contact,
  });
};
