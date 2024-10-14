import createHttpError from 'http-errors';
import { contactsModel } from '../db/models/contact.js';
import { createPagination } from '../utils/createPagination.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = 'asc',
  sortBy = 'name',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = contactsModel.find();

  if (filter.contactType || filter.contactType === false) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [count, contacts] = await Promise.all([
    contactsModel.find().merge(contactQuery).countDocuments(),
    contactsModel
      .find()
      .merge(contactQuery)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  return {
    data: contacts,
    ...createPagination(page, perPage, count),
  };
};

export const getContactsById = async (id) => {
  const contact = await contactsModel.findById(id);

  if (!contact) {
    throw createHttpError(404, {
      status: 404,
      message: `Student with id ${id} not found!`,
    });
  }

  return contact;
};

export const createContact = async (payload) => {
  return await contactsModel.create(payload);
};

export const updateContact = async (id, payload, options = {}) => {
  const rawResult = await contactsModel.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult.value) {
    throw createHttpError(404, {
      status: 404,
      message: `Student with id ${id} not found!`,
    });
  }

  return {
    contact: rawResult.value,
    isNew: !rawResult.lastErrorObject.updatedExisting,
  };
};

export const deleteContactById = async (id) => {
  await contactsModel.findByIdAndDelete(id);
};
