// The V2 plugin loader validates the default export by shape: `id` plus a
// `setup` function. `Plugin.define` from "@opencode/plugin" is only an
// identity helper, so the object literal is exported directly to keep this
// plugin self-contained (no dependency on node_modules). This matches the
// style used by the pack-managed nono-sandbox plugin.
export default {
  id: "reply-in-english",
  async setup(ctx: any) {
    // v2 entrypoint: OpenCode calls setup(ctx); hooks registered here are
    // scoped to the plugin and disposed on unload.
    await ctx.session.hook("context", (event: any) => {
      const system = event.system ?? (event.system = [])
      system.push({ type: "text", text: "Reply to the user in English." })
    })
  },
}
