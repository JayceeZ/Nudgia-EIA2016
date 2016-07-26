/**
 * Created by isoard on 7/26/16.
 */
var sharer = {
  defaultShareText: 'Hey, look at me, it\'s funny !',
  options: {
    message: '', // not supported on some apps (Facebook, Instagram)
    subject: '', // fi. for email
    files: [], // an array of filenames either locally or remotely
    chooserTitle: 'Choose an application' // Android only, you can override the default share sheet title
  },

  onSuccess: function(result) {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  },

  onError: function(msg) {
    console.log("Sharing failed with message: " + msg);
  },

  shareFile: function(url) {
    sharer.options.message = sharer.defaultShareText;
    sharer.options.files = ["file://"+url];
    log.addLog(JSON.stringify(sharer.options.files));
    window.plugins.socialsharing.shareWithOptions(sharer.options, sharer.onSuccess, sharer.onError);
  }
};