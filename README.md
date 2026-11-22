# OpenCode Global Config

This folder contains the global OpenCode configuration for this computer. It is meant to be edited directly when you want to change the default behavior of OpenCode across workspaces.

For more information, see <https://opencode.ai/docs/config/>

## Contents

- `opencode.json`: the main configuration file for ordered V2 permissions and potentially other global settings.
- `package.json`: declares the `@opencode/plugin` dependency used by local plugins.
- `agents/`: custom agent definitions for specialized workflows and tasks.
- `commands/`: custom commands to run from the prompt inside OpenCode.
- `skills/`: custom skill definitions (e.g. code review, atomic commits, etc.).
- `plugins/`: custom plugins that launch every time OpenCode starts.

## Current

### Commands

Currently all commands start with '/resume' and are for my job hunt. These are git-ignored.

### Plugins

The plugins load automatically because they live in the global `/plugins` directory and use the native V2 plugin API (`Plugin.define` with `setup`).

#### env-protection

- `plugins/env-protection.js`: a custom plugin that blocks tool reads of `.env` files.
- `setup` registers a handler for the V2 `tool.execute.before` hook. If a `read` tool call targets a path containing `.env`, it throws an error to stop the read.
- The current configuration is intentionally restrictive around sensitive files and shell access: Read access is allowed in general, but reading `.env` and `*.env.*` files are denied. Virtually identical permissions exist in `opencode.json`, so this is another layer of protection.

#### nono-launch-toast

- `plugins/nono-launch-toast/`: a custom plugin with a server part (`index.ts`) and a TUI part (`tui.tsx`). The TUI part displays a toast notification when OpenCode is launched directly, not via a `nono run ...` shell command.

## nono-sandbox

`nono` restricts filesystem access. Tool calls that fail should result in an explanation of the failure and some options for resolving it.

## Notes

- This repository is a personal configuration directory, not an app project.
- If you change permissions here, the new defaults apply to OpenCode on this machine.

## History of this README

- I created this README, ran `git init` and the first commit on 2026-05-15.
- The `agents/` and `plugins/` directories were added that same first day.
- The `skills/` directory was added on 2026-06-26, containing skill definitions for atomic-commits, audit, code-review, code-simplifier, and grill-me. I have added more since then.
- The `commands/` directory was added on 2026-08-31, but see `.gitignore` - resume commands are local-only (not published).

## Misc notes to self

2026-09-07
To add a plugin that is a folder, use the native V2 `plugins` entry with the directory path. V2 requires configured local paths to be directories and loads `index.ts` from it.
"plugins": [{ "package": "./plugins/foo" }],
