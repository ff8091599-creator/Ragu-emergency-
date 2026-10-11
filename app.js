(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
let lang = localStorage.getItem('ragu-lang') || 'en';
const t = k => I18N[lang][k];
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null, want = false, state = 'off', detail = '';
let timer = null, left = 0;
const WAKE = /\b(ragu|raghu|ragoo|raku)\b|ரகு|ராகு|ரகூ/i;
const vib = p => navigator.vibrate && navigator.vibrate(p);

/* ---------- language ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-i]').forEach(e => e.textContent = t(e.dataset.i));
  $$('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  $('#webList').innerHTML = t('web').map(x => `<li>${x}</li>`).join('');
  $('#nativeList').innerHTML = t('native').map(x => `<li>${x}</li>`).join('');
  $('#bridge').textContent = window.RaguNative ? t('bridgeYes') : t('bridgeNo');
  renderVoice();
}
$$('[data-lang]').forEach(b => b.onclick = () => {
  lang = b.dataset.lang; localStorage.setItem('ragu-lang', lang); applyLang();
  if (want) { try { rec.abort(); } catch {} }  // onend restarts with new language
});

/* ---------- SOS countdown ---------- */
const show = s => $(s).hidden = false, hide = s => $(s).hidden = true;
function startSOS() {
  if (timer) return;
  left = 5; $('#count').textContent = left; show('#overlay'); vib(150);
  timer = setInterval(() => {
    left--;
    if (left <= 0) { clearInterval(timer); timer = null; hide('#overlay'); activate(); }
    else { $('#count').textContent = left; vib(120); }
  }, 1000);
}
function cancelSOS() { clearInterval(timer); timer = null; hide('#overlay'); vib(0); }
function activate() {
  if (window.RaguNative && window.RaguNative.triggerSOS) { window.RaguNative.triggerSOS(CONTACT); return; }
  show('#sent'); vib([300, 100, 300]);
  location.href = 'tel:' + CONTACT;   // opens dialer; the user still presses Call
}
$('#sos').onclick = startSOS;
$('#cancel').onclick = cancelSOS;
$('#closeSent').onclick = () => hide('#sent');

/* ---------- SMS with location (user must press send) ---------- */
function openSms(extra) { location.href = 'sms:' + CONTACT + '?body=' + encodeURIComponent(t('smsBody') + ' ' + extra); }
$$('.sms').forEach(b => b.onclick = () => {
  if (!navigator.geolocation) return openSms(t('noloc'));
  navigator.geolocation.getCurrentPosition(
    p => openSms(`https://maps.google.com/?q=${p.coords.latitude},${p.coords.longitude}`),
    () => openSms(t('noloc')), { timeout: 8000, enableHighAccuracy: true });
});

/* ---------- voice (Web Speech API: foreground only) ---------- */
function setState(s, d) { state = s; detail = d || ''; renderVoice(); }
function renderVoice() {
  $('#voice').dataset.state = state;
  $('#voiceStatus').textContent = t('st_' + state) + ((state === 'err' || state === 'hear') && detail ? ': ' + detail : '');
  $('#micBtn').textContent = want ? t('micStop') : t('micStart');
}
async function startVoice() {
  if (window.RaguNative && window.RaguNative.startListening) { want = true; setState('ask'); window.RaguNative.startListening(); return; }
  if (!SR) return setState('unsup');
  if (!window.isSecureContext) return setState('insecure');
  setState('ask');
  try { (await navigator.mediaDevices.getUserMedia({ audio: true })).getTracks().forEach(x => x.stop()); }
  catch { return setState('denied'); }
  want = true; begin();
}
function begin() {
  rec = new SR(); rec.continuous = true; rec.interimResults = true;
  rec.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
  rec.onstart = () => setState('on');
  rec.onspeechstart = () => setState('hear');
  rec.onspeechend = () => want && setState('on');
  rec.onresult = e => {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (WAKE.test(e.results[i][0].transcript)) { setState('heard'); startSOS(); try { rec.abort(); } catch {} return; }
    }
  };
  rec.onerror = e => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { want = false; setState('denied'); }
    else if (e.error !== 'no-speech' && e.error !== 'aborted') setState('err', e.error);
  };
  rec.onend = () => {
    if (want && !document.hidden) setTimeout(() => { if (want) try { begin(); } catch {} }, 300);
    else setState(want ? 'bg' : 'off');
  };
  try { rec.start(); } catch (e) { setState('err', e.message); }
}
function stopVoice() { want = false; if (window.RaguNative && window.RaguNative.stopListening) window.RaguNative.stopListening(); try { rec && rec.abort(); } catch {} setState('off'); }
$('#micBtn').onclick = () => want ? stopVoice() : startVoice();
document.addEventListener('visibilitychange', () => {
  if (!want) return;
  if (document.hidden) { try { rec.abort(); } catch {} }
  else if (state === 'bg') begin();
});

/* ---------- PWA ---------- */
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
let deferred = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; $('#installBtn').hidden = false; });
$('#installBtn').onclick = async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; $('#installBtn').hidden = true; };
addEventListener('appinstalled', () => $('#installBtn').hidden = true);

/* ---------- hooks for a future native Android app (WebView) ----------
   Native -> web: window.RaguUI.startSOS() / cancelSOS()
   Web -> native: window.RaguNative.triggerSOS(number) via addJavascriptInterface */
let hearT = null;
window.RaguUI = { startSOS, cancelSOS, nativeStatus: (s, d) => {
  if (s === 'off') want = false;
  setState(s, d); clearTimeout(hearT);
  if (s === 'hear') hearT = setTimeout(() => want && setState('on'), 2500);
} };
I18N.en.st_loading = 'Downloading voice model (one time, ~40 MB)…';
I18N.ta.st_loading = 'குரல் மாடல் பதிவிறக்கம் (ஒரு முறை, ~40 MB)…';
if (window.RaguNative) {
  I18N.en.voiceNote = 'Runs in the background with a notification, even when the screen is locked. Set battery to Unrestricted.';
  I18N.ta.voiceNote = 'நோட்டிபிகேஷனுடன் பின்னணியில் இயங்கும்; திரை பூட்டியிருந்தாலும் வேலை செய்யும். Battery-ஐ Unrestricted ஆக வைக்கவும்.';
}

if (!SR && !window.RaguNative) setState('unsup');
applyLang();
})();
