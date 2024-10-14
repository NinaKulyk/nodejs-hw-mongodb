const BOOLEANS = ['true', 'false'];
const TYPES = ['work', 'home', 'personal'];

const parseBoolean = (value) => {
  if (!BOOLEANS.includes(value)) return;

  return value === 'true' ? true : false;
};

const parseType = (value) => {
  if (TYPES.includes(value)) return value;
};

export const parseFilterParams = (query) => {
  const filter = {
    isFavourite: parseBoolean(query.isFavourite),
    contactType: parseType(query.contactType),
  };

  return filter;
};
