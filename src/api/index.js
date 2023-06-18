import axios from '@/utils/axios'
import { DEFAULT_LIMIT } from '@/config'
import { formatSongs } from '@/utils/song'

// 排行榜列表
export function getToplistDetail() {
  return axios.get('/api/toplist/detail')
}

// 推荐歌单
export function getPersonalized() {
  return axios.get('/api/personalized')
}

// 歌单详情
export function getPlaylistDetail(id) {
  console.log('id')
  console.log(id)
  return new Promise((resolve, reject) => {
    axios
      .get('/openapi/musics/page', {
        params: { id },
      })
      .then(({ data }) => {
        console.log(data.list)
        var playlist = {}
        playlist.tracks = formatSongs(data.list)
        console.log(playlist.tracks)
        resolve(playlist)
      })
  })
}

// 歌单详情
export function getPlaylistDetail1(id) {
  console.log('id')
  console.log(id)
  return new Promise((resolve, reject) => {
    axios
      .get('/api/playlist/detail', {
        params: { id },
      })
      .then(({ playlist }) => playlist || {})
      .then((playlist) => {
        console.log('come here')
        const { trackIds, tracks } = playlist
        if (!Array.isArray(trackIds)) {
          reject(new Error('获取歌单详情失败'))
          return
        }
        console.log('come here 1')
        // 过滤完整歌单 如排行榜
        // if (tracks.length === trackIds.length) {
        //   playlist.tracks = formatSongs(playlist.tracks)
        //   resolve(playlist)
        //   return
        // }
        console.log(playlist)
        // 限制歌单详情最大 500
        const ids = trackIds
          .slice(0, 500)
          .map((v) => v.id)
          .toString()
        getMusicDetail(ids).then(({ songs }) => {
          playlist.tracks = formatSongs(songs)
          console.log(playlist.tracks)
          resolve(playlist)
        })
      })
  })
}

// 搜索
export function search(keywords, page = 0, limit = DEFAULT_LIMIT) {
  return axios.get('/api/search', {
    params: {
      offset: page * limit,
      limit: limit,
      keywords,
    },
  })
}

// 热搜
export function searchHot() {
  return axios.get('/api/search/hot')
}

// 获取用户歌单详情
export function getUserPlaylist(uid) {
  return axios.get('/api/user/playlist', {
    params: {
      uid,
    },
  })
}

// 获取歌曲详情
export function getMusicDetail(ids) {
  return axios.get('/api/song/detail', {
    params: {
      ids,
    },
  })
}

// 获取音乐是否可以用
export function getCheckMusic(id) {
  return axios.get('/check/music', {
    params: {
      id,
    },
  })
}

// 获取音乐地址
export function getMusicUrl(id) {
  return axios.get('/api/song/url', {
    params: {
      id,
    },
  })
}

// 获取歌词
export function getLyric(id) {
  const url = '/openapi/musics/lyric'
  return axios.get(url, {
    params: {
      id,
    },
  })
}

// 获取音乐评论
export function getComment(id, page, limit = DEFAULT_LIMIT) {
  return axios.get('/api/comment/music', {
    params: {
      offset: page * limit,
      limit: limit,
      id,
    },
  })
}
