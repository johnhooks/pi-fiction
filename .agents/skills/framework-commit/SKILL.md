---
name: framework-commit
description: Prepare and create brief conventional commits for pi-fiction. Use when the user asks to commit, prepare a commit, or choose a commit message.
---

# Framework Commit

Create a clean conventional commit for `pi-fiction`.

Invoking this skill means the user wants commit help. Actually run `git commit` only when the user has explicitly asked to commit. `/commit` or `/skill:framework-commit` counts as explicit unless the user says they only want a suggestion.

## Style

Use conventional commits:

```text
type(scope): brief summary
```

Keep the title brief, ideally under 50 characters. Use lowercase. No period. No emoji. No co-author lines.

Use a scope only when it adds clarity. Good scopes for this repo may include:

- `agents`
- `prompts`
- `skills`
- `extension`
- `docs`
- `tests`
- `build`

Use the smallest accurate type:

- `feat`: new user-facing framework behavior or resource
- `fix`: correction to existing behavior or resource
- `docs`: documentation-only changes
- `refactor`: restructuring without behavior change
- `test`: tests-only changes
- `build`: package, build, or tooling changes
- `chore`: maintenance that does not fit elsewhere

Prefer one-line commits. Add a short body only when the commit needs context that the title cannot carry.

## Process

1. Run `git status --short`.
2. Inspect the relevant diff with `git diff` and, if needed, `git diff --cached`.
3. Identify the functional commit boundary. If unrelated changes are mixed together, ask whether to split them.
4. Run relevant validation before committing:
   - code/package changes: `npm run lint && npm test && npm run build`
   - docs or prompt/skill text only: inspect the Markdown mentally unless the user asks for full checks
5. Stage explicit paths with `git add <paths>`.
6. Commit with `git commit -m "type(scope): summary"`.
7. Report the commit hash and message.

## Guidance

Describe what changed, not how many files changed. Focus on what the change enables for the framework or its maintainers.

Do not mention AI, agents, tests, or generated work in the commit message unless that is the subject of the change.

If the diff contains accidental build output, dependency folders, story canon, or unrelated local edits, do not stage them. Ask what to do.
