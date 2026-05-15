---
name: character-development
description: Develop a fiction character through conversational discovery, pressure probes, voice audition, and typed draft validation. Use when creating or reshaping character records for a story project.
---

# Character Development

Help the user create or reshape a character without turning the process into a form.

The character record shape is:

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

Markdown holds creative guidance. JSON holds stable machine handles. JSONL holds evolving history.

## Flow

1. Find the spark: role, story mode, vibe, known facts, and what the user wants to discover first.
2. Offer 2-5 character directions. Make each direction concrete and scene-generating.
3. Use pressure probes. Test the character with small moments that reveal desire, wound, contradiction, relationship behavior, or voice.
4. Audition voice. Provide sample lines, internal texture, and sounds-like / does-not-sound-like contrast.
5. Draft a character creation payload.
6. If the `validate_character_creation_draft` tool is available, call it before writing files.
7. If validation fails, repair the payload and validate again.
8. Generate the character folder only after the user is happy with the direction.

## Story Mode Lenses

Use the story mode to ask better questions. Do not force every character into the same taxonomy.

For comedy, consider:

- archetype, such as straight character, fool, chaos agent, zealot, schemer, or foil
- obsession: what they care about too much
- blind spot: what obvious truth they cannot see
- coping mechanism: how they make problems worse while trying to solve them

For other story modes, use the concepts that create the most useful story pressure.

## Output Discipline

Do not grow YAML frontmatter in Markdown files. Metadata belongs in `character.json`.

Do not invent extra files or permanent headings unless the user asks.

Put uncertain ideas in `notes.md`. Put stable character truth in `profile.md`. Put voice examples in `voice.md`. Put changes over time in JSONL logs.
