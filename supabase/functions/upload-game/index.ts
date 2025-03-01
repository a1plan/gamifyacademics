
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const gameFile = formData.get('gameFile');
    const thumbnailFile = formData.get('thumbnail');
    const gameData = JSON.parse(formData.get('gameData')?.toString() || '{}');

    if (!gameFile) {
      return new Response(
        JSON.stringify({ error: 'No game file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Create Supabase client with admin privileges
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Upload game file
    const gameFileName = gameFile.name.replace(/[^\x00-\x7F]/g, '');
    const gameFileExt = gameFileName.split('.').pop();
    const gameFilePath = `games/${crypto.randomUUID()}.${gameFileExt}`;

    const { data: gameUploadData, error: gameUploadError } = await supabaseAdmin.storage
      .from('learning_games')
      .upload(gameFilePath, gameFile, {
        contentType: gameFile.type,
        upsert: false
      });

    if (gameUploadError) {
      console.error("Game file upload error:", gameUploadError);
      return new Response(
        JSON.stringify({ error: 'Failed to upload game file', details: gameUploadError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    let thumbnailPath = null;
    
    // Upload thumbnail if provided
    if (thumbnailFile) {
      const thumbnailFileName = thumbnailFile.name.replace(/[^\x00-\x7F]/g, '');
      const thumbnailFileExt = thumbnailFileName.split('.').pop();
      thumbnailPath = `thumbnails/${crypto.randomUUID()}.${thumbnailFileExt}`;

      const { data: thumbUploadData, error: thumbUploadError } = await supabaseAdmin.storage
        .from('learning_games')
        .upload(thumbnailPath, thumbnailFile, {
          contentType: thumbnailFile.type,
          upsert: false
        });

      if (thumbUploadError) {
        console.error("Thumbnail upload error:", thumbUploadError);
        // Continue even if thumbnail upload fails
      }
    }

    // Get public URLs for the uploaded files
    const gameFileUrl = supabaseAdmin.storage
      .from('learning_games')
      .getPublicUrl(gameFilePath).data.publicUrl;

    let thumbnailUrl = null;
    if (thumbnailPath) {
      thumbnailUrl = supabaseAdmin.storage
        .from('learning_games')
        .getPublicUrl(thumbnailPath).data.publicUrl;
    }

    // Store game metadata in the database
    const { data: gameInsertData, error: gameInsertError } = await supabaseAdmin
      .from('games')
      .insert({
        title: gameData.title,
        description: gameData.description,
        subject: gameData.subject,
        grade: gameData.grade,
        chapter_number: gameData.chapterNumber,
        difficulty: gameData.difficulty,
        estimated_time: gameData.estimatedTime,
        format: gameData.format,
        learning_standards: gameData.learningStandards,
        file_path: gameFilePath,
        file_url: gameFileUrl,
        thumbnail_path: thumbnailPath,
        thumbnail_url: thumbnailUrl,
        status: 'active',
      })
      .select();

    if (gameInsertError) {
      console.error("Game metadata insert error:", gameInsertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save game metadata', details: gameInsertError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log("Game uploaded successfully:", gameInsertData);

    return new Response(
      JSON.stringify({
        message: 'Game uploaded successfully',
        game: gameInsertData[0],
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
