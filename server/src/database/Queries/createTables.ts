import { Pool } from 'pg';
import { defaultPool } from '../connection';
import { HttpException } from '@exceptions/HttpException';
import { ExceptionType } from '@exceptions/exceptions.type';

export const createTables = async (pool: Pool = defaultPool): Promise<void> => {
  try {
    const client = await pool.connect();
    await client.query(
      `
          CREATE TABLE IF NOT EXISTS TASKS (
            task_id               UUID DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID PRIMARY KEY,
            title                 VARCHAR(20) NOT NULL, 
            description           VARCHAR(240) NOT NULL, 
            date                  DATE NOT NULL, 
            status                BOOLEAN DEFAULT true 
          );
`,
    );
  } catch (error) {
    console.log('+++');
    
    console.log(error);
    console.log('+++');
    
    if (error instanceof HttpException) throw error;
    throw new HttpException(500, ExceptionType.DB_INITIALIZE_TABLES__NOT_INITIALIZED);
  }
};
