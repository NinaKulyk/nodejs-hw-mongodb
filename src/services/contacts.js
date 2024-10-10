import createHttpError from 'http-errors';
import { contactsModel } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await contactsModel.find();
  return contacts;
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
