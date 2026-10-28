import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

console.log('🌿 [Touch Art] Bắt đầu build mã nguồn production...');
execSync('npm run build', { stdio: 'inherit' });

console.log('🚀 [Touch Art] Đang đóng gói và đẩy lên nhánh deploy...');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'touchart-deploy-'));

try {
  fs.cpSync('dist', tempDir, { recursive: true });

  execSync('git init', { cwd: tempDir, stdio: 'pipe' });
  execSync('git checkout -b deploy', { cwd: tempDir, stdio: 'pipe' });
  execSync('git config user.name "Touch Art Deployer"', { cwd: tempDir, stdio: 'pipe' });
  execSync('git config user.email "deploy@touchart.com.vn"', { cwd: tempDir, stdio: 'pipe' });
  execSync('git add .', { cwd: tempDir, stdio: 'pipe' });
  execSync('git commit -m "deploy: update production build"', { cwd: tempDir, stdio: 'pipe' });

  const remotesOutput = execSync('git remote', { encoding: 'utf8' }).trim();
  const remotes = remotesOutput.split(/\r?\n/).filter(Boolean);

  for (const remote of remotes) {
    const url = execSync(`git remote get-url ${remote}`, { encoding: 'utf8' }).trim();
    console.log(`📡 Đang đẩy lên ${remote} (${url})...`);
    execSync(`git remote add ${remote} "${url}"`, { cwd: tempDir, stdio: 'pipe' });
    execSync(`git push ${remote} deploy --force`, { cwd: tempDir, stdio: 'inherit' });
  }

  console.log('✨ [Touch Art] Đã cập nhật nhánh deploy thành công!');
} finally {
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (err) {
    // Ignore cleanup error
  }
}
