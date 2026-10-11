# RAGU EMERGENCY (frontend + PWA)
Open via **HTTPS** (Netlify Drop, GitHub Pages, Vercel) — microphone, service worker and install need a secure link. Emergency number is set in `js/i18n.js` (`CONTACT`) and in the `tel:` links in `index.html`.

## Web (this project)
SOS + 5s cancel countdown, "Ragu" detection only while page is open on screen (Web Speech API, Chrome Android), call button opens dialer, SMS draft with location, Tamil/English, PWA install.

## Needs native Android app
Background/lock-screen "Ragu" listening (foreground service + wake-word engine), automatic calling (CALL_PHONE), silent SMS, power-button trigger.

## Native hooks already in the UI
Web -> native: `window.RaguNative.triggerSOS(number)` (expose with `addJavascriptInterface`).
Native -> web: `window.RaguUI.startSOS()` / `cancelSOS()`.
