import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gafqvgqisnjuhomsgqyw.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZnF2Z3Fpc25qdWhvbXNncXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0Njg3MjcsImV4cCI6MjA3MjA0NDcyN30.PP-cvTlSYZJ3AoZWJaroCNsP2GU-s-pIV5MV76UgGtM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
