import { Component, OnInit } from '@angular/core';
import Quagga from 'quagga';

@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.component.html',
  styleUrls: ['./scaner.component.css']
})
export class ScanerComponent implements OnInit {
  scanActive: boolean;
  codeDetected: boolean;
  constructor() {
    this.scanActive = false;
    this.codeDetected = false;
  }

  ngOnInit(): void {

    // this.initQuagga()
  }
  stopQuagga(): void {
    Quagga.stop();
    this.scanActive = false;
  }

  initQuagga(): void {
    console.log(document.querySelector('#scaner-quagga'));

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scaner-quagga')    // Or '#yourElement' (optional)
      },
      decoder: {
        readers: ["code_128_reader"]
      }
    }, (err) => {
      if (err) {
        console.log(err);

        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      this.scanActive = true;
    });
  }
  onDetectedScaner(): void {
    Quagga.onDetected((data) => {
      console.log(data.codeResult);
      Quagga.offDetected()
    })
  }
}