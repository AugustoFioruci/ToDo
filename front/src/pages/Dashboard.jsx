import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error("Erro ao buscar tarefas", err);
      setError('Não foi possível carregar as tarefas.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenForm = (task = null) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskData.id) {
        // Editando
        await api.put(`/tasks/${taskData.id}`, taskData);
      } else {
        // Criando
        await api.post('/tasks', taskData);
      }
      fetchTasks(); // Recarrega a lista
      handleCloseForm();
    } catch (err) {
      console.error("Erro ao salvar tarefa", err);
      alert('Ocorreu um erro ao salvar a tarefa.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (err) {
        console.error("Erro ao deletar tarefa", err);
        alert('Ocorreu um erro ao excluir a tarefa.');
      }
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">ToDo App</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => handleOpenForm()}>
            + Nova Tarefa
          </button>
          <button className="btn btn-ghost" onClick={logout}>
            Sair
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="text-center mt-4 text-muted">Carregando tarefas...</div>
      ) : tasks.length === 0 ? (
        <div className="card text-center mt-4">
          <h2 className="mb-2">Nenhuma tarefa encontrada</h2>
          <p className="text-muted mb-4">Que tal criar a sua primeira tarefa?</p>
          <button className="btn btn-primary" onClick={() => handleOpenForm()}>
            Criar Minha Primeira Tarefa
          </button>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={handleOpenForm} 
              onDelete={handleDeleteTask} 
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <TaskForm 
          task={editingTask} 
          onSave={handleSaveTask} 
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
};

export default Dashboard;
