<template>
  <div class="accord" :class="{ 'accord--active': opened }">
    <div
      class="accord__content"
      :style="[
        !opened
          ? { 'max-height': `${maxHeight}px` }
          : { 'max-height': `${2000}px` },
      ]"
    >
      <slot name="content"></slot>
    </div>
    <div class="accord__btn" @click="opened = !opened">
      {{ opened ? 'Свернуть' : 'Читать далее' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionComponent',
  data() {
    return {
      opened: false,
      disable: false,
      obs: null,
    }
  },
  props: {
    maxHeight: {
      type: Number,
      default: 200,
    },
  },
  mounted(){
    // this.obs = new ResizeObserver(this.onResize)
    // this.obs.observe(this.$refs.accContent)
  },
  methods:{
    onResize(){
      if(this.$refs.accContent.offsetHeight < 250){
        this.disable = true
      }
      console.log('change height')
    }
  }
}
</script>

<style lang="scss" scoped>
.accord {
  background: $white;
  padding: 32px;
  border-radius: 24px;
  margin-top: 32px;
  position: relative;
  // margin-bottom: 100px;

  &--active {
    .accord__content {
      transition: max-height 1s ease-in-out;

      &:after {
        opacity: 0;
      }
    }
  }

  &__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 24px;
  }

  &__content {
    max-width: 924px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    overflow: hidden;
    position: relative;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 120px;
      background: linear-gradient(
        0deg,
        #ffffff 12.95%,
        rgba(255, 255, 255, 0) 100%
      );
      transition: all $transition;
    }
  }

  &__btn {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $primary;
    cursor: pointer;
    transition: all $transition;
    position: absolute;
    bottom: 32px;
    right: 32px;

    &:hover {
      color: rgba($primary, 0.8);
    }
  }
}

@media screen and (max-width: 1200px) {
  .accord {
    padding-bottom: 50px;
  }
}

@media screen and (max-width: 600px) {
  .accord {
    padding: 24px;
  }
}

@media screen and (max-width: 500px) {
  .accord {
    padding: 24px 16px;
  }
}
</style>
