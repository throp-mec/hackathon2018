
export function init() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service.bundle.js')
      .then(() => {
       console.log("Service Worker Registered");
      });
  }
  else {
    console.warn("Couldn't register service worker");
  }
}
