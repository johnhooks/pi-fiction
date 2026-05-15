---
status: shaping
topic: source
---

# Rethink the writing concepts inventory

## Problem

`../writing` contains a lot of useful story-building thinking, but the first conversion tried to swallow it whole and flattened too much of the creative process into generic prompts and templates.

We need a deliberate inventory before rebuilding package resources. The goal is not to port the old system. The goal is to make sure we do not lose important story-writing concepts while reimagining them as Pi-native tools for human and AI collaboration.

The risk is two-sided:

- copying too much would preserve old bureaucracy and Claude-specific habits
- copying too little would lose hard-won ideas about story goals, character pressure, style, continuity, planning, drafting, and review

## Solution

Create a source-concept map before rebuilding shipped resources. Treat every old file as compost: inspect it, name the creative concept it contains, decide whether it still matters, then choose a Pi-native destination or intentionally discard it.

The map should group source material by the writerly act it supports, not by old filename alone.

### Foundation and orientation

Files to rethink:

- `../writing/FRAMEWORK-GUIDE.md`
- `../writing/README.md`
- `../writing/CLAUDE.md`
- `../writing/stories/CLAUDE.md`
- `../writing/templates/PROJECT-CLAUDE.md`
- `../writing/templates/TODO.md`
- `../writing/templates/TEMPLATE-SUMMARIES.md`

Concepts to preserve or challenge:

- literary goals first
- human direction plus AI creative execution
- document authority without creative suffocation
- project onboarding and setup flow
- when approval helps versus when it kills momentum

Likely Pi-native destinations:

- extension onboarding command or tool
- story project setup skill
- lightweight starter prompts
- stable docs after design settles

### Story foundation documents

Files to rethink:

- `../writing/templates/LITERARY-GOALS.md`
- `../writing/templates/SERIES-BIBLE.md`
- `../writing/templates/WRITING-STYLE.md`
- story examples under `../writing/stories/*/LITERARY-GOALS.md`
- story examples under `../writing/stories/*/SERIES-BIBLE.md`
- story examples under `../writing/stories/*/WRITING-STYLE.md`

Concepts to preserve or challenge:

- reader promise
- genre and format expectations
- core themes and emotional engine
- world rules that generate story
- prose texture, voice, and atmosphere
- style as a living taste guide rather than a rigid rulebook

Likely Pi-native destinations:

- story foundation skill
- interactive story setup flow
- optional templates or generated documents
- context packet source material

### Character development

Files to rethink:

- `../writing/templates/CHARACTER-PROFILE.md`
- `../writing/workflows/character-creation.md`
- `../writing/stories/fatal-exceptions/CHARACTER-PROFILE-harper-quinn.md`

Concepts to preserve or challenge:

- wants, needs, fears, contradictions
- voice and speech patterns
- pressure points
- relationships as engines of story
- character arcs without overplanning the life out of them
- writing do/don't notes that actually help scenes

Likely Pi-native destinations:

- character discovery skill
- character pressure prompt
- optional character profile template
- review checks for voice and continuity

### Planning and long-story momentum

Files to rethink:

- `../writing/templates/SERIES-PLAN.md`
- `../writing/templates/MINI-ARC-PLAN.md`
- `../writing/templates/SERIES-TRACKING.md`
- `../writing/templates/ARCHIVE.md`
- `../writing/workflows/series-development.md`
- `../writing/workflows/chapter-development.md`
- story examples under `../writing/stories/*/SERIES-PLAN.md`
- story examples under `../writing/stories/*/SERIES-TRACKING.md`

Concepts to preserve or challenge:

- mini-arcs as flexible containers
- episode purpose and reader satisfaction
- active plot threads
- reader knowledge versus character knowledge
- planted seeds and payoffs
- archiving completed context to reduce drag
- planning as momentum, not control

Likely Pi-native destinations:

- arc planning skill
- episode planning prompt
- continuity/tracking tool or command
- context compaction/archive behavior

### Drafting and creative mode

Files to rethink:

- `../writing/workflows/creative-writing.md`
- `../writing/workflows/chapter-development.md`

Concepts to preserve or challenge:

- context loading before prose
- character voice warm-up
- scene visualization
- allowing discovery inside a plan
- shifting from analysis into creative flow
- protecting drafting energy from premature critique

Likely Pi-native destinations:

- drafting skill
- creative-mode prompt
- extension command that assembles the right context
- style/voice packet generator

### Review and revision

Files to rethink:

- `../writing/workflows/literary-review.md`
- `../writing/templates/ISSUES.md`

Concepts to preserve or challenge:

- review against reader promise and story goals
- continuity and canon checks
- pacing, clarity, scene energy, and emotional payoff
- separating must-fix issues from taste polish
- tracking unresolved story problems without turning them into shame

Likely Pi-native destinations:

- literary review skill
- issue tracking template or command
- post-draft wrap prompt

### Genre and craft essays

Files to rethink:

- `../writing/ideas/comedy-writing-*.md`
- `../writing/meta/comedy-writing-*.md`
- `../writing/meta/comedy-*.md`
- `../writing/meta/WRITING-STYLE.md`

Concepts to preserve or challenge:

- comedy engines
- flaws and archetypes
- running gags
- voice and structure
- using craft knowledge as optional inspiration, not universal law

Likely Pi-native destinations:

- optional craft reference skill
- genre modules later
- not part of the first core framework unless a concept clearly generalizes

### Tooling and future interfaces

Files to rethink:

- `../writing/ideas/mcp-idea.md`
- `../writing/ideas/mcp-overview.md`
- `../writing/ideas/workflow-ideas.md`
- `../writing/IDEAS.md`
- `../writing/ISSUES.md`

Concepts to preserve or challenge:

- tool-assisted context assembly
- story project navigation
- generated packets
- commands that reduce repeated ceremony
- unresolved ideas worth revisiting later

Likely Pi-native destinations:

- extension commands
- custom tools
- future plans in `.wip/plans/`

## Requirements

- Do not copy files wholesale into package resources.
- Inspect source files in small batches and summarize the concepts worth keeping.
- For each source file or group, decide one of: reimagine now, park for later, discard, or use only as example material.
- Keep story-specific canon out of this repo except tiny excerpts if they clarify a framework concept.
- Prefer Pi-native resource shapes: extension behavior, commands, tools, prompts, skills, generated context, and lightweight templates.
- Before building user-facing resources, produce a concept map that shows what old material has been considered and where the useful ideas will go.
