<script>
    import { onMount } from 'svelte';
    import { StackRouter, slide } from 'svelte-stack-router';
    import isStandalone from 'is-standalone';
  
    import Play from '$lib/components/song/Play.svelte';
    import MiniPlay from '$lib/components/song/MiniPlay.svelte';
    import Loading from '$lib/components/song/Loading.svelte';
    import { TabBar } from '$lib/components/song/base';
  
    import { getSongUrl, personalFM, getSongDetail } from './api/song';
    import { userPlaylist, userLikedSongsIDs, likedArtists } from './api/user';
  
    import routes from './routes';
  
    import {
      isLoadingStore,
      isHomePageStore,
      restoreScrollStore,
      defaultResumableStore,
      isLoginStore,
    } from './store/common';
    import {
      currentSongStore,
      currentPlayListStore,
      currentSongIndexStore,
      playIsMaxStore,
      playIsMinStore,
      playStatusStore,
      maxPlayToTopStore,
      isFMPlayStore,
      FMPlayStore,
      FMPlayNextStore,
      currentTimeStore,
      mainCoverTypeStore,
      playRepeatModelStore,
      currentSongQualityStore,
    } from './store/play';
    import { userInfoStore, userLikeSongIdsStore } from './store/user';
  
    import { timeToMinute, Toast, Alert, Confirm, getUserAgentInfo, getOsInfo } from './utils/common';
  
    let audioDOM;
    let audioDOMIsRander = false;
    let endTime = 0;
    let currentTime = '0:00';
    let currentTimeLong = 0;
  
    window.addEventListener('hashchange', function (event) {
      if (event.newURL.indexOf('#') < 0 || event.newURL.split('#')[1] === '' || event.newURL.split('#')[1] === '/') {
        isHomePageStore.set(true);
      } else {
        isHomePageStore.set(false);
      }
      if (event.oldURL.indexOf('#') > 0 && event.oldURL.split('#')[1] === '/login') {
        location.reload();
      }
    });
  
    // history.pushState(null, null, location.href);
    window.addEventListener('popstate', function (event) {
      if ($playIsMaxStore) {
        playIsMaxStore.set(false);
        mainCoverTypeStore.set('cover');
        maxPlayToTopStore.set(window.screen.height + 'px');
      }
    });
  
    // pushHistory();
  
    // window.addEventListener(
    //   "popstate",
    //   function (e) {
    //     console.log(11, e);
    //     // $(".onback").show();
    //   },
    //   false
    // );
  
    // function pushHistory() {
    //   var state = {
    //     title: "title",
    //     url: "#",
    //   };
    //   window.history.pushState(state, "title", "#");
    // }
  
    onMount(() => {
      if (localStorage.getItem('noAlertStart') != '1') {
        // if (getOsInfo().os === 'iPhone' && (getUserAgentInfo().browser != 'safari' || !isStandalone)) {
        //   Confirm(
        //     '?????? iOS ????????? PWA ??????????????????????????????????????? iPhone ??? Safari ????????????????????????????????????????????????????????????????????????',
        //     () => {},
        //     '????????????',
        //     '????????????',
        //     () => {
        //       localStorage.setItem('noAlertStart', '1');
        //     }
        //   );
        // }
        if (getOsInfo().os === 'iPhone' && getUserAgentInfo().browser == 'safari' && isStandalone) {
          Confirm(
            '?????? iOS ????????? PWA ??????????????????????????????????????? iPhone ??? Safari ???????????????????????????',
            () => {},
            '????????????',
            '????????????',
            () => {
              localStorage.setItem('noAlertStart', '1');
            }
          );
        }
        if (getOsInfo().os === 'Android') {
          if (!isStandalone && localStorage.getItem('isAlertPWA') != '1') {
            Confirm(
              '?????? PWA ???????????????????????????????????????????????????????????????',
              () => {},
              '????????????',
              '????????????',
              () => {
                localStorage.setItem('noAlertStart', '1');
              }
            );
          } else {
            if (getUserAgentInfo().browser != 'chrome' && getUserAgentInfo().browser != 'edge') {
              Confirm(
                '?????? Android ???????????? Chrome ??? Edge ??????????????????',
                () => {},
                '????????????',
                '????????????',
                () => {
                  localStorage.setItem('noAlertStart', '1');
                }
              );
            } else {
              if (getUserAgentInfo().browser === 'chrome' && getUserAgentInfo().version < 90) {
                Confirm(
                  '?????? Android ???????????????????????? Chrome ?????????',
                  () => {},
                  '????????????',
                  '????????????',
                  () => {
                    localStorage.setItem('noAlertStart', '1');
                  }
                );
              }
              if (getUserAgentInfo().browser === 'edge' && getUserAgentInfo().version < 90) {
                Confirm(
                  '?????? Android ???????????????????????? Edge ?????????',
                  () => {},
                  '????????????',
                  '????????????',
                  () => {
                    localStorage.setItem('noAlertStart', '1');
                  }
                );
              }
            }
          }
        }
        if (getOsInfo().os != 'Android' && getOsInfo().os != 'iPhone') {
          Confirm(
            '???????????? iPhone ??? Android ???????????????',
            () => {},
            '????????????',
            '????????????',
            () => {
              localStorage.setItem('noAlertStart', '1');
            }
          );
        }
      }
      if ($isLoginStore) {
        userPlaylistFun($userInfoStore);
        likedArtistsFun();
      }
      // ??????????????????????????????????????????
      if (localStorage.getItem('localPlayList')) {
        let localPlayList = JSON.parse(localStorage.getItem('localPlayList'));
        if (localPlayList.length > 300) {
          localPlayList = localPlayList.slice(0, 300);
        }
        getLocalPlayListFun(localPlayList.join(','));
      }
      if (location.href.indexOf('#') < 0 || location.href.split('#')[1] === '' || location.href.split('#')[1] === '/') {
        isHomePageStore.set(true);
      } else {
        isHomePageStore.set(false);
      }
      window.audioDOM = audioDOM;
      window.audioDOM.addEventListener('canplaythrough', function () {
        // ?????????????????????
        audioDOMIsRander = true;
        endTime = '-' + timeToMinute(window.audioDOM.duration - window.audioDOM.currentTime);
      });
      window.audioDOM.addEventListener('timeupdate', function () {
        currentTimeStore.set(window.audioDOM.currentTime);
        // ????????????????????????????????????
        currentTime = timeToMinute(window.audioDOM.currentTime);
        currentTimeLong = (window.audioDOM.currentTime / window.audioDOM.duration) * 100;
        endTime = '-' + timeToMinute(window.audioDOM.duration - window.audioDOM.currentTime);
      });
      window.audioDOM.addEventListener(
        'ended',
        function () {
          if ($isFMPlayStore) {
            //??????FM??????
            mainCoverTypeStore.set('cover');
            getSongUrlFun($FMPlayNextStore, 'fm');
          } else {
            if ($playRepeatModelStore != 'repeatOnce' && $currentSongIndexStore === $currentPlayListStore.length - 1) {
              Toast('????????????????????????', 2000);
            } else {
              if ($playRepeatModelStore === 'shuffle') {
                //??????
                let index = Math.floor(Math.random() * ($currentPlayListStore.length - 1));
                if ($mainCoverTypeStore === 'lyric') mainCoverTypeStore.set('cover');
                getSongUrlFun($currentPlayListStore[index], 'shuffle', index);
              } else if ($playRepeatModelStore === 'repeatOnce') {
                //????????????
                if ($mainCoverTypeStore === 'lyric') mainCoverTypeStore.set('cover');
                getSongUrlFun($currentPlayListStore[$currentSongIndexStore], 'once', $currentSongIndexStore);
              } else {
                if ($mainCoverTypeStore === 'lyric') mainCoverTypeStore.set('cover');
                getSongUrlFun($currentPlayListStore[$currentSongIndexStore + 1]);
              }
            }
          }
        },
        false
      );
      //????????????????????????URL????????????(??????30????????????)
      if ((new Date().getTime() - Number(localStorage.getItem('pauseTimes'))) / 1000 / 60 > 30) {
        window.audioDOM.src = `https://music.163.com/song/media/outer/url?id=${$currentSongStore.id}.mp3`;
      } else {
        window.audioDOM.src = $currentSongStore.url;
      }
      // window.audioDOM.src = "https://m8.music.126.net/20210907010112/541ee038536db12045e4a99d565becd8/ymusic/5614/195d/ad51/33fff191fffc2fd5da6c94d71e7777ef.mp3";
      window.audioDOM.load(); //??????iOS canplaythrough???????????????
    });
    //????????????????????????
    async function getLocalPlayListFun(songIds) {
      const res = await getSongDetail(songIds);
      if (res.code === 200) {
        let songs = res.songs;
        if (!songIds.split(',').includes($currentSongStore.id.toString())) {
          songs.unshift($currentSongStore);
          currentSongIndexStore.set(0);
        } else {
          currentSongIndexStore.set(songIds.split(',').indexOf($currentSongStore.id.toString()));
        }
        currentPlayListStore.set(songs);
        let ids = [];
        for (let r = 0; r < songs.length; r++) {
          ids.push(songs[r].id);
        }
        localStorage.setItem('localPlayList', JSON.stringify(ids));
      }
    }
    //?????????????????????
    async function likedArtistsFun() {
      const res = await likedArtists({ limit: 2000 });
      if (res.code === 200) {
        let ids = [];
        for (let i = 0; i < res.data.length; i++) {
          ids.push(res.data[i].id);
        }
        localStorage.setItem('useLoveSongerIds', JSON.stringify(ids));
      } else {
        alert('????????????????????????');
      }
    }
    async function getSongUrlFun(song, type, index) {
      const res = await getSongUrl(song.id); //????????????url
      if (res.code === 200) {
        if (res.data[0].url) {
          song.url = res.data[0].url.replace(/^http:/, 'https:');
          if (res.data[0].fee === 1 && res.data[0].freeTrialInfo != null) {
            currentSongQualityStore.set('??????');
          } else if (res.data[0].type === 'flac') {
            currentSongQualityStore.set('FLAC');
          } else {
            currentSongQualityStore.set(res.data[0].br);
          }
          window.audioDOM.src = song.url;
          window.audioDOM.play();
          playStatusStore.set(true);
          if (document.getElementById('playgroundImg'))
            document.getElementById('playgroundImg').style.animationPlayState = 'running';
  
          if ($isFMPlayStore) {
            //??????FM??????
            personalFMFun();
            FMPlayStore.set(song);
            currentSongStore.set(song);
            currentPlayListStore.set([$FMPlayStore]);
            currentSongIndexStore.set(0);
            localStorage.setItem('currentSong', JSON.stringify(song));
          } else {
            if (type === 'shuffle') {
              currentSongStore.set(song);
              localStorage.setItem('currentSong', JSON.stringify(song));
              currentSongIndexStore.set(index);
            } else if (type === 'once') {
              currentSongStore.set(song);
              localStorage.setItem('currentSong', JSON.stringify(song));
              currentSongIndexStore.set(index);
              if ($currentSongIndexStore !== $currentPlayListStore.length - 1) {
                getSongUrl($currentPlayListStore[$currentSongIndexStore + 1].id);
              }
            } else {
              currentSongStore.set(song);
              localStorage.setItem('currentSong', JSON.stringify(song));
              currentSongIndexStore.set($currentSongIndexStore + 1);
              if ($currentSongIndexStore !== $currentPlayListStore.length - 1) {
                getSongUrl($currentPlayListStore[$currentSongIndexStore + 1].id);
              }
            }
          }
        } else {
          Toast(`???? ???????????????${song.name}???????????????????????????......???????????????????????????`, 2000);
        }
      }
    }
    //??????FM
    async function personalFMFun() {
      const res = await personalFM();
      if (res.code === 200) {
        res.data[0].al = res.data[0].album;
        res.data[0].ar = res.data[0].artists;
        res.data[0].alia = res.data[0].alias;
        FMPlayNextStore.set(res.data[0]);
      }
    }
    async function userPlaylistFun(login) {
      //????????????????????????ID??????,??????????????????????????????
      const res = await userPlaylist({
        uid: login.account.id,
        limit: 10000,
        offset: 0,
      });
      if (res.code === 200) {
        let ids = [];
        for (let i = 0; i < res.playlist.length; i++) {
          ids.push(res.playlist[i].id);
        }
        localStorage.setItem('usePlayListIds', JSON.stringify(ids));
        userLikedSongsIDsFun(login);
      } else {
        Alert('????????????????????????');
      }
    }
    async function userLikedSongsIDsFun(login) {
      //????????????????????????ID??????,??????????????????????????????
      const res = await userLikedSongsIDs(login.account.id);
      if (res.code === 200) {
        let ids = [];
        for (let i = 0; i < res.ids.length; i++) {
          ids.push(res.ids[i]);
        }
        userLikeSongIdsStore.set(JSON.stringify(ids));
        localStorage.setItem('useLoveSongIds', JSON.stringify(ids));
      } else {
        alert('????????????????????????');
      }
    }
  </script>
  
  <audio bind:this={audioDOM} src="" id="audioDom" />
  
  <StackRouter
    {routes}
    restoreScroll={$restoreScrollStore}
    transitionFn={slide(300)}
    on:navigation-start={e => {
      // 0--?????????2--??????,1--??????
      if (e.detail.navigationType === 0) {
        defaultResumableStore.set(false);
      } else if (e.detail.navigationType === 2) {
        defaultResumableStore.set(true);
      } else {
        defaultResumableStore.set(false);
      }
    }}
  />
  
  {#if $playIsMinStore && audioDOMIsRander}
    <MiniPlay {currentTimeLong} />
  {/if}
  <Play {endTime} {currentTime} {currentTimeLong} />
  <TabBar />
  {#if $isLoadingStore}
    <Loading />
  {/if}
  
  <style>
  </style>
  