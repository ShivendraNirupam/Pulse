<div align="center">

# 🎙️ Pulse

### AI-Powered Voice Lab — Record, Manage & Transcribe Audio with Intelligence


*[Live ](https://pulse-seven-beryl.vercel.app)https://pulse-seven-beryl.vercel.app*

</div>

---

## 📌 Overview

**Pulse** is a full-stack AI-powered voice laboratory that lets users record audio directly in the browser, upload audio files, manage a personal audio library, and leverage AI for transcription and analysis with inbuilt voice actions available. Built with a production-grade modern stack — tRPC for end-to-end type safety, Prisma ORM with PostgreSQL for persistence, Cloudflare r2 for scalable audio storage, and Clerk for frictionless authentication.

> **Why Pulse?** Voice is the most natural form of human expression. Pulse bridges the gap between raw audio and structured, searchable knowledge — making voice a first-class data type.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎤 **In-Browser Recording** | Record audio directly using `RecordRTC` with live waveform visualization via `WaveSurfer.js` |
| 📁 **File Upload** | Drag-and-drop audio file uploads (up to 20MB) using `react-dropzone` |
| ☁️ **Cloud Storage** | Audio files stored securely in cloudflare r2 with pre-signed URL access |
| 🔒 **Authentication** | Secure, production-ready auth via Clerk (social logins + email) |
| 🗄️ **Audio Library** | Persistent user audio library with metadata stored in PostgreSQL via Prisma |
| 🎨 **Animated Visualizer** | Simplex-noise-powered animated audio visualizer for an immersive recording experience |
| 🌍 **Multi-language Support** | Locale-aware features using `locale-codes` |
| 🔍 **Search & Filter** | Client-side search and URL-synced state via `nuqs` |
| 🌙 **Dark / Light Mode** | Full theme support via `next-themes` |
| 📡 **Type-Safe API** | End-to-end type safety with tRPC + TanStack Query |
| 📱 **Responsive UI** | Mobile-first design with Tailwind CSS v4 + shadcn/ui + Radix UI |

---

## 🏗️ Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                               │
│                                                                         │
│  ┌─────────────┐   ┌──────────────────┐   ┌────────────────────────┐  │
│  │  Next.js    │   │  RecordRTC       │   │   WaveSurfer.js        │  │
│  │  App Router │   │  (Audio Capture) │   │   (Waveform Render)    │  │
│  └──────┬──────┘   └────────┬─────────┘   └───────────┬────────────┘  │
│         │                   │                          │               │
│  ┌──────▼───────────────────▼──────────────────────────▼────────────┐  │
│  │              TanStack Query + tRPC Client                        │  │
│  │         (Type-safe data fetching, caching, mutations)            │  │
│  └──────────────────────────┬───────────────────────────────────────┘  │
└─────────────────────────────│───────────────────────────────────────────┘
                              │ HTTPS / tRPC
┌─────────────────────────────▼───────────────────────────────────────────┐
│                       SERVER (Next.js API Routes)                       │
│                                                                         │
│  ┌───────────────────┐    ┌──────────────────────────────────────────┐  │
│  │   Clerk Auth      │    │           tRPC Router                    │  │
│  │  (Middleware +    │───▶│  - audio.upload (presigned URL gen)      │  │
│  │   Session Guard)  │    │  - audio.list   (user audio library)     │  │
│  └───────────────────┘    │  - audio.delete (S3 + DB cleanup)        │  │
│                           │  - audio.get    (single audio record)    │  │
│                           └──────────────┬───────────────────────────┘  │
│                                          │                              │
│  ┌─────────────────────────────────────┐ │ ┌─────────────────────────┐  │
│  │           Prisma ORM                │◀┘ │     AWS SDK v3          │  │
│  │   (Type-safe DB queries)            │   │  (S3 Client +           │  │
│  └──────────────┬──────────────────────┘   │   Pre-signed URLs)      │  │
│                 │                          └────────────┬────────────┘  │
└─────────────────│───────────────────────────────────────│───────────────┘
                  │                                       │
     ┌────────────▼──────────────┐           ┌───────────▼───────────────┐
     │     PostgreSQL (pg)       │           │       AWS S3 Bucket       │
     │  - Users (via Clerk sync) │           │  - Raw audio files (.wav  │
     │  - AudioRecordings        │           │    .mp3, .m4a, etc.)      │
     │  - Metadata (title,       │           │  - Secure pre-signed URL  │
     │    duration, locale,      │           │    access per request     │
     │    s3Key, createdAt)      │           └───────────────────────────┘
     └───────────────────────────┘
```

### Data Flow: Audio Upload

```
User records / selects file
         │
         ▼
  Client requests pre-signed S3 URL
  (tRPC mutation → Next.js API)
         │
         ▼
  Server validates session (Clerk)
  + generates pre-signed PUT URL (AWS SDK)
         │
         ▼
  Client uploads audio DIRECTLY to S3
  (bypasses server — reduces latency & cost)
         │
         ▼
  Client confirms upload to server
  (tRPC mutation with S3 key + metadata)
         │
         ▼
  Server writes record to PostgreSQL via Prisma
  (s3Key, title, duration, userId, locale, ...)
         │
         ▼
  UI invalidates query cache → library updates
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Role |
|---|---|
| **Next.js 16** (App Router) | Full-stack React framework with SSR/RSC |
| **React 19** | UI rendering with latest concurrent features |
| **TypeScript** | Static typing across the entire codebase |
| **Tailwind CSS v4** | Utility-first styling with PostCSS pipeline |
| **shadcn/ui + Radix UI** | Accessible, composable component primitives |
| **Chatterbox AI** | AI-powered voice generation, speech synthesis, and conversational audio processing |
| **Modal** | Serverless GPU hosting and inference infrastructure for deploying AI models |
| **WaveSurfer.js** | Audio waveform rendering and playback control |
| **RecordRTC** | Cross-browser audio/video recording |
| **Simplex Noise** | Generative animated audio visualizer |
| **TanStack Query v5** | Server state management, caching, optimistic updates |
| **TanStack Form** | Form state management and validation |
| **nuqs** | Type-safe URL search parameter state |
| **next-themes** | Dark/light theme switching |
| **react-dropzone** | File drag-and-drop upload UX |


### Backend / API
| Technology | Role |
|---|---|
| **tRPC v11** | End-to-end type-safe API layer (no REST/GraphQL boilerplate) |
| **Next.js API Routes** | Server-side tRPC handler |
| **Zod v4** | Runtime schema validation for all inputs |
| **SuperJSON** | Serialization of complex types (Date, Map, etc.) over tRPC |

### Database & Storage
| Technology | Role |
|---|---|
| **PostgreSQL** | Primary relational database |
| **Prisma ORM v7** | Type-safe database client, migrations, schema management |
| `@prisma/adapter-pg` | Native `pg` driver adapter for Prisma |
| **AWS S3(cloudflare r2)** (`@aws-sdk/client-s3`) | Object storage for audio files |
| `@aws-sdk/s3-request-presigner` | Secure pre-signed URL generation for direct client uploads |

### Auth & Security
| Technology | Role |
|---|---|
| **Clerk** (`@clerk/nextjs`) | Authentication, session management, user management |

### Developer Tooling
| Technology | Role |
|---|---|
| `openapi-typescript` + `openapi-fetch` | Auto-generated types from OpenAPI specs (AI/external APIs) |
| `tsx` | TypeScript script runner (used in `sync-api` script) |
| **ESLint** (Next.js config) | Code quality and linting |
| `@t3-oss/env-nextjs` | Type-safe environment variable validation at build time |
| `music-metadata` | Audio file duration and metadata extraction |

### Infrastructure
| Technology | Role |
|---|---|
| **Vercel** | Hosting, CI/CD, edge deployment |
| **AWS S3(cloudflare r2)** | Audio blob storage |
| **PostgreSQL** (cloud provider) | Persistent relational data |

---


## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL database (local or cloud, e.g. Supabase / Neon)
- AWS account with an S3 bucket
- Clerk account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ShivendraNirupam/Pulse.git
cd Pulse

# 2. Install dependencies (runs `prisma generate` automatically via postinstall)
npm install

# 3. Configure environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/pulse"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET_NAME=pulse-audio

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

```bash
# Push schema to your database
npx prisma db push

# (Optional) Open Prisma Studio to inspect data
npx prisma studio
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Sync External API Types

```bash
# Regenerates TypeScript types from OpenAPI spec
npm run sync-api
```

---


## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is private. All rights reserved © Shivendra Nirupam.

---

<div align="center">

Built with ❤️ by [Shivendra Nirupam](https://github.com/ShivendraNirupam)

</div>
