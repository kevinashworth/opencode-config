import { Plugin } from "@opencode/plugin";

export default Plugin.define({
  id: "env-protection",
  async setup(ctx) {
    console.log("my .env protection plugin - initialized");

    await ctx.tool.hook("execute.before", (event) => {
      if (event.tool !== "read") return;

      const input = event.input;
      if (
        typeof input === "object" &&
        input !== null &&
        "filePath" in input &&
        typeof input.filePath === "string" &&
        input.filePath.includes(".env")
      ) {
        throw new Error("🛑 Do not read .env files");
      }
    });
  },
});
