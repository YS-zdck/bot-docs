# API 调用指南

QQ 机器人开放平台提供基于 HTTPS 协议的 OpenAPI，开发者可以通过接口实现消息收发、群聊管理和频道管理等功能。

## 调用方式

### 统一请求地址

```text
https://api.bot.qq.com
```

### 鉴权方式

调用 API 时，需要将 Access Token 放入请求头：

```http
Authorization: QQBot {ACCESS_TOKEN}
```

Access Token 的获取和刷新方式请参阅[接口调用与鉴权](./interface-framework/api-use.md)。

### 请求示例

以发送单聊消息为例：

```shell
curl -X POST 'https://api.bot.qq.com/v2/users/A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4/messages' \
-H 'Authorization: QQBot {ACCESS_TOKEN}' \
-H 'Content-Type: application/json; charset=utf-8' \
-d '{
  "content": "Hello World",
  "msg_type": 0,
  "msg_id": "previous_msg_id"
}'
```

## 响应结构

API 调用成功时，响应体直接返回业务数据。例如：

```json
{
  "id": "ROBOT1.0_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "timestamp": "2026-07-21T10:30:00+08:00"
}
```

调用失败时，响应体通常包含以下字段：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `err_code` | number | 业务错误码，成功时为 `0`。 |
| `message` | string | 错误信息，仅用于人工排查，内容可能调整。 |
| `trace_id` | string | 链路追踪 ID，用于问题排查。 |

```json
{
  "err_code": 40034005,
  "message": "回复消息msg_id已过期",
  "trace_id": "4a8a61565b909f199b1ec169fdd6f49e"
}
```

::: warning 注意
请根据 `err_code` 判断请求是否失败，不要依赖可能随时调整的 `message`。
:::

## 唯一身份机制

不同机器人（AppID）获取的用户、群聊和频道 OpenID 均不相同：

- 单聊场景中的用户标识为 `user_openid`。
- 群聊标识为 `group_openid`。
- 用户在群内的标识为 `member_openid`。

不同 AppID 下的 OpenID 不能直接互通。

## 全链路追踪

TraceID 可以通过以下两种方式获取：

- HTTP 响应头中的 `X-Tps-trace-ID`。
- 响应体中的 `trace_id`。

无法自行定位问题时，可将 TraceID 提交给平台协助查询日志。

## HTTP 状态码

| 状态码 | 说明 |
| --- | --- |
| `200` | 请求成功。 |
| `201`、`202` | 异步操作已受理，仍需检查响应体。 |
| `204` | 请求成功，无响应体，常见于删除操作。 |
| `401` | 认证失败。 |
| `404` | 未找到 API。 |
| `405` | HTTP Method 不允许。 |
| `429` | 触发频率限制。 |
| `500`、`504` | 服务处理失败。 |

业务错误还需要结合响应体中的 `err_code` 判断。接口特有错误码请查看对应接口文档，通用错误说明请参阅[错误与调试](../openapi/error/error.md)。
