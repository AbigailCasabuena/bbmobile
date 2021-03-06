package com.bbmobile;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.airbnb.android.react.maps.MapsPackage;
//import com.airbnb.android.react.maps.MapsPackage;
//import com.oblador.vectoricons.VectorIconsPackage;
//import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        /*@Override
        protected String getJSBundleFile() {
        //return CodePush.getJSBundleFile();
        }*/
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundTaskPackage(),
            new ReactNativePushNotificationPackage(),
            new MapsPackage(),
            //new MapsPackage(),
            //new VectorIconsPackage(),
            //new MapsPackage(),
            new ImagePickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    BackgroundTaskPackage.useContext(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
