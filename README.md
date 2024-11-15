![Logo](public/Logo.png)

_邂逅每个目的地与迪拉熊_

## 项目简介

- 使用Next.js框架开发;
- 配合高德地图、腾讯地图API实现地图组件和地名搜索；
- 从华立官网获取机厅列表并渲染至地图组件中。

## 实现功能

- 定位并显示附近的机厅；
- 点击地图钉跳转显示机厅具体信息；
- 在搜索栏中搜索目的地并在地图上跳转至相应位置；
- 实时更改机厅搜索半径；
- 评论功能（开发中）；
- 为第三方Bot提供API服务；

## 让MaiMap变得更好

我们需要你的反馈让项目变得更好。如果你有任何功能建议或Bug报告，请前往Issue页面提交相关反馈！

### 操作指南

- 选择适合你的仓库（[Github](https://github.com/MoonBite666/MaiMap)、[Gitee](https://gitee.com/moonfeather/MaiMap)）。如果你所在的网络不便访问Github，就使用Gitee的镜像仓库；
- 注册并登录相关平台的账号；
- 点击上方工具栏的Issue，依据指示提交反馈。

## 进行开发

### 快速开始

```shell
git clone https://github.com/MoonBite666/MaiMap.git
cd MaiMap
pnpm install
pnpm run dev
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
NEXT_PUBLIC_BUILD_FROM=local
```

- 需要在[此文件](./lib/db.ts)中修改默认数据库连接地址；
- 同时用腾讯地图和高德地图的API，是因为腾讯地图的Web API免费限额较宽裕，高德地图有第三方的React组件可用。若有专业付费Key，可单独使用高德地图API进行开发。
- 在Windows上，如果使用`run dev`指令时发现编译极慢，请尝试切换`nodejs`版本至`22.11.0`以上。另外，根据个人经验，使用`--turbo`参数反而会导致编译变慢。

## API

### 获取附近机厅
  
- URL：
    ```text
    https://maimap.tech/arcades/get/nearby?
    ```
- 参数：
  - 目标经度`lng`，必填；
  - 目标维度`lat`，必填；
  - 查询范围`range`，单位km，必填；
  - 排序方法`sortMethod`，为[SortMethod](stores/useArcades.tsx)类型字符串，可选。

## Todo

- [ ] 制作fallback页面
- [x] 机厅排序功能
- [ ] API文档
- [ ] 增加机厅评论功能
- [ ] 桌面端网页

## Credit

- Logo及加载动画由[120glowing](https://space.bilibili.com/237708867)绘制
- 地图部分使用[高德地图组件库](https://github.com/uiwjs/react-amap)
- UI使用[NextUI](https://github.com/nextui-org/nextui)