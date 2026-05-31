---
status: shaping
topic: story
depends_on:
  - source-01-rethink-writing-concepts
  - characters-02-character-creation-flow
---

# Design the story prototype flow

## Problem

The first test of `/character-create` jumped too far ahead. It asked the agent to develop a protagonist through comedy archetypes and pressure probes before the story itself existed.

That produced interesting material, but it lacked the grounding needed to make character choices meaningful: story shape, reader promise, tone, world, conflict, format, and creative appetite. A character cannot be fully developed in a vacuum unless the user only wants a standalone character sketch.

The old `../writing` process started with foundation documents, especially literary goals, style, world, and series bible. That protected coherence, but it could also feel too formal too early. We need the underlying wisdom without forcing the user into a document-heavy setup flow.

The new system needs iterative prototype phases:

1. story prototype
2. character prototype
3. deeper character/story records
4. planning and drafting support

The prototype stage should be loose, creative, and exploratory. It should help categorize the story, but not trap it in hard enums or premature schemas.

## Solution

Create a `story prototype` entry point before advanced character creation.

The story prototype is a light creative sketch, not a bible. It should give the agent enough orientation to help with characters, world, tone, and scenes while leaving the project open to discovery.

Possible command:

```text
/story-prototype
```

Possible package skill:

```text
story-prototype
```

The flow should help the user discover:

- the spark: what makes the story worth chasing
- reader promise: what experience the story should create
- current shape: short story, serial, novel, episode, sketch, unknown
- story mode tags: comedy, mystery, romance, horror, fantasy, literary, custom, blended, or agent-suggested
- tone and taste: what it should feel like, and what would ruin it
- central pressure: the conflict, contradiction, desire, world-rule, question, or relationship that generates scenes
- likely character needs: what kinds of people this story seems to require
- next creative move: character prototype, world sketch, premise pressure test, first scene, style exploration, or more story shaping

The agent should be allowed to propose categories, but those categories should be descriptive tags, not hard constraints. Story type should be treated as a lens that helps the agent ask better questions.

## Prototype Artifacts

The first artifact should probably be a concise Markdown file, not a rigid JSON schema:

```text
story.md
```

or:

```text
story/prototype.md
```

Potential shape:

```markdown
# Story Prototype

## Spark

## Reader Promise

## Current Shape

## Story Lenses

## Tone and Taste

## Central Pressure

## Character Needs

## Open Questions

## Next Best Moves
```

If we need machine-readable handles, use a small sidecar later:

```text
story.json
```

But the initial creative prototype should not be overtyped. It is meant to stay fluid.

## Relationship to Character Creation

Character creation should have two levels:

### Character prototype

Use when the story prototype is thin or when the user is just exploring. This creates a rough character sketch without committing to the full character folder.

It can ask:

- What role might this person play in the emerging story?
- What story pressure do they embody?
- What makes them fun to put in scenes?
- What voice or contradiction is immediately alive?

Output could be a short section inside the story prototype or a draft note in `characters/_prototypes/`.

### Character record creation

Use after the story has enough orientation to support durable records. This is where the existing character folder system belongs:

```text
characters/{slug}/character.json
characters/{slug}/profile.md
characters/{slug}/voice.md
characters/{slug}/relationships.jsonl
characters/{slug}/development.jsonl
characters/{slug}/references.jsonl
characters/{slug}/notes.md
```

The advanced character flow should read the story prototype first, then use story lenses to shape direction options, pressure probes, and voice auditions.

## Requirements

- Do not require hard story-type enums for creative planning. Use tags/lenses that can be suggested, blended, renamed, or ignored.
- Do not start with full character records unless the user already has a story context or explicitly wants a standalone character.
- Preserve the useful old idea of literary goals, but rename and soften it into reader promise and creative direction during prototyping.
- Avoid forcing foundation documents before play.
- Support rough prototypes that can later graduate into stable records.
- Let the agent categorize the story as a creative aid, not a validation gate.
- The character creation command should detect missing story context and offer to create or load a story prototype first.
- Typed schemas should be used for agent/tool handoffs only when structure is genuinely needed. The story prototype itself should stay mostly Markdown while we are discovering the shape.
