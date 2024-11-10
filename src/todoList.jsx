import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editText, setEditText] = useState('');
    const [nextId, setNextId] = useState(1);

    const handleAddTodo = () => {
        if (newTodo) {
            setTodos([...todos, { id: nextId, text: newTodo }]);
            setNewTodo('');
            setNextId(nextId + 1);
        }
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleEditTodo = (id, currentText) => {
        console.log('id, currentText', currentText, id);
        setIsEditing(id);
        setEditText(currentText);
    };

    const handleSaveEdit = (id) => {
        setTodos(
            todos.map(todo => (todo.id === id ? { ...todo, text: editText } : todo))
        );
        setIsEditing(null);
        setEditText('');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ maxWidth: '400px', width: '100%', margin: 'auto', textAlign: 'center' }}>
                <h3>Todo List</h3>

                <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a new task"
                        style={{ padding: '8px', flex: 1, marginRight: '5px' }}
                    />
                    <button onClick={handleAddTodo} style={{ padding: '8px 16px' }}>
                        Add Task
                    </button>
                </div>
                <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto', }}>
                    {todos.map(todo => (
                        <li
                            key={todo.id}
                            style={{
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid black',
                                backgroundColor: isEditing === todo.id ? 'white' : 'black',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '4px'
                            }}
                        >
                            {isEditing === todo.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        style={{ flexGrow: 1, padding: '8px', color: 'black' }}
                                    />
                                    <button
                                        onClick={() => handleSaveEdit(todo.id)}
                                        style={{
                                            marginLeft: '10px',
                                            padding: '8px',
                                            backgroundColor: 'gray',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span style={{ flexGrow: 1 }}>{todo.text}</span>
                                    <button
                                        onClick={() => handleDeleteTodo(todo.id)}
                                        style={{
                                            marginLeft: '10px',
                                            padding: '8px',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEditTodo(todo.id, todo.text)}
                                        style={{
                                            marginLeft: '10px',
                                            padding: '8px',
                                            backgroundColor: 'gray',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default TodoList;
