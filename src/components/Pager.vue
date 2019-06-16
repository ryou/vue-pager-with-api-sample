<template>
  <div v-if="lastPage > 0" class="Pager">
    <div v-if="hasPrevPage" class="Pager_link -prev" @click="moveToPrevPage">
      ＜
    </div>
    <!-- eslint-disable-next-line -->
    <div
      v-for="index in totalPageNum"
      class="Pager_link"
      :class="{
        '-current': index === currentPage + 1,
      }"
      @click="moveToPage(index - 1)"
    >
      {{ index }}
    </div>
    <div v-if="hasNextPage" class="Pager_link -next" @click="moveToNextPage">
      ＞
    </div>
  </div>
</template>

<script>
import ListPageMixin from '@/mixins/ListPageMixin'

export default {
  name: 'Pager',
  mixins: [ListPageMixin],
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPageNum() {
      return this.lastPage + 1
    },
    hasPrevPage() {
      return this.currentPage > 0
    },
    hasNextPage() {
      return this.currentPage < this.lastPage
    },
  },
  methods: {
    moveToPrevPage() {
      this.moveToPage(this.currentPage - 1)
    },
    moveToNextPage() {
      this.moveToPage(this.currentPage + 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.Pager {
  display: flex;
  justify-content: center;
}
.Pager_link {
  margin: 0 5px;

  color: #1abc9c;

  &:not(.-current) {
    cursor: pointer;
  }
  &.-current {
    color: inherit;
  }
}
</style>
