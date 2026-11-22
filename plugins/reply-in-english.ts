export default {
  id: "reply-in-english",
  async setup(ctx: any) {
    await ctx.session.hook("context", (event: any) => {
      const system = event.system ?? (event.system = [])
      system.push({ type: "text", text: "Reply to the user in English." })
    })
  },
}
