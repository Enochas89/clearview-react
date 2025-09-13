import React from 'react';
import { supabase } from './supabaseClient';

function TaskModal({ isTaskModalOpen, setIsTaskModalOpen, selectedProjectId, setProjects }) {
  const handleCancel = () => {
    setIsTaskModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = {
      id: Date.now(),
      name: formData.get('task-name'),
      start: formData.get('task-start-date'),
      end: formData.get('task-end-date'),
    };

    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('tasks')
      .eq('id', selectedProjectId)
      .single();

    if (fetchError) {
      console.error('Error fetching project tasks:', fetchError);
      return;
    }

    const updatedTasks = [...project.tasks, newTask];

    const { data, error: updateError } = await supabase
      .from('projects')
      .update({ tasks: updatedTasks })
      .eq('id', selectedProjectId)
      .select();

    if (updateError) {
      console.error('Error updating project tasks:', updateError);
    } else {
      setProjects(prevProjects =>
        prevProjects.map(p =>
          p.id === selectedProjectId ? { ...p, tasks: updatedTasks } : p
        )
      );
      setIsTaskModalOpen(false);
    }
  };

  if (!isTaskModalOpen) {
    return null;
  }

  return (
    <div id="task-modal" className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 id="task-modal-title" className="text-xl font-bold text-slate-800">Add Task</h2>
          <button onClick={handleCancel} id="cancel-task-btn-x" className="text-slate-400 hover:text-slate-600">&times;</button>
        </div>
        <form onSubmit={handleSubmit} id="task-form" className="mt-6">
          <div className="mb-4">
            <label htmlFor="task-name" className="block text-sm font-medium text-slate-600 mb-1">Task Name</label>
            <input type="text" name="task-name" id="task-name" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" required />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="task-start-date" className="block text-sm font-medium text-slate-600 mb-1">Start Date</label>
              <input type="date" name="task-start-date" id="task-start-date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" required />
            </div>
            <div>
              <label htmlFor="task-end-date" className="block text-sm font-medium text-slate-600 mb-1">End Date</label>
              <input type="date" name="task-end-date" id="task-end-date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" required />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={handleCancel} id="cancel-task-btn" className="px-5 py-2.5 bg-white text-slate-800 rounded-lg hover:bg-slate-100 border border-slate-300 font-medium text-sm">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 font-medium text-sm">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;