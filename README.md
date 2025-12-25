# McDonald's 在线点餐系统
 
一个基于 Vue 3 + TypeScript + Express 的全栈电商应用，提供完整的在线点餐、购物车和用户认证功能。
 
## 🛠 技术栈
 
### 前端
- **Vue 3** - 使用 Composition API 和 `<script setup>` 语法
- **TypeScript** - 类型安全的开发体验
- **Vite** - 快速的构建工具
- **Pinia** - 状态管理（支持持久化）
- **Vue Router 4** - 路由管理
- **Vuetify 3** - Material Design UI 框架
- **Axios** - HTTP 请求库
- **GSAP** - 高性能动画库
 
### 后端
- **Express** - Node.js Web 框架
- **MySQL** - 关系型数据库
- **CORS** - 跨域资源共享
 
## ✨ 功能特性
 
- 📦 **商品浏览** - 按分类查看菜单商品
- 🔍 **商品详情** - 查看商品详细信息、价格、卡路里
- 🛒 **购物车管理** - 添加商品、调整数量、实时计算总价
- 👤 **用户认证** - 邮箱登录注册
- 🎲 **随机推荐** - 智能推荐商品
- 🎨 **响应式设计** - 适配各种设备
- 🌓 **深色模式** - Vuetify 主题支持
- ✨ **流畅动画** - GSAP 驱动的交互动画
 
## 📁 项目结构
``` bash
├── Server/ # Express 后端服务
│ └── MainServer.ts # 主服务器文件
├── src/
│ ├── API/ # API 集成层
│ │ ├── Modules/ # API 模块
│ │ └── index.ts # Axios 客户端配置
│ ├── Store/ # Pinia 状态管理
│ │ ├── Modules/ # Store 模块（账户、购物车）
│ │ └── index.ts # Store 入口
│ ├── Router/ # 路由配置
│ ├── Types/ # TypeScript 类型定义
│ ├── components/ # 可复用组件
│ │ ├── Header/ # 头部导航
│ │ ├── Footer/ # 底部信息
│ │ ├── GoTop/ # 返回顶部
│ │ └── AnimationText/ # 动画文本
│ ├── pages/ # 页面组件
│ │ ├── Menu/ # 菜单页面
│ │ ├── Buy/ # 商品详情
│ │ ├── Car/ # 购物车
│ │ ├── Login/ # 登录页面
│ │ └── Offers/ # 优惠活动
│ └── utils/ # 工具函数
├── sql/ # 数据库脚本
│ ├── account.sql # 用户表
│ ├── goodsTable.sql # 商品表
│ └── carTable.sql # 购物车表
└── public/ # 静态资源
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- MySQL >= 5.7
- pnpm（推荐）

### 安装依赖

```bash
# 安装 pnpm（如果未安装）
npm install -g pnpm

# 安装项目依赖
pnpm install

```

### 数据库配置

- 创建 MySQL 数据库：
  
```bash
CREATE DATABASE mcdonalds CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
- FLUSH PRIVILEGES：
```bash
CREATE USER 'mcdonalds'@'localhost' IDENTIFIED BY 'mcdonalds';
GRANT ALL PRIVILEGES ON mcdonalds.* TO 'mcdonalds'@'localhost';
FLUSH PRIVILEGES;
```
- 导入数据库表结构：
```bash
# 按顺序执行 SQL 文件
mysql -u mcdonalds -p mcdonalds < sql/account.sql
mysql -u mcdonalds -p mcdonalds < sql/goodsTable.sql
mysql -u mcdonalds -p mcdonalds < sql/carTable.sql
```
注意：数据库配置可在 
Server/MainServer.tsL10-L16 中修改

### 启动项目
```bash
# 同时启动前端和后端服务
pnpm dev
```
- 服务将在以下端口运行：
```bash
前端开发服务器：http://localhost:5173
后端 API 服务：http://localhost:8080
```

### 构建生产版本
```bash
# 构建生产版本
pnpm build
 
# 预览生产构建
pnpm preview
```

###  API 接口
- 商品相关
```bash
方法	路径	描述
GET	/random	获取随机推荐商品
GET	/menu	获取菜单（支持分类筛选）
GET	/goods?goods_id=xxx	获取商品详情
```
- 购物车相关
```bash
方法	路径	描述
GET	/getcar?user_email=xxx	获取用户购物车
POST	/car	添加商品到购物车
DELETE	/car	从购物车移除商品
PUT	/car	更新购物车商品数量

```

- 用户认证
```bash
方法	路径	描述
POST	/register	用户注册
POST	/login	用户登录
```
详见 Server/MainServer.ts 了解完整 API 实现。

## 数据库设计
- 商品表 (mcdonalds_goods)
```bash
字段	类型	描述
goods_id	INT	商品主键
category	ENUM	分类（汉堡/小食/甜品/饮品）
goods_name	VARCHAR	商品名称
goods_desc	VARCHAR	商品描述
img_url	VARCHAR	图片地址
price	DECIMAL	价格（元）
calorie	INT	卡路里（大卡）
```
- 用户购买记录表 (mcdonalds_user_purchase)
```bash
字段	类型	描述
purchase_id	INT	记录主键
user_email	VARCHAR	用户邮箱
goods_id	INT	商品ID
buy_quantity	INT	购买数量
```
## 🎯 开发说明
### 状态管理
- 项目使用 Pinia 进行状态管理，主要包含两个 Store：
```bash
字段	类型	描述
账户 Store - 管理用户认证状态，详见 项目结构
购物车 Store - 管理购物车数据，详见 购物车页面
```
### 路由配置
- 路由配置位于 
src/Router/index.ts，包含以下页面
```bash
/ - 首页/菜单
/menu - 菜单页
/buy/:id - 商品详情
/car - 购物车
/login - 登录页
/offers - 优惠活动
```

### 类型定义
- TypeScript 类型定义位于 src/Types/ 目录
```bash
/ - 首页/菜单
/menu - 菜单页
/buy/:id - 商品详情
/car - 购物车
/login - 登录页
/offers - 优惠活动
```

## 📚 相关文档
- 快速开始
- 项目结构
- 技术栈与架构
- 前端应用搭建
- 数据库模式设计

## 🤝 贡献指南
欢迎提交 Issue 和 Pull Request！

### 📄 许可证
MIT License
