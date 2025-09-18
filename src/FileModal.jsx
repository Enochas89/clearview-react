import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function FileModal({ isFileModalOpen, setIsFileModalOpen, selectedDate, selectedProjectId }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (!isFileModalOpen) {
    return null;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${selectedDate.toISOString().split('T')[0]}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('calendar-files')
      .upload(filePath, file);

    if (uploadError) {
      alert(uploadError.message);
      setUploading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('calendar_files')
      .insert({
        date: selectedDate.toISOString().split('T')[0],
        file_name: file.name,
        file_path: filePath,
        project_id: selectedProjectId,
      });

    if (insertError) {
      alert(insertError.message);
      setUploading(false);
      return;
    }

    setUploading(false);
    setIsFileModalOpen(false);
    setFile(null);
    // We will need to refresh the calendar to show the new file.
    // I will implement this in the next step.
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add File for {selectedDate.toLocaleDateString()}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-slate-700">
              Select file
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <i className="fas fa-file-upload text-4xl text-slate-400"></i>
                <div className="flex text-sm text-slate-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">DOC, PDF, PNG, JPG, XLS up to 10MB</p>
                {file && <p className="text-sm text-slate-800 mt-2">Selected file: {file.name}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={() => setIsFileModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200" disabled={uploading}>
            Cancel
          </button>
          <button onClick={handleUpload} className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-900" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileModal;