import ErrorResponse from '../utils/ErrorResponse.js';

const notFound = (req, res, next) => {
  next(new ErrorResponse(`Not Found - ${req.originalUrl}`, 404));
};

export default notFound;