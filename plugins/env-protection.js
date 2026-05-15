export const EnvProtection = async () => {
  console.log("🛡️ EnvProtection plugin initialized.");
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool === "read" && output.args.filePath.includes(".env")) {
        throw new Error("🛑 Do not read .env files");
      }
    },
  };
};
