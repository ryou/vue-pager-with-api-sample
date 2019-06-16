<template>
  <div class="Home">
    <div>
      <select v-model="categoryId" class="Select" @change="searchWithCategory">
        <option value="">商品カテゴリー</option>
        <option value="1">食品・飲料</option>
        <option value="2">PC</option>
      </select>
    </div>
    <form style="margin-bottom: 20px" @submit.prevent="searchWithKeyword">
      商品名で検索：<input v-model="keyword" type="text" class="Input" />
    </form>
    <div class="ItemList" style="margin-bottom: 20px">
      <!-- eslint-disable-next-line -->
      <div
        v-for="item in items"
        class="ItemList_item"
        @click="selectItem(item)"
      >
        <div class="Item">
          <div class="Item_name">{{ item.item_name }}</div>
          <div class="Item_category">
            {{ item.item_category.category_name }}
          </div>
          <div class="Item_price">¥{{ item.item_price }}</div>
        </div>
      </div>
    </div>

    <Pager :current-page="currentPage" :last-page="lastPage" />
  </div>
</template>

<script>
import apiService from '@/services/ApiService'
import Pager from '@/components/Pager'
import ListPageMixin from '@/mixins/ListPageMixin'

export default {
  name: 'Home',
  components: {
    Pager,
  },
  mixins: [ListPageMixin],
  data() {
    return {
      keyword: '',
      categoryId: '',
      items: [],
      currentPage: 0,
      lastPage: 0,
    }
  },
  watch: {
    $route() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { keyword, category_id, page } = this.$route.query
      this.keyword = keyword || ''
      this.categoryId = category_id || ''
      this.currentPage = Number(page) || 0

      this.fetchItems()
    },
    async fetchItems() {
      const query = this.$route.query
      this.$loading.show()
      const result = await apiService.fetchItems(query)
      this.$loading.hide()

      this.items = result.items
      this.currentPage = result.current_page
      this.lastPage = result.last_page
    },
    searchWithCategory() {
      this.updateSearchConditions({
        category_id: this.categoryId,
      })
    },
    searchWithKeyword() {
      this.updateSearchConditions({
        keyword: this.keyword,
      })
    },
    selectItem(item) {
      this.$router.push({
        name: 'item',
        params: {
          id: String(item.item_id),
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
input.Input {
  font-size: 16px;

  padding: 5px;
  border: 1px solid #bdc3c7;
}

.ItemList {
}
.ItemList_item {
  padding: 10px;

  cursor: pointer;

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }

  &:nth-child(odd) {
    background-color: #ecf0f1;
  }
}

.Item {
  display: flex;
}
.Item_name {
  flex-shrink: 1;
  flex-grow: 1;
}
.Item_category {
  flex-shrink: 0;
  flex-grow: 0;

  width: 200px;
}
.Item_price {
  flex-shrink: 0;
  flex-grow: 0;

  width: 100px;

  text-align: right;
}
</style>
