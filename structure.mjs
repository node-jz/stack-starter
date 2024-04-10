import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'packages/sveltekit/src');

async function listFilesAndDirs(dirPath, depth = 0) {
  try {
    const dirents = await fs.readdir(dirPath, { withFileTypes: true });
    for (const dirent of dirents) {
      const fullPath = path.join(dirPath, dirent.name);
      const prefix = '-'.repeat(depth);
      console.log(`${prefix}${dirent.name}`);
      if (dirent.isDirectory()) {
        await listFilesAndDirs(fullPath, depth + 1); // Recursively list subdirectories with increased depth
      }
    }
  } catch (err) {
    console.error('Error reading directory', err);
  }
}

listFilesAndDirs(directoryPath);
