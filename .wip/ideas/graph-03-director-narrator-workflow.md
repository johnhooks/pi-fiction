---
status: shaping
topic: graph
---

# Director and narrator workflow

## Problem

The Director/Narrator split is larger than branching fiction. It is a general way to keep creative control and story performance from contaminating each other.

Many fiction tasks mix two different modes:

- deciding what the story should do
- writing the story as if it is happening

A normal conversation often blends these together. Planning notes, rejected ideas, critique, graph metadata, and file paths sit beside prose. That can be useful for reasoning, but it can weaken the next story continuation. The agent may keep seeing scaffolding when what the scene needs is voice, momentum, and immersion.

Branching fiction makes the problem visible because forks and alternate paths are explicit, but the same issue appears in linear drafting, scene revision, exploratory variants, character moments, and premise development.

## Solution

Treat Director and Narrator as reusable authoring modes that can be used in different contexts.

- **Director mode** is for the human-facing control conversation: intent, taste, constraints, structure, graph movement, critique, acceptance, rejection, and next instructions.
- **Narrator mode** is for story performance: continuing the fiction, drafting a scene, trying a variant, or embodying the current story path with minimal meta-noise.

The feature should be flexible enough to support experiments:

- a lightweight single-session version where the extension switches prompts or cards between Director-like and Narrator-like moments
- a fork-based version where Pi session branches become alternate story attempts
- a multi-session version where Director and Narrator are separate threads and Narrator output is brought back into Director for review
- a future durable version where accepted material is written into story graph records or files

The key is not to assume one architecture too early. We need to test whether this separation actually improves story work.

## Relationship to graph authoring

The graph extension can use Director/Narrator modes naturally:

1. In Director mode, the author chooses the current story point, branch, constraint, or desired experiment.
2. The extension builds a compact Narrator direction packet from the active path or selected node.
3. In Narrator mode, the agent writes the next gist, beat, scene, or variant.
4. The author can walk back, fork, retry with a different direction, or accept the result.
5. Accepted material can remain in session history at first, then later be promoted into durable graph records.

This works for reader-facing branching fiction, but it also works for linear story development where branches are author-facing possibilities.

## Early experiment

The first experiment should probably stay lightweight. It may not need separate Director and Narrator sessions. It can begin as a graph/gist workflow that uses Pi's existing conversation tree:

- Director-like prompts decide what kind of continuation to try.
- Narrator-like assistant responses provide compact story continuations.
- Forking and walking back create alternate attempts.
- The active path summary keeps the current story line coherent.

If this feels promising but the transcript becomes polluted by too much meta-discussion, then separate Director and Narrator threads become more compelling.

## Requirements

- Treat Director/Narrator as reusable modes, not only as a branching-fiction feature.
- Support lightweight experiments before committing to a multi-session architecture.
- Let graph workflows use Pi forks and session-tree navigation to explore alternate attempts.
- Keep story performance cleaner when the author wants immersive continuation.
- Bring Narrator output back to the Director context when separate threads are used.
- Let the author inspect, reject, retry, fork, or accept Narrator output.
- Do not require durable storage for the first experiment, but leave room to promote accepted material into graph records later.
- Evaluate whether the split genuinely improves fiction work before making it core doctrine.
