---
title: "AIUB Companion"
tagline: "Offline-First Desktop Companion for AIUB Students"
description: "A lightweight desktop application built with Wails v3 (Go + React 19) that synchronizes university notices, parses class routines from Excel spreadsheets, and caches academic calendars with offline persistence."
featured: true
order: 1
category: "Desktop & Systems"
role: "Creator & Lead Developer"
period: "2024 - Present"
stack:
  - "Go 1.27"
  - "Wails v3 (Beta)"
  - "React 19"
  - "TypeScript"
  - "Tailwind CSS v4"
  - "SQLite (modernc)"
  - "SQLC"
  - "excelize"
  - "go-edlib"
  - "TanStack Query v5"
  - "Zustand"
  - "Vite 7"
  - "shadcn/ui"
githubUrl: "https://github.com/AtifChy/aiub-companion"
stats:
  "Runtime": "Wails v3 (Go + Webview)"
  "Database": "Pure Go SQLite (no CGO)"
  "Search": "Jaro-Winkler Fuzzy Matching"
  "UI Stack": "React 19 + Tailwind v4"
keyHighlights:
  - "Syncs official AIUB notices in the background with local caching and desktop notifications on new publications."
  - "Features typo-tolerant fuzzy search for notices using Jaro-Winkler similarity via go-edlib."
  - "Parses semester course offering Excel spreadsheets with excelize to generate weekly timetables with 'Ongoing' and 'Up Next' indicators."
  - "Uses pure Go SQLite driver (modernc.org/sqlite) with SQLC type-safe code generation, eliminating CGO build dependencies."
  - "Includes system tray minimization, single-instance execution locks, configurable start-on-boot, and auto-updater from GitHub Releases."
architectureDecisions:
  - decision: "Pure Go SQLite (modernc.org/sqlite) with SQLC"
    rationale: "Eliminates CGO dependencies, enabling painless cross-compilation across Windows, Linux, and macOS while generating compile-time type-safe Go queries."
  - decision: "Wails v3 over Heavy Chromium Wrappers"
    rationale: "Leverages native OS webview and Go's concurrency primitives, keeping the memory footprint under 40MB."
  - decision: "Excelize for Routine Ingestion"
    rationale: "Allows students to drag-and-drop the university's raw VUE portal course offering Excel files directly for instant schedule visualization and search."
---

## Overview

**AIUB Companion** is a cross-platform desktop application designed for students of American International University-Bangladesh (AIUB). It centralizes university announcements, routine scheduling, and academic calendars into a single, offline-capable application that runs quietly in the system tray.

```
┌─────────────────────────────────────────────────────────────┐
│                    AIUB Companion Engine                    │
├──────────────────────────────┬──────────────────────────────┤
│    Frontend (React 19 / TS)  │      Backend (Go 1.27)       │
│   • Vite 7 + Tailwind v4     │   • Wails v3 IPC Bridge      │
│   • TanStack Query v5        │   • modernc.org/sqlite (No CGO)
│   • Zustand State Store      │   • SQLC Type-Safe Queries   │
│   • shadcn/ui & Radix        │   • excelize Excel Parser    │
│   • React Router v8          │   • go-edlib (Jaro-Winkler)  │
│   • Sonner & Motion          │   • goquery & bluemonday     │
└──────────────────────────────┴──────────────────────────────┘
```

## Core Features

### 📢 University Notices & Attachments
- **Automatic Background Sync**: Periodically fetches notices from the AIUB portal with configurable sync intervals.
- **Jaro-Winkler Fuzzy Search**: Tolerates typos and misspellings when searching archived notices.
- **Attachment Viewer**: Directly previews and downloads attached PDF documents and image files.
- **Read State & Pinning**: Pin crucial circulars and track unread notices with visual badges.
- **Desktop Notifications**: Dispatches native desktop alerts when new notices are published.

### 📅 Class Routine & Timetable
- **Excel Spreadsheet Import**: Ingests official course offering spreadsheets using `excelize`.
- **Granular Course Search**: Search courses by course name, course code, section, faculty initial, or academic department.
- **Live Timetable Grid**: Interactive weekly schedule with real-time **"Ongoing"** and **"Up Next"** lecture indicators.

### 📆 Academic Calendar & Utilities
- Scrapes and caches the official AIUB academic calendar so key semester dates, drop deadlines, and exams are accessible offline.

### ⚙️ System Integration & Background Tray
- **System Tray Minimization**: Sits quietly in the notification area without cluttering the taskbar.
- **Single-Instance Lock**: Prevents multiple processes from running; reopening focuses the active window.
- **GitHub Releases Auto-Updater**: Checks for binary updates on customizable schedules (daily, weekly, monthly, or manual).
- **Light & Dark Themes**: Customizable color themes with Tailwind CSS v4 and shadcn/ui.

## Technical Architecture

```text
aiub-companion/
├── build/                   # Platform manifests, NSIS installer scripts, icons
├── frontend/
│   └── src/
│       ├── components/      # Notices, routine, settings, sidebar
│       ├── hooks/           # TanStack queries, stores, debounce hooks
│       ├── lib/             # Routing, utilities
│       └── pages/           # Notices, Routine, Semester, Settings, About
├── internal/
│   ├── calendar/            # Academic calendar scraper and cache
│   ├── config/              # JSON config with schema validation
│   ├── database/            # SQLite connection, SQLC queries
│   ├── desktop/             # Single-instance lock, system tray, window management
│   ├── fetcher/             # Shared HTTP client helpers
│   ├── notice/              # Notice scraper, repository, fuzzy search
│   ├── routine/             # Excel importer and search engine
│   ├── search/              # Generic Jaro-Winkler fuzzy search
│   ├── updater/             # Auto-updater via GitHub Releases
│   └── worker/              # Background sync scheduler and notification dispatch
├── main.go                  # Service wiring and Wails application lifecycle
└── sqlc.yaml                # SQLC code generation configuration
```
