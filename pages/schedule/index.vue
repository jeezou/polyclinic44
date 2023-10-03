<template>
  <div class="schedule container">
    <bread-crumbs />
    <div class="schedule__title">Расписание работы врачей</div>
    <div class="schedule__content" v-if="cards.length">
      <iframe
        src="https://onlinelpu.ru/pdgp44/schedule"
        width="650"
        height="650"
        ><span
          style="
            display: inline-block;
            width: 0px;
            overflow: hidden;
            line-height: 0;
          "
          data-mce-type="bookmark"
          class="mce_SELRES_start"
          >﻿</span
        ><span
          style="
            display: inline-block;
            width: 0px;
            overflow: hidden;
            line-height: 0;
          "
          data-mce-type="bookmark"
          class="mce_SELRES_start"
          >﻿</span
        ></iframe
      >
      <div
        class="schedule__content-card"
        v-for="(card, index) in cards[0]"
        :key="`schedule-1-content-card-${index}`"
      >
        <div class="schedule__content-card-name">{{ card.name }}</div>
        <div class="schedule__content-card-post">{{ card.post }}</div>
        <div class="schedule__content-card-cab">
          <div class="schedule__content-card-cab-title">Кабинет</div>
          <div class="schedule__content-card-cab-number">{{ card.cab }}</div>
        </div>
      </div>
      <div class="schedule__content-sep"></div>
      <iframe src="https://onlinelpu.ru/pdgp8/schedule" width="650" height="650"
        ><span
          style="
            display: inline-block;
            width: 0px;
            overflow: hidden;
            line-height: 0;
          "
          data-mce-type="bookmark"
          class="mce_SELRES_start"
          >﻿</span
        ><span
          style="
            display: inline-block;
            width: 0px;
            overflow: hidden;
            line-height: 0;
          "
          data-mce-type="bookmark"
          class="mce_SELRES_start"
          >﻿</span
        ></iframe
      >
      <div
        class="schedule__content-card"
        v-for="(card, index) in cards[1]"
        :key="`schedule-1-content-card-${index}`"
      >
        <div class="schedule__content-card-name">{{ card.name }}</div>
        <div class="schedule__content-card-post">{{ card.post }}</div>
        <!-- <div class="schedule__content-card-time-title">Часы приема</div>
        <div class="schedule__content-card-time">
          <div
            class="schedule__content-card-time-item"
            v-for="(item, timeIndex) in card.time"
            :key="`schedule-1-card-${index}-${timeIndex}`"
          >
            <div class="schedule__content-card-time-item-title">
              {{ item.title }}
            </div>
            <div class="schedule__content-card-time-item-time">
              {{ item.time }}
            </div>
          </div>
        </div> -->
        <div class="schedule__content-card-cab">
          <div class="schedule__content-card-cab-title">Кабинет</div>
          <div class="schedule__content-card-cab-number">{{ card.cab }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  components: {},
  meta: {
    crumb: 'Расписание работы врачей',
  },
  data() {
    return {
      cards: [
        [
          // {
          //   name: 'Ерошина Татьяна Алексеевна',
          //   post: 'Заведующая детским поликлиническим отделением №44',
          //   cab: '542, Мытинская 25',
          // },
          // {
          //   name: 'Бережная Анна Леонидовна',
          //   post: 'Заведующая педиатрическим отделением №44',
          //   cab: '347, Мытинская 25',
          // },
        ],
        [
          // {
          //   name: 'Блашенкова Надежда Юрьевна',
          //   post: 'Заведующая детским поликлиническим отделением №8',
          //   cab: '403, Чайковского 73',
          // },
          // {
          //   name: 'Пушкарева Елена Андреевна',
          //   post: 'Заведующая педиатрическим отделением №8',
          //   cab: '212, Чайковского 73',
          // },
        ],
      ],
    }
  },
  mounted() {
    this.getData()
  },
  beforeUnmount() {},
  methods: {
    async getData() {
      let res = await this.$axios.get(`${this.$store.state.posts}/369`)
      res = res.data

      res.acf.first.docs.forEach(async (id) => {
        let doc = await this.$axios.get(`${this.$store.state.posts}/${id}`)
        doc = doc.data
        this.cards[0].push({
          name: doc.title.rendered,
          post: doc.acf.speciality,
          cab: doc.acf.cab,
        })
      })

      res.acf.second.docs.forEach(async (id) => {
        let doc = await this.$axios.get(`${this.$store.state.posts}/${id}`)
        doc = doc.data
        this.cards[1].push({
          name: doc.title.rendered,
          post: doc.acf.speciality,
          cab: doc.acf.cab,
        })
      })
    },
  },
}
</script>

<style lang="scss">
.schedule {
  padding-top: 192px;

  &__content {
    padding-bottom: 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);

    iframe {
      margin-bottom: 8px;
    }

    &-sep {
      margin: 90px 0;
      width: 100%;
      height: 1px;
      background: $gray-2;
      opacity: 0.4;
    }

    &-card {
      padding: 40px;
      background: $white;
      border-radius: 24px;
      margin: 32px 0;
      max-width: 870px;

      &-name {
        font-weight: 600;
        font-size: 32px;
        line-height: 140%;
        margin-bottom: 16px;
      }

      &-post {
        font-weight: 500;
        font-size: 20px;
        line-height: 140%;
        color: $primary;
        max-width: 450px;
        margin-bottom: 24px;
      }

      &-time {
        display: flex;
        flex-direction: column;
        row-gap: 4px;
        margin-bottom: 16px;

        &-title {
          font-weight: 600;
          font-size: 16px;
          line-height: 140%;
          margin-bottom: 20px;
          color: $gray-1;
        }

        &-item {
          display: flex;
          align-items: center;

          &-title {
            min-width: 140px;
            font-weight: 500;
            font-size: 16px;
            line-height: 130%;
            color: $gray-1;
          }

          &-time {
            font-weight: 500;
            font-size: 16px;
            line-height: 130%;
          }
        }
      }

      &-cab {
        display: flex;
        &-title {
          min-width: 140px;
          font-weight: 500;
          font-size: 16px;
          color: $gray-1;
        }

        &-number {
          font-weight: 500;
          font-size: 16px;
        }
      }
    }
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 140%;
    margin: 24px 0 40px;
  }
}

@media screen and (max-width: 768px) {
  .schedule {
    &__content {
      iframe {
        width: 100% !important;
      }

      &-card {
        padding: 24px;
      }
    }
  }
}
</style>
