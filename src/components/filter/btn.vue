<template>
  <div :class="[ 'filter__btn', { 'filter__btn-active': active }]">
    <slot>{{ label }}</slot>
  </div>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .filter__btn {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 54px;
    min-height: 34px;
    background-color: $bg-color;
    border-radius: 10px;
    color: #979898;
    cursor: pointer;
    transition: .2s;

    &-active, &:hover {
      background-color: #3469F2;
      color: #fff;
    }
  }
</style>
