function generateSummary(payload) {
    const pusher = (payload.pusher && payload.pusher.name) ? payload.pusher.name : "A developer";
    const repoName = (payload.repository && payload.repository.name) ? payload.repository.name : "a repository";
    const commits = payload.commits || [];
    
    if (commits.length === 0) {
        return `🤖 *Auto-PM Update*: ${pusher} pushed to \`${repoName}\`, but no new commits were found.`;
    }
    
    const formattedCommits = commits.map(c => `- ${c.message || 'No commit message'}`).join('\\n');
    
    return `🤖 *Auto-PM Update*\\n*${pusher}* just pushed ${commits.length} commit(s) to \`${repoName}\`:\\n\\n${formattedCommits}\\n\\n_Please review the changes. Ticket status automatically tracked._`;
}

module.exports = { generateSummary };
