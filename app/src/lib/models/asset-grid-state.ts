interface AssetResponseDto {
    /**
     * 
     * @type {AssetTypeEnum}
     * @memberof AssetResponseDto
     */
    'type': AssetTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'deviceAssetId': string;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'ownerId': string;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'deviceId': string;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'originalPath': string;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'resizePath': string | null;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'modifiedAt': string;
    /**
     * 
     * @type {boolean}
     * @memberof AssetResponseDto
     */
    'isFavorite': boolean;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'mimeType': string | null;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'duration': string;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'webpPath': string | null;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'encodedVideoPath'?: string | null;
    /**
     * 
     * @type {ExifResponseDto}
     * @memberof AssetResponseDto
     */
    'exifInfo'?: ExifResponseDto;
    /**
     * 
     * @type {SmartInfoResponseDto}
     * @memberof AssetResponseDto
     */
    'smartInfo'?: SmartInfoResponseDto;
    /**
     * 
     * @type {string}
     * @memberof AssetResponseDto
     */
    'livePhotoVideoId'?: string | null;
    /**
     * 
     * @type {Array<TagResponseDto>}
     * @memberof AssetResponseDto
     */
    'tags': Array<TagResponseDto>;
}

export class AssetBucket {
	/**
	 * The DOM height of the bucket in pixel
	 * This value is first estimated by the number of asset and later is corrected as the user scroll
	 */
	bucketHeight!: number;
	bucketDate!: string;
	assets!: AssetResponseDto[];
	cancelToken!: AbortController;
}

export class AssetGridState {
	/**
	 * The total height of the timeline in pixel
	 * This value is first estimated by the number of asset and later is corrected as the user scroll
	 */
	timelineHeight = 0;

	/**
	 * The fixed viewport height in pixel
	 */
	viewportHeight = 0;

	/**
	 * The fixed viewport width in pixel
	 */
	viewportWidth = 0;

	/**
	 * List of bucket information
	 */
	buckets: AssetBucket[] = [];

	/**
	 * Total assets that have been loaded
	 */
	assets: AssetResponseDto[] = [];
}
