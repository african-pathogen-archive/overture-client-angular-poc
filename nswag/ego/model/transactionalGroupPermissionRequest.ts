/**
 * Ego Service API
 * Ego API Documentation
 *
 * The version of the OpenAPI document: 4.4.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface TransactionalGroupPermissionRequest { 
    groupName?: string;
    mask?: TransactionalGroupPermissionRequest.MaskEnum;
    policyName?: string;
}
export namespace TransactionalGroupPermissionRequest {
    export type MaskEnum = 'READ' | 'WRITE' | 'DENY';
    export const MaskEnum = {
        Read: 'READ' as MaskEnum,
        Write: 'WRITE' as MaskEnum,
        Deny: 'DENY' as MaskEnum
    };
}


