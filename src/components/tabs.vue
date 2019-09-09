<template>
  <div class="tabs">
    <div class="tabs-header">
      <div class="tabs-header-items">
        <div :class="[ 'tabs-header__item',
                { 'tabs-header__item-active': activeTab===index }]"
            v-for="(item, index) in items"
            @click="openTab(index)"
            :key="'tab header - ' + index">
          {{ item.name }}
        </div>
      </div>

      <div class="tabs-header__filter">
        <v-filter :active-tab="activeTab" :models="models" :ratings="ratings" />
      </div>
    </div>

    <div class="tabs-content">
      <div class="tabs-content__card"
           v-for="(app, index) in apps"
           :key="'app index - ' + index">
        <card :item="app" />
      </div>
    </div>
  </div>
</template>

<script>
import vFilter from '@/components/filter'
import card from '@/components/card'

export default {

  props: {
    items: {
      type: Object,
      default: () => ({})
    }
  },

  components: {
    vFilter,
    card
  },

  data () {
    return {
      activeTab: '',
      unwatchItems: null,
      models: [
        {
          id: -1,
          label: 'Все',
          type: 'any'
        },
        {
          id: 1001,
          value: 'apple',
          icon: 'apple'
        },
        {
          id: 1002,
          value: 'android',
          icon: 'android'
        }
      ],
      ratings: [
        {
          id: 2001,
          value: 4.0,
          label: 'от 4,0',
          icon: 'star'
        },
        {
          id: 2002,
          value: 3.0,
          label: 'от 3,0',
          icon: 'star'
        },
        {
          id: 2003,
          value: 2.0,
          label: 'от 2,0',
          icon: 'star'
        }
      ]
    }
  },

  created () {
    this.unwatchItems = this.$watch('items', (newVal, oldVal) => {
      this.setActiveTab()
    }, { deep: true })
  },

  computed: {
    filterData () {
      return this.activeTab ? this.$store.state.appsFilter.find(el => el.id === this.activeTab) : []
    },
    apps () {
      if (!this.activeTab) { return [] }

      let res = this.items[this.activeTab].applications

      // apps filter
      let modelId = this.filterData.model
      let ratingId = this.filterData.rating

      let model = this.models.find(el => el.id === modelId)
      let rating = this.ratings.find(el => el.id === ratingId)

      console.log(res)

      if ((!model || model.type === 'any') && !rating) { return res }

      res = res.filter(el => {
        let elRating = Number(el.rating.replace(',', '.'))
        let elPlatform = el.platform === 'iphone' ? 'apple' : el.platform

        if (model && model.type !== 'any' && elPlatform !== model.value) { return false }
        if (rating && elRating < rating.value) { return false }

        return el
      })

      return res
    }
  },

  methods: {
    openTab (id) {
      this.activeTab = id
    },
    setActiveTab () {
      let id = Object.keys(this.items)[0]
      if (id) {
        this.activeTab = id
        this.unwatchItems()
      }
    }
  }
}
</script>

<style lang="scss">
  .tabs {
    position: relative;

    &-header {

      &-items {
        display: flex;
        max-width: 90%;
        overflow-x: auto;
      }

      &__item {
        position: relative;
        padding: 8px 20px 6px;
        background-color: $bg-gray;
        border-radius: 13px 13px 0 0;
        color: #979898;
        white-space: nowrap;
        cursor: pointer;
        transition: .2s;

        &:hover, &:active {
          background-color: #fff;
          color: $text-color;
        }

        &:before, &:after {
          content: '';
          position: absolute;
          display: block;
          bottom: 0;

          width: 13px;
          height: 13px;
          opacity: 0;
          transition: opacity .2s;
        }

        &-active {
          background-color: #fff;
          color: $text-color;
          z-index: 2;

          &:before, &:after {
            content: '';
            opacity: 1;
          }

          &:before {
            left: -13px;
            background: radial-gradient(circle at 0 0, transparent 13px, #fff 13px);
          }

          &:after {
            right: -13px;
            background: radial-gradient(circle at 100% 0, transparent 13px, #fff 13px);
          }
        }

        &:first-child {
          &:before {
            display: none !important;
          }
        }
      }

      &__filter {
        background-color: #fff;
        border-radius: 0 $b-radius $b-radius;
        padding: 18px;
      }
    }

    &-content {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      margin-left: -8px;
      margin-right: -8px;

      &__card {
        flex-basis: 25%;
        max-width: 25%;
        box-sizing: border-box;
        padding: 10px 8px;

        @include adopt($xl) {
          flex-basis: 33.3333%;
          max-width: 33.3333%;
        }

        @include adopt($lg) {
          flex-basis: 50%;
          max-width: 50%;
        }

        @include adopt($sm-medium) {
          flex-basis: 100%;
          max-width: 340px;
        }
      }

      @include adopt($sm-medium) {
        justify-content: center;
      }
    }
  }
</style>
