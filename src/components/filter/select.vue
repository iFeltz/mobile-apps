<template>
  <div class="filter-select">

    <div class="filter-select__selected" @click="toggleOptions">
        {{ selectedId ? selected.label : 'Выбрать' }}
        <svgicon :name="selected.icon"
                 v-if="selectedId && selected.icon"
                 :style="{ fill: selected.iconColor || iconColor }"
                 class="filter-select__icon"
                 width="15" height="15"></svgicon>
    </div>

    <svgicon name="arrow"
             :dir="show ? 'down' : 'up'"
             width="8" height="8"
             class=filter-select__arrow></svgicon>

    <transition name="fast" mode="out-in">
      <div :class="[ 'filter-select-options', { 'show': show }]" v-show="show">
        <div class="filter-select-options__item"
            @click="onSelect(item.id)"
            v-for="(item, index) in filteredItems"
            :key="'filter select options - ' + index">
          {{ item.label }}
          <svgicon :name="item.icon"
                   v-if="item.icon"
                   :style="{ fill: item.iconColor || iconColor }"
                   class="filter-select__icon"
                   width="15" height="15"></svgicon>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import '@/icons/arrow'

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    iconColor: {
      type: String,
      default: 'inherit'
    },
    value: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      selectedId: 0,
      show: false
    }
  },

  watch: {
    value: function (val) {
      console.log(val)
      this.selectedId = val
    }
  },

  computed: {
    selected () {
      return this.items.find(el => el.id === this.selectedId)
    },
    items () {
      let res = [...this.options]

      res.unshift({
        id: -1,
        label: 'Все'
      })

      return res
    },
    filteredItems () {
      let res = [...this.items]

      if (this.selectedId) {
        let selectedIndex = res.findIndex(el => el.id === this.selectedId)
        res.splice(selectedIndex, 1)
      } else {
        res.splice(0, 1)
      }

      return res
    }
  },

  methods: {
    toggleOptions () {
      this.show = !this.show
    },
    onSelect (id) {
      this.selectedId = id
      this.$emit('change', id)
      this.show = false
    }
  }
}
</script>

<style lang="scss">
  .filter-select {
    position: relative;
    display: inline-block;
    color: #979898;
    z-index: 40;

    &__selected {
      display: flex;
      align-items: center;
      padding-left: 18px;
      padding-right: 40px;
      width: 200px;
      height: 34px;
      box-sizing: border-box;
      background-color: $bg-color;
      border-radius: 10px;
      cursor: pointer;
      transition: .2s;
    }

    &__arrow {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      margin: auto 0;
    }

    &-options {
      position: absolute;
      padding-top: 40px;
      padding-bottom: 10px;
      top: 0;
      left: 0;
      width: 100%;
      border-radius: 10px;
      background: $bg-color;
      box-shadow: 0px 3px 15px #00000029;
      z-index: -1;

      &__item {
        display: flex;
        align-items: center;
        padding: 0 18px;
        width: 100%;
        height: 34px;
        line-height: 100%;
        cursor: pointer;
      }
    }

    &__icon {
      margin-left: 6px;
      padding-bottom: 2px;
    }
  }
</style>
