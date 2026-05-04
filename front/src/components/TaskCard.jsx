import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  // Formatar datas para exibição mais amigável
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
      </div>
      
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}
      
      <div className="task-meta">
        {task.startDate && (
          <span>Inicio: {formatDate(task.startDate)}</span>
        )}
        {task.endDate && (
          <span>Fim: {formatDate(task.endDate)}</span>
        )}
        {task.recurrence && task.recurrence !== 'NONE' && (
          <span>Repete: {task.recurrence}</span>
        )}
      </div>
      
      <div className="task-actions">
        <button 
          onClick={() => onEdit(task)} 
          className="btn btn-ghost"
          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(task.id)} 
          className="btn btn-danger"
          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
