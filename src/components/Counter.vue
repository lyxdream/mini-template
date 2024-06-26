<template>
  <view>
    <text class="title">{{ counter.count }}</text>
    <view class="button"
          @tap="onAdd">ADD</view>
  </view>
</template>

<script>
import { useCounterStore } from '../stores/index'

export default {
  setup() {
    const counter = useCounterStore()

    const onAdd = () => {
      counter.count++
    }

    return {
      counter,
      onAdd
    }
  }
}
</script>

<style>
.title {
  font-size: 32px;
}
.button {
  border: 1px solid lightgray;
  padding: 5px 10px;
}
</style>
