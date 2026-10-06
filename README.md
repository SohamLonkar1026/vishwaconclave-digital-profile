# VishwaConclave — Digital Profile

A single-page digital profile for **VishwaConclave**, India's first truly multidisciplinary, student-centric conclave organized by the students of VIT, Pune.

Themed on the club's logo: black and gold with the cosmic blue of the *Ṛitambhara — The Rhythm of the Cosmos* edition.

## Sections
Hero · Stats · About · Ritambhara edition · Editions timeline · Speakers · Team · Connect (Instagram, LinkedIn, Website, Threads, Linktree, Venue)

Features: Save Contact (.vcf), Share, animated starfield, fully responsive, no build step.

## Run
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
Deploy as-is to GitHub Pages, Vercel or Netlify (static site).

## Editing content
- Text and links: `index.html`
- Colors and fonts: CSS variables at the top of `style.css`
- Contact card fields: `PROFILE` object in `script.js`
- Add an official email or phone: add `EMAIL:` / `TEL:` lines in `script.js` and a link card in `index.html`
