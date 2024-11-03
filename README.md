![Logo](public/Logo.png)

_邂逅每个目的地与迪拉熊_

## 项目简介

- 使用Next.js框架开发;
- 配合高德地图、腾讯地图API实现地图组件和地名搜索；
- 从华立官网爬取机厅列表并渲染至地图组件中。

## 实现功能

- 定位并显示附近的机厅；
- 点击地图钉跳转显示机厅具体信息；
- 在搜索栏中搜索目的地并在地图上跳转至相应位置；
- 实时更改机厅搜索半径。

## 进行开发

### 快速开始

```shell
git clone https://github.com/MoonBite666/MaiMap.git
cd MaiMap
npm i
npm run dev
```

### Docker部署

```shell
# 参考官方Dockerfile进行构建
docker build -t maimap-docker .
# 可选：上传Docker Hub
docker tag maimap-docker:latest my-dockerhub-username/maimap-docker:latest
docker push my-dockerhub-username/maimap-docker:latest
```

### 注意事项

- 需要在父目录下新建自己的`.env.local`文件。其中包含多项API访问密钥：
```dotenv
NEXT_PUBLIC_AMAP_AKEY=高德地图JavascriptAPI密钥
NEXT_PUBLIC_QMAP_API_KEY=腾讯地图WebAPI密钥
```

- 需要自行建立`mysql`数据库并在[此文件](./app/_lib/db.js)中配置数据库连接；
- 爬取机厅数据暂用Python完成，若近期有更新需要手动重新爬取。

## Todo

- [x] 引入组件库
- [x] 引入数据库
- [ ] 修改详情界面按钮触发机制
- [ ] 制作fallback页面
- [ ] 增加机厅评论功能

## 致谢

感谢[120glowing](https://space.bilibili.com/237708867)绘制了Logo中的迪拉熊
