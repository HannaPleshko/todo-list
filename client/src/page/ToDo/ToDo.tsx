import style from './todo.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { iTask } from '../../interfaces';
import Modal from '../../components/Modal/Modal';
import { Button, TextField, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material';
import TableRowTask from './TableRowTask';

export default function ToDo() {
    const [inputValues, setInputValues] = useState({ title: '', description: '' });
    const [open, setOpen] = useState<boolean>(false);
    const [active, setActive] = useState<iTask>({ title: '', description: '' });
    const [tasks, setTasks] = useState<iTask[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setInputValues({ ...inputValues, [event.target.name]: event.target.value });

    const createTask = async () => {
        try {
            if (!inputValues.title || !inputValues.description) throw new Error('Title and (or) description fields are empty')
            await axios.post('http://localhost:3001/api/v1/task', { ...inputValues, status: false, date: new Date() });
            setTasks(prevTasks => [...prevTasks, inputValues]);
            setInputValues({ title: '', description: '' });
            setIsError(false);
        } catch (error) {
            console.error('Error creating task:', error);
            setIsError(true);
        }
    }

    const getAllTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/task');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    useEffect(() => {
        getAllTasks();
    }, [tasks.length]);

    useEffect(() => {
        document.body.style.backgroundColor = open ? '#dadada' : 'white';
    }, [open])

    return (
        <div className={style.wrapper}>
            <h1>TODO LIST</h1>

            <div className={style.form}>
                <TextField required error={isError && !inputValues.title}  value={inputValues.title} size="small" multiline maxRows={4} name='title' onChange={handleInputChange} label="Create note..." variant="outlined" />
                <TextField required error={isError && !inputValues.description}  value={inputValues.description} size="small" multiline maxRows={4} name='description' onChange={handleInputChange} label="Create description..." variant="outlined" />

                <Button variant="outlined" onClick={createTask}>CREATE</Button>
            </div>

            <TableContainer className={open ? style.modalOpen : ''} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task: iTask, index) => (
                            <TableRowTask task={task} key={index} index={index} setOpen={setOpen} setActive={setActive} setTasks={setTasks} />
                        ))}
                    </TableBody>
                </Table>
                {open && <Modal setTasks={setTasks} setOpen={setOpen} task={active} />}
            </TableContainer>
        </div>
    );
}
