import { Checkbox, TableRow, TableCell } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { iTask } from '../../interfaces';
import axios from 'axios';
import style from './todo.module.scss';

const TableRowTask: React.FC<{
  task: iTask;
  index: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActive: React.Dispatch<React.SetStateAction<iTask>>;
  setTasks: React.Dispatch<React.SetStateAction<iTask[]>>;
}> = ({ task, index, setOpen, setActive, setTasks }) => {
  const handleCheckboxChange = async () => {
    try {
      await axios.patch(`http://localhost:3001/api/v1/task/${task.task_id}`, { status: !task.status });
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks];
        updatedTasks[index].status = !updatedTasks[index].status;
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleEditIconClick = () => {
    setOpen(true);
    setActive(task);
  };

  const handleDeleteIconClick = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/task/${task.task_id}`);
      setTasks(prevTasks => prevTasks.filter(el => el.task_id !== task.task_id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <TableRow>
      <TableCell align="left">
        <Checkbox onChange={handleCheckboxChange} name={String(index)} checked={task?.status} />
      </TableCell>
      <TableCell className={task.status ? style.checked : style.def} align="left">
        {task.title}
      </TableCell>
      <TableCell className={task.status ? style.checked : style.def} align="left">
        {task.description}
      </TableCell>
      <TableCell className={task.status ? style.checked : style.def} align="left">
        {task.date?.substring(0, 10)}
      </TableCell>
      <TableCell align="left">
        <EditIcon onClick={handleEditIconClick} />
        <DeleteOutlineIcon onClick={handleDeleteIconClick} />
      </TableCell>
    </TableRow>
  );
};

export default TableRowTask;
