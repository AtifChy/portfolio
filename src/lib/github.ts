import fallbackData from "../data/github-fallback.json";

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  company?: string;
  blog?: string;
  total_stars?: number;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  html_url: string;
  homepage: string | null;
  pushed_at: string;
  topics: string[];
  fork: boolean;
  category?: string;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface PortfolioGitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
  featuredRepos: GitHubRepo[];
  totalStars: number;
  languages: LanguageStat[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  Go: "#00ADD8",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Rust: "#DEA584",
  Python: "#3572A5",
  "C++": "#F34B7D",
  C: "#555555",
  "C#": "#178600",
  Haskell: "#5E5086",
  Shell: "#89E051",
  HTML: "#E34C26",
  PHP: "#4F5D95",
  Lua: "#000080",
  Java: "#B07219",
};

const CATEGORY_MAP: Record<string, string> = {
  "aiub-companion": "Desktop & Systems",
  "winrt-toast-reborn": "Systems & Native",
  "RecruitBD-AI": "AI & Machine Learning",
  xmonad: "Systems & DevTools",
  "dotfiles-bare": "DevTools & Workflow",
  HospitalAppointmentSystem: "Fullstack Web",
  Sahara: "Fullstack Web",
  "aiub-notice": "Systems & DevTools",
  st: "Systems & Native",
  "dmenu-atif": "Systems & Native",
  chezdot: "DevTools & Workflow",
  SwiftInventory: "Desktop & Systems",
  Bank: "Desktop & Systems",
  CarRace2D: "Systems & Native",
  CGPACalculator: "Systems & DevTools",
};

export async function getGitHubData(): Promise<PortfolioGitHubData> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "AtifChy-Portfolio",
  };

  const token =
    typeof process !== "undefined"
      ? process.env?.GITHUB_TOKEN || process.env?.GITHUB_PAT
      : undefined;

  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/AtifChy", {
        headers,
        signal: AbortSignal.timeout(4000),
      }),
      fetch("https://api.github.com/users/AtifChy/repos?per_page=100&sort=pushed", {
        headers,
        signal: AbortSignal.timeout(4000),
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API response error: ${userRes.status}/${reposRes.status}`);
    }

    const rawUser = await userRes.json();
    const rawRepos = await reposRes.json();

    if (!Array.isArray(rawRepos)) {
      throw new Error("Invalid repos response structure");
    }

    // Process and enrich repos
    const processedRepos: GitHubRepo[] = rawRepos
      .filter((r: any) => !r.fork || ["RecruitBD-AI"].includes(r.name)) // include our custom ones
      .map((r: any) => ({
        name: r.name,
        description: r.description || "Open source project by AtifChy",
        stars: Number(r.stargazers_count || 0),
        forks: Number(r.forks_count || 0),
        language: r.language || "TypeScript",
        html_url: r.html_url,
        homepage: r.homepage || "",
        pushed_at: r.pushed_at,
        topics: Array.isArray(r.topics) ? r.topics : [],
        fork: Boolean(r.fork),
        category: CATEGORY_MAP[r.name] || "Software Engineering",
      }))
      .sort(
        (a, b) =>
          b.stars - a.stars || new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      );

    const totalStars = processedRepos.reduce((acc, r) => acc + r.stars, 0);

    const user: GitHubUser = {
      login: rawUser.login || "AtifChy",
      name: rawUser.name || "Md. Iftakhar Awal Chowdhury",
      avatar_url: rawUser.avatar_url || "https://avatars.githubusercontent.com/u/42291930?v=4",
      html_url: rawUser.html_url || "https://github.com/AtifChy",
      bio:
        rawUser.bio ||
        "CS Student & Software Engineer building systems software, developer tools, and machine learning systems.",
      public_repos: rawUser.public_repos || processedRepos.length,
      followers: rawUser.followers || 14,
      following: rawUser.following || 18,
      location: rawUser.location || "Dhaka, Bangladesh",
      company: rawUser.company || "AIUB",
      blog: rawUser.blog || "https://github.com/AtifChy",
      total_stars: totalStars,
    };

    // Calculate language breakdown
    const langCounts: Record<string, number> = {};
    for (const repo of processedRepos) {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    }

    const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const languages: LanguageStat[] = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / (totalLangs || 1)) * 100),
        color: LANGUAGE_COLORS[name] || "#6366F1",
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 6);

    // Pick featured flagship repos
    const featuredNames = [
      "aiub-companion",
      "winrt-toast-reborn",
      "RecruitBD-AI",
      "xmonad",
      "dotfiles-bare",
      "HospitalAppointmentSystem",
    ];

    const featuredRepos = processedRepos.filter((r) => featuredNames.includes(r.name));

    return {
      user,
      repos: processedRepos,
      featuredRepos:
        featuredRepos.length > 0 ? featuredRepos : (fallbackData.repos as GitHubRepo[]),
      totalStars: Math.max(totalStars, fallbackData.user.total_stars || 105),
      languages: languages.length > 0 ? languages : fallbackData.languages,
    };
  } catch (error) {
    console.warn("Using fallback GitHub data snapshot due to:", error);
    return {
      user: fallbackData.user as GitHubUser,
      repos: fallbackData.repos as GitHubRepo[],
      featuredRepos: (fallbackData.repos as GitHubRepo[]).slice(0, 6),
      totalStars: fallbackData.user.total_stars,
      languages: fallbackData.languages,
    };
  }
}
