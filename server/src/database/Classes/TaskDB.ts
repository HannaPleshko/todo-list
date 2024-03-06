import { Database } from '..';
import { ITask } from '../Interfaces';
import { HttpException } from '@exceptions/HttpException';
import { ExceptionType } from '@exceptions/exceptions.type';
import { DatabaseError } from 'pg';

export class TaskDB extends Database {
  async create(data: ITask): Promise<ITask> {
    try {
      await this.pool.query('BEGIN');

      const { title, description, status, date } = data;

      const query = {
        text: 'INSERT INTO tasks (title, description, status, date) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [title, description, status, date],
      };

      const { rows } = await this.pool.query(query);
      await this.pool.query('COMMIT');

      return rows;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_TASK_CREATE_NOT_CREATED);
    }
  }

  async getAll(): Promise<ITask> {
    try {
      const query = { text: 'SELECT *  FROM tasks ORDER BY date' };

      const { rows } = await this.pool.query(query);

      return rows;
    } catch (err) {
      const error: DatabaseError = err;
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_TASK_GET_ALL_NOT_GOT);
    }
  }

  async getById(course_id: string): Promise<ITask> {
    try {
      const query = {
        text: 'SELECT * FROM tasks WHERE task_id = $1',
        values: [course_id],
      };

      const { rows } = await this.pool.query(query);
      if (!rows.length) throw new HttpException(404, ExceptionType.DB_TASK_NOT_FOUND);

      return rows;
    } catch (err) {
      const error: DatabaseError = err;
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_TASK_GET_BY_ID_NOT_GOT);
    }
  }

  async deleteById(task_id: string): Promise<ITask> {
    try {
      await this.pool.query('BEGIN');
      const query = {
        text: 'DELETE FROM tasks WHERE task_id = $1 RETURNING *',
        values: [task_id],
      };

      const { rows } = await this.pool.query(query);
      if (!rows) throw new HttpException(404, ExceptionType.DB_TASK_NOT_FOUND);

      await this.pool.query('COMMIT');
      return rows;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_TASK_DELETE_NOT_DELETED);
    }
  }

  async updateById(task_id: string, data: ITask): Promise<ITask> {
    try {
      await this.pool.query('BEGIN');

      const { title, description, status, date } = data;

      const query = {
        text: `UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), date = COALESCE($4, status) WHERE task_id = $5 RETURNING *`,
        values: [title, description, status, date, task_id],
      };

      const { rows } = await this.pool.query(query);
      if (!rows) throw new HttpException(404, ExceptionType.DB_TASK_NOT_FOUND);

      await this.pool.query('COMMIT');
      return rows;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_TASK_UPDATE_NOT_UPDETED);
    }
  }

  async updateStatus(task_id: string, data: ITask): Promise<ITask> {
    try {
      await this.pool.query('BEGIN');

      const { status } = data;

      const query = {
        text: `UPDATE tasks SET status = COALESCE($1, status) WHERE task_id = $2 RETURNING *`,
        values: [status, task_id],
      };

      const { rows } = await this.pool.query(query);
      if (!rows) throw new HttpException(404, ExceptionType.DB_TASK_NOT_FOUND);

      await this.pool.query('COMMIT');
      return rows;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      console.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_TASK_UPDATE_NOT_UPDETED);
    }
  }
}
