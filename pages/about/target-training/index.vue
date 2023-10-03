<template>
  <div class="target-page__wrapper">
    <div class="target-page__header page-header">
      <div class="page-header__inner container">
        <div class="page-header__left">
          <bread-crumbs />
          <div class="page-header__title">Целевая подготовка специалистов</div>
        </div>
        <div class="page-header__right">
          <img
            src="@/assets/images/page-circle.svg"
            alt="header page circle"
            class="page-header__right-circle"
          />
          <img
            src="@/assets/images/target-training-header.png"
            alt="header page docs image"
            class="page-header__right-image"
          />
        </div>
      </div>
    </div>
    <div class="target-page__content container">
      <div class="target-page__content-title" v-html="tableTitle" />
      <table class="target-page__content-table table">
        <thead>
          <th
            v-for="(th, index) in table.head"
            :key="`target-page-table-head-${index}`"
          >
            {{ th }}
          </th>
        </thead>
        <tbody>
          <tr
            v-for="(tr, index) in table.body"
            :key="`target-page-table-body-tr-${index}`"
          >
            <td
              v-for="(td, tdIndex) in tr"
              :key="`target-page-table-body-tr-${index}-td-${tdIndex}`"
            >
              {{ td }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="target-page__contacts container">
      <div class="target-page__contacts-title">Контакты для связи</div>
      <div class="target-page__contacts-cards">
        <div
          class="target-page__contacts-card"
          v-for="(card, index) in contacts"
          :key="`target-page-contact-${index}`"
        >
          <div
            class="target-page__contacts-card-img"
            :class="{ 'target-page__contacts-card-img--noimage': !card.img }"
          >
            <img
              :src="
                card.img ? card.img : require('@/assets/images/noimage.png')
              "
              :alt="`contact-img-${index}`"
            />
          </div>
          <div class="target-page__contacts-card-content">
            <div class="target-page__contacts-card-name">
              {{ card.name }}
            </div>
            <div class="target-page__contacts-card-post">
              {{ card.post }}
            </div>
            <div class="target-page__contacts-card-phone" v-if="card.phone">
              <div class="target-page__contacts-card-phone-title">
                Телефон отдела кадров:
              </div>
              <a
                :href="`tel:${card.phone}`"
                class="target-page__contacts-card-phone-btn"
              >
                <svg
                  width="24"
                  height="26"
                  viewBox="0 0 24 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.55356 6.30871C4.74261 5.87644 5.16346 5.54867 5.47588 5.21983C6.37765 4.27097 7.87314 4.40092 8.61489 5.49245L9.35287 6.57868C9.94015 7.44321 9.84717 8.62756 9.13338 9.37859L9.07088 9.44435C8.68823 9.84692 8.49179 10.4001 8.71746 10.9178C9.00461 11.576 9.62982 12.6198 10.9916 14.0529C12.3472 15.4796 13.3428 16.1447 13.9746 16.455C14.4765 16.7011 15.0168 16.4937 15.4083 16.0816L15.4563 16.0312C16.1698 15.2802 17.2947 15.1826 18.1159 15.7994L19.1354 16.5658C20.1736 17.346 20.2973 18.9208 19.3953 19.8701C19.0826 20.1992 18.7706 20.6427 18.3587 20.8402C17.3383 21.3303 13.0509 22.8732 7.83042 17.3795C2.60599 11.8815 4.08661 7.37585 4.55356 6.30871Z"
                    stroke="#176DEA"
                    stroke-width="2"
                  />
                </svg>
                {{ card.phone }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="target-page__contacts container">
      <div class="target-page__contacts-title">Документы</div>
      <div class="cards-grid">
        <hoverable-card
          v-for="(card, index) in docs"
          :key="`target-page-card-${index}`"
          :data="card"
          :type="card.type"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TargetTrainingPage',
  components: {},
  meta: {
    crumb: 'Целевая подготовка специалистов',
  },
  data() {
    return {
      table: {
        head: [],
        body: [],
      },
      tableTitle: '',
      contacts: [
        // {
        //   name: 'Конова Олеся Александровна',
        //   post: 'Заместитель главного врача по кадрам',
        //   phone: '8 (921) 320-96-34',
        //   img: 'main-docs-page/main.png',
        // },
      ],
      docs: [],
    }
  },
  mounted() {
    if (process.client) {
      this.getData()
    }
  },
  beforeUnmount() {},
  methods: {
    async getData() {
      let data = await this.$axios.get(`${this.$store.state.posts}/202`)
      data = data.data
      this.tableTitle = data.acf.tableTitle
      const content = document.createElement('div')
      content.innerHTML = data.content.rendered
      this.table.head = Array.from(
        content.querySelectorAll('table thead th')
      ).map((el) => el.textContent)
      this.table.body = Array.from(
        content.querySelectorAll('table tbody tr')
      ).map((tr) =>
        Array.from(tr.querySelectorAll('td')).map((el) => el.textContent)
      )

      this.contacts = []
      Object.keys(data.acf.contacts).forEach(async (contact) => {
        let item = await this.$axios.get(
          `${this.$store.state.posts}/${data.acf.contacts[contact].doc}`
        )
        item = item.data
        this.contacts.push({
          name: item.title.rendered,
          post: item.acf.speciality,
          phone: item.acf.phone,
          img: item.acf.avatar.url,
        })
      })

      this.docs = []
      Array.from(content.querySelectorAll('.wp-block-file a'))
        .filter((el) => !el.classList.contains('wp-block-file__button'))
        .forEach((file) => {
          const filename = file.href.split('/')[file.href.split('/').length - 1]
          const extension = /(?:\.([^.]+))?$/.exec(filename)
          this.docs.push({
            title: file.textContent,
            link: file.href,
            img:
              extension.find((el) => el === 'odt') ||
              extension.find((el) => el === 'doc') ||
              extension.find((el) => el === 'docx')
                ? 'cards-icons/word.png'
                : extension.find((el) => el === 'ods') ||
                  extension.find((el) => el === 'xls') ||
                  extension.find((el) => el === 'xlsx') ||
                  extension.find((el) => el === 'xlsm') ||
                  extension.find((el) => el === 'xlsb') ||
                  extension.find((el) => el === 'xltx')
                ? 'cards-icons/excel.png'
                : extension.find((el) => el === 'pdf')
                ? 'cards-icons/pdf.png'
                : extension.find((el) => el === 'ppt') ||
                  extension.find((el) => el === 'pptx')
                ? 'cards-icons/ppt.png'
                : 'cards-icons/folder.png',
            type: 'ext',
          })
        })
    },
  },
}
</script>

<style lang="scss">
.target-page {
  &__content {
    padding: 100px 0;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);

    &-title {
      font-weight: 600;
      font-size: 36px;
      line-height: 56px;
      margin-bottom: 40px;
    }
  }

  &__contacts {
    padding-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
    margin-bottom: 100px;
    &-title {
      font-weight: 600;
      font-size: 36px;
      line-height: 56px;
      margin-bottom: 40px;
    }

    &-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    &-card {
      background: $white;
      display: flex;
      column-gap: 24px;
      padding: 24px;
      border-radius: 24px;

      &-img {
        max-width: 235px;
        border-radius: 24px;
        overflow: hidden;

        &--noimage {
          padding: 24px;
        }

        img {
          width: 100%;
        }
      }

      &-name {
        font-weight: 600;
        font-size: 28px;
        line-height: 40px;
        max-width: 250px;
        margin-bottom: 16px;
      }

      &-post {
        font-weight: 600;
        font-size: 20px;
        line-height: normal;
        color: $primary;
        margin-bottom: 24px;
      }

      &-phone {
        display: flex;
        flex-direction: column;
        row-gap: 16px;

        &-title {
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }

        &-btn {
          padding: 14px;
          background: $secondary;
          border-radius: 12px;
          display: flex;
          align-items: center;
          column-gap: 12px;
          width: fit-content;
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          color: $primary;
          cursor: pointer;
          text-decoration: none;
          transition: all $transition;

          svg path {
            transition: all $transition;
          }

          &:hover {
            background: $primary;
            color: $white;

            svg {
              path {
                stroke: $white;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .target-page {
    &__contacts {
      &-cards {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .target-page {
    &__contacts {
      &-card {
        flex-direction: column;
        row-gap: 16px;

        &-img {
          width: 100%;
          max-width: unset;

          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
