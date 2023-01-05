<div class="shimmer-wrapper">
  <div class="shimmer"></div>
</div>

<style>
  .shimmer-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: loading 2s infinite;
  }
  
  .shimmer {
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transform: skewX(-20deg);
    box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05);
    /* overflow: hidden; */
  }

  @keyframes loading {
    0% { transform: translateX(-150%) }
    50% { transform: translateX(-60%) }
    100% { transform: translateX(150%) }
  }
</style>