## Shell command output

- Never emit `echo "---..."` banners or any dashed/dotted separator lines
  (e.g. `---`, `--- RUN ---`) to delimit sections of terminal output. To
  repeat, never emit triple dashes.
- When a section delimiter is genuinely useful, use a run of `+` only,
  e.g. `echo "+++ RUN +++"`. Do not use `-`, `=`, `#`, `*`, `?`, `[`, `]`,
  `{`, `}`, `~`, or `!`, which carry shell meaning.
  - Do not chain unrelated commands with `echo` separators. Run them as
  separate commands; if a single invocation is truly needed, join with `;`
  and no decorative text.
  