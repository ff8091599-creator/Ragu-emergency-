const CONTACT = '9597486117';
const I18N = {
 en: {
  sosHint:'Tap to start 5-second countdown', call:'Call Emergency Contact', sms:'SMS my location',
  voiceTitle:'Voice activation: “Ragu”', micStart:'Start listening', micStop:'Stop listening',
  voiceNote:'Works only while this page is open on screen. It cannot listen in the background or on a locked phone.',
  cancel:'CANCEL', ovText:'SOS activates in…', sentTitle:'SOS ready',
  sentText:'A website cannot place the call by itself. Tap Call to continue.', close:'Close', install:'Install app',
  st_off:'Off — not listening', st_ask:'Asking for microphone permission…', st_on:'Listening — say “Ragu”',
  st_hear:'Hearing voice…', st_heard:'“Ragu” heard!', st_denied:'Microphone blocked. Allow it in browser settings.',
  st_unsup:'Voice recognition is not supported in this browser. Use Chrome on Android.',
  st_insecure:'Microphone needs HTTPS. Host the app on a secure link.', st_bg:'Paused — page is in background', st_err:'Voice error',
  capTitle:'What works where', webTitle:'In this website', nativeTitle:'Needs a native Android app',
  web:['SOS button with cancel countdown','“Ragu” detection while page is open and on screen','Call button (opens the phone dialer)','SMS draft with location (you press send)','Tamil / English, install as PWA'],
  native:['Always-on “Ragu” listening in background or lock screen','Automatic call on a locked phone','Automatic SMS without pressing send','Power-button or shake trigger'],
  bridgeNo:'Native bridge: not connected (web mode)', bridgeYes:'Native bridge: connected',
  smsBody:'🚨 EMERGENCY! I need help. My location:', noloc:'location unavailable'
 },
 ta: {
  sosHint:'தொட்டால் 5 வினாடி கவுண்ட்டவுன் தொடங்கும்', call:'அவசர தொடர்பை அழை', sms:'என் இருப்பிடத்தை SMS அனுப்பு',
  voiceTitle:'குரல் செயல்பாடு: “ரகு”', micStart:'கேட்கத் தொடங்கு', micStop:'கேட்பதை நிறுத்து',
  voiceNote:'இந்தப் பக்கம் திரையில் திறந்திருக்கும் போது மட்டுமே வேலை செய்யும். பின்னணியிலோ பூட்டிய போனிலோ கேட்காது.',
  cancel:'ரத்து செய்', ovText:'SOS செயல்படும் வரை…', sentTitle:'SOS தயார்',
  sentText:'இணையதளத்தால் தானாக அழைக்க முடியாது. தொடர “அழை” தொடவும்.', close:'மூடு', install:'செயலியை நிறுவு',
  st_off:'அணைந்துள்ளது — கேட்கவில்லை', st_ask:'மைக் அனுமதி கேட்கப்படுகிறது…', st_on:'கேட்கிறது — “ரகு” என்று சொல்லுங்கள்',
  st_hear:'குரல் கேட்கிறது…', st_heard:'“ரகு” கேட்டது!', st_denied:'மைக் தடுக்கப்பட்டது. உலாவி அமைப்பில் அனுமதிக்கவும்.',
  st_unsup:'இந்த உலாவியில் குரல் அங்கீகாரம் இல்லை. Android Chrome பயன்படுத்தவும்.',
  st_insecure:'மைக்கிற்கு HTTPS தேவை. பாதுகாப்பான இணைப்பில் ஹோஸ்ட் செய்யவும்.', st_bg:'இடைநிறுத்தம் — பக்கம் பின்னணியில் உள்ளது', st_err:'குரல் பிழை',
  capTitle:'எது எங்கே வேலை செய்யும்', webTitle:'இந்த இணையதளத்தில்', nativeTitle:'Android செயலி தேவை',
  web:['SOS பட்டன் + ரத்து கவுண்ட்டவுன்','பக்கம் திறந்து திரையில் இருக்கும்போது “ரகு” கண்டறிதல்','அழைப்பு பட்டன் (டயலரைத் திறக்கும்)','இருப்பிடத்துடன் SMS வரைவு (நீங்கள் அனுப்ப வேண்டும்)','தமிழ் / ஆங்கிலம், PWA நிறுவல்'],
  native:['பின்னணி / லாக் ஸ்கிரீனில் தொடர்ந்து “ரகு” கேட்பது','பூட்டிய போனில் தானாக அழைப்பு','தானாக SMS அனுப்புதல்','பவர் பட்டன் / ஷேக் தூண்டல்'],
  bridgeNo:'Native bridge: இணைக்கப்படவில்லை (வெப் முறை)', bridgeYes:'Native bridge: இணைக்கப்பட்டது',
  smsBody:'🚨 அவசரம்! எனக்கு உதவி தேவை. என் இருப்பிடம்:', noloc:'இருப்பிடம் கிடைக்கவில்லை'
 }
};
