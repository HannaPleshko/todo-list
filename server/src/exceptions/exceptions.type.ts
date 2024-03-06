export const ExceptionType = {
  DB_INITIALIZE_NOT_CONNECTED: { id: 1, message: 'DB not connected.' },
  DB_INITIALIZE_TABLES__NOT_INITIALIZED: { id: 2, message: 'DB not initialized.' },
  DB_ROLE_TABLE_NOT_INITIALIZED: { id: 3, message: 'DB Role table not initialized.' },
  DB_TABLES_NOT_DELETED: { id: 4, message: 'DB tables not deleted.' },

  DB_TASK_CREATE_NOT_CREATED: { id: 5, message: 'DB not created TASK.' },
  DB_TASK_GET_ALL_NOT_GOT: { id: 6, message: 'DB not got TASKS.' },
  DB_TASK_GET_BY_ID_NOT_GOT: { id: 7, message: 'DB not got TASK.' },
  DB_TASK_DELETE_NOT_DELETED: { id: 8, message: 'DB not deleted TASK.' },
  DB_TASK_UPDATE_NOT_UPDETED: { id: 9, message: 'DB not updated TASK.' },
  DB_TASK_NOT_FOUND: { id: 10, message: 'DB not found TASK.' },
};
