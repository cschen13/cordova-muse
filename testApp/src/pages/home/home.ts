import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
declare var muse;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BluetoothSerial, LocationAccuracy]
})
export class HomePage {

  constructor(public navCtrl: NavController, private bluetoothSerial: BluetoothSerial, private locationAccuracy: LocationAccuracy) {

  }

  getDevices() {
    // Attempt to use Ionic Native Location Accuracy: http://ionicframework.com/docs/native/location-accuracy/
    // We use location here because apparently Bluetooth LE requires access to at least coarse location
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        console.log("Getting devices...");
        // For some reason, this function always returns an empty list at the moment
        // First step would be getting this function to work
        muse.getMuseList(function(success) {
          console.log("List of connected Muses: " + success);
        }, function(error) {
          console.log("Error getting list of Muses");
        });
      }, error => console.log('Error requesting location permissions', error)
    );

    /*
    // Attempt to use cordova-plugin-android-permissions https://github.com/NeoLSN/cordova-plugin-android-permissions
    permissions.checkPermission(permissions.ACCESS_COARSE_LOCATION, function(success) {
      console.log("Getting devices...");
      muse.getMuseList(function(success) {
        console.log("List of connected Muses: " + success);
      }, function(error) {
        console.log("Error getting list of Muses");
      });
    }, function(error) {
      permissions.requestPermission(permissions.ACCESS_COARSE_LOCATION, function(success) {
        console.log("Getting devices...");
        muse.getMuseList(function(success) {
          console.log("List of connected Muses: " + success);
        }, function(error) {
          console.log("Error getting list of Muses");
        });
      }, function(error) {
        console.log('Failed to get coarse location permission');
      })
    });
    */
  }

  readBluetooth() {
    console.log("Attempting to connect the Muse...");
    muse.connectToMuse(function(data) {
      console.log("Connection Successful: " + data);
    }, function(error) {
      console.log("Connection Error: " + error)
    });
  }

  checkConnection() {
    console.log("Checking connections...");
    muse.testConnection(function(returnMsg) {
      console.log(returnMsg);
    }, function(returnMsg) {
      console.log("ERROR: " + returnMsg);
    });
  }
}

