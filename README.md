
# Welth - AI Finance Platform

Welth is an AI-driven personal finance platform that helps users track, analyze, and optimize their money in one smart dashboard. It transforms raw financial data into clear, actionable insights so users can make better financial decisions every day.

By combining real-time tracking with intelligent analysis, Welth gives users a complete view of their financial life — from daily spending to long-term financial goals.

🌍 Live Website: https://welth.upendradev.com

##  ✨ Features

- Track income, expenses, and financial accounts
- AI-powered spending insights using Gemini
- Smart budgeting and savings recommendations
- Interactive charts and financial breakdowns
- Secure authentication with Clerk
- Real-time modern UI built with Next.js
- Transactional emails powered by Resend
- Background workflows and automation with Inngest

## 🛠️ Tech Stack

| Layer               | Technology                   |
| ------------------- | ---------------------------- |
| **Frontend**        | Next JS + TypeScript         |
| **UI Components**   | Shadcn UI + Tailwind CSS     |
| **Authentication**  | Clerk                        |
| **Security**        | ArcJet (Rate Limiting & Bot Protection)                        |
| **Database**        | Neon (Serverless PostgreSQL) |
| **ORM**             | Prisma                       |
| **Charts**          | Recharts                     |
| **AI Integration**  | Google Gemini API            |
| **Emails**          | Resend + React Email         |
| **Background Jobs** | Inngest                      |



## 📦 Installation

1️⃣ Clone the repository

```bash
git Clone https://github.com/UpendraSinghBhadouria/welth.git
cd welth
```
2️⃣ Install dependencies

```bash
npm install
```
3️⃣ Setup environment variables

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

DATABASE_URL=''

RESEND_API_KEY=
RESEND_FROM_EMAIL=

ARCJET_KEY=
GEMINI_API_KEY=

NEXT_PUBLIC_BASE_URL_DEV=http://localhost:3000
NEXT_PUBLIC_BASE_URL_PROD=
```
4️⃣ Prisma setup
```bash
npx prisma generate
npx prisma migrate dev
```

🚀 Running the App
```bash
npm run dev
```
🧩 Available Scripts
```bash
"scripts": {
  "dev": "next dev",
  "email:dev": "email dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "postinstall": "prisma generate"
}
```
## 🔒 Authentication & Security

Welth uses Clerk for secure user authentication and session management.

To protect APIs and prevent abuse, Arcjet provides:

`🚦 Rate limiting`

`🤖 Bot detection and blocking`

`🛡️ Automated abuse protection`

## 🔄 Background Processing

Inngest powers event-driven jobs such as:

- Recurring financial analysis
- AI insight generation
- Automated workflows


## 🌟 Vision

Welth is built to make financial intelligence accessible to everyone. Instead of just tracking money, users gain AI-driven clarity and guidance to actively improve their financial future.

