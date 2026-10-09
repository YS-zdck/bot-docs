# API v2

本目录收录 QQ 机器人开放平台 API v2 版本的全部能力说明。

## 起步指南

- [启动接入](./dev-prepare/getting-started.md) — 账号注册、接入票据、SDK DEMO
- [变更记录](./changelog.md) — 官方文档历史更新记录

## 基础框架须知

- [接口通信框架](./dev-prepare/interface-framework/api-use.md) — Access Token 鉴权、统一请求地址
- [API 调用指南](./dev-prepare/api-call-guide.md) — 跨接口的通用调用规则
- [唯一身份机制](./dev-prepare/unique-id.md) — OpenID / union_openid
- [错误与调试](./dev-prepare/error-trace/openapi.md) — 错误码、trace_id、WebSocket 错误

## 服务端接口

- [消息相关](./server-inter/message/overview.md) — 群聊、单聊、频道消息发送与事件
- [群聊模块](./server-inter/group/manage/README.md) — 群管理、群成员、群黑名单、入群审批
- [用户模块](./server-inter/user/README.md) — 分享链接、好友关系、主动消息开关
- [频道模块](./server-inter/channel/README.md) — 频道管理、成员、角色、内容、消息、私信
