import React from 'react';

const DAY_WIDTH = 192;
const VIEW_MONTHS = 4;

const formatDate = (date) => date.toISOString().split('T')[0];
const diffDays = (date1, date2) => Math.round((date2 - date1) / (1000 * 60 * 60 * 24));

function Calendar({ viewDate }) {
  const viewStartDate = new Date(viewDate);
  viewStartDate.setDate(1);

  const viewEndDate = new Date(viewStartDate);
  viewEndDate.setMonth(viewEndDate.getMonth() + VIEW_MONTHS);
  viewEndDate.setDate(0);

  const totalDays = diffDays(viewStartDate, viewEndDate) + 1;
  const totalWidth = totalDays * DAY_WIDTH;

  const days = [];
  let tempDate = new Date(viewStartDate);
  for (let i = 0; i < totalDays; i++) {
    days.push(new Date(tempDate));
    tempDate.setDate(tempDate.getDate() + 1);
  }

  return (
    <div id="calendar-scroll-view" className="flex-1 overflow-x-hidden">
      <div id="calendar-content" className="flex h-full" style={{ width: `${totalWidth}px` }}>
        {days.map(day => {
          const dateStr = formatDate(day);
          const isToday = formatDate(new Date()) === dateStr;
          const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={dateStr} className='day-tile border-r border-slate-200 p-3 flex flex-col h-full' data-date={dateStr} style={{ minWidth: DAY_WIDTH, maxWidth: DAY_WIDTH }}>
              <div className="flex justify-between items-center">
                <span className={`text-xs font-semibold ${isToday ? 'text-slate-800' : 'text-slate-500'}`}>{dayOfWeek.toUpperCase()}</span>
                <span className={`text-xl font-bold ${isToday ? 'bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center' : 'text-slate-700'}`}>{day.getDate()}</span>
              </div>
              <div className="file-list flex-grow mt-2 space-y-1.5 overflow-y-auto custom-scroll pr-1">
              </div>
              <button className="add-file-btn mt-2 text-slate-500 hover:text-slate-800 text-xs font-medium py-1.5 rounded-lg flex items-center justify-center transition-all bg-slate-100 hover:bg-slate-200">
                <i className="fas fa-plus-circle mr-1.5"></i> Add File
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;