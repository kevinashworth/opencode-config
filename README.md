# Opencode Global Config

This folder contains the global Opencode configuration for this computer. It is meant to be edited directly when you want to change the default behavior of Opencode across workspaces.

## Contents

- `opencode.json`: the main configuration file for permissions and other global settings.
- `package.json`: declares the local plugin dependency used by this config.
- `plugins/env-protection.js`: a custom plugin that blocks tool reads of `.env` files.

## Current Policy

The current configuration is intentionally restrictive around sensitive files and shell access:

- Read access is allowed in general, but `.env` and `*.env.*` files are denied.
- Editing files requires confirmation.
- Bash commands are generally prompted, with a few safe commands allowed.
- Web search, code search, and some other higher-risk actions require confirmation.

## Plugin Behavior

The `EnvProtection` plugin adds a guard before tool execution. If a `read` tool call targets a path containing `.env`, it throws an error to stop the read.

### How It Loads

`EnvProtection` is loaded automatically by Opencode because it lives in the global plugin directory: `plugins/env-protection.js`.

- Opencode discovers local plugins in `~/.config/opencode/plugins/` at startup.
- The exported async function is invoked once when the plugin loads.
- The returned hook object registers hook handlers such as `tool.execute.before`, which Opencode runs before tool execution.

## Notes

- This is a personal configuration directory, not an app project.
- If you change permissions here, the new defaults apply to Opencode on this machine.
- Created this folder and the settings therein 2026-03-08 as part of `docker-opencode`
- Created this README, ran `git init` and the first commit on 2026-05-15.
