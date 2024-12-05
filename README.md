![Logo](public/Logo.png)

_邂逅每个目的地与迪拉熊_

## 项目简介

- 使用Next.js框架开发;
- 配合高德地图、腾讯地图API实现地图组件和地名搜索；
- 从华立官网获取机厅列表并渲染至地图组件中；
- 使用Auth.js实现用户验证。

## 实现功能

- 定位并显示附近的机厅；
- 点击地图钉跳转显示机厅具体信息；
- 在搜索栏中搜索目的地并在地图上跳转至相应位置；
- 实时更改机厅搜索半径；
- 基于用户验证的评论、Tag和机厅信息修改功能；
- 为第三方Bot提供API服务。

## 让MaiMap变得更好

我们需要你的反馈让项目变得更好。如果你有任何功能建议或Bug报告，请前往Issue页面提交相关反馈！

### 操作指南

- 选择适合你的仓库（[Github](https://github.com/MoonBite666/MaiMap)、[Gitee](https://gitee.com/moonfeather/MaiMap)）。如果你所在的网络不便访问Github，就使用Gitee的镜像仓库；
- 注册并登录相关平台的账号；
- 点击上方工具栏的Issue，接着点击新建Issue，然后依据指示提交反馈。

### 加群反馈

- QQ群：1002462973

## 进行开发

### 快速开始

推荐使用pnpm包管理器。

```shell
git clone https://github.com/MoonBite666/MaiMap.git
cd MaiMap
pnpm install
pnpm run dev
```

### Docker部署

```shell
# 参考官方Dockerfile，使用pnpm部署
# NEXT_PUBLIC变量需要在前端访问，需要手动定义
# REPO变量用来从Github仓库获取包含其它密钥的.env文件
docker build -t maimap-docker \
--build-arg NEXT_PUBLIC_AMAP_AKEY=... \
--build-arg NEXT_PUBLIC_QMAP_API_KEY=... \
--build-arg NEXT_PUBLIC_BUILD_FROM=local \
--build-arg REPO_NAME=maimap-env \
--build-arg REPO_OWNER=MoonBite666 \
--build-arg FILE_PATH=.env \
--build-arg BRANCH=main \
--build-arg GITHUB_TOKEN=... \
.
# 可选：上传Docker Hub
# docker tag maimap-docker:latest my-dockerhub-username/maimap-docker:latest
# docker push my-dockerhub-username/maimap-docker:latest
```

### 注意事项

- 需要在父目录下新建自己的`.env.development`文件。其中包含多项API访问密钥：
```dotenv
NEXT_PUBLIC_AMAP_AKEY=自己的高德地图JavascriptAPI密钥
NEXT_PUBLIC_QMAP_API_KEY=自己的腾讯地图WebAPI密钥
NEXT_PUBLIC_BUILD_FROM=local
# 以下是Auth.js使用的变量
AUTH_TRUST_HOST=true
AUTH_SECRET=随机生成一个
# 以下Auth ID及Secret仅能在localhost使用
AUTH_GITHUB_ID=Ov23liEpuVIZJj9BMgER
AUTH_GITHUB_SECRET=8dff349117fc91fa1b4cfff1d6cc091e3c97edab
AUTH_AUTH_OSU_ID=36346
AUTH_AUTH_OSU_SECRET=3ODILkFm1up3kz8UbJuZABS7nHN65hqGEgAe0UiM
```

- 需要在[此文件](./lib/db.ts)中修改默认数据库连接地址，可连接至公共数据库进行开发。
- 同时用腾讯地图和高德地图的API，是因为腾讯地图的Web API免费限额较宽裕，高德地图有第三方的React组件可用。若有专业付费Key，可单独使用高德地图API进行开发。
- 在Windows上，如果使用`run dev`指令时发现编译极慢，请尝试切换`nodejs`版本至`22.11.0`以上。另外，根据个人经验，使用`--turbo`参数反而会导致编译变慢。

## API

请参考Wiki中的[API](https://github.com/MoonBite666/MaiMap/wiki/API)页。

## Todo

- [ ] Wiki
- [ ] 新增机厅/地点
- [ ] 上传图片
- [ ] 邮箱验证
- [ ] 响应式设计
- [ ] 增强代码复用性

## Credit

- [120glowing](https://space.bilibili.com/237708867)绘制了大量盐巴
- [react-amap](https://github.com/uiwjs/react-amap)
- [NextUI](https://github.com/nextui-org/nextui)
- [React Svg Icons](https://reactsvgicons.com/)
- 基于[Auth.js](https://authjs.dev/)的验证系统