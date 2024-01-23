export  class AppError extends Error {
  constructor(message: string) {
    super(message);
    // this.name='Error';
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}