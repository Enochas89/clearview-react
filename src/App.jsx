import React, { useState, useEffect } from 'react';
import './main.css';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ProjectModal from './ProjectModal';
import TaskModal from './TaskModal';
import { supabase } from './supabaseClient';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  useEffect(() => {
    async function getProjects() {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
        if (data.length > 0 && !selectedProjectId) {
          setSelectedProjectId(data[0].id);
        }
      }
    }

    getProjects();
  }, [selectedProjectId]);

  return (
    <div className="h-screen w-screen flex">
      <Sidebar projects={projects} selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} setIsProjectModalOpen={setIsProjectModalOpen} />
      <MainContent projects={projects} selectedProjectId={selectedProjectId} setIsTaskModalOpen={setIsTaskModalOpen} />
      <ProjectModal isProjectModalOpen={isProjectModalOpen} setIsProjectModalOpen={setIsProjectModalOpen} setProjects={setProjects} />
      <TaskModal isTaskModalOpen={isTaskModalOpen} setIsTaskModalOpen={setIsTaskModalOpen} selectedProjectId={selectedProjectId} setProjects={setProjects} />
    </div>
  );
}

export default App;