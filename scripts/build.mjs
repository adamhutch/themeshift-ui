import { spawn } from 'node:child_process';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as sass from 'sass';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

async function run(command, args) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });

    child.on('error', reject);
  });
}

async function compileBaseCss() {
  const result = sass.compile(path.join(rootDir, 'src/css/base.scss'), {
    loadPaths: [path.join(rootDir, 'src'), path.join(rootDir, 'node_modules')],
    style: 'expanded',
  });

  await mkdir(path.join(distDir, 'css'), { recursive: true });
  await writeFile(path.join(distDir, 'css/base.css'), `${result.css}\n`);
}

async function copyThemeAssets() {
  await cp(path.join(rootDir, 'tokens'), path.join(distDir, 'tokens'), {
    recursive: true,
  });

  await cp(
    path.join(rootDir, 'src/css/tokens.css'),
    path.join(distDir, 'css/tokens.css'),
  );

  const contractPath = path.join(rootDir, 'theme-contract.json');
  const rawContract = await readFile(contractPath, 'utf8');
  const contract = JSON.parse(rawContract);

  await writeFile(
    path.join(distDir, 'theme-contract.json'),
    `${JSON.stringify(contract, null, 2)}\n`,
  );
}

await rm(distDir, { recursive: true, force: true });

await run('npx', ['vite', 'build', '--config', 'vite.config.components.ts']);
await run('npx', ['tsc', '-p', 'tsconfig.build.json']);
await compileBaseCss();
await copyThemeAssets();
