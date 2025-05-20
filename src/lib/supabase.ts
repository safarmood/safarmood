import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://dnyffrsraeestxliblyx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRueWZmcnNyYWVlc3R4bGlibHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2ODk4NTEsImV4cCI6MjA2MzI2NTg1MX0.jyWxey2YlrgzylGinu7KTRyDrI40Cqg7SqRsFrLvJeA';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };