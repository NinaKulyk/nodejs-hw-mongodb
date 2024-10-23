import createHttpError from 'http-errors';
import { contactsModel } from '../db/models/contact.js';
import { createPagination } from '../utils/createPagination.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = 'asc',
  sortBy = 'name',
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = contactsModel.find({ userId });

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

export const getContactsById = async (id, userId) => {
  const contact = await contactsModel.findOne({ _id: id, userId });

  if (!contact) {
    throw createHttpError(404, {
      status: 404,
      message: `Student with id ${id} not found!`,
    });
  }

  return contact;
};

export const createContact = async (payload, userId) => {
  return await contactsModel.create({ ...payload, userId });
};

export const updateContact = async (id, payload, options = {}, userId) => {
  const rawResult = await contactsModel.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

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

export const deleteContactById = async (id, userId) => {
  const contact = await contactsModel.findOneAndDelete({ _id: id, userId });

  if (!contact) {
    throw createHttpError(404, {
      status: 404,
      message: `Contact with id ${id} not found!`,
    });
  }

  return contact;
};
