<template>
  <div class="filter">
    <div class="filter-block">
      <div class="filter__title">Фильтр</div>

      <div class="filter-models">
        <filter-btn v-for="(item, index) in models"
                    :key="'filter btn - ' + index"
                    @click.native="onSelectModel(item.id)"
                    :active="activeModel===item.id">
          <span v-html="item.label" v-if="!item.icon"></span>
          <svgicon :name="item.icon" width="16" height="18" v-else></svgicon>
        </filter-btn>
      </div>
    </div>

    <div class="filter-block">
      <div class="filter__title">Рейтинг</div>

      <div class="filter-rating">
        <filter-select @change="onSelectRating"
                       :options="ratings"
                       :value="activeRating"
                       iconColor="#F8BF25"></filter-select>
      </div>
    </div>
  </div>
</template>

<script>
import '@/icons/apple'
import '@/icons/android'
import '@/icons/star'
import '@/icons/mark'

import filterBtn from '@/components/filter/btn.vue'
import filterSelect from '@/components/filter/select.vue'

export default {

  props: {
    activeTab: {
      type: String,
      default: ''
    },
    models: {
      type: Array,
      default: () => []
    },
    ratings: {
      type: Array,
      default: () => []
    }
  },
  components: { filterBtn, filterSelect },

  data () {
    return {
      activeModel: -1,
      activeRating: -1
    }
  },

  watch: {
    'activeTab': function (val) {
      // fetching saved data, if tab changed
      this.activeModel = this.$store.state.appsFilter.find(el => el.id === this.activeTab).model
      this.activeRating = this.$store.state.appsFilter.find(el => el.id === this.activeTab).rating
    }
  },

  computed: {
    filterData () {
      return this.$store.state.appsFilter
    }
  },

  methods: {
    onSelectModel (id) {
      this.activeModel = id
      // saving in store
      this.$store.state.appsFilter.find(el => el.id === this.activeTab).model = id
    },
    onSelectRating (id) {
      this.activeRating = id
      // saving in store
      this.$store.state.appsFilter.find(el => el.id === this.activeTab).rating = id
    }
  }
}
</script>

<style lang="scss">
  .filter {
    display: flex;
    flex-wrap: wrap;

    @include adopt($xs) {
      flex-direction: column;
    }

    &-block {
      & + & {
        margin-left: 16px;

        @include adopt($xs) {
          margin-left: 0;
          margin-top: 20px;
        }
      }
    }

    &__title {
      margin-bottom: 18px;
    }

    &-models {
      display: flex;
    }

    &__btn + &__btn {
      position: relative;
      margin-left: 20px;

      &:before {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        bottom: 0;
        left: -10px;
        margin: auto 0;
        width: 1px;
        height: 18px;
        background-color: #E8E8E8;
      }
    }
  }
</style>
