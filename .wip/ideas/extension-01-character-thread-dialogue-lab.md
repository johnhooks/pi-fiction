---
status: spark
topic: extension
---

# Character thread dialogue lab

## Problem

Dialogue is hard partly because every character needs a separate pressure system: wants, defenses, attention, rhythm, blind spots, secrets, and a private sense of what the scene is about. A single assistant can draft dialogue, but it often collapses into one authorial intelligence puppeting everyone. Characters may sound distinct for a few lines, then converge.

The wild idea: what if Pi could support fiction-specific subagents that are not generic workers, but character presences with their own threads? They could argue, interrupt, misunderstand, pursue private goals, and generate dialogue from collision rather than from one flattened outline.

This is interesting if it helps a writer hear characters become alive. It becomes insane if it tries to simulate full autonomous people, creates unmanageable context sprawl, or lets character agents seize control of the story from the writer.

## Solution

Explore a Pi-native "dialogue lab" where a writer can temporarily convene character-thread participants for a scene.

Each character thread would carry a focused packet of playable context:

- what the character wants in this scene
- what they refuse to say directly
- what they think is happening
- their voice handle and speech habits
- their relationship pressure with the other participants
- any scene-specific secret, fear, or tactic

The writer stays director. The system should not become an autonomous roleplay room. Instead, it should help stage character collision:

1. The writer names a scene situation and participating characters.
2. The extension prepares a small private brief for each character thread.
3. Character threads produce intent, subtext, and candidate lines from their own angle.
4. A conductor/editor thread shapes the exchange into readable scene dialogue.
5. The writer can ask any character, "why did you say that?", "what are you hiding?", "what would make you snap?", or "try the line again but more guarded."

The most useful version may not require full subagent infrastructure at first. A prototype could emulate character threads as separated prompts, stored briefs, or turn-based model calls. The important experience is the feeling of multiple character pressures colliding while the writer remains in charge.

Important doubt: this may not produce interesting story material by itself. A writer creates meaning by choosing context, shape, escalation, omission, timing, and consequence. Spontaneous character acting without a strong sense of the scene being written could become weird improv noise: lively in the moment, but disconnected from the story's purpose. Any useful version must serve the writer's scene intention rather than pretending autonomous character chatter is inherently good fiction.

## Requirements

- Treat this as a dialogue and scene-drafting aid, not a general multi-agent society.
- Do not assume spontaneous character-agent conversation makes good story; it must be anchored to the writer's scene purpose.
- Keep character threads temporary and scene-scoped unless the writer chooses to save discoveries.
- Preserve the writer as director/editor with clear controls to pause, redirect, rewind, or dismiss a character thread.
- Separate private character intent from final prose; not every generated motive belongs in the manuscript.
- Avoid context explosion by using compact playable briefs instead of full character dossiers.
- Include a conductor/editor role to turn raw character collisions into coherent scene text.
- Support interrogation of a character thread for subtext, resistance, alternate lines, and emotional logic.
- Prototype the creative experience before committing to Pi-level subagent architecture.
