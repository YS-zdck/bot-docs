# 机器人文档

本仓库是 基于 QQ 机器人文档项目，使用[vuepress](https://vuepress.vuejs.org/zh/)构建。对应文档网站是 <https://docs.mi65.cn/>。

## 本地开发

通过以下任何一种方式进行本地开发

### 1、Gitpod 在线开发

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/YS-zdck/bot-docs)

### 2、本地克隆代码开发

```sh
git clone git@github.com:YS-zdck/bot-docs.git
cd bot-docs
npm i
npm run dev
```

<!-- clone内网API文档 权限添加 -->
## 构建

```sh
npm run sync-api
npm run build
```


## 文档结构参考

```shell
docs
├── .vuepress/   # vuepress相关文件
├── changelog/   # 更新日志
├── develop/     # 开发文档
│   └── api-v2/  # API v2 接口文档
└── README.md    # 主页文档
```

## 参与共建 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

- 👏 如果您有针对文档的错误修复，请以分支`fix/xxx`向`main`分支发 PR
- 👏 如果您有新的内容贡献，请以分支`feature/xxx`向`main`分支发起 PR
- 👏 如果您有相关的建议或意见，请提[issues](https://github.com/YS-zdck/bot-docs/issues)

## 加入官方社区

欢迎扫码加入 **QQ 频道开发者社区**。

![开发者社区](https://guild-1251316161.cos.ap-guangzhou.myqcloud.com/miniapp/icons/qq_guild_developer_doc.png)


> ⚠️ **非官方开发者交流群**  
> 群号：`367239358`　进群请填写机器人 AppID

## 贡献者

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<a href="https://github.com/tencent-connect/bot-docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tencent-connect/bot-docs" />
</a>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
