<template>
  <div class="news-card" v-if="Object.keys(data)">
    <div class="news-card__title">{{ data.title }}</div>
    <div class="news-card__footer">
      <div class="news-card__footer-left">
        <div class="news-card__date">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2526 2.66667H3.91927C3.18289 2.66667 2.58594 3.26362 2.58594 4V13.3333C2.58594 14.0697 3.18289 14.6667 3.91927 14.6667H13.2526C13.989 14.6667 14.5859 14.0697 14.5859 13.3333V4C14.5859 3.26362 13.989 2.66667 13.2526 2.66667Z"
              stroke="#292C33"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.2527 1.33333V4"
              stroke="#292C33"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.91919 1.33333V4"
              stroke="#292C33"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.58594 6.66667H14.5859"
              stroke="#292C33"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ data.date }}
        </div>
        <div class="news-card__time">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#BBBCC4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 6V12L16 14"
              stroke="#BBBCC4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ data.time }}
        </div>
      </div>
      <div class="news-card__footer-right">
        <div
          class="news-card__tag"
          v-for="(tag, tagIndex) in data.tags"
          :key="`news-card-tag-${tagIndex}`"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {},
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.news-card {
  min-height: 300px;
  background: $white;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all $transition;
  cursor: pointer;
  text-decoration: none;
  color: $black;
  row-gap: 32px;

  &:hover {
    background: $primary;
    .news-card {
      &__title {
        color: $white;
      }

      &__date,
      &__time {
        color: $white;

        svg path {
          stroke: $white;
        }
      }
    }
  }

  &__title {
    font-weight: 500;
    font-size: 24px;
    line-height: 140%;
    max-width: 550px;
    transition: all $transition;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    white-space: nowrap;
    flex-wrap: wrap;

    &-left,
    &-right {
      display: flex;
      column-gap: 16px;
      flex-wrap: wrap;
    }
  }

  &__date,
  &__time {
    display: flex;
    align-items: center;
    column-gap: 8px;

    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: $gray-2;
    transition: all $transition;

    svg {
      width: 24px;
      height: 24px;

      path {
        stroke: $gray-2;
        stroke-width: 1.1px;
        transition: stroke $transition;
      }
    }
  }

  &__time {
    svg path {
      stroke-width: 1.6px;
    }
  }

  &__tag {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    padding: 6px 23px;
    border-radius: 29px;
    background: $gray-3;
  }
}
</style>
