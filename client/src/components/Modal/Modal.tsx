import React, { useState } from 'react';
import style from './modal.module.scss';
import { iTask } from '../../interfaces';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

interface ModalProps {
  setOpen: (arg: boolean) => void;
  setTasks: (arg: iTask[]) => void;
  task: iTask;
}

const Modal: React.FC<ModalProps> = ({ setOpen, setTasks, task }) => {
  const [inp, setInp] = useState({ title: '', description: '', status: false });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setInp({ ...inp, [event.target.name]: event.target.value });

  return (
    <div className={style.modal}>
      <TextField size="small" fullWidth multiline maxRows={4} name="title" onChange={handleInputChange} label="Update note..." variant="outlined" />
      <TextField
        size="small"
        fullWidth
        multiline
        maxRows={4}
        name="description"
        onChange={handleInputChange}
        label="Update description..."
        variant="outlined"
      />

      <div className={style.btns}>
        <Button color="secondary" variant="outlined" onClick={() => setOpen(false)}>
          cancel
        </Button>
        <Button
          variant="outlined"
          onClick={async () => {
            await axios.put(`http://localhost:3001/api/v1/task/${task.task_id}`, { ...inp, status: false, date: new Date() });
            setTasks([]);
            setOpen(false);
          }}
        >
          confirm
        </Button>
      </div>
    </div>
  );
};

export default Modal;
