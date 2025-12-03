import { execSync } from 'child_process';
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 Building project for cPanel deployment...\n');

try {
  // 1. Build the project
  console.log('📦 Step 1: Running production build...');
  execSync('npm run build', { stdio: 'inherit', cwd: process.cwd() });

  // 2. Copy .htaccess to dist folder
  console.log('\n📋 Step 2: Copying .htaccess to dist folder...');
  const htaccessSource = join(process.cwd(), '.htaccess');
  const htaccessDest = join(process.cwd(), 'dist', '.htaccess');

  if (existsSync(htaccessSource)) {
    copyFileSync(htaccessSource, htaccessDest);
    console.log('✅ .htaccess copied successfully');
  } else {
    console.log('⚠️  .htaccess not found, skipping...');
  }

  // 3. Verify dist folder structure
  console.log('\n🔍 Step 3: Verifying build output...');
  const distPath = join(process.cwd(), 'dist');
  if (existsSync(distPath)) {
    console.log('✅ Build completed successfully!');
    console.log('\n📁 Build output location: ./dist/');
    console.log('\n📤 Next steps:');
    console.log('   1. Upload the contents of ./dist/ folder to cPanel public_html/');
    console.log('   2. Make sure index.html is directly in public_html/ (not in a subfolder)');
    console.log('   3. Set file permissions: files=644, folders=755');
    console.log('   4. Clear browser cache and test your site');
  } else {
    console.error('❌ Build failed: dist folder not found');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

