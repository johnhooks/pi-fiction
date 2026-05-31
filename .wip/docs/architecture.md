# pi-fiction Architecture

Status: work in progress.

This document is a sketchpad for the shape of `pi-fiction`. When the architecture feels true and useful, move the polished version to `docs/`.

## Purpose

`pi-fiction` is a Pi-native framework for AI/human creative writing. It should help humans and agents explore ideas, shape stories, draft with momentum, revise with taste, and keep long creative projects alive.

This is not a story repository. It is the workshop that builds reusable creative machinery.

## Resource Layers

There are two kinds of resources in this repo.

Project-internal resources help agents work on `pi-fiction` itself:

```text
.pi/prompts/        # local prompt shortcuts for building this framework
.agents/skills/     # local skills for ideas, review, commits, and creative process work
.wip/docs/          # unfinished architecture and design notes
.wip/ideas/         # framework ideas before they become tasks
.wip/tasks/         # accepted work with concrete deliverables
```

Package resources are shipped to story projects that use the framework:

```text
extensions/         # Pi extension code, commands, tools, and behavior
prompts/            # prompt templates exposed to story projects
skills/             # reusable fiction-writing skills
# templates/        # possible future story-project starter files
# docs/             # stable framework documentation
```

The distinction matters. Internal resources are for making the framework. Package resources are the framework.

## Package Exposure

Static package resources should be declared in `package.json` through the `pi` manifest when they exist:

```json
{
  "pi": {
    "extensions": ["./extensions"],
    "prompts": ["./prompts"],
    "skills": ["./skills"]
  }
}
```

Use the package manifest for normal static resources. Use extension code when behavior is needed: commands, tools, context assembly, interactive flows, custom review steps, or dynamic discovery.

## Internal Creative Process Tools

The first internal tools should support building the framework without importing a coding-heavy workflow from another project.

Possible local skills:

- `fiction-lab`: explore raw framework ideas, generate options, name tensions, and find the creative heart before implementation.
- `framework-ideas`: turn a promising concept into a framework idea focused on what creative act it enables.
- `framework-review`: review prompts, skills, extension behavior, or templates for creative usefulness as well as technical correctness.
- `framework-commit`: prepare clean commits after reviewing changes and running relevant checks.

Possible local prompts:

- `/lab`: open creative exploration around a framework idea.
- `/ideas`: shape a concept into a framework idea.
- `/plan`: create an implementation plan for an accepted task.
- `/review`: review current changes or a specific asset.
- `/commit`: prepare a commit only when explicitly asked.

These are not story-writing tools. They are workshop tools for making better story-writing tools.

## Design Biases

Fiction first. Framework second.

The framework should create orientation, not obedience. It should make agents more useful creative partners without making the writing process feel managed, gated, or over-explained.

Prefer:

- invitations over approvals
- compact context over giant doctrine
- story motion over administrative completeness
- vivid examples over abstract policy
- reusable creative moves over rigid workflows
- Pi-native behavior over copied assistant habits

Avoid:

- turning every creative choice into a checklist
- forcing linear workflows when exploration is needed
- hiding creative judgment behind process language
- shipping internal workshop aids as user-facing story tools
- preserving old ideas merely because they already exist

## Open Questions

- Should internal skills live in `.agents/skills/` or `.pi/skills/`?
- What should be the threshold for promoting an idea into a task?
- What belongs in extension code versus prompts and skills?
- Do story projects need starter templates, or should setup be interactive first?
- What is the smallest useful first package resource we can ship?
