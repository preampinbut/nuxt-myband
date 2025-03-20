<template>
  <div class="h-screen w-screen">
    <ul class="menu">
      <li>
        <h3 class="menu-item">
          <a href="#"> News </a>
        </h3>
      </li>
      <li>
        <h3 class="menu-item">
          <a href="#"> Release </a>
        </h3>
      </li>
      <li>
        <h3 class="menu-item">
          <a href="#"> Store </a>
        </h3>
      </li>
    </ul>
    <DraggablePopup
      v-for="(popup, index) in popups"
      :key="index"
      :message="popup.message"
      :fade-in="popup.fadeIn ?? 0"
      :start-position="popup.startPosition"
      :actions="popup.actions"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

useHead({
  bodyAttrs: {
    class: "overflow-hidden",
  },
});

const popups = ref();

const getPopupWidthFromPercentage = (percentage: number): number => {
  return (percentage * window.innerWidth) / 100;
};
const getPopupHeightFromPercentage = (percentage: number): number => {
  return (percentage * window.innerHeight) / 100;
};

// fetch data
//const popupDatas = {
//  message: "",
//  popupType: "",
//  fadeIn: 300,
//  startPosition: {
//    desktop: {
//      x: 0,
//      y: 0,
//    },
//    mobile: {
//      x: 0,
//      y: 0,
//    }
//  },
//};

onMounted(() => {
  popups.value = [
    {
      message: "hello world",
      popupType: "dialog",
      fadeIn: 200,
      startPosition: {
        x: getPopupWidthFromPercentage(75),
        y: getPopupHeightFromPercentage(75),
      },
      actions: {
        y: "#",
      },
    },
    {
      message: "wowowowowow",
      popupType: "dialog",
      fadeIn: 400,
      startPosition: {
        x: getPopupWidthFromPercentage(85),
        y: getPopupHeightFromPercentage(85),
      },
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque itaque perspiciatis nihil fugiat tempore tenetur sunt, sapiente pariatur assumenda, veritatis quibusdam rem temporibus placeat animi similique ducimus voluptate id hic?",
      popupType: "dialog",
      fadeIn: 600,
      startPosition: {
        x: getPopupWidthFromPercentage(80),
        y: getPopupHeightFromPercentage(80),
      },
      actions: {
        y: "#",
        n: "#",
      },
    },
  ];
  if (window.innerWidth <= 1024) {
    popups.value[0].startPosition = {
      x: getPopupWidthFromPercentage(30),
      y: getPopupHeightFromPercentage(65),
    };
    popups.value[1].startPosition = {
      x: getPopupWidthFromPercentage(70),
      y: getPopupHeightFromPercentage(75),
    };
    popups.value[2].startPosition = {
      x: getPopupWidthFromPercentage(50),
      y: getPopupHeightFromPercentage(70),
    };
  }
});
</script>

<style lang="postcss" scoped>
@reference "tailwindcss";

.menu {
  @apply absolute;

  @apply top-1/6;
  @apply lg:top-1/12;

  @apply left-1/12;
}

.menu-item {
  @apply text-xl;
  @apply font-bold;
}
</style>
