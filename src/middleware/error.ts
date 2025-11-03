import { Request, Response, NextFunction } from 'express';
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err?.status ?? 400;
  const message = err?.message ?? 'Bad Request';
  res.status(status).json({ error: message });
}
