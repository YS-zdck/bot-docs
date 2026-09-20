# 启动接入

## 账号注册

QQ 机器人可以被添加到群聊或频道中进行互动，QQ 用户也可以直接与机器人单独对话。

注册地址：[QQ 开放平台](https://q.qq.com/#/)

## 接入票据

创建机器人后，可以在开放平台管理端获得以下接入票据：

| 名称 | 描述 | 说明 |
| --- | --- | --- |
| AppID | 机器人 ID | 调用平台能力时必须使用。 |
| AppSecret | 机器人密钥 | 用于获取 Access Token，请妥善保管。 |

::: warning 注意
Token 鉴权方式已废弃，请使用更安全的 [Access Token 鉴权](./dev-prepare/interface-framework/api-use.md)。
:::

开发过程中如遇问题，可联系 QQ 机器人反馈助手。

<img :src="$withBotBase('/images/api-231017/feedback_bot.png')" alt="QQ机器人反馈助手">

## SDK DEMO

以下 SDK 仅提供接入参考，具体能力以官方文档为准：

- Go：[botgo](https://github.com/tencent-connect/botgo)
- Python：[botpy](https://github.com/tencent-connect/botpy)
- Node.js：[bot-node-sdk](https://github.com/tencent-connect/bot-node-sdk)

继续阅读：[API 调用指南](./dev-prepare/api-call-guide.md)。
