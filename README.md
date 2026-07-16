# HireSmart

**A trust-first labor hiring marketplace connecting blue-collar workers with employers.**

HireSmart digitizes the informal labor market — electricians, painters, daily-wage workers, contractors — by replacing word-of-mouth hiring with verified profiles, smart matching, integrated payments, and a reputation system both sides can trust.

---

## 📌 Problem Statement

The informal labor market is one of the largest employment segments in India, yet it remains almost entirely undigitized.

- **Employers** rely on unorganized contractors or word-of-mouth referrals, with no way to verify a worker's skill or reliability before hiring.
- **Workers** lose income to middlemen and have no portable digital reputation — every job starts from zero trust.
- **Neither side** has a structured way to match quickly, transact safely, or build a track record over time.

HireSmart closes this gap by bringing the same verified, on-demand marketplace model proven in adjacent industries (ride-hailing, food delivery, freelance platforms) to blue-collar hiring.

---

## ✨ Core Features

- **Verified Worker Profiles** — skill-tagged profiles workers can carry across jobs
- **Smart Matching** — matches employers to workers based on skill, location, and rating
- **Integrated Payments** — hire-to-pay flow handled directly within the platform
- **Ratings & Trust Layer** — post-job ratings feed back into future matching, building accountability on both sides

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React | Handles dynamic, real-time UI state — live listings, filters, profile updates |
| Backend | Node.js + Express | Lightweight, unopinionated control over routing/middleware; clean separation of routes, controllers, and services |
| Database | PostgreSQL | Data is inherently relational (workers, jobs, applications, ratings); strong consistency guarantees prevent duplicate applications or rating manipulation |
| Payments | Integrated payment service | Enables a complete hire-to-pay loop within the platform |

---

## 🏗️ Architecture & Methodology

Built iteratively to validate each layer before adding complexity:

1. **Data model & core CRUD** — workers, jobs, applications, ratings
2. **Matching logic** — skill, location, and rating-based search
3. **Payment integration** — direct transaction flow, isolated as its own service layer
4. **Rating system** — feedback loop into future matches

The payment flow was kept as a distinct, well-tested service separate from matching and profile logic, so a failure in one layer doesn't cascade into the rest of the system.

---

## ⚠️ Current Limitations

- No escrow/hold-release mechanism — payments are direct rather than held until job confirmation
- No dispute-resolution workflow for contested jobs
- Matching is based on static skill tags and location rather than real-time availability or demand-based ranking

---

## 🚀 Future Enhancements

- [ ] Escrow-style hold-and-release payments (funds released only after job confirmation)
- [ ] Dispute-resolution and support workflow
- [ ] Real-time geolocation-based matching
- [ ] Fraud detection on the rating system

---

## 👤 Role

Sole developer — responsible for system design, database schema, backend APIs, frontend for both worker and employer flows, payment integration, and end-to-end testing of the full marketplace loop.

---

## 📈 Impact

- **Workers** gain a portable digital reputation and a reliable, integrated way to get paid — removing informal cash-handling delays.
- **Employers** get a single trusted flow: discover, verify, hire, and pay — without juggling separate verification and payment channels.
- Brings a large, underserved workforce into a more transparent and accountable market.

---

## 📄 License

MIT
