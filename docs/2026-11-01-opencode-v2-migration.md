# OpenCode V2 Configuration Migration

**Date:** 2026-11-01

Migrated the global OpenCode configuration in `~/.config/opencode` from the V1 format to the native V2 format. The migration preserved existing permissions, agents, commands, skills, plugins, and unrelated settings.

## Configuration

### `opencode.json`

- Replaced the V1 `permission` object with an ordered V2 `permissions` array.
- Mapped V1 action names to their V2 equivalents:

  | V1 | V2 |
  | --- | --- |
  | `bash` | `shell` |
  | `task` | `subagent` |
  | `edit`, `read`, `glob`, `grep`, `webfetch`, `websearch`, `external_directory`, `skill` | unchanged |

- Preserved all existing shell command rules, including their allow/ask/deny effects and ordering.
- Preserved legacy V1 permission actions (`codesearch`, `doom_loop`, `lsp`, `list`, `todoread`) as V2 custom action names. V2 permission actions are free-form strings, so these remain valid even though they are not current core actions.
- Kept the V1 external-directory prompt by retaining the `external_directory` rule with `ask`.
- Added `experimental.todo: true` to preserve V1 todo behavior, since todos are disabled by default in V2.
- Kept the existing read protections for `.env`, `*.env.*`, and `*.env.example`.

### File-based definitions

#### Agents

Converted both agent frontmatters from the V1 `permission` object to the native V2 `permissions` list.

Before:

```yaml
mode: subagent
permission:
  edit: deny
```

After:

```yaml
mode: subagent
permissions:
  - action: edit
    resource: "*"
    effect: deny
```

Applied to:

- `agents/code-reviewer.md`
- `agents/security-engineer.md`

The agent bodies and descriptions were left unchanged.

#### Commands

No changes were required. The existing command frontmatter already uses V2-compatible fields such as `description` and `agent`.

#### Skills

No changes were required. Existing `SKILL.md` files and supporting resources remain in the V2-preferred `skills/<skill-id>/SKILL.md` layout.

## Plugins

Updated all local plugins to the V2 `Plugin.define({ id, setup })` API.

### `env-protection`

- Converted `plugins/env-protection.js` from the V1 returned-hook object to V2 `ctx.tool.hook("execute.before")`.
- The plugin still blocks `read` tool calls whose `filePath` contains `.env`.

### `nono-sandbox`

- Converted `plugins/nono-sandbox.ts` to the V2 plugin API.
- Replaced the V1 `experimental.chat.system.transform` hook with `ctx.session.hook("context")`.
- Replaced the V1 `tool` map with `ctx.tool.transform(...)` for the `nono_status` tool.
- Replaced the V1 `tool.execute.after` hook with `ctx.tool.hook("execute.after")`.
- Preserved the sandbox-denial detection, guidance text, and credential/network/filesystem diagnostics.

### `nono-launch-toast`

- Converted the single V1 plugin file into a V2 local plugin package:
  - `plugins/nono-launch-toast/index.ts` — server part
  - `plugins/nono-launch-toast/tui.tsx` — TUI part
- The TUI part displays the existing error toast when OpenCode is launched directly instead of through `nono`.
- V2 server plugins do not receive `server.connected`, so the toast now appears when the TUI plugin initializes rather than on the first server or session event. The intended warning behavior is preserved.

The previous `plugins/nono-launch-toast.ts` file was removed. V2 discovers local plugins from direct `.ts`/`.js` files and immediate plugin package directories under `~/.config/opencode/plugins/`.

## Dependencies

Replaced the V1 plugin dependency with the V2 package:

```diff
- "@opencode-ai/plugin": "1.14.20"
+ "@opencode/plugin": "2.2.5"
```

`package-lock.json` was updated accordingly.

## Documentation

Updated `README.md` to:

- Describe the V2 ordered permissions format.
- Reference the `@opencode/plugin` dependency.
- Document the V2 plugin API and new `nono-launch-toast` layout.
- Replace the old V1 folder-plugin example with the V2 `plugins` entry syntax.

## Unchanged

- `cli.json` was already in the native V2 format.
- `service.json` and unrelated settings were untouched.
- Command and skill content was left intact.
- All unrelated global configuration was preserved.

## Validation

The following checks passed after the migration:

- `opencode plugin list` — all three plugins load from their new locations:

  ```text
  env-protection     local    /Users/kevin/.config/opencode/plugins/env-protection.js
  nono-launch-toast  local    /Users/kevin/.config/opencode/plugins/nono-launch-toast
  nono-sandbox       local    /Users/kevin/.config/opencode/plugins/nono-sandbox.ts
  ```

- `opencode debug agents` — both custom agents load with the expected `edit: deny` permission.
- `opencode api command.list` — all resume commands are still available.
- `opencode api skill.list` — all skills are still available.
- JSON validation for `opencode.json` and `package.json`.
- `git diff --check` passes.
