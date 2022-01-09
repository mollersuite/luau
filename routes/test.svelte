<h1>test</h1>
<svg viewBox="0 0 15 15" fill="#ff4539">
  <path d="m 12,11 v 3 h 3 v -3 z" class="bottom_right" />
  <path d="m 8,11 v 3 h 3 v -3 z" class="bottom_left" />
  <path d="m 0,11 v 1.5 L 1.5,14 H 7 v -3 z" />
  <path d="m 9.6230469,7 v 3 H 12.623047 V 7 Z" class="top" />
  <path d="M 3.5,0 2,1.5 V 3 10 H 7 9 V 6 h 3 V 3 h 2 V 1.5 L 12.5,0 Z" />
</svg>

<style>
  svg {
    width: 128px;
    height: 128px;
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .top, .bottom_left, .bottom_right {
    animation: blink 2s infinite;
  }
  .bottom_left {
    animation-delay: .2s;
  }
  .bottom_right {
    animation-delay: .4s;
  }
</style>
