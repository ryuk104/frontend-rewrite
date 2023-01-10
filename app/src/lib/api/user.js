import request from '$lib/utils/song/request';
// import { getCookies } from "../utils/common";

/**
 * 
说明 : 调用此接口 ,传入手机号码, 可发送验证码
必选参数 : phone: 手机号码
可选参数 : ctcode: 国家区号,默认86即中国
接口地址 : /captcha/sent
调用例子 : /captcha/sent?phone=13xxx} uid 
 * 
 */
export function sendSmsCode(phone) {
  return request({
    url: '/captcha/sent',
    method: 'get',
    params: {
      phone,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取用户详情
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * - uid : 用户 id
 * @param {number} uid
 */
export function userDetail(uid) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: {
      uid,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取账号详情
 * 说明 : 登录后调用此接口 ,可获取用户账号信息
 */
export function userAccount(cookie) {
  return request({
    url: '/user/account',
    method: 'get',
    params: {
      cookie,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * - uid : 用户 id
 * - limit : 返回数量 , 默认为 30
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {Object} params
 * @param {number} params.uid
 * @param {number} params.limit
 * @param {number=} params.offset
 */
export function userPlaylist(params) {
  params.timestamp = new Date().getTime();
  return request({
    url: '/user/playlist',
    method: 'get',
    params,
  });
}

/**
 * 退出登录
 * 说明 : 调用此接口 , 可退出登录
 */
export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  });
}

/**
 * 喜欢音乐列表（需要登录）
 * 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
 * - uid: 用户 id
 * @param {number} uid
 */
export function userLikedSongsIDs(uid) {
  return request({
    url: '/likelist',
    method: 'get',
    params: {
      uid,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 每日签到
 * 说明 : 调用此接口 , 传入签到类型 ( 可不传 , 默认安卓端签到 ), 可签到 ( 需要登录 ), 其中安卓端签到可获得 3 点经验 , web/PC 端签到可获得 2 点经验
 * -  type: 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到
 * @param {number} type
 */
export function dailySignin(type = 0) {
  return request({
    url: '/daily_signin',
    method: 'post',
    params: {
      type,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取收藏的专辑（需要登录）
 * 说明 : 调用此接口可获取到用户收藏的专辑
 * - limit : 返回数量 , 默认为 25
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认为 0
 * @param {Object} params
 * @param {number} params.limit
 * @param {number=} params.offset
 */
export function likedAlbums(params) {
  return request({
    url: '/album/sublist',
    method: 'get',
    params: {
      limit: params.limit,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取收藏的歌手（需要登录）
 * 说明 : 调用此接口可获取到用户收藏的歌手
 */
export function likedArtists(params) {
  return request({
    url: '/artist/sublist',
    method: 'get',
    params: {
      limit: params.limit,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取收藏的MV（需要登录）
 * 说明 : 调用此接口可获取到用户收藏的MV
 */
export function likedMVs(params) {
  return request({
    url: '/mv/sublist',
    method: 'get',
    params: {
      limit: params.limit,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 上传歌曲到云盘（需要登录）
 */
export function uploadSong(file) {
  let formData = new FormData();
  formData.append('songFile', file);
  return request({
    url: '/cloud',
    method: 'post',
    params: {
      timestamp: new Date().getTime(),
    },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 获取云盘歌曲（需要登录）
 * 说明 : 登录后调用此接口 , 可获取云盘数据 , 获取的数据没有对应 url, 需要再调用一 次 /song/url 获取 url
 * - limit : 返回数量 , 默认为 200
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*200, 其中 200 为 limit 的值 , 默认为 0
 * @param {Object} params
 * @param {number} params.limit
 * @param {number=} params.offset
 */
export function cloudDisk(params = {}) {
  params.timestamp = new Date().getTime();
  return request({
    url: '/user/cloud',
    method: 'get',
    params,
  });
}

/**
 * 获取云盘歌曲详情（需要登录）
 */
export function cloudDiskTrackDetail(id) {
  return request({
    url: '/user/cloud/detail',
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
      id,
    },
  });
}

/**
 * 删除云盘歌曲（需要登录）
 * @param {Array} id
 */
export function cloudDiskTrackDelete(id) {
  return request({
    url: '/user/cloud/del',
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
      id,
    },
  });
}
