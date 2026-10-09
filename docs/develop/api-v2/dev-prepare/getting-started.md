# 启动接入

QQ 机器人：一个机器人可以被添加到**群聊 / 频道**内互动对话，QQ 用户也可以直接跟机器人**单独对话**。

## 账号注册

注册地址：[QQ 开放平台官网](https://q.qq.com/)

## 接入票据

注册创建机器人后，会获得开发机器人接入票据 AppID 和 AppSecret。

| 名称 | 描述 | 备注 |
| --- | --- | --- |
| AppID | 机器人 ID | 必须使用 |
| AppSecret | 机器人密钥 | 用于请求签名的密钥 |

::: warning 注意
Token 的鉴权方式已废弃，请使用更安全的 [Access Token 鉴权](./interface-framework/api-use.md)。
开发过程中如遇任何问题，可联系 QQ 机器人反馈助手反馈。
:::

## SDK DEMO

快速搭建机器人服务端可参考以下 SDK DEMO。（SDK 仅提供接入参考，详情能力以官方文档能力描述为准）

- Go：[botgo](https://github.com/tencent-connect/botgo)
- Python：[botpy](https://github.com/tencent-connect/botpy)
- Node.js：[bot-node-sdk](https://github.com/tencent-connect/bot-node-sdk)
