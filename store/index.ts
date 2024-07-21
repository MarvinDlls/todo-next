import { create } from 'zustand';
import { ToDo } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { devtools, persist } from 'zustand/middleware';

interface ToDoState {
  toDos: ToDo[];
  searchTerm: string;
  addTodo: (description: string) => void;
  removeTodo: (id: string) => void;
  toggleChecked: (id: string) => void;
  clearTodos: () => void;
  setSearchTerm: (term: string) => void;
}

export const useStore = create<ToDoState>()(
  devtools(
    persist(
      (set) => ({
        toDos: [],
        searchTerm: '',
        addTodo: (description: string) =>
          set((state) => ({
            toDos: [
              ...state.toDos,
              { id: uuidv4(), description, checked: false },
            ],
          })),
        removeTodo: (id: string) =>
          set((state) => ({
            toDos: state.toDos.filter((todo) => todo.id !== id),
          })),
        toggleChecked: (id: string) =>
          set((state) => ({
            toDos: state.toDos.map((toDo: ToDo) =>
              toDo.id === id ? { ...toDo, checked: !toDo.checked } : toDo
            ),
          })),
        clearTodos: () => set({ toDos: [] }),
        setSearchTerm: (term: string) => set({ searchTerm: term }),
      }),
      {
        name: 'toDoStore',
      }
    )
  )
);

