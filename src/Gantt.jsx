import React from 'react';

const DAY_WIDTH = 192;
const ROW_HEIGHT = 44;
const VIEW_MONTHS = 4;

const parseDate = (d) => new Date(d.replace(/-/g, '/'));
const diffDays = (date1, date2) => Math.round((date2 - date1) / (1000 * 60 * 60 * 24));

function Gantt({ projects, selectedProjectId, viewDate, setIsTaskModalOpen }) {
  const viewStartDate = new Date(viewDate);
  viewStartDate.setDate(1);

  const viewEndDate = new Date(viewStartDate);
  viewEndDate.setMonth(viewEndDate.getMonth() + VIEW_MONTHS);
  viewEndDate.setDate(0);

  const currentProject = projects.find(p => p.id === selectedProjectId);
  const allTasks = currentProject ? currentProject.tasks.map(t => ({...t, color: currentProject.color})) : [];

  const calculateTaskSlots = (tasks) => {
    const sortedTasks = tasks
        .map(task => ({...task, start: parseDate(task.start), end: parseDate(task.end)}))
        .filter(task => task.start <= viewEndDate && task.end >= viewStartDate)
        .sort((a, b) => a.start - b.start || diffDays(a.start, a.end) - diffDays(b.start, b.end));

    const slots = [];
    sortedTasks.forEach(task => {
        let assignedSlot = slots.findIndex(slotEndDate => task.start > slotEndDate);
        if (assignedSlot === -1) { assignedSlot = slots.length; }
        slots[assignedSlot] = task.end;
        task.slot = assignedSlot;
    });
    return { slottedTasks: sortedTasks, totalSlots: slots.length };
  };

  const { slottedTasks, totalSlots } = calculateTaskSlots(allTasks);

  const totalDays = diffDays(viewStartDate, viewEndDate) + 1;
  const totalWidth = totalDays * DAY_WIDTH;
  const contentHeight = totalSlots * ROW_HEIGHT;

  const handleEditTask = (taskId) => {
    console.log('Edit task:', taskId);
    // We can implement the edit functionality here
  };

  const handleDeleteTask = (taskId) => {
    console.log('Delete task:', taskId);
    // We can implement the delete functionality here
  };

  return (
    <div id="gantt-area" className="flex-grow flex overflow-hidden">
      <div id="gantt-task-menu" className="w-80 border-r border-slate-200 bg-white z-10 flex flex-col flex-shrink-0">
        <div className="h-12 flex items-center justify-between px-5 border-b border-slate-200 flex-shrink-0">
          <h3 className="font-semibold text-slate-700 text-sm">Project Tasks</h3>
          <button id="add-task-btn" onClick={() => setIsTaskModalOpen(true)} className="bg-slate-800 text-white text-xs font-semibold flex items-center rounded-lg px-3 py-1.5 hover:bg-slate-900 transition-colors">
            <i className="fas fa-plus mr-1.5 text-xs"></i> Add Task
          </button>
        </div>
        <div id="gantt-task-list" className="flex-grow overflow-y-auto custom-scroll">
          {slottedTasks.map(task => (
            <div key={task.id} className='task-item flex items-center justify-between px-5 border-b border-slate-100 hover:bg-slate-50 transition-colors' style={{ height: `${ROW_HEIGHT}px` }}>
              <span className="task-name-span text-sm text-slate-700 truncate font-medium cursor-pointer flex-grow" data-task-id={task.id}>{task.name}</span>
              <div className="actions space-x-3">
                <button onClick={() => handleEditTask(task.id)} className="edit-task-btn text-slate-400 hover:text-slate-800" data-task-id={task.id}><i className="fas fa-pencil-alt"></i></button>
                <button onClick={() => handleDeleteTask(task.id)} className="delete-task-btn text-slate-400 hover:text-rose-500" data-task-id={task.id}><i className="fas fa-trash-alt"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="gantt-timeline-view" className="flex-1 overflow-auto custom-scroll bg-slate-50/50">
        <div id="gantt-timeline-content" className="relative" style={{ width: `${totalWidth}px`, height: `${contentHeight > 0 ? contentHeight : '100%'}px` }}>
          <div className="gantt-grid"></div>
          {slottedTasks.map(task => {
            const left = diffDays(viewStartDate, task.start) * DAY_WIDTH;
            const width = (diffDays(task.start, task.end) + 1) * DAY_WIDTH;

            return (
              <div key={task.id} className={`task-bar ${task.color}`} style={{ top: `${task.slot * ROW_HEIGHT}px`, left: `${left}px`, width: `${width - 8}px` }}>
                <span>{task.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Gantt;
