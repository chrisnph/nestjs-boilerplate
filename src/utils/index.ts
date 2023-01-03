export const getHostname = (protocol: string, request) => {
  const {
    headers: { host },
  } = request;

  return `${protocol || request.protocol}://${host}`;
};
