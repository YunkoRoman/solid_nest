import { Logger } from '@nestjs/common';
import { CustomError } from 'ts-custom-error';

export function errorHandler(error: any) {
  Logger.error(error);

  if (error && error.code && error.code === 11000) {
    error.status = 409;
    error.response = { message: 'The record is not unique' };
  }

  throw new HttpError(
    error.code ? error.code : error.status ? error.status : 500,
    error.response ? error.response.message : error.message,
  );
}

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export class HttpError extends CustomError {
  public constructor(
    public code: number,
    message?: string,
  ) {
    super(message);
  }
  getStatus() {
    return this.code;
  }
}
