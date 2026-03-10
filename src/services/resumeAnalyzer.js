const SKILL_KEYWORDS = [
  "react",
  "javascript",
  "typescript",
  "html",
  "css",
  "tailwind",
  "redux",
  "next.js",
  "node.js",
  "node",
  "express",
  "mongodb",
  "sql",
  "mysql",
  "postgresql",
  "python",
  "java",
  "spring",
  "rest api",
  "microservices",
  "machine learning",
  "data science",
  "tensorflow",
  "docker",
  "kubernetes",
  "aws",
  "linux",
  "ci/cd",
  "git",
  "problem solving",
  "communication",
  "leadership",
  "system design",
  "angular",
  "api",
  "adaptability"
];

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9+.#/\s-]/g, " ").replace(/\s+/g, " ").trim();
}

async function extractPdfText(file) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).toString();
  const data = new Uint8Array(await file.arrayBuffer());
  const document = await pdfjs.getDocument({ data }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => item.str).join(" "));
  }

  return pages.join(" ");
}

async function extractDocxText(file) {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractPlainText(file) {
  return file.text();
}

export async function extractResumeText(file) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "pdf") {
    return extractPdfText(file);
  }

  if (extension === "docx") {
    return extractDocxText(file);
  }

  if (extension === "txt" || extension === "md") {
    return extractPlainText(file);
  }

  throw new Error("Unsupported resume format. Please upload a PDF, DOCX, or TXT file.");
}

export async function analyzeResumeFile(file) {
  const rawText = await extractResumeText(file);
  const normalizedText = normalizeText(rawText || file.name);

  if (!normalizedText) {
    throw new Error("We could not read any text from this resume.");
  }

  const extractedSkills = SKILL_KEYWORDS.filter((skill) => normalizedText.includes(skill)).map((skill) => {
    if (skill === "node") return "Node.js";
    if (skill === "next.js") return "Next.js";
    if (skill === "rest api") return "REST API";
    if (skill === "ci/cd") return "CI/CD";
    return skill.split(" ").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  });

  const uniqueSkills = Array.from(new Set(extractedSkills));
  const score = Math.min(98, 45 + uniqueSkills.length * 6);
  const strengths = uniqueSkills.slice(0, 6);
  const missing = ["System Design", "Interview Preparation", "Portfolio Projects"].filter(
    (item) => !uniqueSkills.includes(item)
  );

  return {
    filename: file.name,
    textLength: normalizedText.length,
    score,
    strengths,
    missing: missing.slice(0, 3),
    extractedSkills: uniqueSkills,
    summary: uniqueSkills.length
      ? `Detected ${uniqueSkills.length} relevant skills from the uploaded resume.`
      : "Very few recognizable technical skills were detected. Add more project and skill details to improve matching."
  };
}

function computeMatch(requiredSkills, extractedSkills) {
  if (!requiredSkills.length || !extractedSkills.length) return 0;
  const normalizedSkills = extractedSkills.map((skill) => normalizeText(skill));
  const hits = requiredSkills.filter((skill) => normalizedSkills.includes(normalizeText(skill))).length;
  return Math.round((hits / requiredSkills.length) * 100);
}

export function personalizeRecommendations(recommendationCatalog, analysis) {
  if (!analysis?.extractedSkills?.length) {
    return [];
  }

  return recommendationCatalog
    .map((item) => ({
      ...item,
      match: Math.max(45, computeMatch(item.skills, analysis.extractedSkills)),
      matchedSkills: item.skills.filter((skill) => analysis.extractedSkills.some((entry) => normalizeText(entry) === normalizeText(skill)))
    }))
    .filter((item) => item.match >= 45)
    .sort((left, right) => right.match - left.match)
    .slice(0, 6);
}

export function personalizeJobs(jobCatalog, analysis, profile = {}) {
  if (!analysis?.extractedSkills?.length) {
    return [];
  }

  const savedJobs = profile.savedJobs || [];
  const appliedJobs = profile.appliedJobs || [];

  return jobCatalog
    .map((job) => {
      const match = Math.max(40, computeMatch(job.skills, analysis.extractedSkills));
      return {
        ...job,
        match,
        recommended: match >= 55,
        saved: savedJobs.includes(job.id),
        applied: appliedJobs.includes(job.id)
      };
    })
    .filter((job) => job.match >= 40)
    .sort((left, right) => right.match - left.match);
}

export function buildResumeOverview(analysis, recommendations) {
  if (!analysis) {
    return {
      strongestArea: "Resume pending",
      nextFocus: "Upload resume",
      marketReadiness: 0
    };
  }

  return {
    strongestArea: analysis.strengths[0] || "General profile",
    nextFocus: analysis.missing[0] || "Interview preparation",
    marketReadiness: recommendations.length ? recommendations[0].match : analysis.score
  };
}
