// // import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
// import { Inject, Injectable, Optional } from '@angular/core';
// import { API_BASE_URL, Study } from 'nswag/song/song-service-proxies';
// // import { Observable } from 'rxjs';

// import {
//   mergeMap as _observableMergeMap,
//   catchError as _observableCatch,
// } from 'rxjs/operators';
// import {
//   Observable,
//   throwError as _observableThrow,
//   of as _observableOf,
// } from 'rxjs';
// // import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
// import {
//   HttpClient,
//   HttpHeaders,
//   HttpResponse,
//   HttpResponseBase,
// } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class StudiesServiceProxy {
//   private http: HttpClient;
//   private baseUrl: string;
//   protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
//     undefined;

//   constructor(
//     @Inject(HttpClient) http: HttpClient,
//     @Optional() @Inject(API_BASE_URL) baseUrl?: string
//   ) {
//     this.http = http;
//     this.baseUrl =  'https://dms.thakhutse.co.za'; //baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
//   }

//   getAll(
//   ): Observable<Study> {
//     let url_ = this.baseUrl + '/song-api/studies/all?';
//     url_ = url_.replace(/[?&]$/, '');

//     let options_: any = {
//       observe: 'response',
//       // responseType: 'blob',
//       headers: new HttpHeaders({
//         "Content-Type": 'application/json;charset=UTF-8',
//         Accept: '*/*',
//       }),
//     };

//     return this.http
//       .request('get', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return this.processGetAll(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return this.processGetAll(response_ as any);
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<Study>;
//             }
//           } else return _observableThrow(response_) as any as Observable<Study>;
//         })
//       );
//   }

//   protected processGetAll(response: HttpResponseBase): Observable<Study> {
//     console.log(response)
//     const status = response.status;
//     const responseBlob =
//       response instanceof HttpResponse
//         ? response.body
//         : (response as any).error instanceof Blob
//         ? (response as any).error
//         : undefined;

//     let _headers: any = {};
//     if (response.headers) {
//       for (let key of response.headers.keys()) {
//         _headers[key] = response.headers.get(key);
//       }
//     }
//     if (status === 200) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           let result200: any = null;
//           let resultData200 =
//             _responseText === ''
//               ? null
//               : JSON.parse(_responseText, this.jsonParseReviver);
//           result200 = Study.fromJS(resultData200);
//           return _observableOf(result200);
//         })
//       );
//     } else if (status !== 200 && status !== 204) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           return throwException(
//             'An unexpected server error occurred.',
//             status,
//             _responseText,
//             _headers
//           );
//         })
//       );
//     }
//     return _observableOf(null as any);
//   }

//   /**
//    * @param id (optional)
//    * @return Success
//    */
//   getStudyForView(id: number | undefined): Observable<Study> {
//     let url_ = this.baseUrl + '/api/services/app/Studies/GetStudyForView?';
//     if (id === null) throw new Error("The parameter 'id' cannot be null.");
//     else if (id !== undefined)
//       url_ += 'id=' + encodeURIComponent('' + id) + '&';
//     url_ = url_.replace(/[?&]$/, '');

//     let options_: any = {
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         Accept: 'text/plain',
//       }),
//     };

//     return this.http
//       .request('get', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return this.processGetStudyForView(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return this.processGetStudyForView(response_ as any);
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<Study>;
//             }
//           } else return _observableThrow(response_) as any as Observable<Study>;
//         })
//       );
//   }

//   protected processGetStudyForView(
//     response: HttpResponseBase
//   ): Observable<Study> {
//     const status = response.status;
//     const responseBlob =
//       response instanceof HttpResponse
//         ? response.body
//         : (response as any).error instanceof Blob
//         ? (response as any).error
//         : undefined;

//     let _headers: any = {};
//     if (response.headers) {
//       for (let key of response.headers.keys()) {
//         _headers[key] = response.headers.get(key);
//       }
//     }
//     if (status === 200) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           let result200: any = null;
//           let resultData200 =
//             _responseText === ''
//               ? null
//               : JSON.parse(_responseText, this.jsonParseReviver);
//           result200 = Study.fromJS(resultData200);
//           return _observableOf(result200);
//         })
//       );
//     } else if (status !== 200 && status !== 204) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           return throwException(
//             'An unexpected server error occurred.',
//             status,
//             _responseText,
//             _headers
//           );
//         })
//       );
//     }
//     return _observableOf(null as any);
//   }

//   /**
//    * @param id (optional)
//    * @return Success
//    */
//   getStudyForEdit(id: number | undefined): Observable<Study> {
//     let url_ = this.baseUrl + '/api/services/app/Studies/GetStudyForEdit?';
//     if (id === null) throw new Error("The parameter 'id' cannot be null.");
//     else if (id !== undefined)
//       url_ += 'Id=' + encodeURIComponent('' + id) + '&';
//     url_ = url_.replace(/[?&]$/, '');

//     let options_: any = {
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         Accept: 'text/plain',
//       }),
//     };

//     return this.http
//       .request('get', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return this.processGetStudyForEdit(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return this.processGetStudyForEdit(response_ as any);
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<Study>;
//             }
//           } else return _observableThrow(response_) as any as Observable<Study>;
//         })
//       );
//   }

//   protected processGetStudyForEdit(
//     response: HttpResponseBase
//   ): Observable<Study> {
//     const status = response.status;
//     const responseBlob =
//       response instanceof HttpResponse
//         ? response.body
//         : (response as any).error instanceof Blob
//         ? (response as any).error
//         : undefined;

//     let _headers: any = {};
//     if (response.headers) {
//       for (let key of response.headers.keys()) {
//         _headers[key] = response.headers.get(key);
//       }
//     }
//     if (status === 200) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           let result200: any = null;
//           let resultData200 =
//             _responseText === ''
//               ? null
//               : JSON.parse(_responseText, this.jsonParseReviver);
//           result200 = Study.fromJS(resultData200);
//           return _observableOf(result200);
//         })
//       );
//     } else if (status !== 200 && status !== 204) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           return throwException(
//             'An unexpected server error occurred.',
//             status,
//             _responseText,
//             _headers
//           );
//         })
//       );
//     }
//     return _observableOf(null as any);
//   }

//   /**
//    * @param body (optional)
//    * @return Success
//    */
//   createOrEdit(body: Study | undefined): Observable<void> {
//     let url_ = this.baseUrl + '/api/services/app/Studies/CreateOrEdit';
//     url_ = url_.replace(/[?&]$/, '');

//     const content_ = JSON.stringify(body);

//     let options_: any = {
//       body: content_,
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json-patch+json',
//       }),
//     };

//     return this.http
//       .request('post', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return this.processCreateOrEdit(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return this.processCreateOrEdit(response_ as any);
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<void>;
//             }
//           } else return _observableThrow(response_) as any as Observable<void>;
//         })
//       );
//   }

//   protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
//     const status = response.status;
//     const responseBlob =
//       response instanceof HttpResponse
//         ? response.body
//         : (response as any).error instanceof Blob
//         ? (response as any).error
//         : undefined;

//     let _headers: any = {};
//     if (response.headers) {
//       for (let key of response.headers.keys()) {
//         _headers[key] = response.headers.get(key);
//       }
//     }
//     if (status === 200) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           return _observableOf(null as any);
//         })
//       );
//     } else if (status !== 200 && status !== 204) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           return throwException(
//             'An unexpected server error occurred.',
//             status,
//             _responseText,
//             _headers
//           );
//         })
//       );
//     }
//     return _observableOf(null as any);
//   }

//   /**
//    * @param id (optional)
//    * @return Success
//    */
//   delete(id: number | undefined): Observable<void> {
//     let url_ = this.baseUrl + '/api/services/app/Studies/Delete?';
//     if (id === null) throw new Error("The parameter 'id' cannot be null.");
//     else if (id !== undefined)
//       url_ += 'Id=' + encodeURIComponent('' + id) + '&';
//     url_ = url_.replace(/[?&]$/, '');

//     let options_: any = {
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({}),
//     };

//     return this.http
//       .request('delete', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return this.processDelete(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return this.processDelete(response_ as any);
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<void>;
//             }
//           } else return _observableThrow(response_) as any as Observable<void>;
//         })
//       );
//   }

//   protected processDelete(response: HttpResponseBase): Observable<void> {
//     const status = response.status;
//     const responseBlob =
//       response instanceof HttpResponse
//         ? response.body
//         : (response as any).error instanceof Blob
//         ? (response as any).error
//         : undefined;

//     let _headers: any = {};
//     if (response.headers) {
//       for (let key of response.headers.keys()) {
//         _headers[key] = response.headers.get(key);
//       }
//     }
//     if (status === 200) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           return _observableOf(null as any);
//         })
//       );
//     } else if (status !== 200 && status !== 204) {
//       return blobToText(responseBlob).pipe(
//         _observableMergeMap((_responseText: string) => {
//           return throwException(
//             'An unexpected server error occurred.',
//             status,
//             _responseText,
//             _headers
//           );
//         })
//       );
//     }
//     return _observableOf(null as any);
//   }
// }

// export class ApiException extends Error {
//   override message: string;
//   status: number;
//   response: string;
//   headers: { [key: string]: any };
//   result: any;

//   constructor(
//     message: string,
//     status: number,
//     response: string,
//     headers: { [key: string]: any },
//     result: any
//   ) {
//     super();

//     this.message = message;
//     this.status = status;
//     this.response = response;
//     this.headers = headers;
//     this.result = result;
//   }

//   protected isApiException = true;

//   static isApiException(obj: any): obj is ApiException {
//     return obj.isApiException === true;
//   }
// }

// function throwException(
//   message: string,
//   status: number,
//   response: string,
//   headers: { [key: string]: any },
//   result?: any
// ): Observable<any> {
//   if (result !== null && result !== undefined) return _observableThrow(result);
//   else
//     return _observableThrow(
//       new ApiException(message, status, response, headers, null)
//     );
// }

// function blobToText(blob: any): Observable<string> {
//   return new Observable<string>((observer: any) => {
//     if (!blob) {
//       observer.next('');
//       observer.complete();
//     } else {
//       let reader = new FileReader();
//       reader.onload = (event) => {
//         observer.next((event.target as any).result);
//         observer.complete();
//       };
//       reader.readAsText(blob);
//     }
//   });
// }
