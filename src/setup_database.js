
import { supabase } from './supabaseClient.js';

async function setupDatabase() {
  const { data: tables, error: tableError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_name', 'projects');

  if (tableError) {
    console.error('Error checking for projects table:', tableError);
    return;
  }

  if (tables.length > 0) {
    console.log('"projects" table already exists.');
  } else {
    const { error: createError } = await supabase.rpc('exec', { sql: `
      CREATE TABLE projects (
        id BIGINT PRIMARY KEY,
        name TEXT,
        idNumber TEXT,
        budget NUMERIC,
        address TEXT,
        projectManager TEXT,
        client TEXT,
        color TEXT,
        tasks JSONB
      );
    `});

    if (createError) {
      console.error('Error creating projects table:', createError);
      return;
    }
    console.log('"projects" table created successfully.');
  }

  const projects = [
    {
       id: 1, 
       name: 'Corporate Headquarters', 
       idNumber: 'CH-2025-01',
       budget: 5000000,
       address: '123 Business Rd, Metropolis, USA',
       projectManager: 'Alice Johnson',
       client: 'Global Corp Inc.',
       color: 'bg-sky-500',
       tasks: [
           { id: 101, name: 'Site Preparation & Grading', start: '2025-09-02', end: '2025-09-08' },
           { id: 102, name: 'Foundation Pouring', start: '2025-09-09', end: '2025-09-15' },
           { id: 103, name: 'Structural Steel Framing', start: '2025-09-16', end: '2025-10-01' },
           { id: 104, name: 'MEP Rough-in', start: '2025-09-18', end: '2025-09-28' },
       ]
   },
   {
       id: 2, 
       name: 'Downtown Retail Center', 
       idNumber: 'DRC-2025-02',
       budget: 1200000,
       address: '456 Market St, Gotham, USA',
       projectManager: 'Bob Williams',
       client: 'ShopLocal LLC',
       color: 'bg-teal-500',
       tasks: [
           { id: 201, name: 'Interior Demolition', start: '2025-09-11', end: '2025-09-18' },
           { id: 202, name: 'Excavation & Shoring', start: '2025-09-19', end: '2025-09-24' },
       ]
   },
];

  const { error: insertError } = await supabase.from('projects').upsert(projects);

  if (insertError) {
    console.error('Error inserting data:', insertError);
    return;
  }

  console.log('Data inserted successfully.');
}

setupDatabase();
