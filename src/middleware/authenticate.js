

export const authenticate = async (req,res, next) => {
  const {authorization = ""} = req.headers;
  const [bearer, token ] = authorization.split(" ");
  if(bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }
}