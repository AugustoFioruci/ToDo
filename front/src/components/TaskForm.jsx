import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [recurrence, setRecurrence] = useState('NONE');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      // Formatando data para YYYY-MM-DD para o input type="date"
      setStartDate(task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '');
      setEndDate(task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '');
      setRecurrence(task.recurrence || 'NONE');
    } else {
      // Data atual padrão
      const today = new Date().toISOString().split('T')[0];
      setStartDate(today);
      setEndDate(today);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const taskData = {
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      recurrence,
      allDay: true // Simplificando para o usuário
    };

    if (task && task.id) {
      taskData.id = task.id;
    }

    await onSave(taskData);
    setIsLoading(false);
  };

  return (
    <div className="task-form-overlay">
      <div className="card task-form-modal">
        <h2 className="mb-3">{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input 
              type="text" 
              id="title" 
              className="input-field" 
              placeholder="Ex: Reunião de alinhamento"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea 
              id="description" 
              className="input-field" 
              placeholder="Detalhes opcionais..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label htmlFor="startDate">Data de Início</label>
              <input 
                type="date" 
                id="startDate" 
                className="input-field" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label htmlFor="endDate">Data de Fim</label>
              <input 
                type="date" 
                id="endDate" 
                className="input-field" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="recurrence">Repetição</label>
            <select 
              id="recurrence" 
              className="input-field"
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
            >
              <option value="NONE">Não se repete</option>
              <option value="DAILY">Diariamente</option>
              <option value="WEEKLY">Semanalmente</option>
              <option value="MONTHLY">Mensalmente</option>
              <option value="YEARLY">Anualmente</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              className="btn btn-ghost" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
