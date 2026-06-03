import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('src/pages');
const publicDir = path.resolve('public');
const indexHtmlPath = path.resolve('index.html');
const vercelJsonPath = path.resolve('vercel.json');

const filesToAudit = [
  { name: 'Home.jsx', path: path.join(pagesDir, 'Home.jsx'), type: 'page', route: '/' },
  { name: 'About.jsx', path: path.join(pagesDir, 'About.jsx'), type: 'page', route: '/about' },
  { name: 'Scholarships.jsx', path: path.join(pagesDir, 'Scholarships.jsx'), type: 'page', route: '/scholarships' },
  { name: 'Impact.jsx', path: path.join(pagesDir, 'Impact.jsx'), type: 'page', route: '/impact' },
  { name: 'Contact.jsx', path: path.join(pagesDir, 'Contact.jsx'), type: 'page', route: '/contact' },
  { name: 'AdminLogin.jsx', path: path.join(pagesDir, 'AdminLogin.jsx'), type: 'admin', route: '/admin/login' },
  { name: 'AdminDashboard.jsx', path: path.join(pagesDir, 'AdminDashboard.jsx'), type: 'admin', route: '/admin' },
  { name: 'NotFound.jsx', path: path.join(pagesDir, 'NotFound.jsx'), type: 'error', route: '*' }
];

console.log('----------------------------------------------------');
console.log('       GLOBAL EDUCATION GUIDE - SEO AUDIT REPORT     ');
console.log('----------------------------------------------------');

let errors = 0;
let warnings = 0;
let passed = 0;

const report = [];

// 1. Audit robots.txt
const robotsPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const content = fs.readFileSync(robotsPath, 'utf8');
  if (content.includes('User-agent: *') && content.includes('Sitemap:')) {
    report.push('✅ public/robots.txt: Present & Valid');
    passed++;
  } else {
    report.push('⚠️ public/robots.txt: Present but incomplete/custom');
    warnings++;
  }
} else {
  report.push('❌ public/robots.txt: MISSING');
  errors++;
}

// 2. Audit sitemap.xml
const sitemapPath = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  if (content.includes('<urlset') && content.includes('https://www.globaleducationguide.in/')) {
    report.push('✅ public/sitemap.xml: Present & Valid');
    passed++;
  } else {
    report.push('⚠️ public/sitemap.xml: Present but potentially invalid sitemap format');
    warnings++;
  }
} else {
  report.push('❌ public/sitemap.xml: MISSING');
  errors++;
}

// 3. Audit vercel.json
if (fs.existsSync(vercelJsonPath)) {
  const config = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
  if (config.rewrites && config.rewrites.some(r => r.source === '/(.*)' && r.destination === '/index.html')) {
    report.push('✅ vercel.json: Configured correctly for React Router SPA (destination: /index.html)');
    passed++;
  } else {
    report.push('⚠️ vercel.json: Rewrites found but target destination differs');
    warnings++;
  }
} else {
  report.push('❌ vercel.json: MISSING');
  errors++;
}

// 4. Audit index.html
if (fs.existsSync(indexHtmlPath)) {
  const content = fs.readFileSync(indexHtmlPath, 'utf8');
  if (content.includes('<meta name="description"') && content.includes('<link rel="canonical"')) {
    report.push('✅ index.html: Default meta description and canonical link present');
    passed++;
  } else {
    report.push('⚠️ index.html: Fallback description or canonical missing');
    warnings++;
  }
}

// 5. Audit Pages React Components
filesToAudit.forEach(file => {
  if (!fs.existsSync(file.path)) {
    report.push(`❌ File missing: ${file.name}`);
    errors++;
    return;
  }

  const content = fs.readFileSync(file.path, 'utf8');
  const pageReport = [];

  // Check Helmet import & presence
  const hasHelmet = content.includes('Helmet');
  if (hasHelmet) {
    pageReport.push('  - Helmet Integration: OK');
    passed++;
  } else {
    pageReport.push('  - Helmet Integration: MISSING');
    errors++;
  }

  // Check Title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    pageReport.push(`  - Title: "${titleMatch[1]}"`);
    passed++;
  } else {
    pageReport.push('  - Title: MISSING');
    errors++;
  }

  // Check Description
  const descMatch = content.match(/name="description"\s+content="([^"]+)"/);
  if (descMatch) {
    pageReport.push(`  - Description: "${descMatch[1]}"`);
    passed++;
  } else if (file.type === 'page') {
    pageReport.push('  - Description: MISSING');
    errors++;
  }

  // Check Canonical
  const canonicalMatch = content.match(/rel="canonical"\s+href="([^"]+)"/);
  if (canonicalMatch) {
    pageReport.push(`  - Canonical: ${canonicalMatch[1]}`);
    passed++;
  } else if (file.type === 'page') {
    pageReport.push('  - Canonical URL: MISSING');
    errors++;
  }

  // Check robots noindex on admin/error pages
  if (file.type === 'admin' || file.type === 'error') {
    const robotsNoIndex = content.includes('name="robots"') && content.includes('noindex, nofollow');
    if (robotsNoIndex) {
      pageReport.push('  - Robots Directive: noindex, nofollow (Correct for private/404 page)');
      passed++;
    } else {
      pageReport.push('  - Robots Directive: MISSING noindex (Search engine might index private routes!)');
      warnings++;
    }
  }

  // Check Open Graph / Twitter Tags (for public pages)
  if (file.type === 'page') {
    const hasOG = content.includes('property="og:title"') && content.includes('property="og:description"');
    const hasTwitter = content.includes('property="twitter:title"') || content.includes('property="twitter:image"') || content.includes('name="twitter:title"');
    if (hasOG && hasTwitter) {
      pageReport.push('  - Social OG & Twitter Cards: Configured');
      passed++;
    } else {
      pageReport.push('  - Social OG & Twitter Cards: MISSING tags');
      warnings++;
    }
  }

  // Check Schema.org JSON-LD (Home page requirement)
  if (file.name === 'Home.jsx') {
    const hasSchema = content.includes('EducationalOrganization');
    if (hasSchema) {
      pageReport.push('  - Structured Data (Schema JSON-LD): EducationalOrganization Present');
      passed++;
    } else {
      pageReport.push('  - Structured Data (Schema JSON-LD): MISSING');
      errors++;
    }
  }

  // Check Images alt text & lazy loading
  const imgRegex = /<img\s+([^>]+)>/g;
  let imgMatch;
  let totalImages = 0;
  let missingAlt = 0;
  let lazyLoaded = 0;

  while ((imgMatch = imgRegex.exec(content)) !== null) {
    totalImages++;
    const attributes = imgMatch[1];
    if (!attributes.includes('alt=')) {
      missingAlt++;
    }
    if (attributes.includes('loading="lazy"')) {
      lazyLoaded++;
    }
  }

  if (totalImages > 0) {
    pageReport.push(`  - Images: Found ${totalImages} total. Missing Alt: ${missingAlt}, Lazy Loaded: ${lazyLoaded}`);
    if (missingAlt > 0) {
      errors += missingAlt;
    } else {
      passed++;
    }
  }

  report.push(`\n📄 Page: ${file.name} (Route: ${file.route})`);
  report.push(...pageReport);
});

console.log(report.join('\n'));

console.log('\n----------------------------------------------------');
console.log('                    AUDIT SUMMARY                    ');
console.log('----------------------------------------------------');
console.log(`Passed Checks: ${passed}`);
console.log(`Warnings: ${warnings}`);
console.log(`Errors/Failures: ${errors}`);

// Compute Lighthouse simulated SEO Score
const totalChecks = passed + warnings + errors;
const rawScore = totalChecks > 0 ? (passed / totalChecks) * 100 : 0;
// Make it realistic Lighthouse scale
const score = Math.round(rawScore);

console.log(`Simulated Lighthouse SEO Score: ${score}/100`);
if (score === 100) {
  console.log('🎉 PERFECT SEO SCORE! Excellent work!');
} else if (score >= 90) {
  console.log('👍 Great score, minor improvements could be made.');
} else {
  console.log('⚠️ Requires SEO attention to prevent search index penalties.');
}
console.log('----------------------------------------------------');
