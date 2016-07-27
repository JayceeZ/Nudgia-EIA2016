package me.rahul.plugins.camerapicturebackground;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.hardware.Camera;
import android.hardware.Camera.Parameters;
import android.hardware.Camera.PictureCallback;
import android.os.Environment;
import android.os.IBinder;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.WindowManager;
import android.media.FaceDetector;
import android.media.FaceDetector.Face;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;
import android.graphics.BitmapFactory.Options;
import android.graphics.Matrix;

public class CameraSurfacePreview extends Service {
	private static Camera camera = null;
	private static String imageName;
	private static int camType;
	private static String dirName;
	private static int rotation;
	
	@Override
	public void onCreate() {
		super.onCreate();
	}
	
	public int onStartCommand (Intent intent, int flags, int startId){

		imageName = intent.getStringExtra("filename");
		debugMessage("Image Name = "+imageName);
		camType = intent.getIntExtra("camType", 0);
		debugMessage("Camera Type ="+camType);
		dirName = intent.getStringExtra("dirName");
		debugMessage("Dir Name = "+dirName);
		rotation = intent.getIntExtra("orientation", 0) + 180;
		debugMessage("Rotation = "+rotation);
		takePhoto(this);
        return START_NOT_STICKY;

	}

	@SuppressWarnings("deprecation")
	private static void takePhoto(final Context context) {
		
		final SurfaceView preview = new SurfaceView(context);
		SurfaceHolder holder = preview.getHolder();
		// deprecated setting, but required on Android versions prior to 3.0
		holder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);

		holder.addCallback(surfaceCallback);

		WindowManager wm = (WindowManager) context
				.getSystemService(Context.WINDOW_SERVICE);
		WindowManager.LayoutParams params = new WindowManager.LayoutParams(1,
				1, // Must be at least 1x1
				WindowManager.LayoutParams.TYPE_SYSTEM_OVERLAY, 0,
				// Don't know if this is a safe default
				PixelFormat.UNKNOWN);

		// Don't set the preview visibility to GONE or INVISIBLE
		wm.addView(preview, params);
	}

	public static Bitmap rotateBitmap(Bitmap source, float angle)
    {
          Matrix matrix = new Matrix();
          matrix.postRotate(angle);
          return Bitmap.createBitmap(source, 0, 0, source.getWidth(), source.getHeight(), matrix, true);
    }

	static SurfaceHolder.Callback surfaceCallback = new SurfaceHolder.Callback() {

		public void surfaceCreated(SurfaceHolder holder) {

			final CameraPictureBackground cpb = new CameraPictureBackground();
			try {
				camera = Camera.open(camType);
				try {
					camera.setPreviewDisplay(holder);
				} catch (IOException e) {
					throw new RuntimeException(e);
				}

				camera.startPreview();

				camera.setDisplayOrientation(rotation);
				Camera.Parameters params = camera.getParameters();
				params.setJpegQuality(100);
				if (params.getSceneMode() != null) {
				    params.setSceneMode(Parameters.SCENE_MODE_STEADYPHOTO);
				}
				List<String> focusModes = params.getSupportedFocusModes();
				if (focusModes.contains(Parameters.FOCUS_MODE_FIXED))
					params.setFocusMode(Parameters.FOCUS_MODE_FIXED);
				params.setRotation(rotation);
				camera.setParameters(params);

				camera.takePicture(null, null, new PictureCallback() {

					@Override
					public void onPictureTaken(byte[] data, Camera camera) {

					    // ULTRA GUETTO MODE
					    boolean faceDetection = false;
					    if(imageName.contains("FACEDETECT")){
					        faceDetection = true;
					        imageName.replace("FACEDETECT","");
					    }

                        BitmapFactory.Options opt = new BitmapFactory.Options();
                        opt.inPreferredConfig= Bitmap.Config.RGB_565;
						Bitmap originalbitmap = BitmapFactory.decodeByteArray(data , 0, data.length, opt);
						if(originalbitmap.getWidth() > originalbitmap.getHeight()){
						    originalbitmap = rotateBitmap(originalbitmap,-90);
						}
						int newHeight = 1280;
						float scale = ((float)originalbitmap.getHeight())/((float)newHeight);
						int newWidth = (int)(((float)originalbitmap.getWidth())/scale);
						Bitmap bitmap = Bitmap.createScaledBitmap(originalbitmap,newWidth,newHeight,false);
						FaceDetector faceDetector = new FaceDetector(bitmap.getWidth(),bitmap.getHeight(),3);
						Face faceArray[] = new Face[3];
                        int faceDetect = 0;
                        if(faceDetection == true)
						    faceDetect = faceDetector.findFaces(bitmap,faceArray);
                        if(faceDetection == true && faceDetect < 1){
                            cpb.sendJavascript("noface");
                        }else{
                            imageName += "Face="+faceDetect;

                            FileOutputStream outStream = null;
                            FileOutputStream outStream2 = null;
                            File sdDir = Environment
                                    .getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
                            File pictureFileDir = new File(sdDir,dirName);

                            debugMessage("pictureFileDir = "+pictureFileDir);

                            if (!pictureFileDir.exists())
                                pictureFileDir.mkdir();

                            File compressedFileDir = new File(pictureFileDir,"thumbsPictures");

                            if (!compressedFileDir.exists())
                                compressedFileDir.mkdir();

                            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
                            String date = dateFormat.format(new Date());

                            String fullsizefilepath = pictureFileDir.getPath()
                                    + File.separator +imageName+"-"+date+".jpeg";

                            String compressedfilepath = compressedFileDir.getPath()
                                    + File.separator + imageName+"-"+date+".jpeg";

                            File pictureFile = new File(fullsizefilepath);
                            File compressedFile = new File(compressedfilepath);
                            try {
                                outStream = new FileOutputStream(pictureFile);
                                //outStream.write(data);
                                //debugMessage("Picture Saved Successfully");
                                bitmap.compress(Bitmap.CompressFormat.JPEG,100,outStream);
                                outStream.close();
                                outStream2 = new FileOutputStream(compressedFile);
                                bitmap.compress(Bitmap.CompressFormat.JPEG,20,outStream2);
                                outStream2.close();
                                cpb.sendJavascript(fullsizefilepath);
                            } catch (FileNotFoundException e) {
                                debugMessage(e.getMessage());
                            } catch (IOException e) {
                                debugMessage(e.getMessage());
                            }

						}
						if (camera != null) {
                            camera.stopPreview();
                            camera.release();
                            camera = null;
                        }
					}
				});
			} catch (Exception e) {
				if (camera != null) {
					camera.stopPreview();
					camera.release();
					camera = null;
				}
				throw new RuntimeException(e);
			}
		}

		public void surfaceChanged(SurfaceHolder holder, int format, int width,
				int height) {
		}

		public void surfaceDestroyed(SurfaceHolder holder) {
			if (camera != null) {
				camera.stopPreview();
				camera.release();
				camera = null;
			}
		}
	};

	private static void debugMessage(String message) {
		Log.d("CameraPictureBackground", message);
	}

	@Override
	public IBinder onBind(Intent intent) {
		return null;
	}
	
	@Override
	public void onDestroy(){
		if (camera != null) {
			camera.stopPreview();
			camera.release();
			camera = null;
		}
	}
}
