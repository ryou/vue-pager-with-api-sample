/**
 * ページャーや検索機能がある一覧ページ用のmixin
 */
export default {
  methods: {
    moveToPage(index) {
      const routeName = this.$route.name
      let query = { ...this.$route.query }
      query.page = index
      this.$router.push({
        name: routeName,
        query,
      })
    },
    /**
     * 検索条件を追加・変更した上でページ遷移する
     * ※遷移後のpageは0になる。pageを維持したままなのは不自然なので
     * @param newConditions
     */
    updateSearchConditions(newConditions) {
      const routeName = this.$route.name
      let query = { ...this.$route.query }
      query = Object.assign(query, newConditions)
      query.page = 0
      this.$router.push({
        name: routeName,
        query,
      })
    },
  },
}
