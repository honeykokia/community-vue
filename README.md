# 記帳社群 - 前端 (Community Accounting - Frontend)

## 📌 專案介紹
這是一個結合個人記帳與社群分享的記帳平台，使用者可以記錄日常收支，公開消費紀錄，追蹤他人帳戶，並透過優惠提醒，幫助自己取得更好的消費性價比。

## 🔗 線上 Demo
- [Demo 網址（前端入口）](https://weirong.site/projectA/)
> ＊首次開啟時，如遇載入稍慢為 GCP主機喚醒過程，請稍等數秒。

## 🛠 技術架構
- Vue 3 (Composition API)
- Vite
- TailwindCSS
- Fetch（API串接）
- Pinia（狀態管理）
- Vue Router（前端路由）

## 🖥️ 畫面簡介 (Screenshots)
- 首頁
![首頁](https://github.com/user-attachments/assets/723e9820-d2e2-4cb6-bf4f-ce35c49e64cb)

- 登入 / 註冊頁面
![登入畫面](https://github.com/user-attachments/assets/28faac0d-89a5-47ed-afcb-0e4d59a0f2d1)
![註冊畫面](https://github.com/user-attachments/assets/6a7e895a-c7fb-483b-9af3-a453fd3068ae)

- 帳戶列表與詳細頁面
![帳戶列表](https://github.com/user-attachments/assets/06806810-ef36-426a-80c0-719162310696)
![帳戶詳細資料](https://github.com/user-attachments/assets/397ac8b2-0f09-4149-a5d6-7c427f938a12)

- 記帳紀錄總覽（Overview）
![總覽](https://github.com/user-attachments/assets/8df89e4e-a012-4127-80cd-d4b52875c3b4)

- 記帳明細新增 / 編輯
![交易建立](https://github.com/user-attachments/assets/55bae8aa-afbc-484f-90d7-e9f3e9014495)
![交易列表](https://github.com/user-attachments/assets/9e3ada9a-7dda-40fe-ad2d-eb79736d9098)


## 📡 API 串接說明 (API Connection)
前端專案主要串接以下後端 API：

### 使用者系統 (User System)
- **POST /user/login** — 登入帳號，成功後儲存 JWT Token
- **POST /user/register** — 註冊新帳號
- **GET /user/verify** — 信箱驗證（透過信中連結）
- **POST /user/resendMail** — 重新寄送驗證信
- **POST /user/forgetpassword/request** — 寄送驗證碼
- **POST /user/forgetpassword/verify** — 驗證驗證碼
- **POST /user/forgetpassword/reset** — 使用者修改密碼

### 會員系統 (Member System)
- **GET /member** — 取得目前登入使用者資料（初始化資料）
- **PUT /member** — 編輯個人資訊（例如修改大頭貼、暱稱）
- **PATCH /member/password** — 修改登入密碼

### 帳戶系統 (Account System)
- **GET /account** — 取得使用者所有帳戶
- **POST /account** — 新增帳戶
- **GET /account/{id}** — 查看單一帳戶細節
- **PUT /account/{id}** — 更新帳戶
- **DELETE /account/{id}** — 刪除帳戶

### 交易紀錄系統 (Record System)
- **GET /account/{accountId}/records** — 取得指定帳戶的交易紀錄
- **POST /account/{accountId}/records** — 新增交易紀錄
- **DELETE /account/{accountId}/records/{recordId}** — 刪除交易紀錄

### 類別系統 (Category System)
- **GET /category** — 取得所有收入/支出類別（供新增交易時選擇）


## ⚙️ 專案安裝與啟動 (Project Setup)

```bash
# 下載專案
git clone [你的GitHub連結]

# 安裝相依套件
npm install

# 啟動本地開發伺服器
npm run dev
```

