/**
 * Heroku Scheduler helper: POST to a cron route with CRON_SECRET.
 * Usage: node scripts/cron-trigger.mjs https://your-app.vercel.app/api/cron/example
 */
const target = process.argv[2];
const secret = process.env.CRON_SECRET ?? process.env.LOVABLE_CRON_SECRET;

if (!target || !secret) {
  console.error("Usage: CRON_SECRET=... node scripts/cron-trigger.mjs <url>");
  process.exit(1);
}

const res = await fetch(target, {
  method: "POST",
  headers: { Authorization: `Bearer ${secret}` },
});
console.log(res.status, await res.text());
