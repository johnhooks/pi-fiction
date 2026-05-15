# Character Records

Characters in `pi-fiction` are living creative records, not static dossiers.

The record should help a human and AI collaborator write someone who feels alive: pressure, contradiction, voice, memory, and changing relationships. It should preserve what matters without turning character creation into data entry.

## Folder Shape

```text
characters/{character-slug}/
├── character.json
├── profile.md
├── voice.md
├── relationships.jsonl
├── development.jsonl
├── references.jsonl
└── notes.md
```

## File Roles

### `character.json`

Small machine-readable manifest: name, slug, document paths, tags, and discovery metadata.

Do not put the character's soul here.

### `profile.md`

Stable character core: essence, story role, want, need, wound, contradictions, pressure points, values, blind spots, and practical do/avoid guidance.

This should answer: what helps us write this character better today?

### `voice.md`

Prose-rich voice guide: how they speak, how they think, how they avoid truth, dialogue habits, internal texture, sample lines, and sounds-like / does-not-sound-like contrasts.

Voice needs examples, not just labels.

### `relationships.jsonl`

Living relationship log. Relationships have history, recency, weight, and scene relevance, so the source of truth should be appendable and filterable.

Records should link to other character slugs and capture shifts in trust, tension, affection, conflict, or current state.

Human-readable relationship summaries should usually be generated on demand for a scene or context packet.

### `development.jsonl`

Living log of internal character change: decisions, revelations, belief shifts, altered goals, new fears, broken assumptions, and state after major moments.

This tracks what should not reset between scenes.

### `references.jsonl`

Cross-links to useful story material: voice examples, plot moments, world facts, callbacks, backstory anchors, or scenes worth loading later.

### `notes.md`

Messy scratchpad for possibilities, fragments, doubts, jokes, and experiments. Not canon until promoted elsewhere.

## Core Principle

Markdown holds creative guidance. JSON holds stable machine handles. JSONL holds evolving history.

Type the handles, not the soul.
