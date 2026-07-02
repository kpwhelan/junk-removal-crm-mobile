let logoutHandler: (() => void) | null = null;

export function registerLogoutHandler(handler: () => void) {
  logoutHandler = handler;
}

export function triggerLogout() {
  logoutHandler?.();
}