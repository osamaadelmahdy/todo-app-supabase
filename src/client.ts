import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dhbosfncaztuncaptlut.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoYm9zZm5jYXp0dW5jYXB0bHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMzcxOTMsImV4cCI6MjA0NDgxMzE5M30.vJmF7tp78HVBdhm93dIo-14QFN1VPM3GeDbGMDJP8sk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
