import React from 'react';
import { supabase } from './supabaseClient';

const projectColors = ['bg-sky-500', 'bg-teal-500', 'bg-violet-500', 'bg-rose-500', 'bg-amber-500'];

function ProjectModal({ isProjectModalOpen, setIsProjectModalOpen, setProjects }) {
  const handleCancel = () => {
    setIsProjectModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProject = {
      id: Date.now(),
      name: formData.get('project-name'),
      idNumber: formData.get('project-id-number'),
      budget: parseFloat(formData.get('project-budget')) || 0,
      address: formData.get('project-address'),
      projectManager: formData.get('project-manager'),
      client: formData.get('project-client'),
      color: projectColors[Math.floor(Math.random() * projectColors.length)],
      tasks: []
    };

    const { data, error } = await supabase.from('projects').insert([newProject]).select();

    if (error) {
      console.error('Error inserting project:', error);
    } else {
      setProjects(prevProjects => [...prevProjects, ...data]);
      setIsProjectModalOpen(false);
    }
  };

  if (!isProjectModalOpen) {
    return null;
  }

  return (
    <div id="project-modal" className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Create New Project</h2>
          <button onClick={handleCancel} id="cancel-project-btn-x" className="text-slate-400 hover:text-slate-600">&times;</button>
        </div>
        <form onSubmit={handleSubmit} id="project-form" className="mt-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="project-name" className="block text-sm font-medium text-slate-600 mb-1">Project Name</label>
              <input type="text" name="project-name" id="project-name" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" required />
            </div>
            <div>
              <label htmlFor="project-id-number" className="block text-sm font-medium text-slate-600 mb-1">ID Number</label>
              <input type="text" name="project-id-number" id="project-id-number" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" />
            </div>
            <div>
              <label htmlFor="project-budget" className="block text-sm font-medium text-slate-600 mb-1">Budget ($)</label>
              <input type="number" name="project-budget" id="project-budget" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" />
            </div>
            <div>
              <label htmlFor="project-address" className="block text-sm font-medium text-slate-600 mb-1">Address</label>
              <input type="text" name="project-address" id="project-address" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" />
            </div>
            <div>
              <label htmlFor="project-manager" className="block text-sm font-medium text-slate-600 mb-1">Project Manager</label>
              <input type="text" name="project-manager" id="project-manager" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" />
            </div>
            <div>
              <label htmlFor="project-client" className="block text-sm font-medium text-slate-600 mb-1">Client</label>
              <input type="text" name="project-client" id="project-client" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800" />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button type="button" onClick={handleCancel} id="cancel-project-btn" className="px-5 py-2.5 bg-white text-slate-800 rounded-lg hover:bg-slate-100 border border-slate-300 font-medium text-sm">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 font-medium text-sm">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;