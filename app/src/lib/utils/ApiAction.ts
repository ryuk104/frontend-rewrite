import * as api from '$lib/api';


//import type { RequestParams } from "../../types";


/*
type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
type APIResponse = {
	body?: {
		[key: string]: string;
		value: string;
	};
	status: number;
	ok: boolean;
};
*/
//defaults.baseURL = BASE_URL;
//defaults.withCredentials = true;

export async function signupUser(fetch: Fetch, params?: RequestParams): Promise<APIResponse> {
	// Turn Object's Key-Value pairs into string
	const urlParams = queryParams(params);
	// Make fetch call
	const response = await fetch(`/api/auth/register`, {
		method: "POST",
		body: urlParams,

		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
	const data = await response.json();
	// If request fails, return error.
	if (!response.ok) {
		return {
			body: response.statusText,
			status: response.status,
			ok: response.ok,
		};
	}

	// Return successful response.
	return {
		body: data,
		status: response.status,
		ok: response.ok,
	};
}


/*
export async function logoutUser(fetch: Fetch, params?: RequestParams): Promise<APIResponse> {
	// Turn Object's Key-Value pairs into string
	const urlParams = queryParams(params);
	// Make fetch call
	const response = await fetch(`/api/auth/register`, {
		method: "POST",
		body: urlParams,

		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
	const data = await response.json();
	// If request fails, return error.
	if (!response.ok) {
		return {
			body: response.statusText,
			status: response.status,
			ok: response.ok,
		};
	}

	// Return successful response.
	return {
		body: data,
		status: response.status,
		ok: response.ok,
	};
}
*/


export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/api/auth/logout");
    if (res.data.type === "success") {
      localStorage.removeItem("token");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};



export const getUserById = async (userId) => {
  try {
    const res = await api.get(`/api/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const editUser = async (userId, data) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/user/${userId}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.del(`/api/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getUsers = async ({ page = 0, limit = 5 }) => {
  try {
    const res = await api.get(`/api/user?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const searchUsers = async (search) => {
  try {
    const res = await api.get(`/api/user?search=${search}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const followUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/user/${userId}/follow`);
    return res.data;
  } catch (error) {
    return;
  }
};

export const unFollowuser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/user/${userId}/unfollow`);
    return res.data;
  } catch (error) {
    return;
  }
};

//------------------------------ Post -----------------------------

export const createPost = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.post(`/api/post/`, data);
    return res.data;
  } catch (error) {
    return;
  }
};

export const updatePost = async (postId, data) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/post/${postId}`, data);
    return res.data;
  } catch (error) {
    return;
  }
};

export const getAllPosts = async ({ page = 0, limit = 5 }) => {
  try {
    const res = await api.get(`/api/post?page=${page}&limit=${limit}`);

    return res.data;
  } catch (error) {
    return;
  }
};

export const explorePosts = async ({ page = 0, limit = 5 }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(
      `/api/post/explore?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return;
  }
};

export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.del(`/api/post/${postId}`);
    return res.data;
  } catch (error) {
    return;
  }
};

export const likePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/post/${postId}/like`);
    return res.data;
  } catch (error) {
    return;
  }
};

export const disLike = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/post/${postId}/unlike`);
    return res.data;
  } catch (error) {
    return;
  }
};


//------------------------------ Photo -----------------------------
/**
  * 
  * @param {string} albumId 
  * @param {AddAssetsDto} addAssetsDto 
  * @param {*} [options] Override http request option.
  * @throws {RequiredError}
*/

export const addAssetsToAlbum = async (albumId: string, addAssetsDto: AddAssetsDto) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('addAssetsToAlbum', 'albumId', albumId)
  // verify required parameter 'addAssetsDto' is not null or undefined
  assertParamExists('addAssetsToAlbum', 'addAssetsDto', addAssetsDto)

  const res = await api.put(`/album/{albumId}/assets`
  .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  
  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  localVarHeaderParameter['Content-Type'] = 'application/json';

    localVarRequestOptions.data = serializeDataIfNeeded(addAssetsDto, localVarRequestOptions, configuration)

  return res.data;
},



/**
         * 
         * @param {string} albumId 
         * @param {AddUsersDto} addUsersDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
 export const addUsersToAlbum = async (albumId: string, addUsersDto: AddUsersDto) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('addUsersToAlbum', 'albumId', albumId)
  // verify required parameter 'addUsersDto' is not null or undefined
  assertParamExists('addUsersToAlbum', 'addUsersDto', addUsersDto)

  const res = await api.put(`/album/{albumId}/users`
  .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)


  localVarHeaderParameter['Content-Type'] = 'application/json';

    localVarRequestOptions.data = serializeDataIfNeeded(addUsersDto, localVarRequestOptions, configuration)

  return {};
},





/**
         * 
         * @param {CreateAlbumDto} createAlbumDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
 export const createAlbum = async (createAlbumDto: CreateAlbumDto ) => {
  // verify required parameter 'createAlbumDto' is not null or undefined
  assertParamExists('createAlbum', 'createAlbumDto', createAlbumDto)

  const res = await api.posr(`/api/photo/album`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  localVarHeaderParameter['Content-Type'] = 'application/json';

    localVarRequestOptions.data = serializeDataIfNeeded(createAlbumDto, localVarRequestOptions, configuration)

  return {};
},




/**
         * 
         * @param {string} albumId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
 exxport const deleteAlbum = async (albumId: string, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('deleteAlbum', 'albumId', albumId)

  const res = await api.del(`/album/{albumId}`
  .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},




/**
         * 
         * @param {string} albumId 
         * @param {number} [skip] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
 export const downloadArchive = async (albumId: string, skip?: number, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('downloadArchive', 'albumId', albumId)
  const localVarPath = `/album/{albumId}/download`
      .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

      const res = await api.get(`/api/`);  


  const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  if (skip !== undefined) {
      localVarQueryParameter['skip'] = skip;
  }



  
  return {};
},






export const getAlbumCountByUserId = async () => {
  const localVarPath = `/album/count-by-user-id`;

  const res = await api.get(`/api/`);  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},



export const getAlbumInfo = async (albumId: string, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('getAlbumInfo', 'albumId', albumId)
  const localVarPath = `/album/{albumId}`
      .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  const res = await api.get(`/api/post/${postId}/unlike`);

  const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},






export const getAllAlbums = async (shared?: boolean, assetId?: string, ) => {

  const res = await api.get(`/photo/album`);

  
  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  if (shared !== undefined) {
      localVarQueryParameter['shared'] = shared;
  }

  if (assetId !== undefined) {
      localVarQueryParameter['assetId'] = assetId;
  }



  
  return {};
},









export const removeAssetFromAlbum = async (albumId: string, removeAssetsDto: RemoveAssetsDto, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('removeAssetFromAlbum', 'albumId', albumId)
  // verify required parameter 'removeAssetsDto' is not null or undefined
  assertParamExists('removeAssetFromAlbum', 'removeAssetsDto', removeAssetsDto)
  const localVarPath = `/album/{albumId}/assets`
      .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  const res = await api.del(`/post/${postId}/unlike`);

  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  localVarHeaderParameter['Content-Type'] = 'application/json';

    localVarRequestOptions.data = serializeDataIfNeeded(removeAssetsDto, localVarRequestOptions, configuration)

  return {};
},




export const removeUserFromAlbum = async (albumId: string, userId: string, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('removeUserFromAlbum', 'albumId', albumId)
  // verify required parameter 'userId' is not null or undefined
  assertParamExists('removeUserFromAlbum', 'userId', userId)
  const localVarPath = `/album/{albumId}/user/{userId}`
      .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)))
      .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));

  const res = await api.del(`/api/post/${postId}/unlike`);

  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},


export const updateAlbumInfo = async (albumId: string, updateAlbumDto: UpdateAlbumDto, ) => {
            // verify required parameter 'albumId' is not null or undefined
            assertParamExists('updateAlbumInfo', 'albumId', albumId)
            // verify required parameter 'updateAlbumDto' is not null or undefined
            assertParamExists('updateAlbumInfo', 'updateAlbumDto', updateAlbumDto)
            const localVarPath = `/album/{albumId}`
                .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));
                      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const res = await api.put(`/api/post/${postId}/unlike`);

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
  
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateAlbumDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

//------------------------------ Album -----------------------------

      /**
       * 
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      export const getConfig = async () => {
                  


          const res = await api.get(`/system-config`);


          // authentication bearer required
          // http bearer authentication required
          await setBearerAuthToObject(localVarHeaderParameter, configuration)


  
          setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

          return {
              url: toPathString(localVarUrlObj),
              options: localVarRequestOptions,
          };
      },
      /**
       * 
       * @param {object} body 
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      export const updateConfig = async (body: object, ) => {
          // verify required parameter 'body' is not null or undefined
          assertParamExists('updateConfig', 'body', body)
                  

          const res = await api.put(`/photo/system-config`);

          // authentication bearer required
          // http bearer authentication required
          await setBearerAuthToObject(localVarHeaderParameter, configuration)

          return {};
      }








// photo server
/**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
 export const getServerInfo = async () => {

  const res = await api.get(`/photo/server-info`);
  
  return {};
},
/**
* 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getServerVersion = async () => {

  const res = await api.get(`/photo/server-info/version`);
  
  return {};
},
/**
* 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getStats = async () => {

  const res = await api.get(`/photo/server-info/stats`);
  
  return {};
},
/**
* 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const pingServer =  async () => {

  const res = await api.get(`/photo/server-info/ping`);

  
  return {};
},


/**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
 export const getAllJobsStatus = async () => {

  const res = await api.put(`/photo/jobs`);  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  return {};
},
/**
* 
* @param {JobId} jobId 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getJobStatus = async (jobId: JobId, ) => {
  // verify required parameter 'jobId' is not null or undefined
  assertParamExists('getJobStatus', 'jobId', jobId)
  const localVarPath = `/jobs/{jobId}`
      .replace(`{${"jobId"}}`, encodeURIComponent(String(jobId)));


  const res = await api.get(`/api/post/${postId}/unlike`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  
  return {};
},
/**
* 
* @param {JobId} jobId 
* @param {JobCommandDto} jobCommandDto 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const sendJobCommand = async (jobId: JobId, jobCommandDto: JobCommandDto, ) => {
  // verify required parameter 'jobId' is not null or undefined
  assertParamExists('sendJobCommand', 'jobId', jobId)
  // verify required parameter 'jobCommandDto' is not null or undefined
  assertParamExists('sendJobCommand', 'jobCommandDto', jobCommandDto)
  const localVarPath = `/jobs/{jobId}`
      .replace(`{${"jobId"}}`, encodeURIComponent(String(jobId)));

  const res = await api.put(`/photo/`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)


    localVarRequestOptions.data = serializeDataIfNeeded(jobCommandDto, localVarRequestOptions, configuration)

  return {};
}




        /**
         * 
         * @param {CreateDeviceInfoDto} createDeviceInfoDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
         createDeviceInfo: async (createDeviceInfoDto: CreateDeviceInfoDto, ) => {
          // verify required parameter 'createDeviceInfoDto' is not null or undefined
          assertParamExists('createDeviceInfo', 'createDeviceInfoDto', createDeviceInfoDto)                  

          const res = await api.post(`/photo/device-info`);

          // authentication bearer required
          // http bearer authentication required
          await setBearerAuthToObject(localVarHeaderParameter, configuration)


          return {
            
          };
      },
      /**
       * 
       * @param {UpdateDeviceInfoDto} updateDeviceInfoDto 
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      export const updateDeviceInfo = async (updateDeviceInfoDto: UpdateDeviceInfoDto, ) => {
          // verify required parameter 'updateDeviceInfoDto' is not null or undefined
          assertParamExists('updateDeviceInfo', 'updateDeviceInfoDto', updateDeviceInfoDto)
                  
          const res = await api.put(`/photo/device-info`);

          const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};

          // authentication bearer required
          // http bearer authentication required
          await setBearerAuthToObject(localVarHeaderParameter, configuration)

          return {
          };
      }









export const getAssetSearchTerms = async () => {

  const res = await api.get(`/photo/asset/search-terms`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)


  return {};
},
/**
* 
* @param {string} assetId 
* @param {ThumbnailFormat} [format] 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getAssetThumbnail = async (assetId: string, format?: ThumbnailFormat, ) => {
  // verify required parameter 'assetId' is not null or undefined
  assertParamExists('getAssetThumbnail', 'assetId', assetId)
  const localVarPath = `/asset/thumbnail/{assetId}`
      .replace(`{${"assetId"}}`, encodeURIComponent(String(assetId)));

  const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  if (format !== undefined) {
      localVarQueryParameter['format'] = format;
  }



  
  return {};
},
/**
* 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getCuratedLocations = async () => {

  const res = await api.get(`/photo/asset/curated-locations`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)


  return {};
},
/**
* 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getCuratedObjects = async () => {

  const res = await api.get(`/photo/asset/curated-objects`);

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},
/**
* Get all asset of a device that are in the database, ID only.
* @summary 
* @param {string} deviceId 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getUserAssetsByDeviceId = async (deviceId: string, ) => {
  // verify required parameter 'deviceId' is not null or undefined
  assertParamExists('getUserAssetsByDeviceId', 'deviceId', deviceId)
  const localVarPath = `/asset/{deviceId}`
      .replace(`{${"deviceId"}}`, encodeURIComponent(String(deviceId)));

  const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},
/**
* 
* @param {SearchAssetDto} searchAssetDto 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const searchAsset = async (searchAssetDto: SearchAssetDto, ) => {
  // verify required parameter 'searchAssetDto' is not null or undefined
  assertParamExists('searchAsset', 'searchAssetDto', searchAssetDto)

  const res = await api.post(`/photo//asset/search`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)
    
  localVarRequestOptions.data = serializeDataIfNeeded(searchAssetDto, localVarRequestOptions, configuration)

  return {};
},
/**
* 
* @param {string} assetId 
* @param {boolean} [isThumb] 
* @param {boolean} [isWeb] 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
serveFile: async (assetId: string, isThumb?: boolean, isWeb?: boolean, ) => {
  // verify required parameter 'assetId' is not null or undefined
  assertParamExists('serveFile', 'assetId', assetId)
  const localVarPath = `/asset/file/{assetId}`
      .replace(`{${"assetId"}}`, encodeURIComponent(String(assetId)));

      const res = await api.put(`/api/post/${postId}/unlike`);


  const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  if (isThumb !== undefined) {
      localVarQueryParameter['isThumb'] = isThumb;
  }

  if (isWeb !== undefined) {
      localVarQueryParameter['isWeb'] = isWeb;
  }



  
  return {};
},
/**
* Update an asset
* @summary 
* @param {string} assetId 
* @param {UpdateAssetDto} updateAssetDto 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
updateAssetById: async (assetId: string, updateAssetDto: UpdateAssetDto, ) => {
  // verify required parameter 'assetId' is not null or undefined
  assertParamExists('updateAssetById', 'assetId', assetId)
  // verify required parameter 'updateAssetDto' is not null or undefined
  assertParamExists('updateAssetById', 'updateAssetDto', updateAssetDto)
  const localVarPath = `/asset/assetById/{assetId}`
      .replace(`{${"assetId"}}`, encodeURIComponent(String(assetId)));


    const res = await api.put(`/api/post/${postId}/unlike`);


  const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  localVarHeaderParameter['Content-Type'] = 'application/json';

    localVarRequestOptions.data = serializeDataIfNeeded(updateAssetDto, localVarRequestOptions, configuration)

  return {};
},

/**
         * Check duplicated asset before uploading - for Web upload used
         * @summary 
         * @param {CheckDuplicateAssetDto} checkDuplicateAssetDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
 checkDuplicateAsset: async (checkDuplicateAssetDto: CheckDuplicateAssetDto, ) => {
  // verify required parameter 'checkDuplicateAssetDto' is not null or undefined
  assertParamExists('checkDuplicateAsset', 'checkDuplicateAssetDto', checkDuplicateAssetDto)

  const res = await api.post(`/photo//asset/check`);  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  localVarRequestOptions.data = serializeDataIfNeeded(checkDuplicateAssetDto, localVarRequestOptions, configuration)

  return {};
},
/**
* Checks if multiple assets exist on the server and returns all existing - used by background backup
* @summary 
* @param {CheckExistingAssetsDto} checkExistingAssetsDto 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
checkExistingAssets: async (checkExistingAssetsDto: CheckExistingAssetsDto, ) => {
  // verify required parameter 'checkExistingAssetsDto' is not null or undefined
  assertParamExists('checkExistingAssets', 'checkExistingAssetsDto', checkExistingAssetsDto)
    
  const res = await api.post(`/photo/asset/exist`);  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)


    localVarRequestOptions.data = serializeDataIfNeeded(checkExistingAssetsDto, localVarRequestOptions, configuration)

  return {};
},
/**
* 
* @param {DeleteAssetDto} deleteAssetDto 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const deleteAsset = async (deleteAssetDto: DeleteAssetDto, ) => {
  // verify required parameter 'deleteAssetDto' is not null or undefined
  assertParamExists('deleteAsset', 'deleteAssetDto', deleteAssetDto)

  const res = await api.del(`/photo/asset`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)


    localVarRequestOptions.data = serializeDataIfNeeded(deleteAssetDto, localVarRequestOptions, configuration)

  return {};
},
/**
* 
* @param {string} assetId 
* @param {boolean} [isThumb] 
* @param {boolean} [isWeb] 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
downloadFile: async (assetId: string, isThumb?: boolean, isWeb?: boolean, ) => {
  // verify required parameter 'assetId' is not null or undefined
  assertParamExists('downloadFile', 'assetId', assetId)
  const localVarPath = `/asset/download/{assetId}`
      .replace(`{${"assetId"}}`, encodeURIComponent(String(assetId)));

      const res = await api.put(`/api/post/${postId}/unlike`);


  const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  if (isThumb !== undefined) {
      localVarQueryParameter['isThumb'] = isThumb;
  }

  if (isWeb !== undefined) {
      localVarQueryParameter['isWeb'] = isWeb;
  }



  
  return {};
},
/**
* 
* @param {number} [skip] 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const downloadLibrary = async (skip?: number, ) => {

  const res = await api.get(`/photo/asset/download-library`);  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  if (skip !== undefined) {
      localVarQueryParameter['skip'] = skip;
  }



  
  return {};
},
/**
* Get all AssetEntity belong to the user
* @summary 
* @param {string} [ifNoneMatch] ETag of data already cached on the client
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/







export const getAllAssets = async (ifNoneMatch?: string, ) => {

  const res = await api.get(`/photo/asset`);  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  if (ifNoneMatch !== undefined && ifNoneMatch !== null) {
      localVarHeaderParameter['if-none-match'] = String(ifNoneMatch);
  }

  
  return {};
},
/**
* Get a single asset\'s information
* @summary 
* @param {string} assetId 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
getAssetById: async (assetId: string, ) => {
  // verify required parameter 'assetId' is not null or undefined
  assertParamExists('getAssetById', 'assetId', assetId)
  const localVarPath = `/asset/assetById/{assetId}`
      .replace(`{${"assetId"}}`, encodeURIComponent(String(assetId)));

  const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},
/**
* 
* @param {GetAssetByTimeBucketDto} getAssetByTimeBucketDto 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getAssetByTimeBucket = async (getAssetByTimeBucketDto: GetAssetByTimeBucketDto, ) => {
  // verify required parameter 'getAssetByTimeBucketDto' is not null or undefined
  assertParamExists('getAssetByTimeBucket', 'getAssetByTimeBucketDto', getAssetByTimeBucketDto)

  const res = await api.post(`/photo/asset/time-bucket`);  
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

    localVarRequestOptions.data = serializeDataIfNeeded(getAssetByTimeBucketDto, localVarRequestOptions, configuration)

  return {};
},
/**
* 
* @param {GetAssetCountByTimeBucketDto} getAssetCountByTimeBucketDto 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getAssetCountByTimeBucket = async (getAssetCountByTimeBucketDto: GetAssetCountByTimeBucketDto, ) => {
  // verify required parameter 'getAssetCountByTimeBucketDto' is not null or undefined
  assertParamExists('getAssetCountByTimeBucket', 'getAssetCountByTimeBucketDto', getAssetCountByTimeBucketDto)

  const res = await api.post(`/photo/asset/count-by-time-bucket`);    

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  localVarRequestOptions.data = serializeDataIfNeeded(getAssetCountByTimeBucketDto, localVarRequestOptions, configuration)

  return {};
},

/**
* 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
export const getAssetCountByUserId = async () => {

  const res = await api.get(`/photo/asset/count-by-user-id`);    

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
}