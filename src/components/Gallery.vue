<style lang="scss" scoped>
@import "../App.scss";

.gallery-root {
  @extend .d-flex, .flex-row, .align-items-center;
  height: 120px;
  overflow: hidden;
}

.gallery-button {
  @extend .btn, .btn-light, .d-flex, .flex-row, .align-items-center;
  font-family: Arial, Helvetica, sans-serif;
  height: 120px;
}

.gallery-button-disabled {
  @extend .gallery-button;
  pointer-events: none;
  opacity: 0.25;
}

.gallery-scrollable {
  width: 100%;
  height: max-content;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
}

.gallery-content {
  @extend .d-flex, .flex-row, .align-items-center;
  width: fit-content;
  height: 140px;
  padding-left: 16px;
  flex-wrap: nowrap;
}

.gallery-item {
  @extend .shadow-sm;
  position: relative;
  width: 180px;
  height: 120px;
  margin-right: 16px;
  background-color: lightgray;
  transition: 320ms ease-out;
}

.gallery-item:active {
  transform: scale(0.9, 0.9);
}

.gallery-item-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center center;
}

.gallery-item-button {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  opacity: 0;
  transition: 320ms ease-out;
  border: 0;
}

.gallery-item-button:hover {
  opacity: 0.5;
}

.gallery-item-button:active {
  opacity: 1;
  border: 0;
}

.gallery-item-play {
  @extend .d-flex, .flex-row, .align-items-center, .justify-content-center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  text-shadow: 2px 2px rgba($color: #000000, $alpha: 0.5);
  font-size: 4em;
  line-height: 0.5em;
  font-family: Arial, Helvetica, sans-serif;
  pointer-events: none;
}
</style>

<template>
  <div class="gallery-root">
    <div :class="leftButtonClass" @click="onLeftScroll">&#9668;</div>
    <div
      class="gallery-scrollable"
      :id="galleryID + '-scrollable'"
      @scroll="onScroll"
    >
      <div class="gallery-content">
        <div
          v-for="(eachItem, index) in items"
          :key="index"
          class="gallery-item"
        >
          <img :src="eachItem" class="gallery-item-img" />
          <button class="gallery-item-button" />
          <div v-if="isVideo" class="gallery-item-play">&#9658;</div>
        </div>
      </div>
    </div>
    <div :class="rightButtonClass" @click="onRightScroll">&#9658;</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

function generateID(): string {
  return String(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
}

export default Vue.extend({
  name: "gallery",
  props: {
    items: {
      type: Array as () => string[],
      required: true,
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      galleryID: generateID(),
      leftButtonClass: "gallery-button-disabled",
      rightButtonClass: "gallery-button",
    };
  },
  methods: {
    onScroll(event: Event) {
      const target = event.target as HTMLElement;

      // Left button
      if (target.scrollLeft > 0) {
        this.leftButtonClass = "gallery-button";
      } else {
        this.leftButtonClass = "gallery-button-disabled";
      }

      // Right button
      if (target.scrollLeft < target.scrollWidth - target.clientWidth - 16) {
        this.rightButtonClass = "gallery-button";
      } else {
        this.rightButtonClass = "gallery-button-disabled";
      }
    },
    onLeftScroll() {
      const scrollable = this.scrollable;
      if (scrollable) {
        scrollable.scrollBy(-196, 0);
      }
    },
    onRightScroll() {
      const scrollable = this.scrollable;
      if (scrollable) {
        scrollable.scrollBy(196, 0);
      }
    },
  },
  computed: {
    scrollable(): HTMLElement | null {
      const id: string = this.galleryID + "-scrollable";
      return document.getElementById(id);
    },
  },
});
</script>