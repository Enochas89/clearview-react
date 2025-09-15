import React, { useState } from 'react';
import Gantt from './Gantt';
import Calendar from './Calendar';

function MainContent({ projects, selectedProjectId, setIsTaskModalOpen }) {
  const [viewDate, setViewDate] = useState(new Date());

  const handlePrevMonth = () => {
    setViewDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setViewDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleToday = () => {
    setViewDate(new Date());
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button onClick={handlePrevMonth} id="prev-month-btn" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"><i className="fas fa-chevron-left text-slate-500"></i></button>
          <h2 id="current-month-year" className="text-lg font-semibold text-slate-800 w-44 text-center">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={handleNextMonth} id="next-month-btn" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"><i className="fas fa-chevron-right text-slate-500"></i></button>
          <button onClick={handleToday} id="today-btn" className="px-4 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm">Today</button>
        </div>
        <div></div>
      </header>
      <div className="flex-grow flex flex-col p-8 overflow-hidden">
        <div className="flex-grow bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-slate-200">
          <div id="calendar-header" className="flex flex-shrink-0 border-b border-slate-200 h-56">
            <div id="project-info-header" className="w-80 flex-shrink-0 border-r border-slate-200 p-5 flex flex-col bg-white">
            </div>
            <Calendar viewDate={viewDate} />
          </div>
          <div id="gantt-area" className="flex-grow flex overflow-hidden">
            <div id="gantt-task-menu" className="w-80 border-r border-slate-200 bg-white z-10 flex flex-col flex-shrink-0">
              <div className="h-12 flex items-center justify-between px-5 border-b border-slate-200 flex-shrink-0">
                <h3 className="font-semibold text-slate-700 text-sm">Project Tasks</h3>
                <button id="add-task-btn" className="bg-slate-800 text-white text-xs font-semibold flex items-center rounded-lg px-3 py-1.5 hover:bg-slate-900 transition-colors">
                  <i className="fas fa-plus mr-1.5 text-xs"></i> Add Task
                </button>
              </div>
              <div id="gantt-task-list" className="flex-grow overflow-y-auto custom-scroll">
              </div>
            </div>
            <div id="gantt-timeline-view" className="flex-1 overflow-auto custom-scroll bg-slate-50/50">
              <div id="gantt-timeline-content" className="relative">
                <div className="gantt-grid"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;