<template>
  <div class="card">
    <div class="card-main">
      <div class="card-main__img"
           :style="{ backgroundImage: 'url(' + item.icon + ')' }"></div>
      <div class="card-main-content">
        <div class="card__title" :title="item.name">{{ name }}</div>
        <div class="card-main-info">
          <div class="card-main-info__label">
            <svgicon :name="platform"
                     width="12" height="14"
                     class="card-main-info__platform"
                     v-if="item.platform" />
            <div class="card-main-info__price">{{ item.price }}</div>
          </div>

          <div class="card-main-info__label">
            <svgicon name="star"
                     width="20" height="19"
                     class="card-main-info__star" />
            <span class="card-main-info__rating">{{ item.rating }}</span>
          </div>

          <div class="card-main-info__label">
            <svgicon name="mark"
                     width="9" height="12"
                     class="card-main-info__mark" />
            <span class="card-main-info__location">{{ item.location }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card-statistics">
      <div class="card-statistics__item">
        <div class="card-statistics__item-label">ASO index</div>
        <div class="card-statistics__item-value">{{ item.asoindex }}</div>
      </div>
      <div class="card-delimiter"></div>
      <div class="card-statistics__item">
        <div class="card-statistics__item-label">Установок за месяц</div>
        <div class="card-statistics__item-value">{{ installations }}</div>
      </div>
      <div class="card-delimiter"></div>
      <div class="card-statistics__item">
        <div class="card-statistics__item-label">В категории</div>
        <div class="card-statistics__item-value">{{ item.categoryPosition }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    name () {
      let res = this.item.name

      if (res.length > 40) {
        res = res.slice(0, 40) + '...'
      }

      return res
    },
    platform () {
      if (this.item.platform === 'iphone') { return 'apple' }
      return this.item.platform
    },
    installations () {
      let res = this.item.installations

      res = this.formatNumber(res)

      return res
    }
  },

  methods: {
    formatNumber (num) {
      if (num < 1000) { return num }

      let res = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      let resArray = res.split(',')
      let thousands = resArray.length - 1

      res = Math.round(Number(resArray[0] + '.' + resArray[1][0]))

      while (thousands > 0) {
        res += 'K'

        thousands--
      }

      res += '.'
      return res
    }
  }
}
</script>

<style lang="scss">
  .card {
    background-color: #fff;
    padding: 12px;
    border-radius: $b-radius;
    cursor: pointer;

    &__title {
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 10px;

      @include adopt($sm) {
        font-size: 15px;
        line-height: 21px;
      }
    }

    &-main {
      display: flex;

      &__img {
        flex-shrink: 0;
        width: 80px;
        height: 80px;
        border-radius: 10px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;

        @include adopt($xs) {
          width: 60px;
          height: 60px;
        }
      }

      &-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        margin-left: 10px;
        padding-right: 20px;
      }

      &-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__label {
          display: flex;
          align-items: center;
          color: #979898;
          letter-spacing: 0.11px;
        }

        &__platform {
          margin-right: 10px;
          padding-bottom: 2px;
        }

        &__price {
          border-radius: 6px;
          border: 1px solid #979898;
          padding: 0 5px;
          font-size: 13px;
          line-height: 21px;
        }

        &__star {
          fill: #F8BF25;
          margin-right: 7px;
        }

        &__mark {
          margin-right: 4px;
          padding-bottom: 2px;
        }

        &__rating, &__location {
          color: $text-color;
        }
      }
    }

    &-statistics {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding: 0 12px;

      &__item {
        text-align: center;
        padding: 0 5px;

        &-label {
          font-size: 12px;
          line-height: 16px;
          color: #979898;
        }

        &-value {
          font-family: $museo-bold;
          font-size: 26px;
          margin-top: 5px;

          @include adopt($sm) {
            font-size: 21px;
          }
        }
      }
    }

    &-delimiter {
      width: 1px;
      background-color: $bg-gray;
    }
  }
</style>
