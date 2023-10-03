<template>
  <modal-wrapper
    @close="$emit('close')"
    :title="type === 'feedback' ? 'Обратная связь' : 'Оставьте ваш отзыв'"
    :active="active"
  >
    <template #content>
      <form class="review">
        <label class="review__item">
          <div class="review__label" v-if="type === 'feedback'">Сообщение</div>
          <div class="review__label" v-else>Ваш отзыв</div>
          <textarea
            placeholder="Введите комментарий"
            class="review__ta"
            v-model="content"
            :class="[
              {
                'review__input--invalid': emptyContent,
              },
              { 'review__ta--feedback': type === 'feedback' },
            ]"
          ></textarea>
        </label>
        <label class="review__item">
          <div class="review__label">Ваше имя</div>
          <input
            placeholder="Например: Анна Викторовна"
            class="review__input review__input--name"
            v-model="name"
            :class="{
              'review__input--invalid': emptyName,
            }"
          />
        </label>
        <label class="review__item">
          <div class="review__label">Ваш e-mail</div>
          <input
            v-model="email"
            placeholder="Например: anna@mail.ru"
            class="review__input review__input--email"
            :class="{
              'review__input--invalid': invalidEmail,
            }"
          />
        </label>
        <!--        <div class="review__item">-->
        <!--          <div class="review__label">Ваш телефон</div>-->
        <!--          <input-->
        <!--            type="tel"-->
        <!--            v-mask="'+7 (###) ###-##-##'"-->
        <!--            v-model="phone"-->
        <!--            placeholder="Например: +7 (999) 999-99-99"-->
        <!--            class="review__input review__input&#45;&#45;email"-->
        <!--            :class="{-->
        <!--              'review__input&#45;&#45;invalid': invalidPhone,-->
        <!--            }"-->
        <!--          />-->
        <!--        </div>-->
        <label
          class="review__item"
          :class="{ 'review__item--inactive': docID !== null }"
          v-if="type !== 'feedback'"
        >
          <div class="review__label">
            {{
              docID ? 'Выбранный врач' : 'Выберите врача (при необходимости)'
            }}
          </div>
          <multiselect
            class="review__input review__input--select"
            v-model="doc"
            :options="docs.map((el) => el.name)"
            :placeholder="
              docID === null
                ? 'Специалист'
                : docs.find((el) => el.id === docID)
                ? docs.find((el) => el.id === docID).name
                : 'Специалист'
            "
            :showNoOptions="false"
            :showNoResults="false"
            :deselectLabel="'Отменить выбор'"
            :selectedLabel="''"
            :selectLabel="'Выбрать'"
            :taggable="true"
          />
        </label>
        <label class="review__item" v-if="type !== 'feedback'">
          <div class="review__label">Ваша оценка</div>
          <div
            class="review__input review__input--stars"
            :class="{ 'review__input--invalid': emptyRate }"
          >
            <div
              class="review__star"
              v-for="(star, index) in 5"
              :key="`review-star-${index}`"
              @mouseover="hoveredStar = index"
              @mouseleave="hoveredStar = -1"
              :class="[
                { 'review__star--active': hoveredStar + 1 > index },
                { 'review__star--active': index < activeScore + 1 },
              ]"
              @click="activeScore = index"
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.17517 0.536594C9.57238 -0.0429788 10.4277 -0.0429777 10.8249 0.536595L13.5608 4.52864C13.6909 4.71837 13.8823 4.85748 14.103 4.92251L18.7451 6.29092C19.419 6.48959 19.6833 7.30306 19.2549 7.85992L16.3036 11.6956C16.1634 11.8778 16.0903 12.1029 16.0966 12.3329L16.2296 17.1706C16.249 17.873 15.557 18.3757 14.895 18.1403L10.3351 16.5188C10.1184 16.4418 9.88171 16.4418 9.66499 16.5188L5.10512 18.1403C4.4431 18.3757 3.75113 17.873 3.77045 17.1706L3.9035 12.3328C3.90983 12.1029 3.83669 11.8778 3.69643 11.6956L0.745217 7.85992C0.316755 7.30306 0.581067 6.48959 1.25502 6.29092L5.89713 4.92251C6.11775 4.85748 6.30921 4.71837 6.43924 4.52864L9.17517 0.536594Z"
                  fill="#BBBCC4"
                />
              </svg>
            </div>
          </div>
        </label>
        <label class="review__footer">
          <div class="review__agreement">
            Отправляя email я соглашаюсь на
            <NLink to="/"> обработку моих персональных данных</NLink>
            в соответствии с требованиями Федерального закона от 27 июля 2006 г.
            №152-ФЗ «О персональных данных»
          </div>
          <div class="review__submit light-btn" @click="onSubmit">
            Отправить отзыв
          </div>
        </label>
      </form>
    </template>
  </modal-wrapper>
</template>

<script>
export default {
  name: 'Review',
  data() {
    return {
      hoveredStar: -1,
      activeScore: -1,

      content: '',
      name: '',
      email: '',
      phone: '',

      emptyName: false,
      emptyContent: false,
      emptyRate: false,
      invalidEmail: false,
      invalidPhone: false,

      docs: [],
      doc: null,

      emailReg:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
  },
  props: {
    active: {
      type: Boolean,
      default: true,
    },
    docID: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: '',
    },
  },
  async mounted() {
    this.getDocs()

    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async getDocs() {
      let res = await this.$axios.get(`${this.$store.state.posts}?categories=8`)
      res = res.data
      this.docs = res.map((el) => {
        return { id: el.id, name: el.title.rendered }
      })
    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    },
    validatePhone(phone) {
      return phone.replace(/[^0-9]/g, '').length !== 11
    },
    async onSubmit() {
      if (!this.name) this.emptyName = true
      else this.emptyName = false

      if (!this.content) this.emptyContent = true
      else this.emptyContent = false

      if (this.activeScore === -1 && this.type !== 'feedback')
        this.emptyRate = true
      else this.emptyRate = false

      if (!this.validateEmail(this.email)) this.invalidEmail = true
      else this.invalidEmail = false

      if (this.validatePhone(this.phone) && this.type !== 'feedback')
        this.invalidPhone = true
      else this.invalidPhone = false

      const _this = this

      if (
        this.type === 'feedback' &&
        !this.invalidEmail &&
        !this.emptyName &&
        !this.emptyContent
      ) {
        try {
          const token = await this.$recaptcha.execute('login')
          console.log('ReCaptcha token:', token)

          // send token to server alongside your form data

          const fd = new FormData()
          fd.append('your-name', this.name)
          fd.append('your-email', this.email)
          fd.append('your-msg', this.content)
          fd.append('_wpcf7_recaptcha_response', token)
          this.$axios
            .post(
              `${this.$store.state.wpJson}/contact-form-7/v1/contact-forms/656/feedback`,
              fd
            )
            .then(function (response) {
              _this.$parent.isFeedbackModal = false
              if (response.data.status === 'mail_sent') {
                _this.$store.dispatch('popup', {
                  text: 'Ваше сообщение успешно отправлено',
                  type: 'ok',
                })
              } else {
                _this.$store.dispatch('popup', {
                  text: 'Ошибка отправки сообщения',
                  type: 'error',
                })
              }
            })
            .catch(function (error) {})
        } catch (error) {
          console.log('Login error:', error)
        }
      } else if (
        !this.invalidEmail &&
        !this.invalidPhone &&
        !this.emptyName &&
        !this.emptyContent &&
        !this.emptyRate
      ) {
        this.$axios
          .post(`${this.$store.state.api}/comments`, {
            post:
              this.doc !== null
                ? this.docs.find((el) => el.name === this.doc).id
                : this.docID
                ? this.docID
                : 162,
            author_name: this.name,
            author_email: this.email,
            content: this.content,
            meta: {
              phone: this.phone,
              stars: this.activeScore + 1,
            },
          })
          .then(function (response) {
            _this.$parent.isModal = false
            _this.$store.dispatch('popup', 'Спасибо за отзыв')
          })
          .catch(function (error) {})
      }
    },
  },
  watch: {},
}
</script>

<style lang="scss">
.review {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  height: 100%;

  &__item {
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    &--inactive {
      pointer-events: none;

      .multiselect__select {
        display: none !important;
      }

      .multiselect__placeholder {
        color: $black !important;
      }
    }
  }

  &__label {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }

  &__input {
    padding: 20px 12px;
    font-family: 'Gilroy';
    transition: all $transition;

    &--invalid {
      box-shadow: inset 0 0 0 1px $red !important;
    }

    &--stars {
      display: flex;
      justify-content: center;
      align-items: center;

      > *:not(:last-child) {
        padding-right: 20px;
      }
    }

    &--select {
      height: 60px;
      display: flex;
      align-items: center;

      .multiselect {
        &__tags {
          background: transparent;
          border: none;
          padding: 0;
          display: flex;
        }

        &__placeholder {
          margin: 0;
          display: flex;
          align-items: center;
          font-size: 16px;
          line-height: 20px;
          font-family: 'Gilroy';
          color: $gray-2;
          padding: 0;
        }

        &__input {
          margin: 0;
          padding: 0;
          background: transparent;
        }

        &__select {
          top: 10px;
          right: 6px;
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

        &__single {
          background: transparent;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  &__ta {
    padding: 12px;
    min-height: 150px;
    resize: vertical;
    font-family: 'Gilroy';

    &::placeholder {
      font-family: 'Gilroy';
    }

    &--feedback {
      min-height: 280px;
    }
  }

  &__input,
  &__ta {
    border-radius: 16px;
    outline: none;
    box-shadow: none;
    border: none;
    background: $gray-3;

    font-weight: 500;
    font-size: 16px;
    line-height: 20px;

    &::placeholder {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: $gray-2;
      font-family: 'Gilroy';
    }
  }

  &__star {
    cursor: pointer;

    svg path {
      fill: $gray-2;
      transition: all $transition;
    }

    &--active {
      svg path {
        fill: $primary;
      }
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    align-self: flex-end;
    flex-grow: 1;
    justify-self: flex-end;
    //justify-content: flex-end;
  }

  &__agreement {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    a {
      color: $primary;
    }
  }
}
</style>
