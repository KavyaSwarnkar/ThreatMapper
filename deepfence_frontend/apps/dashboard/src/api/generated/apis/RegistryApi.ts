/* tslint:disable */
/* eslint-disable */
/**
 * Deepfence ThreatMapper
 * Deepfence Runtime API provides programmatic control over Deepfence microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: community@deepfence.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ApiDocsBadRequestResponse,
  ApiDocsFailureResponse,
  ModelContainerImage,
  ModelContainerImageWithTags,
  ModelRegistryAddReq,
  ModelRegistryListResp,
} from '../models';
import {
    ApiDocsBadRequestResponseFromJSON,
    ApiDocsBadRequestResponseToJSON,
    ApiDocsFailureResponseFromJSON,
    ApiDocsFailureResponseToJSON,
    ModelContainerImageFromJSON,
    ModelContainerImageToJSON,
    ModelContainerImageWithTagsFromJSON,
    ModelContainerImageWithTagsToJSON,
    ModelRegistryAddReqFromJSON,
    ModelRegistryAddReqToJSON,
    ModelRegistryListRespFromJSON,
    ModelRegistryListRespToJSON,
} from '../models';

export interface AddRegistryRequest {
    modelRegistryAddReq?: ModelRegistryAddReq;
}

export interface DeleteRegistryRequest {
    registryId: number;
}

export interface GetRegistrySummaryRequest {
    registryId: string;
}

export interface ListImageTagsRequest {
    registryId: string;
    imageName: string;
}

export interface ListImagesRequest {
    registryId: string;
}

/**
 * RegistryApi - interface
 * 
 * @export
 * @interface RegistryApiInterface
 */
export interface RegistryApiInterface {
    /**
     * Add a new supported registry
     * @summary Add Registry
     * @param {ModelRegistryAddReq} [modelRegistryAddReq] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistryApiInterface
     */
    addRegistryRaw(requestParameters: AddRegistryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Add a new supported registry
     * Add Registry
     */
    addRegistry(requestParameters: AddRegistryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * Delete registry
     * @summary Add Registry
     * @param {number} registryId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistryApiInterface
     */
    deleteRegistryRaw(requestParameters: DeleteRegistryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Delete registry
     * Add Registry
     */
    deleteRegistry(requestParameters: DeleteRegistryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * get summary of registry scans, images and tags
     * @summary Get Registry Summary
     * @param {string} registryId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistryApiInterface
     */
    getRegistrySummaryRaw(requestParameters: GetRegistrySummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: number; }>>;

    /**
     * get summary of registry scans, images and tags
     * Get Registry Summary
     */
    getRegistrySummary(requestParameters: GetRegistrySummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: number; }>;

    /**
     * get summary of registry scans, images and tags
     * @summary Get All Registries Summary
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistryApiInterface
     */
    getSummaryRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: number; }>>;

    /**
     * get summary of registry scans, images and tags
     * Get All Registries Summary
     */
    getSummary(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: number; }>;

    /**
     * list image tags for a given image and registry
     * @summary List Image Tags
     * @param {string} registryId 
     * @param {string} imageName 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistryApiInterface
     */
    listImageTagsRaw(requestParameters: ListImageTagsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ModelContainerImage>>>;

    /**
     * list image tags for a given image and registry
     * List Image Tags
     */
    listImageTags(requestParameters: ListImageTagsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ModelContainerImage>>;

    /**
     * list images from a given registry
     * @summary List Registry Images
     * @param {string} registryId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistryApiInterface
     */
    listImagesRaw(requestParameters: ListImagesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ModelContainerImageWithTags>>>;

    /**
     * list images from a given registry
     * List Registry Images
     */
    listImages(requestParameters: ListImagesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ModelContainerImageWithTags>>;

    /**
     * List all the added Registries
     * @summary List Registries
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistryApiInterface
     */
    listRegistryRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ModelRegistryListResp>>>;

    /**
     * List all the added Registries
     * List Registries
     */
    listRegistry(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ModelRegistryListResp>>;

}

/**
 * 
 */
export class RegistryApi extends runtime.BaseAPI implements RegistryApiInterface {

    /**
     * Add a new supported registry
     * Add Registry
     */
    async addRegistryRaw(requestParameters: AddRegistryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/registryaccount`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ModelRegistryAddReqToJSON(requestParameters.modelRegistryAddReq),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add a new supported registry
     * Add Registry
     */
    async addRegistry(requestParameters: AddRegistryRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.addRegistryRaw(requestParameters, initOverrides);
    }

    /**
     * Delete registry
     * Add Registry
     */
    async deleteRegistryRaw(requestParameters: DeleteRegistryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.registryId === null || requestParameters.registryId === undefined) {
            throw new runtime.RequiredError('registryId','Required parameter requestParameters.registryId was null or undefined when calling deleteRegistry.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/registryaccount/{registry_id}`.replace(`{${"registry_id"}}`, encodeURIComponent(String(requestParameters.registryId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete registry
     * Add Registry
     */
    async deleteRegistry(requestParameters: DeleteRegistryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteRegistryRaw(requestParameters, initOverrides);
    }

    /**
     * get summary of registry scans, images and tags
     * Get Registry Summary
     */
    async getRegistrySummaryRaw(requestParameters: GetRegistrySummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: number; }>> {
        if (requestParameters.registryId === null || requestParameters.registryId === undefined) {
            throw new runtime.RequiredError('registryId','Required parameter requestParameters.registryId was null or undefined when calling getRegistrySummary.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/registryaccount/{registry_id}/summary`.replace(`{${"registry_id"}}`, encodeURIComponent(String(requestParameters.registryId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * get summary of registry scans, images and tags
     * Get Registry Summary
     */
    async getRegistrySummary(requestParameters: GetRegistrySummaryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: number; }> {
        const response = await this.getRegistrySummaryRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get summary of registry scans, images and tags
     * Get All Registries Summary
     */
    async getSummaryRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: number; }>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/registryaccount/summary`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * get summary of registry scans, images and tags
     * Get All Registries Summary
     */
    async getSummary(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: number; }> {
        const response = await this.getSummaryRaw(initOverrides);
        return await response.value();
    }

    /**
     * list image tags for a given image and registry
     * List Image Tags
     */
    async listImageTagsRaw(requestParameters: ListImageTagsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ModelContainerImage>>> {
        if (requestParameters.registryId === null || requestParameters.registryId === undefined) {
            throw new runtime.RequiredError('registryId','Required parameter requestParameters.registryId was null or undefined when calling listImageTags.');
        }

        if (requestParameters.imageName === null || requestParameters.imageName === undefined) {
            throw new runtime.RequiredError('imageName','Required parameter requestParameters.imageName was null or undefined when calling listImageTags.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/registryaccount/{registry_id}/images/{image_name}/tags`.replace(`{${"registry_id"}}`, encodeURIComponent(String(requestParameters.registryId))).replace(`{${"image_name"}}`, encodeURIComponent(String(requestParameters.imageName))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ModelContainerImageFromJSON));
    }

    /**
     * list image tags for a given image and registry
     * List Image Tags
     */
    async listImageTags(requestParameters: ListImageTagsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ModelContainerImage>> {
        const response = await this.listImageTagsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * list images from a given registry
     * List Registry Images
     */
    async listImagesRaw(requestParameters: ListImagesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ModelContainerImageWithTags>>> {
        if (requestParameters.registryId === null || requestParameters.registryId === undefined) {
            throw new runtime.RequiredError('registryId','Required parameter requestParameters.registryId was null or undefined when calling listImages.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/registryaccount/{registry_id}/images`.replace(`{${"registry_id"}}`, encodeURIComponent(String(requestParameters.registryId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ModelContainerImageWithTagsFromJSON));
    }

    /**
     * list images from a given registry
     * List Registry Images
     */
    async listImages(requestParameters: ListImagesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ModelContainerImageWithTags>> {
        const response = await this.listImagesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List all the added Registries
     * List Registries
     */
    async listRegistryRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ModelRegistryListResp>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer_token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/deepfence/registryaccount`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ModelRegistryListRespFromJSON));
    }

    /**
     * List all the added Registries
     * List Registries
     */
    async listRegistry(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ModelRegistryListResp>> {
        const response = await this.listRegistryRaw(initOverrides);
        return await response.value();
    }

}
