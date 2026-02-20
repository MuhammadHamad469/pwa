if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"));
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    document.getElementById("installPopup").style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("installBtn");
  if(btn){
    btn.addEventListener("click", () => {
      document.getElementById("installPopup").style.display = "none";
      deferredPrompt.prompt();
    });
  }
});
