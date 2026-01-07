import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Token is stored in httpOnly cookie, so we use withCredentials
  // The backend will automatically read the cookie
  req = req.clone({
    withCredentials: true
  });

  return next(req);
};

