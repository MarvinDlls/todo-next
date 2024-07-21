import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { TodoItem } from './TodoItem';
import { useStore } from '../store';

export const ToDoContainer = () => {
  const toDos = useStore((state) => state.toDos);
  const searchTerm = useStore((state) => state.searchTerm);
  const addTodo = useStore((state) => state.addTodo);
  const clearTodos = useStore((state) => state.clearTodos);
  const setSearchTerm = useStore((state) => state.setSearchTerm);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements[0] as HTMLInputElement;
    addTodo(input.value);
    input.value = '';
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredToDos = toDos.filter((todo) =>
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        maxHeight: '80vh',
        marginTop: '10vh',
        padding: '2rem',
        borderRadius: '1rem',
        minWidth: '40vw',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '3rem', fontWeight: 500, marginBottom: '1rem' }}>
        Liste de Tâches
      </Typography>

      <form
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Ajouter une tâche..."
          variant="outlined"
          sx={{ marginRight: '1rem' }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ background: 'linear-gradient(0.125turn, #3f87a6, #9da696, #b8844c)' }}
        >
          Appliquer
        </Button>
      </form>

      <TextField
        id="search-field"
        label="Rechercher une tâche..."
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: '1rem', width: '100%' }}
      />

      {filteredToDos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}

      <Button
        onClick={clearTodos}
        variant="contained"
        color="secondary"
        sx={{ marginTop: '1rem' }}
      >
        Supprimer toutes les tâches
      </Button>
    </div>
  );
};

