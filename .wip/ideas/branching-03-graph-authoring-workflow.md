---
status: shaping
topic: branching
---

# Branching fiction authoring workflow

## Problem

The general graph authoring model now lives under the `graph-*` ideas. Branching fiction still needs a specialized workflow because the final result may expose multiple paths to the reader. It is not enough to explore alternatives; selected alternatives must become playable/readable choices, endings, loops, state changes, and static export data.

If the agent expands too much at once, the writer gets a giant blob. If the workflow asks for too much structure up front, the story dies before it begins. The system needs an authoring rhythm that lets the writer make meaningful decisions while the agent handles useful expansion and continuity work.

## Solution

Shape a Pi-native workflow for turning story exploration into a reader-facing branching story. Possible passes include premise, tone, reader promise, major endings, state model, first playable path, branch expansion, convergence passes, validation, and playtest summaries.

The agent should work one useful slice at a time: propose a node, choices, consequences, or branch direction; explain how it affects the larger reader experience; then let the writer accept, reshape, or reject. The workflow should make the next creative move obvious without forcing a rigid outline.

This workflow can use the broader graph machinery: gist-level exploration, Director/Narrator modes, Pi session forks, an authoring cockpit, and eventually durable graph records. Its branching-specific job is deciding what becomes reader-facing and ensuring the resulting static graph is coherent enough to publish.

## Requirements

- Support iterative branch generation rather than one-shot story generation.
- Help plan enough of the interactive story to guide expansion without killing discovery.
- Let the writer approve structural changes before large prose expansion.
- Make reader-facing choice text, state, consequences, and endings explicit.
- Include playtest-style passes that summarize paths, state changes, clues, and endings.
- Track which branches are exploratory only and which are accepted into the publishable interactive story.
- Keep the experience energetic and collaborative, not bureaucratic.
- Defer general graph navigation and Director/Narrator mechanics to the `graph-*` ideas unless branching-specific behavior is needed.
