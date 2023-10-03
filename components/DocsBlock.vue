<template>
  <div class="docs__wrapper">
    <div class="docs__title section-title">{{ title }}</div>
    <div class="docs__number" v-if="isNum">
      Результаты поиска: {{ extDocs.length }}
    </div>
    <div class="docs__search" v-if="isSearch">
      <div class="docs__search-input-wrapper">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="docs__search-input-icon"
        >
          <path
            d="M19 19L16 16"
            stroke="#5A6882"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle
            cx="11.5"
            cy="11.5"
            r="5.5"
            stroke="#5A6882"
            stroke-width="2"
          />
        </svg>
        <input
          type="text"
          class="docs__search-input"
          placeholder="Что будем искать?"
          v-model="search"
        />
      </div>
      <div class="docs__search-ms-wrapper">
        <div
          class="docs__search-ms-clear"
          :class="{ 'docs__search-ms-clear--selected': selected }"
          @click="
            tag = null
            selected = false
          "
        ></div>
        <multiselect
          class="docs__search-ms"
          v-model="tag"
          :options="extOptions.length ? extOptions : options"
          :placeholder="'Специальность'"
          :showNoOptions="false"
          :showNoResults="false"
          :deselectLabel="'Отменить выбор'"
          :selectedLabel="''"
          :selectLabel="'Выбрать'"
          :taggable="true"
          @select="onSelect"
        />
      </div>
      <!-- <div class="docs__search-btn dark-btn" @click="filtered = true">
        Начать поиск
      </div> -->
      <div
        class="docs__search-btn docs__search-btn--reset dark-btn"
        v-if="filtered"
        @click="
          filtered = false
          search = ''
          tag = null
        "
      >
        Сбросить
      </div>
    </div>
    <div class="docs">
      <NLink
        :to="`/about/docs/all/${doc.id}`"
        class="docs__item"
        v-for="(doc, index) in filtered ? filteredDocs : visibleDocs"
        :key="`docs-page-item-${index}`"
      >
        <div
          class="docs__item-img-wrapper"
          :class="{ 'docs__item-img-wrapper--no-image': !doc.img }"
        >
          <img
            :src="doc.img ? doc.img : require('@/assets/images/noimage.png')"
            alt=""
            class="docs__item-img"
          />
        </div>
        <div class="docs__item-content">
          <div class="docs__item-name" v-html="doc.name"/>
          <div class="docs__item-footer">
            <div class="docs__item-post">{{ doc.post }}</div>
            <div class="docs__item-cab">{{ `${doc.cab} каб` }}</div>
          </div>
        </div>
      </NLink>
    </div>
    <NLink to="/about/docs/all" class="docs__more light-btn" v-if="!isPage"
    >Посмотреть всех
    </NLink
    >
    <div
      class="docs__more light-btn"
      @click="
        visibleDocs.length === docs.length ? (loaded = true) : (page += 1)
      "
      v-else-if="!loaded && !filtered && isMore"
    >
      Показать еще
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocsBlock',
  conmponents: {},
  props: {
    title: {
      type: String,
      default: 'Сотрудники',
    },
    isSearch: {
      type: Boolean,
      default: true,
    },
    isMore: {
      type: Boolean,
      default: true,
    },
    isPage: {
      type: Boolean,
      default: false,
    },
    isNum: {
      type: Boolean,
      default: false,
    },
    extDocs: {
      type: Array,
      default: () => [],
    },
    extOptions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  data() {
    return {
      tag: null,
      search: '',
      filtered: false,
      selected: false,
      options: [
        // 'Невролог',
        // 'Педиатр',
        // 'ЛОР',
        // 'Акушер-гинеколог',
        // 'Офтальмолог',
      ],
      docs: [],

      page: 0,
      perPage: 8,
      loaded: false,
    }
  },
  mounted() {
    this.docs = []
    this.getDocs()
  },
  methods: {
    onSelect() {
      this.selected = true
    },
    async getDocs() {
      const res = await this.$axios.get(
        `${this.$store.state.posts}?categories=8&per_page=999&page=1`
      )
      // console.log(res.data)
      res.data.forEach((doc) => {
        this.docs.push({
          img: doc.acf.avatar.url,
          name: doc.title.rendered,
          post: doc.acf.speciality,
          cab: doc.acf.cab,
          id: doc.id,
        })
        if (!this.options.find((el) => el === doc.acf.speciality))
          this.options.push(doc.acf.speciality)
      })
      this.options.sort()
      // console.log(this.options)
    },
  },
  computed: {
    visibleDocs() {
      return this.extDocs.length
        ? this.extDocs
        : this.docs.slice(0, this.perPage + this.page * this.perPage)
    },
    filteredDocs() {
      if (this.extDocs.length) {
        return this.extDocs.filter((el) =>
          this.tag
            ? el.post === this.tag &&
            (el.name.includes(this.search) ||
              el.cab.includes(this.search) ||
              el.post.includes(this.search))
            : el.name.includes(this.search) ||
            el.cab.includes(this.search) ||
            el.post.includes(this.search)
        )
      } else {
        return this.docs.filter((el) =>
          this.tag
            ? el.post === this.tag &&
            (el.name.includes(this.search) ||
              el.cab.includes(this.search) ||
              el.post.includes(this.search))
            : el.name.includes(this.search) ||
            el.cab.includes(this.search) ||
            el.post.includes(this.search)
        )
      }
    },
  },
  watch: {
    search(val) {
      if (val || this.tag) this.filtered = true
      else this.filtered = false
    },
    tag(val) {
      if (val || this.search) this.filtered = true
      else this.filtered = false
    },
  },
}
</script>

<style lang="scss">
.docs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  &__number {
    font-weight: 400;
    font-size: 16px;
    color: $gray-1;
    margin-bottom: 32px;
  }

  &__search {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px 24px;
    margin-bottom: 40px;

    &-btn {
      width: fit-content;
      border-radius: 12px;
      padding: 14px 26px;
      flex: 1 1 0px;

      &--reset {
        background: $red;
        max-width: 200px;

        &:hover {
          background: rgba($red, 0.8);
        }
      }
    }

    &-input {
      outline: none;
      border: none;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      padding: 12px 0;
      width: 100%;
      font-family: 'Gilroy';

      &::placeholder {
        font-family: 'Gilroy';
        color: $gray-2;
      }

      &-wrapper {
        display: flex;
        align-items: center;
        padding: 0 16px;
        background: $white;
        border-radius: 12px;
        border: 1px solid $gray-2;
        // box-shadow: inset 0 0 0 1px $gray-2;
        flex: 1 1 0px;
        column-gap: 16px;
      }
    }

    &-ms {
      min-height: 48px;
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
      font-family: 'Gilroy';
      flex: 1 1 0px;
      min-width: 200px;

      &-wrapper {
        position: relative;
        width: 100%;
        max-width: 334px;
        flex: 1 1 0px;
      }

      &-clear {
        content: '';
        position: absolute;
        right: 32px;
        top: 50%;
        transform: translateY(-55%);
        width: 24px;
        height: 24px;
        background: url('@/assets/images/icons/clear.svg');
        cursor: pointer;
        z-index: 5;
        opacity: 0;
        visibility: hidden;

        &--selected {
          opacity: 0.5;
          visibility: visible;
        }
      }

      .multiselect {
        width: 100%;
        min-width: 200px;

        &__tags {
          border: none;
          min-height: 48px;
          border-radius: 12px;
        }

        &__placeholder {
          padding: 9px 0 0 12px;
          font-weight: 500;
          font-size: 14px;
          line-height: 14px;
          color: $gray-1;
        }

        &__input,
        &__single {
          margin: 0;
          padding: 0;
          padding: 8px 0 0 12px;
          font-weight: 500;
          font-size: 14px;
          line-height: 14px;
        }

        &__option {
          &--highlight {
            background: rgba($primary, 0.8);

            &:after {
              background: rgba($primary, 0);
            }

            &.multiselect__option--selected {
              background: rgba($red, 0.8);
            }
          }
        }
      }
    }
  }

  &__item {
    background: $white;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    transition: all $transition;
    cursor: pointer;
    text-decoration: none;
    color: $black;

    &:hover {
      box-shadow: 0px 8px 15px rgba(35, 35, 35, 0.05);
    }

    &-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // height: 100%;
      min-height: 150px;
    }

    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &-wrapper {
        border-radius: 24px;
        width: 100%;
        max-height: 380px;
        height: 23vw;
        display: block;
        overflow: hidden;

        &--no-image {
          background: $gray-4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;

          img {
            width: unset;
            height: unset;
            object-fit: contain;
            width: 70%;
          }
        }
      }
    }

    &-name {
      max-width: 242px;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      margin-bottom: 16px;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      column-gap: 24px;
    }

    &-post {
      font-weight: 500;
      font-size: 16px;
      line-height: 30px;
      color: $primary;
    }

    &-cab {
      font-weight: 500;
      font-size: 14px;
      line-height: 30px;
      background: $gray-3;
      border-radius: 1000px;
      padding: 8px 14px;
      white-space: nowrap;
    }
  }

  &__title {
    margin: 100px 0 64px;
  }

  &__more {
    margin-top: 40px;
    width: 100%;
    text-decoration: none;
  }
}

@media screen and (max-width: 1279px) {
  .docs {
    grid-template-columns: repeat(3, 1fr);

    &__item {
      &-img {
        &-wrapper {
          height: 40vw;
        }
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .docs {
    grid-template-columns: repeat(2, 1fr);

    &__item {
      &-img {
        &-wrapper {
          height: 50vw;
          max-height: unset;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .docs {
    grid-template-columns: 1fr;

    &__search {
      flex-direction: column;
      align-items: flex-start;

      > * {
        width: 100%;
        max-width: unset;
      }
    }

    &__item {
      flex-direction: row;

      &-img {
        height: 100%;
        width: 100%;
        object-fit: cover;

        &-wrapper {
          height: unset;
          width: unset;
          min-height: unset;
          max-height: unset;
          overflow: hidden;

          height: 100%;
          width: 100%;
          max-height: 200px;
          max-width: 200px;
          min-height: 200px;
          min-width: 200px;

          display: flex;
          align-items: center;
          justify-content: center;

          &--no-image {
            padding: 24px 0;

            img {
              object-fit: contain;
              height: 100%;
            }
          }
        }
      }

      &-content {
        max-width: unset;
        width: 100%;
        min-height: unset;
      }

      &-footer {
        // flex-wrap: wrap;
      }

      &-post {
        line-height: 140%;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .docs {
    &__more {
      margin-top: 24px;
    }
  }
}

@media screen and (max-width: 478px) {
  .docs {
    &__item {
      display: grid;
      grid-template-columns: 89px 1fr;
      column-gap: 16px;
      align-items: center;
      padding: 16px;

      &-footer {
        flex-wrap: nowrap;
      }

      &-img {
        width: 100%;
        height: unset;
        min-width: unset;
        min-height: unset;
        // border-radius: 24px;
        object-fit: cover;

        &-wrapper {
          width: 100%;
          height: 100%;
          min-width: unset;
          min-height: unset;
          max-height: 89px;
          border-radius: 24px;
          overflow: hidden;

          &--no-image {
            padding: 0;

            img {
              height: unset;
              width: unset;
              min-height: unset;
              min-width: unset;
              width: 70%;
            }
          }
        }
      }

      &-name {
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 18px;
        line-height: 120%;
      }

      &-post {
        font-weight: 500;
        font-size: 12px;
        line-height: 120%;
      }

      &-cab {
        font-weight: 500;
        font-size: 11px;
        line-height: 30px;
        padding: 1px 6px;
        border-radius: 14px;
      }

      &-content {
        padding: 0;
        height: 100%;
        justify-content: space-between;
      }
    }
  }
}
</style>
