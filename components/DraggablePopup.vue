<template>
  <div
    :class="['popup', opacity, hidden]"
    @mousedown="zIndexToFront"
    @touchstart="zIndexToFront"
    :style="{ top: position.y + 'px', left: position.x + 'px', zIndex: zIndex }"
  >
    <div
      class="popup-handler"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <h6 v-if="title">{{ title }}</h6>
      <button
        class="popup-handler-close"
        @click="closePopup"
        @mousedown.stop
        @touchstart.stop
      >
        x
      </button>
    </div>
    <div class="popup-body">{{ message }}</div>
    <div
      v-if="actions"
      class="popup-action"
    >
      <a
        v-if="actions.y"
        :href="actions.y"
      >
        <button>action(Y)</button>
      </a>
      <a
        v-if="actions.n"
        :href="actions.n"
      >
        <button>action(N)</button>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

type PopupType = "dialog";
const props = defineProps({
  startPosition: {
    type: Object as PropType<{
      x: number;
      y: number;
    }>,
    required: false,
  },
  popupType: {
    type: String as PropType<PopupType>,
  },
  fadeIn: {
    type: Number,
    default: 0,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  message: String,
  actions: {
    type: Object as PropType<{
      y?: string;
      n?: string;
    }>,
    required: false,
  },
});

const isTransparent = ref(props.fadeIn !== 0);
const opacity = computed(() =>
  isTransparent.value ? "opacity-0" : "opacity-100",
);

const hidden = ref("");
const closePopup = () => {
  isTransparent.value = true;
  setTimeout(() => {
    hidden.value = "hidden";
  }, 700);
};

onMounted(() => {
  if (props.fadeIn !== 0) {
    setTimeout(() => {
      isTransparent.value = false;
    }, props.fadeIn);
  }
});

const width = 200;
const height = 60;
const position = ref({
  x: props.startPosition ? props.startPosition.x - width / 2 : 0,
  y: props.startPosition ? props.startPosition.y - height / 2 : 0,
});
const isDragging = ref(false);
const offset = ref({
  x: 0,
  y: 0,
});

const startDrag = (event: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  // Get initial touch/mouse position
  const clientX = (event as TouchEvent).touches
    ? (event as TouchEvent).touches[0].clientX
    : (event as MouseEvent).clientX;
  const clientY = (event as TouchEvent).touches
    ? (event as TouchEvent).touches[0].clientY
    : (event as MouseEvent).clientY;

  offset.value = {
    x: clientX - position.value.x,
    y: clientY - position.value.y,
  };

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);

  document.addEventListener("touchmove", drag);
  document.addEventListener("touchend", stopDrag);
};

const drag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) {
    return;
  }

  const clientX = (event as TouchEvent).touches
    ? (event as TouchEvent).touches[0].clientX
    : (event as MouseEvent).clientX;
  const clientY = (event as TouchEvent).touches
    ? (event as TouchEvent).touches[0].clientY
    : (event as MouseEvent).clientY;

  position.value = {
    x: clientX - offset.value.x,
    y: clientY - offset.value.y,
  };
};

const stopDrag = () => {
  isDragging.value = false;

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);

  document.removeEventListener("touchmove", drag);
  document.removeEventListener("touchend", stopDrag);
};

const zIndex = ref(100);
const zIndexToFront = (event: MouseEvent | TouchEvent) => {
  const popups = document.getElementsByClassName(
    "popup",
  ) as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < popups.length; i++) {
    popups[i].style.zIndex = "100";
  }

  const target = event.currentTarget as HTMLElement;
  target.style.zIndex = "1000";
  zIndex.value = 1000;
};
</script>

<style lang="postcss" scoped>
@reference "tailwindcss";

.popup {
  @apply absolute;
  @apply border;

  @apply transition-opacity;
  @apply duration-700;
}

.popup-handler {
  @apply h-8;
  @apply bg-zinc-200;
  @apply select-none;
  @apply cursor-grab;
}

.popup-handler:active {
  @apply cursor-grabbing;
}

.popup-handler h6 {
  @apply inline-block;
  @apply mt-1;
  @apply ml-1;
}

.popup-handler-close {
  @apply px-1.5;
  @apply mt-0.5;
  @apply mr-0.5;
  @apply border;
  @apply float-right;

  @apply cursor-pointer;
}

.popup-body {
  @apply p-2;
  @apply bg-white;

  @apply w-[v-bind(width+'px')];
  @apply max-h-[v-bind(height+'px')];

  @apply text-ellipsis;
  @apply line-clamp-2;
}

.popup-action {
  @apply p-2;
  @apply bg-white;

  @apply flex;
  @apply justify-center;
  @apply gap-1;
}

.popup-action button {
  @apply border;
  @apply px-2;
  @apply py-1;

  @apply text-sm;
  @apply cursor-pointer;
}
</style>
