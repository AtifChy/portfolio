---
title: "RecruitBD-AI"
tagline: "AI-Powered CV Parsing & Semantic Job Matching Platform"
description: "An intelligent recruitment platform combining a FastAPI backend with local Ollama LLMs (gemma3) for structured CV extraction and SentenceTransformers for semantic job database matching."
featured: true
order: 2
category: "AI & Machine Learning"
role: "Lead Machine Learning & Backend Engineer"
period: "2024 - Present"
stack:
  - "Python 3.13+"
  - "FastAPI"
  - "Ollama (gemma3)"
  - "SentenceTransformers"
  - "NumPy"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "shadcn/ui"
  - "Vite"
  - "uv"
  - "pnpm"
  - "pdfplumber"
  - "python-docx"
githubUrl: "https://github.com/AtifChy/RecruitBD-AI"
liveUrl: "https://recruit-bd-ai.vercel.app"
stats:
  "LLM Extractor": "Ollama (gemma3)"
  "Embedding Model": "all-MiniLM-L6-v2"
  "Document Parsing": "pdfplumber & python-docx"
  "Package Manager": "uv (Python) + pnpm (JS)"
keyHighlights:
  - "Multi-format document ingestion pipeline parsing candidate resumes from PDF and DOCX files using pdfplumber and python-docx."
  - "Extracts structured candidate data (skills, experience, education) using local LLM inference via Ollama running gemma3."
  - "Computes dense semantic embeddings using SentenceTransformers (all-MiniLM-L6-v2) for robust conceptual matching."
  - "Ranks candidate fit against pre-indexed job requirements in milliseconds using vectorized NumPy similarity computations."
  - "Built with lightning-fast tooling: uv for Python dependency management and Vite + pnpm for the React frontend."
architectureDecisions:
  - decision: "Local Ollama (gemma3) for CV Schema Extraction"
    rationale: "Keeps sensitive candidate resume data completely private and local without incurring cloud API costs or latency."
  - decision: "SentenceTransformers (all-MiniLM-L6-v2) over Keyword ATS"
    rationale: "Dense semantic vector embeddings match candidates based on conceptual meaning rather than exact keyword string matches, preventing false rejections."
  - decision: "uv for Backend Environment Management"
    rationale: "Provides deterministic, sub-second Python dependency resolution and virtualenv isolation for Python 3.13+."
---

## Overview

**RecruitBD-AI** is an AI-powered resume intelligence platform designed to eliminate the limitations of traditional keyword-based Applicant Tracking Systems (ATS).

The system accepts CVs in **PDF** or **DOCX** format, parses unstructured text into structured candidate schemas via **Ollama (`gemma3`)**, and computes semantic similarity against job openings using **SentenceTransformers (`all-MiniLM-L6-v2`)**.

```
┌─────────────────────────────────────────────────────────────┐
│                   RecruitBD-AI Pipeline                     │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌─────────────────────────┐             ┌─────────────────────┐
│     Resume Upload       │             │   Job Requirement   │
│  • PDF via pdfplumber   │             │   Pre-indexed Job   │
│  • DOCX via python-docx │             │   Database Spec     │
└───────────┬─────────────┘             └──────────┬──────────┘
            │                                      │
            ▼                                      │
┌─────────────────────────┐                        │
│   Ollama (gemma3 LLM)   │                        │
│ Structured Schema Parse │                        │
└───────────┬─────────────┘                        │
            │                                      │
            ▼                                      ▼
┌─────────────────────────────────────────────────────────────┐
│       SentenceTransformers (`all-MiniLM-L6-v2`)             │
│            Vector Embeddings Generation                     │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│          NumPy Vectorized Cosine Similarity Matrix          │
│                Top-K Ranked Job Matches                     │
└─────────────────────────────────────────────────────────────┘
```

## System Workflow & Architecture

1. **Document Ingestion**: Extracts text streams from uploaded PDF files (`pdfplumber`) and Microsoft Word documents (`python-docx`).
2. **LLM Information Extraction**: Sends normalized text to a local Ollama server running Google's `gemma3` model to extract structured candidate details (skills, certifications, experience, education).
3. **Semantic Embedding**: Generates dense 384-dimensional vector representations with `all-MiniLM-L6-v2`.
4. **Similarity Ranking**: Measures semantic proximity between candidate profile vectors and indexed job vectors via `numpy` dot-product operations.
5. **Interactive UI**: Presents matching scores, skill breakdown tags, and suggested jobs through a clean React, Tailwind CSS, and shadcn/ui dashboard.

## Technology Stack

- **Backend API**: Python 3.13+, FastAPI, Uvicorn, `uv`
- **Machine Learning & NLP**: SentenceTransformers (`all-MiniLM-L6-v2`), NumPy, Ollama (`gemma3`)
- **Document Extractors**: `pdfplumber`, `python-docx`
- **Frontend Client**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, `pnpm`
