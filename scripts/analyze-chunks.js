import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

// 获取 __dirname 的 ES modules 替代方案
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function analyzeChunks() {
  const statsFile = path.join(__dirname, '../dist/stats.html');
  const distDir = path.join(__dirname, '../dist/assets');

  // 检查 stats.html 文件是否存在
  if (!fs.existsSync(statsFile)) {
    console.error('Error: stats.html file not found at:', statsFile);
    console.log('Try running: yarn build:analyze');
    process.exit(1);
  }

  // 检查 dist/assets 目录是否存在
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist/assets directory not found at:', distDir);
    process.exit(1);
  }

  // 读取并分析打包后的文件
  const files = fs.readdirSync(distDir);

  const chunks = files
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const filePath = path.join(distDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        sizeInMB: (stats.size / (1024 * 1024)).toFixed(2)
      };
    })
    .sort((a, b) => b.size - a.size);

  if (chunks.length === 0) {
    console.log('No JavaScript chunks found in:', distDir);
    return;
  }

  console.log('\nChunk Analysis:');
  console.log('---------------');
  chunks.forEach(chunk => {
    console.log(`${chunk.name}: ${chunk.sizeInMB}MB`);
  });

  // 输出大型chunks警告（超过500KB的文件）
  const largeChunks = chunks.filter(chunk => chunk.size > 500 * 1024);
  if (largeChunks.length > 0) {
    console.log('\nWarning: Large chunks detected:');
    largeChunks.forEach(chunk => {
      console.log(`${chunk.name} is ${chunk.sizeInMB}MB - Consider splitting this chunk`);
    });
  }

  console.log('\nVisualization file generated at:', statsFile);
}

analyzeChunks();