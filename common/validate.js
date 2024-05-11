const validateData = (requestData, schema) => {
  const validatedData = schema.validate(requestData);
  if (validatedData.error) {
    throw new Error(validatedData.error);
  } else {
    return validatedData.value;
  }
};

module.exports = validateData;
