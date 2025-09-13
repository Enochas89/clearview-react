
import React from 'react';

function Sidebar({ projects, selectedProjectId, setSelectedProjectId, setIsProjectModalOpen }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-6">
        <i className="fas fa-layer-group text-2xl text-slate-800"></i>
        <h1 className="text-xl font-bold text-slate-800 ml-3">Construct</h1>
      </div>
      <nav className="flex-grow p-4 space-y-4 custom-scroll overflow-y-auto">
        <div>
          <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</h2>
          <div className="mt-2 space-y-1">
            <a href="#" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg bg-slate-100 text-slate-900">
              <i className="fas fa-th-large w-6 text-center text-slate-700"></i><span className="ml-3">Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">
              <i className="fas fa-users w-6 text-center"></i><span className="ml-3">Teams</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">
              <i className="fas fa-file-invoice w-6 text-center"></i><span className="ml-3">RFI</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100">
              <i className="fas fa-paper-plane w-6 text-center"></i><span className="ml-3">Submittals</span>
            </a>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Projects</h2>
          <div id="project-list" className="mt-2 space-y-1">
            {projects.map(project => (
              <a key={project.id} href="#" onClick={() => setSelectedProjectId(project.id)} className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer ${selectedProjectId === project.id ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}>
                <span className={`w-2.5 h-2.5 mr-3 rounded-full ${project.color}`}></span>
                {project.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <div className="p-4 border-t border-slate-200">
        <button onClick={() => setIsProjectModalOpen(true)} id="add-project-btn" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-all transform hover:scale-105 flex items-center justify-center">
          <i className="fas fa-plus mr-2 text-sm"></i> Add Project
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
