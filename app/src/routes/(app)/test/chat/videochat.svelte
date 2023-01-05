<script>
  import { myDoc, peerInstance } from "$lib/store";
  import { onMount } from "svelte";
  import { db } from "$lib/firebase/client";
  import { doc, updateDoc } from "firebase/firestore";

  let peer = null;
  // let peerInstance = null;
  let peerId = "";
  let remotePeerId = "";
  let localVideoStreamRef = null;
  let remoteVideoStreamRef = null;

  const constraints = {
    video: true,
    audio: true,
  };

  const call = async () => {
    // Get local video stream
    const localVideoStream = await navigator.mediaDevices.getUserMedia(
      constraints
    );

    // Make a call to remote peer
    console.log("calling: ", remotePeerId);
    // const call = peer.call(remotePeerId, localVideoStream);
    const call = $peerInstance.call(remotePeerId, localVideoStream);
    console.log(call);

    // Receive remote video stream
    call.on("stream", (remoteVideoStream) => {
      // Play remote video stream
      remoteVideoStreamRef.srcObject = remoteVideoStream;
      remoteVideoStreamRef.play();

      // Play local video stream
      localVideoStreamRef.srcObject = localVideoStream;
      localVideoStreamRef.play();
    });
  };

  onMount(async () => {
    // Create a peer instance
    const Peer = (await import("peerjs")).default;
    peer = new Peer();

    // Get peer ID and write it to firestore
    peer.on("open", async (id) => {
      peerId = id;
      console.log(`${$myDoc?.name}'s peerId: ${peerId}`);

      let loginUserRef = doc(db, "users", $myDoc.name);
      await updateDoc(loginUserRef, {
        peerId: id,
      });
    });

    // Receive call
    peer.on("call", async (call) => {
      alert('hi, there !')
      if (confirm(`Accept call from ${call.peer}?`)) {
        // Get local stream
        const localVideoStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );
  
        // Answer cll with local video stream
        call.answer(localVideoStream);

        // Receive remote stream
        call.on("stream", (remoteVideoStream) => {
          // Play remote video stream
          remoteVideoStreamRef.srcObject = remoteVideoStream;
          remoteVideoStreamRef.play();
  
          // Play local video stream
          localVideoStreamRef.srcObject = stream;
          localVideoStreamRef.play();
        });
      } else {
        call.close();
      }
    });

    $peerInstance = peer;
  });
</script>

<div class="App">
  <!-- {#if $myDoc} -->
  <br />
  <!-- <p>{$myDoc?.name}'s peer id: {peerId}</p> -->
  <p>Current peer id: {peerId}</p>
  <br />
  <!-- {/if} -->
  <input type="text" bind:value={remotePeerId} />
  <button on:click={() => call(remotePeerId)}>Call</button>
  <br /><br />
  <div class="video-stream-wrapper">
    <div class="local-video-stream-wrapper">
      <p>Local Video Stream</p>
      <video bind:this={localVideoStreamRef} class="local-video-stream">
        <track kind="captions" />
      </video>
    </div>
    <div class="remote-video-stream-wrapper">
      <p>Remote Video Stream</p>
      <video bind:this={remoteVideoStreamRef} class="remote-video-stream">
        <track kind="captions" />
      </video>
    </div>
  </div>
</div>

<style>
  .video-stream-wrapper {
    display: flex;
    justify-content: space-between;
    border: 1px solid;
  }

  .local-video-stream,
  .remote-video-stream {
    width: 300px;
  }

  .remote-video-stream {
    margin-left: 30px;
  }
</style>
