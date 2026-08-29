---
title: "AIUB Notice Fetcher"
tagline: "CLI Tool & Background Notification Service for AIUB Portal"
description: "A Go command-line tool and background service that monitors the official AIUB website for announcements, caches them locally, and sends native Windows toast notifications."
featured: false
order: 4
category: "Systems & DevTools"
role: "Creator & Author"
period: "2024 - Present"
stack:
  - "Go 1.25+"
  - "Windows API"
  - "CLI / TUI"
  - "GNU Make"
githubUrl: "https://github.com/AtifChy/aiub-notice"
stats:
  "Architecture": "CLI Daemon + TUI Viewer"
  "OS Support": "Windows 10/11"
  "Notification": "Native Windows Toast with AppID"
  "Build System": "Go + GNU Make"
keyHighlights:
  - "Periodically polls the AIUB portal for new circulars with custom check intervals (e.g. `--interval 30m`)."
  - "Caches fetched announcements locally and tracks seen items to eliminate duplicate notifications."
  - "Sends native Windows toast notifications with registered AppID branding and custom application icons."
  - "Includes an interactive terminal UI (TUI) list viewer (`aiub-notice list`) and quick display commands (`aiub-notice last`)."
  - "Manages Windows autostart on boot directly from the CLI (`aiub-notice autostart --enable/--disable`)."
---

## Overview

**AIUB Notice Fetcher** is a lightweight CLI utility and background daemon written in Go for students of AIUB. It automates notice monitoring so students never miss critical registration, exam, or administrative updates.

## CLI Commands

```text
$ aiub-notice.exe --help
AIUB Notice Notifier is a command-line tool that fetches and
displays notices from AIUB's official website.

Usage:
  aiub-notice [command]

Available Commands:
  appid       Manage AppID registration for Windows notifications
  autostart   Manage autostart settings for AIUB Notice Fetcher service
  close       Close the AIUB Notice Fetcher service
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  last        Display the last fetched notice
  list        List all fetched notices
  log         View the log of notices
  start       Start the AIUB Notice Fetcher service
  status      Check the status of the AIUB Notice Fetcher service
```

## Internal Architecture

```text
aiub-notice/
├── cmd/
│   ├── aiub-notice/           # Main CLI application entrypoint
│   └── aiub-notice-launcher/  # Launcher utility
├── internal/
│   ├── appid/                 # Windows AppID registry manager
│   ├── autostart/             # Windows startup registry integration
│   ├── common/                # Shared paths, constants, and helpers
│   ├── list/                  # Notice List TUI (Terminal User Interface)
│   ├── notice/                # Scraper, HTML parser, and SQLite caching
│   ├── service/               # Periodic polling daemon loop
│   └── toast/                 # Windows WinRT toast notification integration
├── Makefile                   # Build and install targets
└── main.go
```
