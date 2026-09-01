const OWNER = import.meta.env.VITE_GITHUB_OWNER;
const REPO = import.meta.env.VITE_GITHUB_REPO;
const BRANCH = import.meta.env.VITE_GITHUB_BRANCH || "main";
const FILE_PATH =
  import.meta.env.VITE_GITHUB_DATA_PATH || "src/data/content.json";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

function headers() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function b64EncodeUnicode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16)),
    ),
  );
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(""),
  );
}

export async function fetchContent() {
  const res = await fetch(`${API_BASE}?ref=${BRANCH}`, { headers: headers() });
  if (!res.ok) {
    throw new Error(`GitHub read failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  const decoded = b64DecodeUnicode(json.content.replace(/\n/g, ""));
  return { data: JSON.parse(decoded), sha: json.sha };
}

export async function updateContent(
  newData,
  sha,
  message = "Update site content via admin panel",
) {
  const res = await fetch(API_BASE, {
    method: "PUT",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: b64EncodeUnicode(JSON.stringify(newData, null, 2)),
      sha,
      branch: BRANCH,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `GitHub write failed: ${res.status} ${err.message || res.statusText}`,
    );
  }
  const json = await res.json();
  return { sha: json.content.sha };
}
