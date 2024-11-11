import fs from "fs";
import path from "path";
import prettyBytes from "pretty-bytes";
import chalk from "chalk";
import { fileURLToPath } from "url";
import process from "process";

// 获取 __dirname 的 ES modules 替代方案
const __filename = fileURLToPath(import.meta.url);
path.dirname(__filename);
function formatStats() {
  try {
    const statsPath = path.join(process.cwd(), 'stats.json');
    const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));

    // 按大小排序的模块
    const sortedModules = stats.modules
      .sort((a, b) => b.size - a.size)
      .map(module => ({
        name: module.name.replace(process.cwd(), ''),
        size: prettyBytes(module.size),
        gzipSize: module.gzipSize ? prettyBytes(module.gzipSize) : 'N/A'
      }));

    console.log(chalk.bold('\nBundle Size Analysis:\n'));

    // 打印总体统计
    console.log(chalk.blue('Total Size:'), prettyBytes(stats.size));
    if (stats.gzipSize) {
      console.log(chalk.blue('Gzipped Size:'), prettyBytes(stats.gzipSize));
    }

    console.log(chalk.yellow('\nLargest Modules:'));
    sortedModules.slice(0, 10).forEach(module => {
      console.log(`${chalk.green(module.size.padEnd(10))} ${module.name}`);
    });

    // 按类型分组统计
    const typeStats = {};
    sortedModules.forEach(module => {
      const ext = path.extname(module.name) || 'unknown';
      if (!typeStats[ext]) {
        typeStats[ext] = {
          count: 0,
          size: 0
        };
      }
      typeStats[ext].count++;
      typeStats[ext].size += parseInt(module.size);
    });

    console.log(chalk.yellow('\nFile Types:'));
    Object.entries(typeStats)
      .sort((a, b) => b[1].size - a[1].size)
      .forEach(([type, stats]) => {
        console.log(
          `${type.padEnd(10)} ${String(stats.count).padEnd(5)} files ${prettyBytes(
            stats.size
          )}`
        );
      });

  } catch (error) {
    console.error('Error reading stats file:', error);
    process.exit(1);
  }
}

formatStats();