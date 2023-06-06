import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import TodoContext from '../../context/TodoContext';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { useTheme } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Add, Delete, Check, AccountTreeOutlined } from '@mui/icons-material';
import NavBar from '../NavBar/NavBar';
import classes from './Dashboard.module.scss'

const DashboardPage = () => {
  const { user } = useContext(UserContext);
  const {
    todos,
    addTodo,
    completeTodo,
    removeTodo,
    addSubTask,
    completeSubTodo,
    removeSubTodo
  } = useContext(TodoContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newSubTaskTitle, setNewSubTaskTitle] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const handleOpenDialog = (todoId: string) => {
    setSelectedTodoId(todoId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddSubTaskDialog = () => {
    const newSubTask = {
      id: Date.now().toString(),
      title: newSubTaskTitle,
      isCompleted: false,
    };
    addSubTask(selectedTodoId, newSubTask);
    setNewSubTaskTitle('');
    setOpenDialog(false);
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now().toString(),
      title: newTodoTitle,
      isCompleted: false,
    };
    addTodo(newTodo);
    setNewTodoTitle('');
  };

  const handleCompleteTodo = (todoId: string) => {
    completeTodo(todoId);
  };

  const handleDeleteTodo = (todoId: string) => {
    removeTodo(todoId);
  };
  const handleCompleteSubTodo = (todoId: string, subTaskId: string) => {
    completeSubTodo(todoId, subTaskId);
  };

  const handleDeleteSubTodo = (todoId: string, subTaskId: string) => {
    removeSubTodo(todoId, subTaskId);
  };

  const checkDisabled = (): boolean => {
    return newTodoTitle.length === 0 ? true : false
  }

  const checkSubTaskDisabled = (): boolean => {
    return newSubTaskTitle.length === 0 ? true : false
  }

  return (
    user &&
    <div className={classes.DashboardContainer}>
      <NavBar />
      <div className={classes.DashboardInputContainer}>
        <TextField
          label="New Todo"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <Button onClick={handleAddTodo} variant="contained" className={classes.addToDo} disabled={checkDisabled()}>
                Add
              </Button>
            ),
          }}
        >
        </TextField>
      </div>
      <List>
        {todos.map((todo) => (
          <>
            <ListItem key={todo.id} sx={{ backgroundColor: todo.isCompleted ? '#e0e0e0' : '' }}>
              <ListItemText
                primary={todo.title}
                style={{
                  textDecoration: todo.isCompleted ? 'line-through' : '',
                  color: todo.isCompleted ? 'gray' : 'black'
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => handleOpenDialog(todo.id)}
                >
                  <Add />
                </IconButton>
                <IconButton
                  onClick={() => handleCompleteTodo(todo.id)}
                >
                  <Check />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {
              todo.subTasks && todo.subTasks.length > 0 && (
                <List sx={{ marginLeft: 4, marginRight: 4 }}>
                  {todo.subTasks.map((subTask) => (
                    <ListItem key={subTask.id} sx={{ backgroundColor: subTask.isCompleted ? '#e0e0e0' : ''}}>
                      <AccountTreeOutlined sx={{ marginRight: 1 }} />
                      <ListItemText
                        primary={subTask.title}
                        style={{
                          textDecoration: subTask.isCompleted ? 'line-through' : '',
                          color: subTask.isCompleted ? 'gray' : 'black',
                        }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() => handleCompleteSubTodo(todo.id, subTask.id)}
                        >
                          <Check />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteSubTodo(todo.id, subTask.id)}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )
            }
          </>
        ))}
      </List>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Add Sub-Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the title for the new sub-todo.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={newSubTaskTitle}
            onChange={(e) => setNewSubTaskTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddSubTaskDialog} disabled={checkSubTaskDisabled()}>Add Sub-Todo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
