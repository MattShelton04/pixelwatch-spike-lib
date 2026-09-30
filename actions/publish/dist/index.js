// PixelWatch M0.5 spike S4: stand-in for the prebuilt publisher bundle.
// It only reports which bundle this is. No dependencies, no network.
"use strict";
const fs = require("node:fs");
const crypto = require("node:crypto");

const BUNDLE = "v2";
const NONCE = "6667b07e0531783d";

const bundleSha256 = crypto.createHash("sha256").update(fs.readFileSync(__filename)).digest("hex");
const identity = {
  marker: "PWSPIKE",
  bundle: BUNDLE,
  nonce: NONCE,
  bundleSha256,
  bundlePath: __filename,
  githubRepository: process.env.GITHUB_REPOSITORY,
  githubSha: process.env.GITHUB_SHA,
  githubWorkflowRef: process.env.GITHUB_WORKFLOW_REF,
  githubWorkflowSha: process.env.GITHUB_WORKFLOW_SHA,
  runId: process.env.GITHUB_RUN_ID,
  runAttempt: process.env.GITHUB_RUN_ATTEMPT,
  job: process.env.GITHUB_JOB,
};

console.log(`PWSPIKE bundle=${BUNDLE} nonce=${NONCE} sha256=${bundleSha256}`);
console.log(JSON.stringify(identity, null, 2));

const out = process.env.GITHUB_OUTPUT;
if (out) {
  fs.appendFileSync(out, `bundle=${BUNDLE}\nnonce=${NONCE}\nbundle-sha256=${bundleSha256}\n`);
}
const summary = process.env.GITHUB_STEP_SUMMARY;
if (summary) {
  fs.appendFileSync(summary, "```json\n" + JSON.stringify(identity) + "\n```\n");
}
