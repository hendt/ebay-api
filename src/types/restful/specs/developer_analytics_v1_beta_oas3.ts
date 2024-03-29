/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/rate_limit/": {
    /** @description This method retrieves the call limit and utilization data for an application. The data is retrieved for all RESTful APIs and resources. The response from getRateLimits includes a list of the applicable resources and the &quot;call limit&quot;, or quota, that is set for each resource. In addition to quota information, the response also includes the number of remaining calls available before the limit is reached, the time remaining before the quota resets, and the length of the &quot;time window&quot; to which the quota applies. By default, this method returns utilization data for all RESTful API resources. Use the api_name and api_context query parameters to filter the response to only the desired APIs. For more on call limits, see Compatible Application Check. */
    get: operations["getRateLimits"];
  };
  "/user_rate_limit/": {
    /** @description This method retrieves the call limit and utilization data for an application user. The call-limit data is returned for all RESTful APIs and resources that limit calls on a per-user basis. The response from getUserRateLimits includes a list of the applicable resources and the &quot;call limit&quot;, or quota, that is set for each resource. In addition to quota information, the response also includes the number of remaining calls available before the limit is reached, the time remaining before the quota resets, and the length of the &quot;time window&quot; to which the quota applies. By default, this method returns utilization data for all RESTful API resources that limit request access by user. Use the api_name and api_context query parameters to filter the response to only the desired APIs. For more on call limits, see Compatible Application Check. */
    get: operations["getUserRateLimits"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @description This complex type defines a &quot;rate&quot; as the quota of calls that can be made to a resource per time window, the remaining number of calls before the threshold is met, the amount of time until the time window resets, and the length of the time window (in seconds). */
    Rate: {
      /**
       * Format: int32 
       * @description The maximum number of requests that can be made to this resource during a set time period. The length of time to which the limit is applied is defined by the associated timeWindow value. This value is often referred to as the &quot;call quota&quot; for the resource.
       */
      limit?: number;
      /**
       * Format: int32 
       * @description The remaining number of requests that can be made to this resource before the associated time window resets.
       */
      remaining?: number;
      /** @description The data and time the time window and accumulated calls for this resource reset. When the reset time is reached, the remaining value is reset to the value of limit, and this reset value is reset to the current time plus the number of seconds defined by the timeWindow value. The time stamp is formatted as an ISO 8601 string, which is based on the 24-hour Universal Coordinated Time (UTC) clock. Format: YYYY-MM-DDTHH:MM:SS.SSSZ Example: 2018-08-04T07:09:00.000Z */
      reset?: string;
      /**
       * Format: int32 
       * @description A period of time, expressed in seconds. The call quota for a resource is applied to the period of time defined by the value of this field.
       */
      timeWindow?: number;
    };
    /** @description This complex types defines the resource (such as an API method) for which the rate-limit data is returned. A method is included in an API, and an API is part of an API context for the API version specified. */
    RateLimit: {
      /** @description The context of the API for which rate-limit data is returned. For example buy, sell, commerce, or developer. */
      apiContext?: string;
      /** @description The name of the API for which rate-limit data is returned. For example browse for the Buy API, inventory for the Sell API, or taxonomy for the Commerce API. */
      apiName?: string;
      /** @description The version of the API for which rate-limit data is returned. For example v1 or v2. */
      apiVersion?: string;
      /** @description A list of the methods for which rate-limit data is returned. For example item for the Feed API, getOrder for the Fulfillment API, and getProduct for the Catalog API. */
      resources?: (components["schemas"]["Resource"])[];
    };
    /** @description This complex type defines a list of rate-limit data as it pertains to a method within the specified version of an API. */
    RateLimitsResponse: {
      /** @description The rate-limit data for the specified APIs. The rate-limit data is returned for all the methods in the specified APIs and data pertains to the current time window. */
      rateLimits?: (components["schemas"]["RateLimit"])[];
    };
    /** @description This complex type defines the resource (API method) and the current rate-limit data for that resource. */
    Resource: {
      /** @description The name of the resource (an API or an API method) to which the rate-limit data applies. */
      name?: string;
      /** @description A list of rate-limit data, where each list element represents the rate-limit data for a specific resource. */
      rates?: (components["schemas"]["Rate"])[];
    };
    /** @description This type defines the fields that can be returned in an error. */
    Error: {
      /** @description Identifies the type of erro. */
      category?: string;
      /** @description Name for the primary system where the error occurred. This is relevant for application errors. */
      domain?: string;
      /**
       * Format: int32 
       * @description A unique number to identify the error.
       */
      errorId?: number;
      /** @description An array of request elements most closely associated to the error. */
      inputRefIds?: (string)[];
      /** @description A more detailed explanation of the error. */
      longMessage?: string;
      /** @description Information on how to correct the problem, in the end user's terms and language where applicable. */
      message?: string;
      /** @description An array of request elements most closely associated to the error. */
      outputRefIds?: (string)[];
      /** @description An array of name/value pairs that describe details the error condition. These are useful when multiple errors are returned. */
      parameters?: (components["schemas"]["ErrorParameter"])[];
      /** @description Further helps indicate which subsystem the error is coming from. System subcategories include: Initialization, Serialization, Security, Monitoring, Rate Limiting, etc. */
      subdomain?: string;
    };
    ErrorParameter: {
      /** @description The object of the error. */
      name?: string;
      /** @description The value of the object. */
      value?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /** @description This method retrieves the call limit and utilization data for an application. The data is retrieved for all RESTful APIs and resources. The response from getRateLimits includes a list of the applicable resources and the &quot;call limit&quot;, or quota, that is set for each resource. In addition to quota information, the response also includes the number of remaining calls available before the limit is reached, the time remaining before the quota resets, and the length of the &quot;time window&quot; to which the quota applies. By default, this method returns utilization data for all RESTful API resources. Use the api_name and api_context query parameters to filter the response to only the desired APIs. For more on call limits, see Compatible Application Check. */
  getRateLimits: {
    parameters: {
      query?: {
        /** @description This optional query parameter filters the result to include only the specified API context. Acceptable values for the parameter are buy, sell, commerce, and developer. */
        api_context?: string;
        /** @description This optional query parameter filters the result to include only the APIs specified. Example values are browse for the Buy APIs context, inventory for the Sell APIs context, and taxonomy for the Commerce APIs context. */
        api_name?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["RateLimitsResponse"];
        };
      };
      /** @description No Content */
      204: never;
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": {
            errors?: (components["schemas"]["Error"])[];
          };
        };
      };
    };
  };
  /** @description This method retrieves the call limit and utilization data for an application user. The call-limit data is returned for all RESTful APIs and resources that limit calls on a per-user basis. The response from getUserRateLimits includes a list of the applicable resources and the &quot;call limit&quot;, or quota, that is set for each resource. In addition to quota information, the response also includes the number of remaining calls available before the limit is reached, the time remaining before the quota resets, and the length of the &quot;time window&quot; to which the quota applies. By default, this method returns utilization data for all RESTful API resources that limit request access by user. Use the api_name and api_context query parameters to filter the response to only the desired APIs. For more on call limits, see Compatible Application Check. */
  getUserRateLimits: {
    parameters: {
      query?: {
        /** @description This optional query parameter filters the result to include only the specified API context. Acceptable values for the parameter are buy, sell, commerce, and developer. */
        api_context?: string;
        /** @description This optional query parameter filters the result to include only the APIs specified. Example values are browse for the Buy APIs context, inventory for the Sell APIs context, and taxonomy for the Commerce APIs context. */
        api_name?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["RateLimitsResponse"];
        };
      };
      /** @description No Content */
      204: never;
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": {
            errors?: (components["schemas"]["Error"])[];
          };
        };
      };
    };
  };
}
