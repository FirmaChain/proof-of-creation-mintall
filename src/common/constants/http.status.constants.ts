export const HTTP_STATUS = {
  OK: { code: 200, message: 'Request successful' },
  CREATED: { code: 201, message: 'Resource created' },
  BAD_REQUEST: { code: 400, message: 'Invalid parameters' },
  UNAUTHORIZED: { code: 401, message: 'Authentication failed' },
  FORBIDDEN: { code: 403, message: 'Permission denied' },
  NOT_FOUND: { code: 404, message: 'Resource not found' },
  INTERNAL_SERVER_ERROR: { code: 500, message: 'Server error' },
};
