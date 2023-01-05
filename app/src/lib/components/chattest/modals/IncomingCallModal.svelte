<script>
  import {
    callAnswered,
    callRejected,
    showIncomingCallModal,
  } from "$lib/store";
  
  export let peerCall;

  const answerCall = () => {
    $callAnswered = true
    $showIncomingCallModal = false;
  };

  const rejectCall = () => {
    $callRejected = true
    $showIncomingCallModal = false;
  };
</script>

<div class="incoming-call-modal">
  <p>Incoming call from {peerCall}</p>
  <div class="btn-group">
    <button on:click={answerCall}>Answer</button>
    <button on:click={rejectCall}>Reject</button>
  </div>
</div>

<style>
  p {
    color: #0084f6;
  }

  .incoming-call-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 500;
    box-shadow: 5px 5px 5px black;
    background: white;
    border: 1px solid;
  }
</style>
