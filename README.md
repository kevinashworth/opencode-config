# OpenCode Global Config

This folder contains the global OpenCode configuration for this computer. It is meant to be edited directly when you want to change the default behavior of OpenCode across workspaces.

For more information, see <https://opencode.ai/docs/config/>

## Contents

- `opencode.json`: the main configuration file for permissions and other global settings.
- `package.json`: declares the local plugin dependency used by this config.
- `plugins/env-protection.js`: a custom plugin that blocks tool reads of `.env` files.
- `agents/`: stores custom agent definitions for specialized workflows and tasks.
- `skills/`: stores custom skill definitions for specialized workflows (e.g. code review, audit).

## Current Policy

The current configuration is intentionally restrictive around sensitive files and shell access:

- Read access is allowed in general, but `.env` and `*.env.*` files are denied.
- Editing files requires confirmation.
- Bash commands are generally prompted, with a few safe commands allowed.
- Web search, code search, and some other higher-risk actions require confirmation.

## Plugin Behavior

The `EnvProtection` plugin adds a guard before tool execution. If a `read` tool call targets a path containing `.env`, it throws an error to stop the read.

### How It Loads

`EnvProtection` is loaded automatically by OpenCode because it lives in the global plugins directory.

- OpenCode discovers local plugins in `~/.config/opencode/plugins/` at startup.
- The exported async function is invoked once when the plugin loads.
- The returned hook object registers hook handlers such as `tool.execute.before`, which OpenCode runs before tool execution.

## Notes

- This repository is a personal configuration directory, not an app project.
- If you change permissions here, the new defaults apply to OpenCode on this machine.
- I created this folder and the settings therein 2026-03-08 as part of `docker-opencode`
- I created this README, ran `git init` and the first commit on 2026-05-15.
- The `skills/` directory was added on 2026-06-26, containing skill definitions for atomic-commits, audit, code-review, code-simplifier, and grill-me.
