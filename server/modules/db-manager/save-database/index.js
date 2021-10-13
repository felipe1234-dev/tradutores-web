const simpleGit = require("simple-git");
const git = simpleGit();

const config = require("./config");

const { USER, PASS, REPO, BRANCH } = config;
const remote = `https://${USER}:${PASS}@${REPO}`;

exports.saveDb = msg => {
    git.add("*.db").commit(msg).push(remote, BRANCH);
}