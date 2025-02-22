const errorMessageList  = {
  400: "HttpError Bad Request",
  401: "HttpError Unauthorized",
  403: "HttpError Forbidden",
  404: "HttpError Not found ",
  409: "HttpError Conflict"
}
export const HttpError = (  status,  message  ) => {
    
  const error = new Error(message || errorMessageList[status]);
  (error ).status = status;
  return error 
};