let deferredPrompt;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(reg => console.log("SW registered", reg))
    .catch(err => console.log("SW registration failed", err));
}

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt fired"); // Check this in DevTools!
  
  // Prevent Chrome from showing default banner
  e.preventDefault();
  
  // Save the event for later
  deferredPrompt = e;

  // Show your custom install button
  document.getElementById("installContainer").style.display = "block";
});

// Install button click
document.getElementById("installBtn")?.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  // Show the native install prompt
  deferredPrompt.prompt();
  
  const { outcome } = await deferredPrompt.userChoice;
  console.log("User choice:", outcome);
  
  // Clear the prompt
  deferredPrompt = null;
  document.getElementById("installContainer").style.display = "none";
});

// Optional: Close button
document.getElementById("closeBtn")?.addEventListener("click", () => {
  document.getElementById("installContainer").style.display = "none";
  deferredPrompt = null; // User dismissed
});