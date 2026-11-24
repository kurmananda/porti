# Porti — ceramic artist portfolio

A Next.js portfolio with all editable portfolio content, artist details, exhibitions, and contact messages stored in Supabase.

## Run it

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

## Admin

Set the admin password in `.env.local`, then restart the server:

```
ADMIN_PASSWORD=choose-a-long-password
```

In the admin you can create series (name, years, description), add works to a series (image link, name, description), edit, reorder and delete them. "Site details" edits the artist profile, education, press, process steps, contact details, and social accounts. The "Exhibitions" editor stores exhibition entries in Supabase. Contact messages are stored in Supabase and shown in Admin. Images and the CV remain static files in `public/`, as requested.

## Supabase setup

All app-managed records use the server-only Supabase REST API. To initialize a new project:

1. In Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).
2. Then run [`supabase/seed.sql`](./supabase/seed.sql) to load the initial series, artwork records, artist details, and exhibitions.
3. Set these server environment variables in `.env.local` for local development and in the deployment environment:

   ```dotenv
   SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   SUPABASE_SECRET_KEY=YOUR_ROTATED_SECRET_KEY
   ADMIN_PASSWORD=choose-a-long-password
   ```

4. Restart the app. The publishable key is not used by the server integration. Keep the secret key server-side; do not prefix it with `NEXT_PUBLIC_` or expose it in browser code. If using a legacy service-role key, `SUPABASE_SERVICE_ROLE_KEY` is also accepted. The admin password is an environment secret, not portfolio content.

When moving to another Supabase account, run `schema.sql` in the new project, then export/import the tables from the old project: `series`, `works`, `site_settings`, `exhibitions`, and `contact_messages`. Import `series` before `works` to preserve the foreign key. Do not run `seed.sql` when migrating existing rows; it is only for a fresh database. After importing exhibitions and contact messages, reset their generated IDs:

```sql
select setval(pg_get_serial_sequence('public.exhibitions', 'id'), coalesce(max(id), 1), max(id) is not null) from public.exhibitions;
select setval(pg_get_serial_sequence('public.contact_messages', 'id'), coalesce(max(id), 1), max(id) is not null) from public.contact_messages;
```

Update `SUPABASE_URL` and `SUPABASE_SECRET_KEY` to the new project's values after import, then restart/redeploy.

The site shows a classic loading indicator while its Supabase-backed route content is fetched. Database failures are surfaced rather than replaced with local JSON defaults.

## Where things live

- `src/lib/store.js` — Supabase-only reads and writes for series, works, artist settings, and contact messages.
- `supabase/schema.sql` — tables, row-level security, and restricted server RPCs.
- `supabase/seed.sql` — initial content for a new, empty Supabase project.
- `public/placeholders/` — sample photographs (public-domain museum images from Wikimedia Commons). Replace them with the artist's own work.
