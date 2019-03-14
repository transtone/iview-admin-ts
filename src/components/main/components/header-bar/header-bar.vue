<template>
  <div class="header-bar">
    <div class="logo-con">
      <img v-show="!collapsed" :src="maxLogo" key="max-logo">
      <img v-show="collapsed" :src="minLogo" key="min-logo">
    </div>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  props: {
    collapsed: Boolean
  },
  data() {
    return {
      minLogo,
      maxLogo
    }
  },
  methods: {}
}
</script>
