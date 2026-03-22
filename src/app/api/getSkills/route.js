const GITHUB_USERNAME = 'manojtgn';
const EXCLUDED_LANGS = new Set(['ELM', 'EJS', 'Elm', 'HTML', 'CSS', 'CMAKE', 'CMake', 'MAKEFILE', 'Makefile']);

export async function GET() {
    try {
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
            headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
        });

        if (!reposRes.ok) {
            return Response.json({ error: "Failed to fetch repositories" }, { status: 502 });
        }

        const repos = await reposRes.json();

        if (!Array.isArray(repos)) {
            return Response.json({ error: "Unexpected response from GitHub" }, { status: 502 });
        }

        const languageData = {};
        await Promise.all(
            repos.map(async (repo) => {
                try {
                    const langRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`, {
                        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
                    });
                    if (!langRes.ok) return;
                    const langs = await langRes.json();

                    Object.entries(langs).forEach(([lang, bytes]) => {
                        if (!EXCLUDED_LANGS.has(lang)) {
                            languageData[lang] = (languageData[lang] || 0) + bytes;
                        }
                    });
                } catch {
                    // skip individual repo failures
                }
            })
        );

        return Response.json(languageData);
    } catch (err) {
        console.error("getSkills error:", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
