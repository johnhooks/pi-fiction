---
status: draft
---

# Choose your own adventure builder

## Problem

Pi Fiction does not yet have a reusable way to help writers build branching fiction. A choose your own adventure story needs more than prose generation. It needs a complete graph of scenes, choices, endings, continuity, and dead-end checks before the story is published.

The first motivating use case is a funny, dark WordPress murder mystery for johnhooks.io Elsewhere. The website should not generate story content on demand. The full story graph should be authored ahead of time with AI assistance, validated, exported, and rendered as static content.

## Proposed solution

Add a Pi Fiction workflow for building complete branching story graphs with a human writer and an AI collaborator. The workflow should help develop the premise, shape the mystery, create scenes and choices, keep continuity coherent, and produce a validated graph that can be exported for another project to render.

The builder should treat AI as an authoring partner, not a runtime dependency. It should help create the whole story before deployment, including all branches and endings. It should make graph problems visible without turning the creative process into bookkeeping.

## Requirements

- Support static, pre-authored story graphs with no runtime AI generation.
- Represent scenes, choices, endings, and metadata in a format that can be validated and exported.
- Detect broken links, orphaned scenes, unreachable endings, and accidental dead ends.
- Provide enough structure to support a murder mystery with clues, suspects, reveals, and tonal consistency.
- Keep story-specific canon outside the reusable Pi Fiction framework, except for small generic examples if needed.
- Make the exported graph practical for johnhooks.io Elsewhere to import and render.
