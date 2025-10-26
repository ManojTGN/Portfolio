
export async function GET() {
    const reposRes = await fetch(`https://api.github.com/users/manojtgn/repos`, {
        headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    });
    const repos = await reposRes.json();
    const whitelistedLangs = ['ELM', 'EJS', 'Elm', 'HTML', 'CSS', 'CMAKE','CMake','MAKEFILE','Makefile'];

    const languageData = {};
    await Promise.all(
        repos.map(async (repo) => {
        const langRes = await fetch(`https://api.github.com/repos/manojtgn/${repo.name}/languages`, {
            headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
        });
        const langs = await langRes.json();

        Object.entries(langs).forEach(([lang, bytes]) => {
            if(!whitelistedLangs.includes(lang))
                languageData[lang] = (languageData[lang] || 0) + bytes;
        });
        })
    );

    return new Response(JSON.stringify(languageData), {
        headers: { "Content-Type": "application/json" },
    });
}
