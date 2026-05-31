---
status: shaping
topic: ui
---

# Build a bite-sized creative flow pattern

## Problem

The first character-creation test produced too much text at once. Even when the ideas were good, the writer had to read, compare, and judge a pile of options before the story had momentum.

This is not specific to character development. Story prototyping, worldbuilding, style discovery, scene planning, revision, and continuity work can all overwhelm the writer if the agent dumps a long menu of possibilities.

The framework needs a reusable Pi-native interaction pattern for creative exploration: show one useful bite, let the human respond, then continue, revise, skip, or add input.

## Solution

Create a reusable "creative bite" flow pattern for extension commands and tools.

The agent generates a small set of possibilities internally, but the UI presents one digestible piece at a time. The human should not be asked to grade a long list in prose.

A creative bite should include:

- a short title or handle
- a compact summary
- why it might be useful or alive
- one optional detail, example, or question
- available actions

Common actions:

- continue with this
- next option
- revise this
- add input
- surprise me
- stop here

This pattern should be available to all creative planning flows, not just characters.

## Requirements

- Keep each bite small enough to understand quickly.
- Use Pi UI controls for actions where possible.
- Let the user add freeform input at any point.
- Allow the agent to generate multiple possibilities internally without dumping them all into chat.
- Preserve discarded or skipped ideas only when useful, likely as notes or session state, not as permanent canon.
- Support story prototype, character prototype, worldbuilding, style exploration, scene planning, and review flows.
- Avoid rigid wizard behavior. The user can meander, stop, or jump sideways.
- Pair this pattern with typed intermediate schemas when the agent needs structured output behind the scenes.
