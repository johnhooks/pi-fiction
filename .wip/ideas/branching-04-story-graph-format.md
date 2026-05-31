---
status: spark
topic: branching
---

# Story graph format and validation

## Problem

Branching fiction needs a concrete artifact that can be authored, validated, exported, and rendered elsewhere. The format has to be structured enough for graph checks and stateful choices, but not so elaborate that every story becomes a software project.

The first use case is static Elsewhere publishing, but the format should remain reusable for other fiction projects.

## Solution

Define the smallest useful story graph format. It should describe scenes, choices, edges, endings, metadata, and optional state. It should support validation that catches broken links, orphaned scenes, unreachable endings, accidental dead ends, and missing choice text.

The format should also leave room for story-facing concepts such as clues, suspects, tone notes, visual assets, and author comments without forcing every project to use them.

## Requirements

- Model scene nodes, choice edges, endings, and graph metadata.
- Support optional conditions and effects for stateful stories.
- Validate broken references, unreachable nodes, unreachable endings, orphaned scenes, accidental dead ends, and likely accidental loops.
- Export in a form another project can import and render statically.
- Avoid story-specific canon in the reusable format.
