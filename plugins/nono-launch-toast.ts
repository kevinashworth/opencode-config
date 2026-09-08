import type { Plugin } from "@opencode-ai/plugin";

const TOAST_DURATION_MS = 120_000;

function launchedViaNono(): boolean {
  return Boolean(process.env.NONO_CAP_FILE || process.env.NONO_SESSION_ID);
}

export const NonoLaunchToast: Plugin = async ({ client }) => {
  console.log("my nono reminder plugin - initialized");
  if (launchedViaNono()) return {};

  let shown = false;
  const showToast = async () => {
    if (shown) return;
    shown = true;
    await client.tui.showToast({
      body: {
        variant: "error",
        title: "there is no nono - oh no!",
        message:
          "This OpenCode session was started directly, not via nono. OS-level sandboxing is inactive. Consider restarting with nono!",
        duration: TOAST_DURATION_MS,
      },
    });
  };

  return {
    event: async ({ event }) => {
      if (
        event.type === "server.connected" ||
        event.type === "session.created"
      ) {
        await showToast();
      }
    },
  };
};
