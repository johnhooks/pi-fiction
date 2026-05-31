---
status: shaping
topic: branching
---

# Public design arc for branching fiction

## Problem

The branching fiction feature is not just an internal tool idea. It is also a public creative arc: think through the concept in `../blog`, build the reusable authoring machinery in `pi-fiction`, use it for a real Elsewhere experiment in `../johnhooks`, then write about what changed after contact with the work.

Without an explicit arc, the pieces can drift apart. The blog post may promise a feature that does not match the implementation. The implementation may become too technical and lose the creative reason for existing. The Elsewhere story may become a one-off instead of teaching us what the framework should support.

## Solution

Treat the feature as a sequence of linked artifacts:

1. A pre-implementation design post in `../blog` about branching fiction as a visible graph.
2. A set of `pi-fiction` framework ideas that explore the authoring workflow, graph format, validation, and visual/storytelling possibilities.
3. A reusable `pi-fiction` implementation that helps a human and agent author a complete static graph.
4. A concrete Elsewhere implementation in `../johnhooks` that renders a finished story without runtime AI generation.
5. A follow-up post about what the original idea got right, what changed, and what the first real story taught us.

The public writing should stay honest about uncertainty. The pre-build post should not pretend the system exists. The follow-up should compare intention with reality.

## Requirements

- Keep `pi-fiction` focused on reusable creative machinery.
- Keep story-specific Elsewhere canon out of this repo.
- Let the blog posts discuss the process, tradeoffs, and discoveries without becoming implementation docs.
- Use the Elsewhere story as a real test, not as the only shape the framework can support.
