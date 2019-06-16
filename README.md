# vue-pager-with-api-sample

## コマンド

### セットアップ

```
yarn install
```

### 開発コマンド

```
yarn run serve
```

## 仕様

ページネーション付きの一覧画面（URL:`/`）はAPI経由で表示項目を取得する。一覧画面で各アイテムのリンクをクリックすると詳細画面（URL:`/item/:id`）へ遷移

## API

### アイテム一覧取得API

`/api/item/list`

#### パラメータ

|key|type|other|
|:----|:----|:----|
|keyword|string|このキーワードで絞り込む|
|category_id|int|このカテゴリIDで絞り込む|
|count|int|返却する最大件数|

#### レスポンス

```json
{
  "current_page": 0,
  "last_page": 3,
  "count": 10,
  "items": [
    {
      "item_id": 1,
      "item_name": "コシヒカリ",
      "item_category": {
        "category_id": 1,
        "category_name": "食品"
      },
      "item_price": 2000
    }
  ]
}
```

### アイテム詳細取得API

`/api/item/:id`

#### レスポンス

```json
{
  "item_id": 1,
  "item_name": "コシヒカリ",
  "item_category": {
    "category_id": 1,
    "category_name": "食品"
  },
  "item_price": 2000
}
```
