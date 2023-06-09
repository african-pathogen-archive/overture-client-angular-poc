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
import { Policy } from './policy';
import { Identifiable } from './identifiable';


export interface ResolvedPermissionResponse { 
    accessLevel?: ResolvedPermissionResponse.AccessLevelEnum;
    id?: string;
    owner?: Identifiable;
    ownerType?: string;
    policy?: Policy;
}
export namespace ResolvedPermissionResponse {
    export type AccessLevelEnum = 'READ' | 'WRITE' | 'DENY';
    export const AccessLevelEnum = {
        Read: 'READ' as AccessLevelEnum,
        Write: 'WRITE' as AccessLevelEnum,
        Deny: 'DENY' as AccessLevelEnum
    };
}


