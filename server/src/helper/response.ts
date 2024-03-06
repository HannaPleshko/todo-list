import { ITask } from '@database/Interfaces';
import { Response } from 'express';

type message = ITask | ITask[];

const buildResponse = (res: Response, status: number, message: message) => {
  res.status(status);
  res.send(message);
};

export { buildResponse };
