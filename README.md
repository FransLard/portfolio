# Frans Lampard - Portfolio (AppSec Focus)

Portfolio pribadi Frans Lampard, mahasiswa S1 Teknik Informatika yang fokus ke
Application Security: secure code review, pengujian OWASP Top 10, dan hardening
deployment Linux. Terbuka untuk posisi **magang / junior AppSec**.

- GitHub: https://github.com/FransLard
- LinkedIn: https://www.linkedin.com/in/frans-lampard/
- Live project: https://velardtools.my.id/

## Proyek

| Proyek | Deskripsi | Link |
|---|---|---|
| Velard Tools | Video toolkit browser-based, 100% local processing (live production) | https://velardtools.my.id/ · https://github.com/FransLard/VTOOLS |
| Phishing Detector | Klasifier ML (Random Forest, 30 fitur, ±96.7% akurasi) | https://github.com/FransLard/deteksi_link_phising |
| Password Tool | Cek kekuatan + generator password offline (CLI + GUI) | https://github.com/FransLard/password-tool |
| Booking Gedung | Reservasi gedung Laravel + Flutter, fokus access control | https://github.com/FransLard/booking-gedung |
| Web Scanner | Security scanner 4 mode: port, tech fingerprint, SQLi/XSS | https://github.com/FransLard/web_scanner |

## Tech Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Framer Motion · Lenis

## Cara Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output ke dist/
npm run lint
```

Semua konten (bio, proyek, kontak, pengalaman) terpusat di
`src/data/portfolioData.ts`. Screenshot proyek ada di `public/projects/`.

## Deploy

SPA murni Vite: siap deploy ke Vercel/Netlify tanpa config server.
Security headers dasar sudah diatur di `vercel.json`.

## Lisensi

Dirilis di bawah lisensi [MIT](LICENSE). Copyright (c) 2026 Frans Lampard.
