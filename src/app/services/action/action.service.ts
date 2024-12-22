import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { v4 as uuidv4 } from 'uuid';

export interface ActionData {
  action: string;
  row: any;
}

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private apiUrl = 'https://moneycollection.in/moneyCollectionBackend/api';
  private token: string | null = null;

  constructor(private deviceService: DeviceDetectorService, public httpClient: HttpClient) { }

  private actionSource = new BehaviorSubject<ActionData | null>(null);
  actions$ = this.actionSource.asObservable();

  setAction(actionData: ActionData) {
    this.actionSource.next(actionData);
  }

  setLanguage(form: object) {
    const url = `${this.apiUrl}/update-user-language`;
    return this.httpClient.put(url, form)
  }

  epicFunction(page: any = null, whatsappRawCode: any = null, blogRowCode: any = null) {
    console.log('hello `Home` component');
    let deviceInfo = this.deviceService.getDeviceInfo();
    let isMobile = this.deviceService.isMobile();
    let isTablet = this.deviceService.isTablet();
    let isDesktopDevice = this.deviceService.isDesktop();

    if (!localStorage.getItem("TEMP_DEVICE_ID")) {
      localStorage.setItem("TEMP_DEVICE_ID", uuidv4())
    }

    // return {
    //   deviceInfo:deviceInfo,
    //   isMobile:isMobile,
    //   isTablet:isTablet,
    //   isDesktopDevice:isDesktopDevice,
    //   TEMP_DEVICE_ID: localStorage.getItem("TEMP_DEVICE_ID")
    //      }
    this.getLocation({
      browser: deviceInfo?.browser || null,
      browser_version: deviceInfo?.browser_version || null,
      device: deviceInfo?.device || null,
      deviceType: deviceInfo?.deviceType || null,
      orientation: deviceInfo?.orientation || null,
      os: deviceInfo?.os || null,
      os_version: deviceInfo?.os_version || null,
      userAgent: deviceInfo?.userAgent || null,
      isMobile: isMobile,
      isTablet: isTablet,
      isDesktopDevice: isDesktopDevice,
      TEMP_DEVICE_ID: localStorage.getItem("TEMP_DEVICE_ID"),
      lati: null,
      lang: null,
      page: page,
      whatsappRawCode: whatsappRawCode,
      newsPageId: blogRowCode,
    })
  }

  lat: any
  lng: any
  getLocation(info: any) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        //console.log("getLocation",position);
        if (position) {
          // console.log("Latitude: " + position.coords.latitude +
          //   "Longitude: " + position.coords.longitude);
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          // console.log(lat);
          // console.log(lng);
          this.lat = lat
          this.lng = lng
          info.lati = lat
          info.lang = lng
          this.webPing(info)
          // const NodeGeocoder = require('node-geocoder');
          // const options = {
          //   provider: 'google',
          // }
          // const geocoder = NodeGeocoder(options);
          // const res =  geocoder.reverse({ lat: lat, lon: lng });
          // const request = {
          //   location: {
          //     lat: lat,
          //     lng: lng
          //   }
          // };
          // this.geocodingService.geocode(request).subscribe((response:any) => {
          //   let locationName = response.results[0].formatted_address;
          //   console.log("locationName",locationName);
          // });
        }
      },
        (error: any) => {
          this.webPing(info)
        });
    } else {
      this.webPing(info)
      // alert("Geolocation is not supported by this browser.");
    }
  }

  webPing(body: any) {
    this.postapi('webPing', body).subscribe(
      (res: any) => {
      },
      (error: any) => {
      }
    );
  }

  postapi(x: any, object: any): any {
    return this.httpClient.post(this.apiUrl + x, object).pipe(map((res: any) => res));
  }
}
