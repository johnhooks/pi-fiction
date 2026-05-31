---
status: shaping
topic: characters
depends_on:
  - characters-01-character-development-system
---

# Design the character creation flow

## Problem

The old character-profile workflow in `../writing` had the right creative feeling: walk with the user through a character, discover what matters, and write it down. But because the output was one expanding Markdown document, it got sloppy. The agent could add sections, grow YAML frontmatter, blur canon with notes, and treat discovery as document sprawl.

The new character folder system gives us better storage boundaries, but we still need the creation experience. A writer should not have to fill out a form or understand the folder architecture. They should feel like they are developing a character with an attentive creative partner.

We need a character creation flow that is conversational and playful for the user, but typed and validated behind the scenes so the extension can reliably generate the initial files.

## Solution

Build a guided character creation process as an extension flow.

The flow should combine three interaction styles:

1. **Bite-sized AI offers** that show one digestible piece of context at a time.
2. **Simple flow controls** such as continue, next option, revise, or add input.
3. **Conversational elaboration** when the writer wants to steer, reject, remix, or explain.
4. **Typed AI draft stages** where the extension asks the model for structured intermediate results, validates them, retries or repairs invalid output, then generates the character files.

Avoid dumping a menu of options into prose and asking the writer to answer by number. Pi UI should carry the selection flow where possible, while the agent presents only the current useful bite.

The typed stages are not the saved character records. They are temporary contracts for generating the records cleanly.

### Proposed flow

#### 1. Seed

Collect the initial spark.

Inputs may include:

- character name or placeholder
- story role
- genre/context if known
- a few words of vibe
- what the user already knows

If the user is unsure, offer choices rather than demanding answers.

Possible UI prompts:

- What kind of character are we making? protagonist, antagonist, ally, love interest, wildcard, mentor, ensemble member, unknown
- What should we find first? desire, wound, voice, relationship, contradiction, scene test

#### 2. Direction

Ask the AI to propose a small set of character directions internally, but show them to the user one bite at a time.

Temporary schema idea: `characterDirectionSetSchema`

Each option might include:

- title
- core appeal
- story function
- central contradiction
- pressure source
- why they could be fun to write

The UI should offer actions like:

- continue with this
- show next option
- revise this
- add my input
- surprise me

This reduces the reading burden. The writer should react to one vivid possibility, not grade a long list.

#### 3. Pressure probes

Use the selected direction to test the character under pressure, one probe at a time.

Temporary schema idea: `characterPressureProbeSetSchema`

Each probe should be a tiny scenario or question that reveals character rather than collecting biography.

Examples:

- Someone thanks them sincerely. How do they dodge it?
- Their rival offers help. What do they assume the catch is?
- They can get what they want by betraying a value. What happens?

The user can continue, ask for another probe, add input, or let the AI propose a likely answer. Do not present a full battery of probes unless requested.

#### 4. Voice audition

Ask the AI for several voice samples and contrast notes.

Temporary schema idea: `characterVoiceAuditionSchema`

Include:

- voice thesis
- sample lines
- internal monologue sample
- sounds like
- does not sound like
- what the voice hides

The user picks what feels alive and rejects what feels false.

#### 5. Draft record set

Ask the AI to produce a structured draft payload that can be validated before file generation.

Temporary schema idea: `characterCreationDraftSchema`

The payload should include enough structured material to generate:

- `character.json`
- `profile.md`
- `voice.md`
- starter `relationships.jsonl`
- starter `development.jsonl`
- starter `references.jsonl`
- `notes.md`

This payload is not stored directly. It is an intermediate tool-like result.

#### 6. Validate and repair

Validate the AI draft with Zod.

If invalid:

- retry once with the validation errors and the expected schema
- if still invalid, attempt a narrow repair if safe
- if repair would change creative meaning, ask the user

This should be rare, but the extension should be designed as if structured output can fail.

#### 7. Write files

Generate the character folder using fixed file templates and paths. Metadata goes into `character.json`. Prose goes into Markdown. Evolving history goes into JSONL.

The agent should not invent new files, frontmatter, or headings during initial creation unless the user explicitly asks.

#### 8. Review with the user

Show a concise summary:

- character essence
- strongest pressure point
- voice handle
- what files were created
- suggested next creative move

## Requirements

- Keep the user experience creative, not bureaucratic.
- Use Pi UI for flow controls such as continue, next, revise, or add input.
- Prefer one digestible creative bite at a time over long option lists.
- Define TypeBox schemas for intermediate AI generation stages, separate from saved file schemas.
- Validate AI structured responses before generating files.
- Retry invalid structured responses with validation feedback.
- Keep saved Markdown files free of uncontrolled YAML/frontmatter growth.
- Treat `character.json` as metadata, not character substance.
- Treat relationships, development, and references as JSONL logs.
- Allow partial characters. The flow should produce a useful starting point, not final completeness.
- Preserve the old workflow's strength: developing character through conversation and refinement.
- Avoid the old workflow's weakness: one Markdown file expanding forever.
