import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // 1. Go to login
  console.log('=== 1. Login page ===');
  await page.goto('https://giong-vn-v6.vercel.app/login', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'screenshots/01-login.png' });
  console.log('URL:', page.url());

  // 2. Check if Google Sign-In button exists
  const googleBtn = await page.$('button:has-text("Google"), a:has-text("Google"), [data-provider="google"]');
  if (googleBtn) {
    console.log('Google Sign-In button found ✅');
  } else {
    console.log('No Google button found. Looking for email/password form...');
    const emailInput = await page.$('input[type="email"], input[name="email"]');
    const passwordInput = await page.$('input[type="password"], input[name="password"]');
    console.log('Email input:', !!emailInput, 'Password input:', !!passwordInput);
  }

  // 3. Try navigating to attendance without login
  console.log('\n=== 2. Navigate to chấm công ===');
  await page.goto('https://giong-vn-v6.vercel.app/cham-cong', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(12000); // Wait for Neon hydration
  await page.screenshot({ path: 'screenshots/02-cham-cong.png' });
  
  // Check table
  const rows = await page.$$('tr');
  console.log('Table rows:', rows.length);
  
  // Check for seed data indicators
  const pageText = await page.textContent('body');
  const hasNoData = pageText.includes('Chưa có') || pageText.includes('không có');
  console.log('Shows "no data":', hasNoData);
  
  // Check for attendance data indicators
  const hasNames = pageText.includes('Phạm') || pageText.includes('Nguyễn') || pageText.includes('Trần');
  console.log('Has employee names:', hasNames);
  
  // Check for any numeric data
  const numbers = pageText.match(/\d{1,2}\/\d{1,2}\/\d{4}/g) || [];
  console.log('Dates found:', numbers.length);
  console.log('Sample dates:', numbers.slice(0, 3));

  // 4. Check console
  console.log('\n=== Console errors ===');
  if (errors.length === 0) {
    console.log('No errors ✅');
  } else {
    errors.forEach(e => console.log('⚠️', e));
  }

  await browser.close();
})();
