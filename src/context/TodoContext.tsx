/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';

export interface Todo {
    id: string;
    title: string;
    subTasks?: Todo[];
    isCompleted: boolean;
}

interface TodoContextValue {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (todoId: string) => void;
    completeTodo: (todoId: string) => void;
    addSubTask: (todoId: string, subTask: Todo) => void;
    completeSubTodo: (todoId: string, subTaskId: string) => void;
    removeSubTodo: (todoId: string, subTaskId: string) => void;
}

const TodoContext = createContext<TodoContextValue>({
    todos: [],
    addTodo: () => { },
    removeTodo: () => { },
    completeTodo: () => { },
    addSubTask: () => { },
    completeSubTodo: () => { },
    removeSubTodo: () => { }
})

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([{
        id: Date.now().toString(),
        title: "This is a sample todo",
        isCompleted: false,
        subTasks: [{
            id: "1",
            title: "This is a sample sub task",
            isCompleted: false
        },
        {
            id: "2",
            title: "This is a sample sub task 2",
            isCompleted: false
        },
        {
            id: "3",
            title: "This is a sample sub task 3",
            isCompleted: true
        }
        ]
    }]);

    const addTodo = (newTodo: Todo) => {
        setTodos([...todos, newTodo]);
    };

    const addSubTask = (todoId: string, subTask: Todo) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) =>
                todo.id === todoId
                    ? {
                        ...todo,
                        subTasks: todo.subTasks ? [...todo.subTasks, subTask] : [subTask],
                    }
                    : todo
            );
        });
    };

    const removeTodo = (todoId: string) => {
        setTodos(todos.filter((todo) => todo.id !== todoId));
    };
    const completeTodo = (todoId: string) => {
        setTodos(todos.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        }));
        completeSubTodo(todoId)
    };
    const completeSubTodo = (todoId: string, subTaskId?: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId
                    ? {
                        ...todo,
                        subTasks: todo.subTasks && todo.subTasks.map((subTask) =>
                            subTaskId ? subTask.id === subTaskId ? { ...subTask, isCompleted: !subTask.isCompleted } : subTask
                                : { ...subTask, isCompleted: true }
                        ),
                    }
                    : todo
            )
        );
    };

    const removeSubTodo = (todoId: string, subTaskId: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId
                    ? { ...todo, subTasks: todo.subTasks && todo.subTasks.filter((subTask) => subTask.id !== subTaskId) }
                    : todo
            )
        );
    };


    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, completeTodo, addSubTask, completeSubTodo, removeSubTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;
