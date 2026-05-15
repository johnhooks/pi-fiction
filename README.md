# pi-fiction

Pi fiction-writing extension workspace.

This repository is currently used as a local Pi extension workspace, not as a published package. Build it locally before loading the extension from this checkout.

The previous story-building prompts, skills, templates, and generated workflow assets have been removed so the project can be rebuilt from the ground up.

## Current State

Kept:

- TypeScript package/build setup
- linting and formatting config
- tests
- package entry point

Removed:

- story-building prompts
- serial-fiction skill
- story templates
- generated distribution output

New workflow assets should be reintroduced deliberately after planning.

## Local Use

```bash
pnpm install
pnpm build
```

The `/gist` extension currently imports built output from `dist/`, so a fresh checkout needs a local build before that extension is loaded.

## License

Copyright (C) 2026 johnhooks

This project is licensed under the GNU General Public License version 2 or later. See [LICENSE](LICENSE).
