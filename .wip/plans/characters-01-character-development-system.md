---
status: active
topic: characters
depends_on:
  - source-01-rethink-writing-concepts
---

# Build the character development system

## Problem

Character work is the best first concrete slice of `pi-fiction` because characters influence nearly every other part of a story: premise, scene pressure, voice, relationships, world exposure, continuity, and revision.

The old `../writing` system understood that characters need motivations, conflicts, voices, relationships, arcs, and writing guidance, but it concentrated too much into one large `CHARACTER-PROFILE.md`. That made the profile comprehensive, but also heavy. Different kinds of character knowledge want different shapes.

A writer and AI collaborator need character material that is easy to discover, easy to write from, and easy to update as the story changes. Stable identity, voice texture, relationship dynamics, and continuity history should not all be forced into the same Markdown document.

This plan is a focused child of `source-01-rethink-writing-concepts`: it takes the character-development slice of the old writing concept inventory and reimagines it as the first base component for the new Pi extension.

## Solution

Design a character development system around a character folder, not a single profile file.

The system should help the human and AI discover a character through pressure, contradiction, voice, and story function, then save the result in multiple files that match how the information will be used later.

A possible character folder shape:

```text
characters/
└── {character-slug}/
    ├── profile.md
    ├── voice.md
    ├── relationships.md
    ├── development.jsonl
    ├── references.jsonl
    └── notes.md
```

### `profile.md`

Stable character truth. Mostly concise Markdown lists and short explanations.

Likely contents:

- character essence
- story role
- current want
- deeper need
- fear or wound
- contradictions
- pressure points
- values and blind spots
- useful do/avoid guidance for writing scenes

This should be the file an agent reads when it needs to quickly understand who the character is.

### `voice.md`

Voice is not just data. It needs prose, rhythm, examples, and contrast.

Likely contents:

- how the character sounds
- how they think
- what they avoid saying
- how they lie, deflect, flirt, threaten, joke, confess, or shut down
- dialogue habits
- internal monologue texture
- sample lines
- sounds like / does not sound like

This should become the voice warm-up file before drafting scenes.

### `relationships.md`

Human-readable relationship map.

Likely contents:

- important relationships
- what each person wants from the other
- friction, affection, debt, resentment, fear, or attraction
- misunderstandings
- current state
- how the relationship creates story pressure

This should help an agent write scenes where character dynamics create motion instead of exposition.

### `development.jsonl`

A growing event log for character change across the story. JSONL fits because entries are append-only, filterable, and easy for tools to process.

Example:

```jsonl
{"episode":"001","type":"change","summary":"Harper accepts help but calls it tactical necessity.","impact":"First crack in lone-wolf posture.","state_after":"More willing to collaborate, still defensive."}
{"episode":"002","type":"reveal","summary":"Reader learns Harper left the academy after covering for a friend.","impact":"Reframes her distrust of institutions."}
```

### `references.jsonl`

Cross-links to scenes, plot events, world facts, callbacks, and useful examples.

Example:

```jsonl
{"file":"episodes/003.md","kind":"voice-example","note":"Strong example of Harper deflecting grief with dry humor."}
{"file":"world/factions.md","kind":"background","note":"Former academy connection shapes her fear of official investigations."}
```

### `notes.md`

A messy scratchpad for ideas that are not canon yet. This gives writers somewhere to play without polluting the stable profile.

## Requirements

- Treat `../writing/templates/CHARACTER-PROFILE.md`, `../writing/workflows/character-creation.md`, and selected story character examples as source inspiration, not templates to copy.
- Preserve the important old concepts: motivations, core conflicts, voice, relationship dynamics, development arc, and practical writing guidance.
- Split character knowledge by use, not by arbitrary bureaucracy.
- Keep the character system useful for both humans browsing files and future extension tools assembling context.
- Make voice guidance prose-rich and example-heavy.
- Make continuity/history appendable and tool-friendly, likely JSONL.
- Do not force every story to fill every file before writing. The system should support partial characters that deepen over time.
- Avoid approval gates and exhaustive questionnaires. Character discovery should feel like putting a person under story pressure, not filling out a dossier.
- The first user-facing package resources for this work will likely include a character-development skill and a prompt or command that can create or update this folder structure.

## Relationship to the source inventory plan

`source-01-rethink-writing-concepts` tracks the full conceptual review of `../writing`. This plan is the first concrete extraction from that inventory.

The source inventory asks: what old concepts matter, and where should they go?

This character plan answers for one area:

- old character concepts go into a Pi-native character folder system
- stable identity, voice, relationships, and continuity become separate artifacts
- character development becomes an interactive discovery flow rather than a monolithic template

When this plan progresses, it should feed findings back into the source inventory so the old character files can be marked as reimagined rather than merely reviewed.
