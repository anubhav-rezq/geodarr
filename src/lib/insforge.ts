import { createClient } from '@insforge/sdk';

const baseUrl = import.meta.env.VITE_INSFORGE_URL || 'https://q8tcztn9.us-east.insforge.app';
const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || 'ik_ac9ad3a756e8ebdf57daf119d8a0968f';

export const insforge = createClient({
  baseUrl,
  anonKey,
});

/**
 * Helper to upload image to InsForge Storage bucket
 */
export async function uploadToStorage(
  bucket: 'geodar-reports' | 'avatars',
  file: File | Blob,
  fileName: string
): Promise<{ url: string; key: string }> {
  try {
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${Date.now()}_${cleanFileName}`;
    const { data, error } = await insforge.storage.from(bucket).upload(path, file);

    if (error) {
      console.error(`Error uploading to ${bucket}:`, error);
      throw error;
    }

    return {
      url: data?.url || '',
      key: data?.key || path,
    };
  } catch (err) {
    console.error('Storage upload failed:', err);
    throw err;
  }
}
