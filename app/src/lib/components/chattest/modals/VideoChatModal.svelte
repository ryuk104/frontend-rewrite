<script>
  import {
    showVideoChatModal,
    showIncomingCallModal,
    callAnswered,
    callRejected,
  } from "$lib/store";
  import { scale, fly, fade } from "svelte/transition";
  import IconClose from "$lib/components/icons/IconClose.svelte";
  import { onMount } from "svelte";
  import { Peer } from "peerjs";
  import { browser } from "$app/env";
  import IncomingCallModal from "./IncomingCallModal.svelte";
  import IconRefresh from "../icons/IconRefresh.svelte";
  import IconHangup from "../icons/IconHangup.svelte";
  import IconCamera from "../icons/IconCamera.svelte";
  import IconCameraOff from "../icons/IconCameraOff.svelte";
  import IconCameraOn from "../icons/IconCameraOn.svelte";

  let peer = null;
  let peerId = "";
  let peerCall = "";
  let message = "";
  let callInstance = null;
  let remotePeerId = "";
  let localVideoStreamRef = null;
  let remoteVideoStreamRef = null;
  let btnDisabled = false;
  let toggle = false;
  let connected = false;
  let showRefresh = false;
  let twilioServers = null;

  const videoOptions = {
    video: true,
    // audio: true,
  };

  const makeCall = async () => {
    try {
      // open camera
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        videoOptions
      );

      // Make a call to remote peer
      const call = peer.call(remotePeerId, mediaStream);

      // Receive remote video stream
      call.on("stream", (remoteVideoStream) => {
        playRemoteVideoStream(remoteVideoStream);
        playLocalVideoStream(mediaStream);
        connected = true;
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const hangup = () => {
    // close peer connection
    peer.destroy();

    // close camera
    localVideoStreamRef.srcObject.getTracks().forEach((track) => {
      // track.enabled = false;
      track.stop();
    });

    connected = false;
    $callAnswered = false;
    showRefresh = true;

    // $showVideoChatModal = false
  };

  const playLocalVideoStream = (mediaStream) => {
    localVideoStreamRef.srcObject = mediaStream;
    localVideoStreamRef.play();
  };

  const playRemoteVideoStream = (mediaStream) => {
    remoteVideoStreamRef.srcObject = mediaStream;
    remoteVideoStreamRef.play();
  };

  const turnOnCamera = () => {
    toggle = false;
    localVideoStreamRef.srcObject.getTracks().forEach((track) => {
      track.enabled = true;
    });
  };

  const turnOffCamera = () => {
    toggle = true;
    localVideoStreamRef.srcObject.getTracks().forEach((track) => {
      track.enabled = false;
    });
  };

  const sendMessage = () => {
    alert(message);
  };

  const getTurnServerCredentials = async () => {
    // fetch("http://localhost:5000/api/get-turn-credentials")
    fetch("https://twilio-turn-server.herokuapp.com/api/get-turn-credentials")
      .then((res) => res.json())
      .then((data) => {
        console.log("1. twilio credentials: ", data.token.iceServers);
        twilioServers = data.token.iceServers;

        let peerConfig = {
          // signaling server
          host: "svelte-peerjs-server.herokuapp.com",
          secure: true,
          port: 443,
          path: "/",

          // ice && turn servers
          iceServers: twilioServers,
          iceTransportPolicy: "relay", // optional: low video resolution
        };
        console.log("2. peerCofig: ", peerConfig);

        import("peerjs").then(({ default: Peer }) => {
          peer = new Peer(peerConfig);
          console.log("3. peer: ", peer);

          peer.on("open", (id) => {
            peerId = id;
            console.log("4. my id: ", peerId);
          });

          // Can't get ID
          peer.on("error", (id) => {
            console.log("error id" + id);
          });

          peer.on("call", (call) => {
            peerCall = call.peer;
            callInstance = call;
            $showIncomingCallModal = true;
          });
        });
      });
  };

  onMount(() => {
    getTurnServerCredentials();
  });

  $: if (typeof window.navigator === "undefined" && $callAnswered) window.navigator = {};

  $: if ($callAnswered) {
    window.navigator.mediaDevices.getUserMedia(videoOptions).then((mediaStream) => {
      callInstance.answer(mediaStream);
      callInstance
        .on("stream", (remoteVideoStream) => {
          playRemoteVideoStream(remoteVideoStream);
          playLocalVideoStream(mediaStream);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    });
  }

  $: if ($callRejected) {
    console.log("call is unavailable !");
  }
</script>

<!-- <div class="videochat-modal" transition:fade>
  <div
    class="icon-close-wrapper"
    on:click={() => ($showVideochatModal = false)}
  >
    <IconClose width="32" height="32" />
  </div>
  123
</div> -->

<div class="videochat-modal">
  <div class="input-group">
    <p>My ID: {peerId}</p>
    <input type="text" placeholder="Remote PeerId" bind:value={remotePeerId} />
    <button on:click={makeCall} disabled={!remotePeerId ? true : false}
      >Call</button
    >
  </div>

  <div class="inner-wrapper">
    <div class="video-group">
      <div class="remote-video">
        <h3>Local</h3>
        <video bind:this={localVideoStreamRef} width="200" height="200">
          <track kind="captions" src="" />
        </video>
      </div>

      <div class="local-video">
        <h3>Remote</h3>
        <video bind:this={remoteVideoStreamRef} width="500" height="500">
          <track kind="captions" src="" />
        </video>
      </div>

      <div class="btn-group">
        {#if connected || $callAnswered}
          {#if !toggle}
            <div class="icon-camera-on-wrapper" on:click={turnOffCamera}>
              <IconCameraOn width="50" height="50" />
            </div>
          {/if}

          {#if toggle}
            <div class="icon-camera-off" on:click={turnOnCamera}>
              <IconCameraOff width="50" height="50" />
            </div>
          {/if}

          <div class="icon-hangup-wrapper" on:click={hangup}>
            <IconHangup width="50" height="50" />
          </div>
        {/if}

        {#if showRefresh}
          <div class="icon-refresh-wrapper" on:click={() => location.reload()}>
            <IconRefresh width="50" height="50" />
          </div>
        {/if}
      </div>
    </div>

    <div
      class="icon-close-wrapper"
      on:click={() => ($showVideoChatModal = false)}
    >
      <IconClose width="50" height="50" />
    </div>

    <!-- <div class="chat">
      <div class="message-input">
        <div class="input-box">
          <input
            type="text"
            bind:value={message}
            placeholder="Say something ..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-clear"
            viewBox="0 0 512 512"
            stroke-width="1.5px"
            stroke="darkgray"
            fill="red"
            width="24"
            height="24"
            on:keydown
            on:click={() => message = ''}
            style:color={message ? 'black' : 'darkgray'}
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M368 368L144 144M368 144L144 368"
            />
          </svg>
        </div>
        <button
          disabled={!message ? true : false}
          on:click={sendMessage}
          on:keydown>Send</button
        >
      </div>
    </div> -->
    {#if $showIncomingCallModal}
      <IncomingCallModal {peerCall} />
    {/if}
  </div>
</div>

<style>
  .icon-close-wrapper {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
  }

  .videochat-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 300;
    background: #ebebeb;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
  }

  /* .icon-clear {
    position: absolute;
    right: 3px;
    color: darkgray;
  }

  .input-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  .message-input {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid;
  } */

  .inner-wrapper {
    display: flex;
  }

  /* .chat {
    position: relative;
    width: 30%;
    border: 1px solid;
  } */

  input {
    padding: 5px;
    padding-left: 10px;
    border-radius: 8px;
  }

  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: darkgray;
    text-transform: uppercase;
    /* border: 1px solid;/ */
  }

  /* .video-chat-modal {
    max-width: 1000px;
    margin: auto;
    border: 1px solid;
  } */

  /* .btn-hangup {
    cursor: pointer;
  } */

  .btn-group {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 0;
    /* border: 1px solid; */
  }

  .input-group {
    text-align: center;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    margin-bottom: 20px;
    border: 1px solid;
  }

  .remote-video {
    position: absolute;
  }

  .local-video,
  .remote-video {
    border: 1px solid darkgray;
  }

  .video-group {
    position: relative;
    width: 70%;
  }
</style>
