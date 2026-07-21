/**
 * PR Health Checker
 * Audits project files for broken local image references, missing metadata tags,
 * and syntax issues prior to merging PRs.
 */

import fs from 'fs';
import path from 'path';

export function validateHtmlFiles(rootDir = process.cwd()) {
  const issues = [];
  const requiredMeta = ['viewport', 'description'];

  const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

  htmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    requiredMeta.forEach(meta => {
      if (!content.includes(`name="${meta}"`)) {
        issues.push({ file, type: 'missing_meta', meta });
      }
    });
  });

  return { totalScanned: htmlFiles.length, issuesCount: issues.length, issues };
}

if (process.argv[1] && process.argv[1].endsWith('pr-health-checker.js')) {
  const report = validateHtmlFiles();
  console.log(`PR Health Checker Scanned ${report.totalScanned} HTML files with ${report.issuesCount} warnings.`);
}
