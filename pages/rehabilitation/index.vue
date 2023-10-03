<template>
  <div class="rehabilitation container">
    <bread-crumbs />
    <div class="rehabilitation__title">Отделение медицинской реабилитации</div>
    <div
      class="rehabilitation__content"
      v-if="tabContent && Object.keys(tabContent).length"
    >
      <div class="rehabilitation__tabs" v-if="tabs && tabs.length">
        <div
          class="rehabilitation__tab"
          v-for="(tab, index) in tabs"
          :key="`rehabilitation-tab-${index}`"
          @click="current = tab.id"
          :class="{ 'rehabilitation__tab--active': current === tab.id }"
        >
          {{ tab.tab }}
        </div>
      </div>
      <div
        class="rehabilitation__banner"
        v-if="tabContent && tabContent.id === 0"
      >
        <div class="rehabilitation__banner-left">
          <div class="rehabilitation__banner-title">
            Отделение медицинской реабилитации
          </div>
          <div class="rehabilitation__banner-text">
            Отделение медицинской реабилитации - это современное
            специализированное отделение, которое обслуживает пациентов
            стационара и амбулаторных больных, а также обращающихся за помощью
            самостоятельно.
          </div>
          <div class="rehabilitation__banner-btn light-btn">Записаться</div>
        </div>
        <div class="rehabilitation__banner-right">
          <img
            src="@/assets/images/rehabilitation-page/banner.png"
            alt="banner"
            class="rehabilitation__banner-img"
          />
        </div>
      </div>
      <div
        class="rehabilitation__tab-content"
        :class="{ 'rehabilitation__tab-content--photos': tabContent.photos }"
      >
        <div
          class="rehabilitation__tab-content-photos"
          v-if="tabContent.photos"
        >
          <img
            :src="photo"
            :alt="`photo ${index}`"
            class="rehabilitation__tab-content-photo"
            v-for="(photo, index) in tabContent.photos"
            :key="`rehabilitation-page-photo-${index}`"
          />
        </div>
        <div
          class="rehabilitation__tab-content-left"
          v-if="tabContent.documents || tabContent.methods || tabContent.docs"
        >
          <div class="rehabilitation__documents" v-if="tabContent.documents">
            <div class="rehabilitation__documents-title">
              Необходимые документы
            </div>
            <div
              class="rehabilitation__documents-content"
              v-html="tabContent.documents"
            />
          </div>
          <div class="rehabilitation__methods" v-if="tabContent.methods">
            <div class="rehabilitation__methods-title">Методы реабилитации</div>
            <div
              class="rehabilitation__methods-content"
              v-html="tabContent.methods"
            />
          </div>
          <div
            class="rehabilitation__docs"
            v-if="tabContent.docs && tabContent.docs.length"
          >
            <div
              class="rehabilitation__doc"
              v-for="(doc, index) in tabContent.docs"
              :key="`rehabilitation-doc-${index}`"
              :class="`rehabilitation__doc--${index}`"
            >
              <div class="rehabilitation__doc-left">
                <img
                  :src="
                    doc.pic ? doc.pic : require('@/assets/images/noimage.png')
                  "
                  alt="doc pic"
                  class="rehabilitation__doc-pic"
                  :class="{ 'rehabilitation__doc-pic--noimage': !doc.pic }"
                />
              </div>
              <div class="rehabilitation__doc-info">
                <div class="rehabilitation__doc-name">{{ doc.name }}</div>
                <div class="rehabilitation__doc-post">{{ doc.post }}</div>
                <!-- <div class="rehabilitation__doc-time-title">Часы приема</div> -->
                <!-- <div class="rehabilitation__doc-time-items">
                  <div
                    class="rehabilitation__doc-time"
                    v-for="(time, timeIndex) in doc.hours"
                    :key="`rehabilitation-doc-${index}-time-${timeIndex}`"
                  >
                    <div class="rehabilitation__doc-time-title">
                      {{ time.title }}
                    </div>
                    <div class="rehabilitation__doc-time-hours">
                      {{ time.time }}
                    </div>
                  </div>
                </div> -->
                <div class="rehabilitation__doc-cab">
                  <div class="rehabilitation__doc-cab-title">Кабинет</div>
                  <div class="rehabilitation__doc-cab-number">
                    {{ doc.cab }} каб.
                  </div>
                </div>
                <a
                  href="https://www.gorzdrav.spb.ru/service-free-schedule"
                  target="_blank"
                  class="rehabilitation__doc-btn"
                  v-if="current !== 0"
                >
                  Записаться к врачу
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="rehabilitation__tab-content-right"
          v-if="
            tabContent.ageInfo || tabContent.enrollment || tabContent.additional
          "
        >
          <div
            class="rehabilitation__age"
            v-if="tabContent.ageInfo"
            v-html="tabContent.ageInfo"
          />
          <div class="rehabilitation__enrollment" v-if="tabContent.enrollment">
            <div class="rehabilitation__enrollment-title">
              Прием и запись пациентов на отделение медицинской реабилитации
              <span class="highlight-blue"
                >проводится в {{ tabContent.enrollment.cab }} кабинете.</span
              >
            </div>
            <div class="rehabilitation__enrollment-phone">
              <div class="rehabilitation__enrollment-phone-title">
                Информацию можно получить по телефону:
              </div>
              <a :href="`tel:${tabContent.enrollment.phone}`">{{
                tabContent.enrollment.phone
              }}</a>
            </div>
          </div>
          <div
            class="rehabilitation__additional"
            v-if="tabContent.additional"
            v-html="tabContent.additional"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rehabilitation',
  components: {},
  meta: {
    crumb: 'Отделение медицинской реабилитации',
  },
  data() {
    return {
      current: 0,
      tabs: [],
    }
  },
  mounted() {
    this.getData()
  },
  beforeUnmount() {},
  methods: {
    async getData() {
      let res = await this.$axios.get(`${this.$store.state.posts}/543`)
      res = res.data
      this.tabs = []
      Object.keys(res.acf.rehab.tabs).forEach((key, index) => {
        const el = res.acf.rehab.tabs[key]
        if (el.active) {
          const tab = {}
          tab.id = index
          tab.tab = el.tab
          if (index === 0) {
            if (res.acf.rehab.cab || res.acf.rehab.mainPhone) {
              tab.enrollment = {}
              if (res.acf.rehab.cab) tab.enrollment.cab = res.acf.rehab.cab
              if (res.acf.rehab.mainPhone)
                tab.enrollment.phone = res.acf.rehab.mainPhone
            }

            if (el.additional1) tab.ageInfo = el.additional1
            if (el.additional2) tab.additional = el.additional2

            if (el.docs) tab.documents = el.docs
            if (el.methods) tab.methods = el.methods
          } else if (el.isPhotos && res.acf.gallery) {
            tab.photos = res.acf.gallery.map((e) => e['full_image_url'])
          }

          if (el.additional) {
            tab.additional = el.additional
          }

          if (el.doctors && el.doctors.length) {
            tab.docs = []
            el.doctors.forEach(async (id) => {
              let doc = await this.$axios.get(
                `${this.$store.state.posts}/${id}`
              )
              doc = doc.data
              tab.docs.push({
                id: doc.id,
                pic: doc.acf.avatar.url,
                name: doc.title.rendered,
                post: doc.acf.speciality,
                cab: doc.acf.cab,
              })
            })
          }
          this.tabs.push(tab)
          console.log(this.tabs)
        }
      })
    },
  },
  computed: {
    tabContent() {
      return this.tabs.filter((el) => el.id === this.current)[0]
    },
  },
}
</script>

<style lang="scss">
.rehabilitation {
  padding-top: 192px;

  &__banner {
    background: $primary;
    border-radius: 40px;
    display: flex;
    overflow: hidden;
    margin-bottom: 56px;
    color: $white;
    position: relative;
    min-height: 386px;

    &-left {
      padding: 40px 0 40px 40px;
      max-width: 852px;
      width: 60%;
      position: relative;
      z-index: 1;
    }

    &-right {
      display: flex;
      align-items: flex-end;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 50%;
      max-width: 721px;

      img {
        width: 100%;
      }
    }

    &-title {
      font-weight: 600;
      font-size: 36px;
      margin-bottom: 24px;
      line-height: 56px;
    }

    &-text {
      font-weight: 500;
      font-size: 24px;
      line-height: 140%;
      margin-bottom: 32px;
    }

    &-btn {
      width: fit-content;
      height: auto;
      padding: 18px 82px;
      display: none;

      &:hover {
        background: rgba($white, 0.4);
      }
    }
  }

  &__content {
    padding-bottom: 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 140%;
    margin: 24px 0 40px;
  }

  &__tabs {
    display: flex;
    column-gap: 8px;
    margin-bottom: 48px;
  }

  &__tab {
    flex: 1 1 0px;
    white-space: nowrap;
    background: $white;
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    padding: 14px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all $transition;
    cursor: pointer;
    user-select: none;

    &:hover,
    &--active {
      background: $black;
      color: $white;
    }

    &-content {
      display: grid;
      grid-template-columns: 5fr 3fr;
      gap: 24px;
      position: relative;

      &--photos {
        grid-template-columns: 1fr;
      }

      &-left,
      &-right {
        display: flex;
        flex-direction: column;
        row-gap: 24px;
      }

      &-right {
        height: fit-content;
        position: sticky;
        top: 140px;
      }

      &-photos {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 20px;
        border-radius: 28px;
      }

      &-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__documents,
  &__methods {
    background: $white;
    border-radius: 24px;
    padding: 32px;

    &-title {
      font-weight: 600;
      font-size: 24px;
      line-height: 120%;
      margin-bottom: 24px;
    }

    &-content {
      color: $gray-1;
      font-size: 20px;
      font-weight: 500;
      line-height: 140%;
      li {
        padding-left: 16px;
        list-style-type: none;
        position: relative;

        &:before {
          content: '';
          width: 5px;
          height: 5px;
          min-width: 5px;
          min-height: 5px;
          background: $gray-1;
          border-radius: 50%;
          position: absolute;
          left: 0px;
          top: 12px;
        }
      }
    }
  }

  &__docs {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }

  &__doc {
    display: flex;
    width: 100%;
    background: $white;
    padding: 32px;
    border-radius: 24px;
    column-gap: 48px;
    text-decoration: none;
    color: $black;

    &--0 {
      .rehabilitation__doc {
        &-cab {
          height: auto;
        }

        &-left {
          max-height: 250px;
        }
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
    }

    &-name {
      font-weight: 600;
      font-size: 32px;
      line-height: 140%;
      margin-bottom: 16px;
    }

    &-post {
      font-weight: 600;
      font-size: 20px;
      line-height: 140%;
      color: $primary;
      margin-bottom: 28px;
    }

    &-time {
      font-weight: 600;
      font-size: 16px;
      line-height: 140%;
      display: flex;

      &-items {
        margin: 20px 0 18px;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
      }

      &-title {
        font-weight: 600;
        min-width: 130px;
        font-size: 16px;
        line-height: 140%;
        color: $gray-1;
      }
    }

    &-cab {
      font-weight: 600;
      font-size: 16px;
      display: flex;
      align-items: center;

      line-height: 140%;
      height: 100%;

      &-title {
        min-width: 130px;
        color: $gray-1;
      }

      &-number {
        font-weight: 500;
        padding: 8px 12px;
        border-radius: 16px;
        background: $gray-3;
        display: flex;
        align-items: center;
        justify-content: center;
        height: fit-content;
      }
    }

    &-left {
      height: 100%;
      max-width: 228px;
      display: flex;
      flex-direction: column;
    }

    &-pic {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 24px;
      background: $gray-3;

      &--noimage {
        padding: 24px;
        object-fit: contain;
      }
    }

    &-btn {
      margin-top: 32px;
      font-weight: 600;
      font-size: 16px;
      padding: 22px;
      width: 100%;
      color: $primary;
      background: $secondary-blue;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all $transition;
      text-decoration: none;
      color: $primary;
      width: fit-content;
      min-width: 300px;

      &:hover {
        color: $white;
        background: $primary;
      }
    }
  }

  &__age,
  &__enrollment,
  &__additional {
    background: $white;
    padding: 24px;
    border-radius: 24px;

    font-weight: 600;
    font-size: 24px;
    line-height: 150%;

    a {
      text-decoration: none;
      color: $primary;
    }

    .highlight-blue {
      color: $primary;
    }
  }

  &__enrollment {
    display: flex;
    flex-direction: column;
    row-gap: 32px;

    &-phone {
      display: flex;
      flex-direction: column;
      row-gap: 45px;
      padding: 14px 16px;
      background: $gray-3;
      border-radius: 16px;

      &-title {
        font-weight: 600;
        font-size: 18px;
        line-height: 140%;
      }

      a {
        font-weight: 600;
        font-size: 28px;
        line-height: 30px;
        color: $black;
      }
    }
  }

  &__additional {
    a {
      margin-top: 24px;
      display: block;
    }
  }
}

@media screen and (max-width: 1200px) {
  .rehabilitation {
    &__banner {
      &-left {
        width: 100%;
        max-width: unset;
        padding: 40px;
      }
      &-right {
        display: none;
      }
    }
    &__tab {
      &-content {
        grid-template-columns: 1fr;

        &-photos {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    }

    &__tabs {
      // flex-wrap: wrap;
      row-gap: 8px;
      overflow-x: scroll;
      margin-left: -50px;
      margin-right: -50px;
      padding: 0 50px;

      &::-webkit-scrollbar {
        display: none;
      }

      /* Hide scrollbar for IE, Edge and Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }
}

@media screen and (max-width: 991px) {
  .rehabilitation {
    &__doc {
      column-gap: 24px;
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      &-left {
        min-width: unset;
        max-width: unset;
        width: 100%;
      }

      &-name {
        font-size: 22px;
        margin-bottom: 16px;
      }

      &-post {
        font-size: 16px;
        margin-bottom: 16px;
      }

      &-time {
        font-size: 14px;

        &-title {
          font-size: 14px;
          min-width: 105px;
        }
      }

      &-cab {
        font-size: 14px;
        &-title {
          min-width: 105px;
        }
      }
    }

    &__tab {
      &-content {
        &-photos {
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .rehabilitation {
    &__banner {
      min-height: unset;
      &-left {
        padding: 32px;
      }
      &-title {
        font-size: 26px;
        line-height: 140%;
      }

      &-text {
        font-size: 18px;
        line-height: 140%;
      }

      &-btn {
        padding: 12px;
        width: 100%;
      }
    }

    &__doc {
      &-btn {
        min-width: 230px;
        width: fit-content;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .rehabilitation {
    &__doc {
      padding: 16px;
      grid-template-columns: 1fr 1fr;

      &-btn {
        min-width: unset;
      }
    }

    &__tabs {
      margin-left: -16px;
      margin-right: -16px;
      padding: 0 16px;
    }
  }
}

@media screen and (max-width: 480px) {
  .rehabilitation {
    &__doc {
      padding: 24px;
      grid-template-columns: 1fr;
      row-gap: 24px;

      &-pic {
        max-width: 300px;
      }

      &-btn {
        width: 100%;
      }
    }

    &__tab {
      &-content {
        &-photos {
          grid-template-columns: 1fr;
        }

        &-photo {
          border-radius: 16px;
        }
      }
    }
  }
}
</style>
