<template>
  <transition name="fade">
    <div v-if="show" class="w-full flex items-center justify-center">
      <div className="fixed top-0 w-1/4 bg-red-500 text-white py-4 px-6 mt-2 flex items-center justify-center rounded-lg">
        <div className="flex items-center">
          <div>
            <span className="text-sm">{{ message }}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: ""
    };
  },
  methods: {
    showMessage(message) {
      this.message = message;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
