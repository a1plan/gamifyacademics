// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://acqsffrxdasdhofocema.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcXNmZnJ4ZGFzZGhvZm9jZW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NDM2OTcsImV4cCI6MjA1NjMxOTY5N30.rhanh6K4oywu0MTvkQG4Dpg6WOoo_I2yg-vuieVZboI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);