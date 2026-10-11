package com.ragu.emergency

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import org.json.JSONObject

class MainActivity : Activity() {
    private lateinit var web: WebView

    override fun onCreate(b: Bundle?) {
        super.onCreate(b)
        window.statusBarColor = Color.BLACK; window.navigationBarColor = Color.BLACK
        web = WebView(this); web.setBackgroundColor(Color.BLACK); setContentView(web)
        web.settings.javaScriptEnabled = true; web.settings.domStorageEnabled = true
        web.addJavascriptInterface(Bridge(), "RaguNative")
        web.webViewClient = WebViewClient()
        web.loadUrl("file:///android_asset/www/index.html")
        Bus.onStatus = { s, d ->
            runOnUiThread { web.evaluateJavascript("RaguUI.nativeStatus(${JSONObject.quote(s)},${JSONObject.quote(d)})", null) }
        }
        requestPermissions(arrayOf(Manifest.permission.RECORD_AUDIO, Manifest.permission.CALL_PHONE, Manifest.permission.POST_NOTIFICATIONS), 1)
    }

    override fun onDestroy() { Bus.onStatus = null; super.onDestroy() }

    inner class Bridge {
        @JavascriptInterface fun startListening() = runOnUiThread { startForegroundService(Intent(this@MainActivity, RaguService::class.java)) }
        @JavascriptInterface fun stopListening() = runOnUiThread { startService(Intent(this@MainActivity, RaguService::class.java).setAction("STOP")) }
        @JavascriptInterface fun triggerSOS(number: String) = runOnUiThread { placeCall(this@MainActivity) }
        @JavascriptInterface fun isRunning() = Bus.running
    }
}
