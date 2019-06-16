<template>
  <div class="Item">
    <h1>詳細ページ</h1>
    <template v-if="pageData !== null">
      <p>{{ pageData.item_name }}</p>
      <p>¥{{ pageData.item_price }}</p>
    </template>
  </div>
</template>

<script>
import apiService from '@/services/ApiService'

export default {
  name: 'Item',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pageData: null,
    }
  },
  mounted() {
    this.fetchPage()
  },
  methods: {
    async fetchPage() {
      this.$loading.show()
      this.pageData = await apiService.fetchItem(this.id)
      this.$loading.hide()
    },
  },
}
</script>

<style scoped></style>
