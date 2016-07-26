package org.apache.cordova.plugin;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.PowerManager;
import android.content.Context;

/**
* This class echoes a string called from JavaScript.
*/
public class Screen extends CordovaPlugin {

private PowerManager pm;

@Override
public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    this.pm = (PowerManager) cordova.getActivity().getSystemService(Context.POWER_SERVICE);
}

@Override
public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if (action.equals("init")) {
        this.init(callbackContext);
        return true;
    }else if (action.equals("getScreenStatus")) {
        this.getScreenStatus(callbackContext);
        return true;
    }
    return false;
}

private void init(CallbackContext callbackContext) {
    callbackContext.error("Only getScreenStatus function is working");
}

private void getScreenStatus(CallbackContext callbackContext) {
    String status = "off";
    if(pm.isScreenOn()) status = "on";
    callbackContext.success(status);
}
}
