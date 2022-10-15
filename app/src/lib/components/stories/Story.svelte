<script>
  export let image;
  export let stackOrder = 0;
  const { src, alt, text } = image;

  import { fade } from 'svelte/transition';

  
    let duration = 3000,
    let currentIndex = 0,
    let showInnerContent = false,
    let showOuterContent = false,
    let indexSelected: 0,
    let difference: 0,
    let key = 0,
    let percent = 0,
    let timer = 0,
    let progress = 0,
    let interval = 0,
    let isPaused = false,
    let newDur = 0,
    let pausePer = 0,

    methods: {
    getSrc(story, index) {
      const viewedIndex = this.getLastViewedIndex(story);
      return index === this.indexSelected
          ? {
            url: story.images[this.key].url,
            type: story.images[this.key].type,
          }
          : {
            url: story.images[viewedIndex].url,
            type: story.images[viewedIndex].type,
          }
    },


    autoPlay() {
      if (this.isAllStoriesEnd) {
        this.onAllStoriesEnd();
      } else if (this.isCurrentAllImagesEnd) {
        this.onCurrentAllImagesEnd(this.indexSelected);
      } else {
        this.onCurrentImageEnd(this.indexSelected);
      }
      this.reset();

    },
    play() {
      this.timer = new Date().getTime();
      this.progress = setInterval(() => {
        // forward
        let time = new Date().getTime()
        if (this.newDur > 0) {
          this.percent =
              this.pausePer +
              Math.floor((100 * (time - this.timer)) / this.duration);
        } else {
          this.percent = Math.floor((100 * (time - this.timer)) / this.duration);
        }
      }, this.duration / 100)
      if (this.newDur > 0) {
        this.interval = setInterval(this.autoPlay, this.newDur)
      } else {
        this.interval = setInterval(this.autoPlay, this.duration)
      }
    },
    reset() {
      this.percent = 0;
      clearInterval(this.interval);
      clearInterval(this.progress);
      this.newDur = 0;
      this.play();
    },
    pauseStory(event) {
      if (event) {
        this.toggleVideo('pause', event);
      }
      this.isPaused = true;
      this.pausePer = this.percent;
      clearInterval(this.progress);
      clearInterval(this.interval);
      this.newDur = this.duration - (this.pausePer * this.duration) / 100;
    },
    playStory(event) {
      if (event) {
        this.toggleVideo('play', event);
      }
      this.isPaused = false;
      this.play();
    },
    toggleVideo(type, event) {
      const video = document.getElementById(event.target.id);
      if (video) {
        video[type]();
      }
    },
    stopVideo(id) {
      const video = document.getElementById(id);
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    },
    calculateTransform(index) {
      if (this.indexSelected - index === -1 || this.indexSelected - index === 1) {
        return 315 * (index + this.difference);
      }
      if (index > this.indexSelected) {
        return (315 + 315 * (index + this.difference)) * 0.5;
      } else {
        return Math.abs((315 - 315 * (index + this.difference)) * 0.5) * -1;
      }
    },
    closeStories(){
      this.$emit('closeStories');
    },
  },
  mounted() {
    this.play();
    this.selectSlide(this.currentIndex);
  }
}
</script>

<article
  transition:fade={{ duration: 300 }}
  style="--src: url({src}); --stack-order: {stackOrder};">
  <p class="visually-hidden">Image alt: {alt}</p>
  {#if text}
    <p class="text">{text}</p>
  {/if}
</article>

  <div class="stories-wrapper">
    <div @click="closeStories" class="close"></div>
    <div class="stories">
      <div
          v-for="(story, index) in stories"
          :key="index"
          class="story"
          :style="
          index === indexSelected
            ? `transform: translate(0px)`
            : `transform: translate(${calculateTransform(index)}px) scale(0.3);cursor:pointer;`
        "
          @click="index !== indexSelected ? selectSlide(index) : ''"
      >
        <div class="story__source" @click="isPaused ? playStory($event) : pauseStory($event)">
          <video :id="getSrc(story, index).url" v-if="getSrc(story, index).type === 'video'"
                 :src="getSrc(story, index).url" autoplay></video>
          <img
              v-else
              :src="getSrc(story, index).url"
              alt=""
          />
          <div class="story__header" v-if="index === indexSelected">
            <div class="time">
              <div
                  class="time__item"
                  v-for="(elm, index) in story.images.length"
                  :key="index"
              >
                <div
                    class="time__fill"
                    :style="
                    index === key
                      ? `width: ${percent}%`
                      : key > index
                      ? `width:100%`
                      : `width:0%`
                  "
                ></div>
              </div>
            </div>
            <div class="story__top">
              <div class="user">
                <div class="user__image">
                  <img :src="story.picture" alt=""/>
                </div>
                <div class="user__name">
                  {{ username }}
                </div>
              </div>
              <div class="story__time">{{ time }}</div>
            </div>
          </div>
          <div class="story__body">
            <div class="user" v-if="index !== indexSelected">
              <div class="user__image" :style="getNotViewedIndex(story) === -1 ? `background: #FFFFFF` : ''">
                <img :src="story.picture" alt=""/>
              </div>
              <div class="user__name">
                {{ username }}
              </div>
            </div>
            <slot v-if="showInnerContent && index === indexSelected" name="innerContent" :story="story"></slot>
          </div>
        </div>
        <div v-if="index === indexSelected" class="story__icon story__icon--prev" @click="prev(index)"></div>
        <div v-if="index === indexSelected" class="story__icon story__icon--next" @click="next(index)"></div>
        <slot v-if="showOuterContent && index === indexSelected" name="outerContent" :story="story"></slot>
      </div>
    </div>
  </div>



<style lang="scss" scoped>

  article {
    background-image: var(--src),
      linear-gradient(to top, rgb(249, 249, 249), rgb(226, 226, 226));
    background-size: cover;
    height: 100%;
    border-radius: var(--story-border-radius);
    z-index: var(--stack-order);
    display: grid;
    place-items: center;
  }

  .text {
    background: rgba(16, 16, 16, 0.4);
    color: white;
    font-size: 3rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    transform: translate(-20px, -20px) rotate(-18deg);
  }

* {
  box-sizing: border-box;
}

.stories-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(16, 16, 16, 0.98);
  font-family: sans-serif;
}

.stories {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.story {
  position: absolute;
  transition: transform .2s cubic-bezier(0.4, 0, 1, 1);

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__source {
    position: relative;
    border-radius: 16px;
    background: #000000;
    width: 414px;
    height: 751px;
    background-size: contain;

    @media screen and (max-width: 768px) {
      width: 100%;
      height: auto;
      flex: 1 1 auto;
    }

    img, video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  }

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 8px 11px;
  }

  &__time {
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
  }

  &__top {
    display: flex;
    align-items: center;
  }

  &__body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    .user {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    .user__name {
      display: none;
    }

    .user__image {
      width: 140px;
      height: 140px;
      background: linear-gradient(180deg, #4C7CF6 0%, #6200C3 100%);
      margin: 0;
      padding: 5px;

      img {
        border: 5px solid #FFFFFF;
        border-radius: 100%;
      }
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    @media screen and (max-width: 768px) {
      top: 0;
      bottom: 0;
      transform: none;
      width: 100px;
      height: auto;
      background: none;
    }

    &:before {
      content: "";
      position: absolute;
      top: 8px;
      left: 9px;
      border: solid #323232;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(135deg);
      border-radius: 1px;

      @media screen and (max-width: 768px) {
        content: none;
      }
    }

    &--prev {
      left: -35px;

      @media screen and (max-width: 768px) {
        left: 0;
      }
    }

    &--next {
      right: -35px;
      transform: translateY(-50%) rotate(180deg);

      @media screen and (max-width: 768px) {
        right: 0;
        transform: none;
      }
    }
  }
}

.user {
  display: flex;
  align-items: center;

  &__image {
    width: 32px;
    height: 32px;
    border-radius: 100px;
    overflow: hidden;
    margin-right: 8px;

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }

  &__name {
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    color: #FFFFFF;
    margin-right: 5px;
  }
}

.time {
  display: flex;
  margin-bottom: 10px;

  &__item {
    position: relative;
    width: 100%;
    height: 2px;
    margin-right: 4px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__fill {
    position: absolute;
    width: 100%;
    background: #ffffff;
    height: 2px;
  }
}

.close {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:after{
    content: "\00d7";
    color: #FFFFFF;
    font-weight: 100;
    font-size: 35px;
  }
}
</style>
