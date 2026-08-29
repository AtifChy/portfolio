import React, { useState, useMemo } from "react";
import { Search, Star, GitFork, ExternalLink, Code2, Tag } from "lucide-react";
import type { GitHubRepo } from "../lib/github";

interface RepoFilterGridProps {
  initialRepos: GitHubRepo[];
}

const CATEGORIES = [
  "All",
  "Systems & Native",
  "AI & Machine Learning",
  "Fullstack & Web",
  "DevTools & Workflow",
];

export default function RepoFilterGrid({ initialRepos }: RepoFilterGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"stars" | "pushed" | "name">("stars");

  const filteredRepos = useMemo(() => {
    return initialRepos
      .filter((repo) => {
        // Search filter
        const matchesSearch =
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description &&
            repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (repo.language &&
            repo.language.toLowerCase().includes(searchQuery.toLowerCase())) ||
          repo.topics.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          );

        // Category filter
        let matchesCategory = true;
        if (selectedCategory !== "All") {
          if (selectedCategory === "Systems & Native") {
            matchesCategory =
              ["Go", "Rust", "C", "C++", "Haskell"].includes(repo.language || "") ||
              repo.category === "Systems & Native" ||
              repo.category === "Desktop & Systems";
          } else if (selectedCategory === "AI & Machine Learning") {
            matchesCategory =
              repo.language === "Python" ||
              repo.topics.some((t) =>
                ["machine-learning", "fastapi", "nlp", "llm", "ai"].includes(t)
              ) ||
              repo.category === "AI & Machine Learning";
          } else if (selectedCategory === "Fullstack & Web") {
            matchesCategory =
              ["TypeScript", "JavaScript", "PHP", "C#", "HTML"].includes(
                repo.language || ""
              ) || repo.category === "Fullstack Web";
          } else if (selectedCategory === "DevTools & Workflow") {
            matchesCategory =
              ["Shell", "Haskell", "Lua", "Vim script", "Makefile"].includes(
                repo.language || ""
              ) ||
              repo.topics.some((t) =>
                ["dotfiles", "neovim", "zsh", "cli"].includes(t)
              );
          }
        }

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "stars") {
          return b.stars - a.stars || b.forks - a.forks;
        } else if (sortBy === "pushed") {
          return (
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          );
        } else {
          return a.name.localeCompare(b.name);
        }
      });
  }, [initialRepos, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="space-y-6">
      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search repositories, technologies, or topics..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 whitespace-nowrap">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-neutral-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
          >
            <option value="stars" className="bg-[#090a0f] text-white">
              Most Stars ★
            </option>
            <option value="pushed" className="bg-[#090a0f] text-white">
              Recently Updated ⚡
            </option>
            <option value="name" className="bg-[#090a0f] text-white">
              Repository Name (A-Z)
            </option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-500"
                  : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-neutral-200 border border-white/10"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1 pt-2">
        <span>
          Showing <strong className="text-white">{filteredRepos.length}</strong>{" "}
          repositories
        </span>
        {searchQuery && (
          <span>
            Filtered by <span className="text-blue-400">"{searchQuery}"</span>
          </span>
        )}
      </div>

      {/* Grid of Repositories */}
      {filteredRepos.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center text-neutral-400">
          <Code2 className="w-10 h-10 mx-auto text-neutral-500 mb-3" />
          <p className="font-serif text-lg text-white mb-1">No repositories found</p>
          <p className="text-sm">
            Try searching for a different keyword or reset the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.name}
              className="glass-panel rounded-2xl p-5 flex flex-col justify-between group border border-white/10 hover:border-blue-500/40 transition-all duration-200 relative overflow-hidden"
            >
              <div>
                {/* Header: Name + Star badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif font-bold text-base text-white group-hover:text-blue-300 transition-colors line-clamp-1 hover:underline"
                  >
                    {repo.name}
                  </a>

                  <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono">
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-0.5 text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {repo.stars}
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="flex items-center gap-0.5 text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded-md">
                        <GitFork className="w-3 h-3" />
                        {repo.forks}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                  {repo.description || "Open source project by Md. Iftakhar Awal"}
                </p>

                {/* Topics / Tags */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-300/90 border border-blue-500/20"
                      >
                        #{topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="text-[10px] font-mono text-neutral-400 self-center">
                        +{repo.topics.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer: Language & GitHub Link */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto text-xs font-mono text-neutral-400">
                {repo.language ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>{repo.language}</span>
                  </div>
                ) : (
                  <span>Code</span>
                )}

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
