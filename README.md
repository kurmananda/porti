# Porti — ceramic artist portfolio

A Next.js portfolio with works grouped into series, and a small admin portal for adding them.

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

In the admin you can create series (name, years, description), add works to a series (image link, name, description), edit, reorder and delete them. "Site details" edits the artist name, portrait photo, profile, exhibitions, education, press, collections, email and social accounts. The CV buttons link to `public/cv.pdf`. Image links can be any `https://` URL, or a path to a file in `public/` such as `/placeholders/char.jpg`.

## Where things live

- `src/lib/site.js` — default artist details (overridden by whatever is saved under "Site details" in the admin), plus the "how a piece is made" steps, studio facts and marquee words.
- `data/portfolio.json` — every series and work. The admin writes to this file, so the site needs a host with a persistent disk (a VPS or similar). On serverless hosts such as Vercel, swap `src/lib/store.js` for a database.
- `public/placeholders/` — sample photographs (public-domain museum images from Wikimedia Commons). Replace them with the artist's own work.
