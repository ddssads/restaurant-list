# 餐廳清單
一個簡單的餐廳清單網頁。

## 產品功能
- 使用者可以註冊。
- 使用者可以登入。
- 使用者可以透過FACEBOOK登入。
- 登入後使用者可以建立屬於自己的餐廳清單。
- 點擊餐廳資料可以查看該餐廳的詳細資訊。
- 使用者可以依照餐廳名稱分類進行搜尋。
- 使用者可以在右上角新增餐廳。
- 使用者可以編輯餐廳資訊。
- 使用者可以刪除餐廳清單。
- 使用者可以選擇排序方式。

## 環境設置
- express: 4.7.1
- express-handlebars: 5.2.0
- mongoose: 5.11.8
- connect-flash：0.1.1
- express-session: 1.17.1
- method-override: 3.0.0
- passport: 0.4.1
- passport-facebook": 3.0.0
- passport-local": 1.0.0

## 安裝流程

專案資料clone到本地

```
$ git clone https://github.com/ddssads/restaurant-list.git
```
安裝npm

```
$ npm install
```

執行種子資料
```
$ npm run seed
```
終端機顯示代表成功寫入種子資料
```
mongodb connected!
done
```
執行

```
$ npm run dev
```

終端機顯示表示成功執行
```
Server is running on http://localhost:3000
mongodb connected!
```





