
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qefgcnhcrpzsphjrouha.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZmdjbmhjcnB6c3BoanJvdWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MzI1MTUsImV4cCI6MjA3MDQwODUxNX0.AE0hVIfpjqxQ8h6-L0hZO-DK2wyhiif8HovxLCC3W64';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
