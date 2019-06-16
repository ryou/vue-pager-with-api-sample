<template>
  <transition appear name="fade">
    <div v-if="isLoading" class="Loading">
      <div class="Loading_spinner">
        <div class="Spinner -large">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715"
            class="Spinner_svg"
            style="transform: rotate(0deg);"
          >
            <circle
              fill="transparent"
              cx="45.714285714285715"
              cy="45.714285714285715"
              r="20"
              stroke-width="5.714285714285714"
              stroke-dasharray="125.664"
              stroke-dashoffset="125.66370614359172px"
              class="Spinner_circle"
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    show() {
      this.isLoading = true
    },
    hide() {
      this.isLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.Loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(#fff, 0.8);

  display: flex;
  align-items: center;
  justify-content: center;
}
.Spinner {
  display: inline-block;
  vertical-align: middle;
  color: #1abc9c;
  line-height: 32px;
  width: 32px;
  height: 32px;

  &.-large {
    width: 48px;
    height: 48px;
  }

  .Spinner_svg {
    animation-name: spinner_svg;
    animation-duration: 1.4s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .Spinner_circle {
    animation-name: spinner_circle;
    animation-duration: 1.4s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;

    stroke: currentColor;
    stroke-linecap: round;
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0px;
  }
}
@keyframes spinner_svg {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spinner_circle {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
