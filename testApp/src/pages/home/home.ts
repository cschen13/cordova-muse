import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
declare var muse;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BluetoothSerial]
})
export class HomePage {

  constructor(public navCtrl: NavController, private bluetoothSerial: BluetoothSerial) {

  }

  getDevices() {
    console.log("Getting devices...");
    muse.getMuseList(function(success) {
      console.log("List of connected Muses: " + success);
    }, function(error) {
      console.log("Error getting list of Muses");
    });
  }

  readBluetooth() {
    console.log("Attempting to connect the Muse...");
    muse.connectToMuse(function(data) {
      console.log("Connection Successful: " + data);
    }, function(error) {
      console.log("Connection Error: " + error)
    });

    // this.bluetoothSerial.read().then(function(data) {
      //   	console.log("We made it!");
      // 	console.log(data);
      // }, function(error) {
        // 	console.log('ERROR' + error);
        // });
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

