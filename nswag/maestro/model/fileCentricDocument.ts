/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { FileCentricAnalysis } from './fileCentricAnalysis';
import { Repository } from './repository';
import { Donor } from './donor';


export interface FileCentricDocument { 
    objectId?: string;
    studyId?: string;
    dataType?: string;
    fileType?: string;
    fileAccess?: string;
    analysis?: FileCentricAnalysis;
    file?: any;
    repositories?: Array<Repository>;
    donors?: Array<Donor>;
}

