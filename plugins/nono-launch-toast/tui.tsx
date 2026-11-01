import { Plugin } from "@opencode/plugin/tui";

const TOAST_DURATION_MS = 120_000;

function launchedViaNono(): boolean {
  return Boolean(process.env.NONO_CAP_FILE || process.env.NONO_SESSION_ID);
}

export default Plugin.define({
  id: "nono-launch-toast",
  setup(context) {
    if (launchedViaNono()) return;

    context.ui.toast.show({
      title: "there is no nono - oh no!",
      message:
        "This OpenCode session was started directly, not via nono. OS-level sandboxing is inactive. Consider restarting with nono!",
      variant: "error",
      duration: TOAST_DURATION_MS,
    });
  },
});
