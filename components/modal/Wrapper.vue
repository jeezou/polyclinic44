<template>
  <div
    class="modal"
    :class="[{ 'modal--active': active }, { 'modal--news': page === 'news' }]"
  >
    <div class="modal__blackout" @click="onClose"></div>
    <div class="modal__content">
      <div class="modal__content-header">
        <div class="modal__content-header-left" v-if="page === 'news'">
          <div
            class="modal__content-additional"
            v-if="additional.date || additional.time"
          >
            <div
              class="modal__content-additional-item modal__content-additional-item--date"
              v-if="additional.date"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2526 2.66667H3.91927C3.18289 2.66667 2.58594 3.26362 2.58594 4V13.3333C2.58594 14.0697 3.18289 14.6667 3.91927 14.6667H13.2526C13.989 14.6667 14.5859 14.0697 14.5859 13.3333V4C14.5859 3.26362 13.989 2.66667 13.2526 2.66667Z"
                  stroke="#BBBCC4"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.2527 1.33333V4"
                  stroke="#BBBCC4"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.91919 1.33333V4"
                  stroke="#BBBCC4"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.58594 6.66667H14.5859"
                  stroke="#BBBCC4"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ additional.date }}
            </div>
            <div
              class="modal__content-additional-item modal__content-additional-item--time"
              v-if="additional.time"
            >
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
              {{ additional.time }}
            </div>
          </div>
          <div class="modal__content-title">{{ title }}</div>
        </div>
        <div class="modal__content-title" v-else>{{ title }}</div>
        <div class="modal__content-header-right" v-if="page === 'news'">
          <client-only>
            <div
              class="modal__content-share"
              :class="{ 'modal__content-share--active': isShare }"
            >
              <div class="modal__content-share-icon" @click="isShare = true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                    stroke="#292C33"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                    stroke="#292C33"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                    stroke="#292C33"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.58984 13.51L15.4198 17.49"
                    stroke="#292C33"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.4098 6.51001L8.58984 10.49"
                    stroke="#292C33"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="modal__content-share-list">
                <div
                  class="modal__content-share-item modal__content-share-item--copy"
                  @click="copyToClipboard"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_3200_19533)">
                      <path
                        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                        fill="white"
                      />
                      <path
                        d="M14.0003 10.1666C11.8832 10.1666 10.167 11.8829 10.167 14V18.7379C10.167 19.014 10.3908 19.2379 10.667 19.2379C10.9431 19.2379 11.167 19.014 11.167 18.7379V14C11.167 12.4352 12.4355 11.1666 14.0003 11.1666H18.6756C18.9517 11.1666 19.1756 10.9428 19.1756 10.6666C19.1756 10.3905 18.9517 10.1666 18.6756 10.1666H14.0003Z"
                        fill="#232327"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20.2687 12.5288C18.1081 12.2873 15.8926 12.2873 13.732 12.5288C13.1165 12.5976 12.6218 13.082 12.5493 13.7023C12.293 15.8933 12.293 18.1067 12.5493 20.2976C12.6218 20.9179 13.1165 21.4023 13.732 21.4711C15.8926 21.7126 18.1081 21.7126 20.2687 21.4711C20.8842 21.4023 21.3788 20.9179 21.4514 20.2976C21.7076 18.1067 21.7076 15.8933 21.4514 13.7023C21.3788 13.082 20.8842 12.5976 20.2687 12.5288ZM13.8431 13.5226C15.9299 13.2894 18.0708 13.2894 20.1576 13.5226C20.3159 13.5403 20.4403 13.6654 20.4582 13.8184C20.7054 15.9322 20.7054 18.0677 20.4582 20.1815C20.4403 20.3345 20.3159 20.4596 20.1576 20.4773C18.0708 20.7105 15.9299 20.7105 13.8431 20.4773C13.6848 20.4596 13.5604 20.3345 13.5425 20.1815C13.2953 18.0677 13.2953 15.9323 13.5425 13.8184C13.5604 13.6654 13.6848 13.5403 13.8431 13.5226Z"
                        fill="#232327"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3200_19533">
                        <rect width="32" height="32" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <a
                  class="modal__content-share-item modal__content-share-item--vk"
                  :href="`https://vk.com/share.php?url=${getAbsolutePath()}`"
                  target="_blank"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                      fill="#0082DA"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.3962 23.0174H16.652C16.652 23.0174 17.0313 22.9758 17.225 22.767C17.4033 22.5753 17.3975 22.2154 17.3975 22.2154C17.3975 22.2154 17.373 20.5303 18.1551 20.2822C18.926 20.0378 19.916 21.9108 20.9653 22.631C21.7588 23.176 22.3617 23.0565 22.3617 23.0565L25.1674 23.0174C25.1674 23.0174 26.6351 22.927 25.9392 21.773C25.8821 21.6786 25.5339 20.9194 23.8531 19.3593C22.0939 17.7264 22.3295 17.9905 24.4486 15.166C25.7392 13.4459 26.2552 12.3957 26.094 11.9459C25.9403 11.5175 24.9911 11.6308 24.9911 11.6308L21.8321 11.6505C21.8321 11.6505 21.5979 11.6185 21.4242 11.7223C21.2545 11.8242 21.1453 12.0615 21.1453 12.0615C21.1453 12.0615 20.6453 13.3926 19.9785 14.5246C18.5718 16.9132 18.0093 17.0393 17.7794 16.891C17.2447 16.5453 17.3782 15.5023 17.3782 14.7613C17.3782 12.4465 17.7293 11.4813 16.6945 11.2315C16.3511 11.1485 16.0984 11.0937 15.2202 11.0849C14.093 11.0732 13.139 11.0883 12.5988 11.353C12.2394 11.529 11.9622 11.9211 12.131 11.9437C12.3398 11.9716 12.8127 12.0712 13.0634 12.4126C13.3871 12.8529 13.3757 13.8421 13.3757 13.8421C13.3757 13.8421 13.5617 16.567 12.9413 16.9055C12.5155 17.1377 11.9314 16.6637 10.6773 14.4966C10.0347 13.3866 9.54956 12.1596 9.54956 12.1596C9.54956 12.1596 9.45601 11.9303 9.28916 11.8076C9.08666 11.659 8.80373 11.6117 8.80373 11.6117L5.80184 11.6313C5.80184 11.6313 5.3512 11.6439 5.18577 11.8398C5.0386 12.0141 5.17408 12.3746 5.17408 12.3746C5.17408 12.3746 7.52425 17.873 10.1853 20.6439C12.6253 23.1843 15.3962 23.0174 15.3962 23.0174Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a
                  :href="
                    isMobile
                      ? `whatsapp://send?text=${getAbsolutePath()}`
                      : `https://web.whatsapp.com://send?text=${getAbsolutePath()}`
                  "
                  target="_blank"
                  class="modal__content-share-item modal__content-share-item--whatsapp"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_3200_19530)">
                      <path
                        d="M16.004 0H15.996C7.174 0 0 7.176 0 16C0 19.5 1.128 22.744 3.046 25.378L1.052 31.322L7.202 29.356C9.732 31.032 12.75 32 16.004 32C24.826 32 32 24.822 32 16C32 7.178 24.826 0 16.004 0Z"
                        fill="#67E383"
                      />
                      <path
                        d="M25.3131 22.5941C24.9271 23.6841 23.3951 24.5881 22.1731 24.8521C21.3371 25.0301 20.2451 25.1721 16.5691 23.6481C11.8671 21.7001 8.83913 16.9221 8.60313 16.6121C8.37713 16.3021 6.70312 14.0821 6.70312 11.7861C6.70312 9.49012 7.86913 8.37212 8.33913 7.89212C8.72513 7.49812 9.36312 7.31812 9.97512 7.31812C10.1731 7.31812 10.3511 7.32812 10.5111 7.33612C10.9811 7.35612 11.2171 7.38412 11.5271 8.12612C11.9131 9.05612 12.8531 11.3521 12.9651 11.5881C13.0791 11.8241 13.1931 12.1441 13.0331 12.4541C12.8831 12.7741 12.7511 12.9161 12.5151 13.1881C12.2791 13.4601 12.0551 13.6681 11.8191 13.9601C11.6031 14.2141 11.3591 14.4861 11.6311 14.9561C11.9031 15.4161 12.8431 16.9501 14.2271 18.1821C16.0131 19.7721 17.4611 20.2801 17.9791 20.4961C18.3651 20.6561 18.8251 20.6181 19.1071 20.3181C19.4651 19.9321 19.9071 19.2921 20.3571 18.6621C20.6771 18.2101 21.0811 18.1541 21.5051 18.3141C21.9371 18.4641 24.2231 19.5941 24.6931 19.8281C25.1631 20.0641 25.4731 20.1761 25.5871 20.3741C25.6991 20.5721 25.6991 21.5021 25.3131 22.5941Z"
                        fill="#FAFAFA"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3200_19530">
                        <rect width="32" height="32" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a
                  :href="`https://t.me/share/url?url=${getAbsolutePath()}`"
                  target="_blank"
                  class="modal__content-share-item modal__content-share-item--tg"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_3200_19522)">
                      <path
                        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                        fill="#40B3E0"
                      />
                      <path
                        d="M25.0191 8.60244L21.9056 24.2998C21.9056 24.2998 21.4702 25.3884 20.2728 24.8659L13.0882 19.3577L10.4757 18.095L6.07794 16.6144C6.07794 16.6144 5.40303 16.375 5.33766 15.8525C5.2723 15.33 6.09973 15.047 6.09973 15.047L23.5819 8.189C23.5819 8.189 25.0189 7.55767 25.0189 8.60272"
                        fill="white"
                      />
                      <path
                        d="M12.537 24.1227C12.537 24.1227 12.3272 24.1031 12.0658 23.2756C11.8047 22.4483 10.4766 18.0941 10.4766 18.0941L21.0357 11.3886C21.0357 11.3886 21.6453 11.0185 21.6236 11.3886C21.6236 11.3886 21.7324 11.454 21.4057 11.7588C21.0792 12.0637 13.111 19.2263 13.111 19.2263"
                        fill="#D2E5F1"
                      />
                      <path
                        d="M15.842 21.4688L13.0003 24.0597C13.0003 24.0597 12.7781 24.2283 12.5352 24.1227L13.0793 19.3101"
                        fill="#B5CFE4"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3200_19522">
                        <rect width="32" height="32" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          </client-only>
          <div class="modal__content-close" @click="onClose">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.2567 5.74381C18.6673 6.15445 18.6674 6.82024 18.2567 7.23087L7.23114 18.2565C6.82049 18.6671 6.1547 18.6671 5.74406 18.2565C5.33341 17.8458 5.33341 17.18 5.74405 16.7694L16.7696 5.74379C17.1803 5.33315 17.8461 5.33318 18.2567 5.74381Z"
                fill="#292C33"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.2564 18.2562C17.8458 18.6669 17.18 18.6669 16.7694 18.2562L5.74378 7.23065C5.33314 6.82001 5.33314 6.15422 5.74379 5.74357C6.15443 5.33292 6.82022 5.33292 7.23087 5.74357L18.2565 16.7692C18.6671 17.1798 18.6671 17.8456 18.2564 18.2562Z"
                fill="#292C33"
              />
            </svg>
          </div>
        </div>
        <div class="modal__content-close" @click="onClose" v-else>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.2567 5.74381C18.6673 6.15445 18.6674 6.82024 18.2567 7.23087L7.23114 18.2565C6.82049 18.6671 6.1547 18.6671 5.74406 18.2565C5.33341 17.8458 5.33341 17.18 5.74405 16.7694L16.7696 5.74379C17.1803 5.33315 17.8461 5.33318 18.2567 5.74381Z"
              fill="#292C33"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.2564 18.2562C17.8458 18.6669 17.18 18.6669 16.7694 18.2562L5.74378 7.23065C5.33314 6.82001 5.33314 6.15422 5.74379 5.74357C6.15443 5.33292 6.82022 5.33292 7.23087 5.74357L18.2565 16.7692C18.6671 17.1798 18.6671 17.8456 18.2564 18.2562Z"
              fill="#292C33"
            />
          </svg>
        </div>
      </div>
      <slot name="content"></slot>
      <div class="modal__alert" :class="{ 'modal__alert--active': isAlert }">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 8.99902L9.52205 16.499L6.5 13.499"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="modal__alert-text">Ссылка скопирована</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  data() {
    return {
      isShare: false,
      isMobile: false,
      isAlert: false,
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    additional: {
      type: Object,
      default: () => {
      },
    },
    active: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: '',
    },
  },
  mounted() {
    if (process.client) this.isMobile = this.isMobileCheck()
    window.addEventListener('click', (e) => {
      if (!e.target.closest('.modal__content-share') && this.isShare)
        this.isShare = false
    })
  },
  watch: {
    active(val) {
      if (val) document.body.style.overflow = 'hidden'
      else document.body.style.overflow = 'visible'
    },
  },
  methods: {
    onClose() {
      if (this.page === 'news') {
        this.$router.replace({query: null}).catch(() => {
        })
      } else this.$emit('close')
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(window.location.href)
        this.isAlert = true
        setTimeout(() => {
          this.isAlert = false
        }, 3000)
      } catch (e) {
        console.error(e)
      }
    },
    getAbsolutePath() {
      if (process.client) return window.location.href
    },
    isMobileCheck() {
      if (process.client) return /Android|iPhone/i.test(navigator.userAgent)
    },
  },
  computed: {},
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: var(--app-height);
  z-index: 10;
  visibility: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &--news {
    .modal__content-header {
      align-items: flex-start;
    }

    &.modal--active {
      .modal {
        &__content {
          transform: translate(-50%, 0);
        }
      }
    }

    .modal {
      &__content {
        max-width: 1050px;
        height: 90%;
        top: 10%;
        right: unset;
        left: 50%;
        transform: translate(-50%, 100%);
        border-radius: 32px 32px 0 0;
        transition: all 0.5s ease;
        display: flex;
        flex-direction: column;
        overflow-y: visible;
      }

      &__blackout {
        transition: all 0.5s ease;
      }
    }
  }

  &--active {
    visibility: visible;

    .modal__blackout {
      opacity: 1;
    }

    .modal__content {
      transform: translateX(0);
    }
  }

  &__blackout {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    z-index: -1;
    opacity: 0;
    transition: all 0.35s ease;
    cursor: pointer;
  }

  &__content {
    background: $white;
    padding: 48px 32px;
    border-radius: 32px 0 0 32px;
    max-width: 590px;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    transform: translateX(100%);
    transition: all 0.35s ease;
    display: flex;
    flex-direction: column;

    &-share {
      display: flex;
      align-items: center;
      justify-content: center;
      background: $gray-4;
      height: 48px;
      max-width: 48px;
      border-radius: 8px;
      cursor: pointer;
      transition: max-width 0.6s cubic-bezier(0, 1, 0, 1);

      &--active {
        max-width: 1000px;
        transition: max-width 1s ease-in-out;

        &.modal__content-share:hover {
          background: $gray-4;
        }

        .modal__content-share {
          &-icon {
            width: 0;
            padding: 0;
          }

          &-list {
            max-width: 1000px;
            padding: 12px;
          }
        }
      }

      &-icon {
        width: 48px;
        height: 48px;
        display: flex;
        padding: 12px;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: all $transition;

        &:hover {
          background: $black;

          svg path {
            stroke: $white;
          }
        }

        svg {
          path {
            transition: all $transition;
          }
        }
      }

      &-list {
        display: flex;
        align-items: center;
        column-gap: 8px;
        max-width: 0;
        overflow: hidden;
        transition: all 0.2s ease;
        padding: 0;
      }

      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &-additional {
      display: flex;
      white-space: nowrap;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 12px;
      column-gap: 16px;
      row-gap: 12px;

      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: $gray-2;

      &-item {
        display: flex;
        align-items: center;
        column-gap: 8px;
      }
    }

    &-header {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      align-items: center;
      margin-bottom: 32px;

      &-right {
        display: flex;
        column-gap: 8px;
        align-items: center;
        height: 48px;
      }
    }

    &-title {
      font-weight: 600;
      font-size: 28px;
      line-height: 40px;
    }

    &-close {
      padding: 12px;
      background: $gray-4;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all $transition;
      cursor: pointer;

      &:hover {
        background: $black;

        svg {
          path {
            fill: $white;
          }

          transform: rotate(180deg);
        }
      }

      svg {
        width: 24px;
        height: 24px;
        transition: all $transition;

        path {
          transition: all $transition;
        }
      }
    }
  }

  &__alert {
    position: fixed;
    bottom: 25px;
    left: 50%;
    transform: translate(-50%, calc(100% + 25px));
    transition: all 0.4s ease-in-out;

    background: $green;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    column-gap: 16px;

    font-weight: 600;
    font-size: 18px;
    line-height: 130%;
    color: $white;
    opacity: 0;

    &--active {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
}

@media screen and (max-width: 600px) {
  .modal {
    z-index: 99999;

    &--active {
      .modal {
        &__content {
          // border-radius: 0px 0px 0px 0px;
        }
      }
    }

    &--news {
      .modal__content {
        padding: 32px 24px 8px;
        height: 95%;
        top: 5%;

        &-header {
          // flex-direction: column-reverse;
          position: relative;
          margin-bottom: 16px;

          &-right {
            position: absolute;
            right: 0;
            top: 0;
          }
        }

        &-additional {
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 16px;
        }
      }
    }

    &__content {
      max-width: unset;
      border-radius: 0px;

      &-header {
        // flex-direction: column-reverse;

        &-right {
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
