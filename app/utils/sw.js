if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
  console.log("Service Worker Registered");
} else {
  console.log("Service Worker Registration Failed");
}
