import { chromium } from 'playwright';

const BASE = 'https://giong-vn-v6.vercel.app';
const SCREENSHOT_DIR = './screenshots';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // Collect console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  console.log('=== 1. Login page ===');
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: `${SCREENSHOT_DIR}/01-login.png`, fullPage: true });
  console.log('Screenshot: 01-login.png');

  // Try login with email/password
  console.log('=== 2. Login with email ===');
  await page.fill('input[type="email"]', 'cuongpk.giong04@gmail.com');
  await page.fill('input[type="password"]', 'Admin123!');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/02-after-login.png`, fullPage: true });
  console.log('URL after login:', page.url());
  console.log('Screenshot: 02-after-login.png');

  // Navigate to chấm công
  console.log('=== 3. Chấm công page ===');
  await page.goto(`${BASE}/cham-cong`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/03-cham-cong.png`, fullPage: true });
  console.log('Screenshot: 03-cham-cong.png');

  // Check if attendance data loaded (from Neon)
  const attendanceRows = await page.$$('table tbody tr');
  console.log(`Attendance rows visible: ${attendanceRows.length}`);

  // Navigate to nhiệm vụ
  console.log('=== 4. Nhiệm vụ page ===');
  await page.goto(`${BASE}/nhiem-vu`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/04-nhiem-vu.png`, fullPage: true });
  console.log('Screenshot: 04-nhiem-vu.png');

  // Check if tasks loaded
  const taskCards = await page.$$('article');
  console.log(`Task cards visible: ${taskCards.length}`);

  // Navigate to quỹ
  console.log('=== 5. Quỹ page ===');
  await page.goto(`${BASE}/quy`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/05-quy.png`, fullPage: true });
  console.log('Screenshot: 05-quy.png');

  // Navigate to check-in
  console.log('=== 6. Check-in page ===');
  await page.goto(`${BASE}/check-in`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/06-check-in.png`, fullPage: true });
  console.log('Screenshot: 06-check-in.png');

  console.log('\n=== Console errors ===');
  if (errors.length === 0) {
    console.log('No console errors! ✅');
  } else {
    errors.forEach(e => console.log('ERROR:', e));
  }

  await browser.close();
  console.log('\n=== Done ===');
}

main().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
