const formatResponse = ({
  success = true,
  message = "Success",
  data = null,
  meta = null,
}) => {
  const response = {
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  if (meta) response.meta = meta;

  return response;
};

module.exports = formatResponse;
