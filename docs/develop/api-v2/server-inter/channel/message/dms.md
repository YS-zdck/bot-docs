# 频道私信

机器人可与同一频道内的成员建立私信会话，通过私信接口收发消息。

## 创建私信会话

### 接口

```http
POST /users/@me/dms
```

### 功能描述

用于机器人和在同一个频道内的成员创建私信会话。机器人和用户存在共同频道才能创建私信会话。创建成功后，返回创建成功的频道 id、子频道 id 和创建时间。

### Content-Type

`application/json`

### 参数

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `recipient_id` | string | 是 | 接收者 id |
| `source_guild_id` | string | 是 | 源频道 id |

### 返回

返回 `DMS` 对象。

### 示例

请求：

```bash
curl -X POST 'https://api.sgroup.qq.com/users/@me/dms' \
  -H 'Authorization: QQBot ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "recipient_id": "123456",
    "source_guild_id": "112233"
  }'
```

响应：

```json
{
  "guild_id": "xxxxxx",
  "channel_id": "xxxxxx",
  "create_time": "1642545606"
}
```

## 发送私信

### 接口

```http
POST /dms/{guild_id}/messages
```

### 功能描述

用于发送私信消息，前提是已经创建了私信会话。私信的 `guild_id` 在创建私信会话时以及私信消息事件中获取。

- 私信场景下，每个机器人每天可以对一个用户发 **2 条**主动消息。
- 私信场景下，每个机器人每天累计可以发 **200 条**主动消息。
- 私信场景下，被动消息**没有条数限制**。

### Content-Type

`application/json`

### 参数

和 [发送子频道消息](./send.md) 参数一致。

### 返回

和 [发送子频道消息](./send.md) 返回一致。

## 撤回私信

### 接口

```http
DELETE /dms/{guild_id}/messages/{message_id}?hidetip=false
```

### 参数

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `hidetip` | bool | 否 | 是否隐藏提示小灰条，`true` 为隐藏，`false` 为显示。默认为 `false` |

### 功能描述

用于撤回私信频道 `guild_id` 中 `message_id` 指定的私信消息。只能用于撤回机器人自己发送的私信。

::: warning 注意
公域机器人暂不支持申请，仅私域机器人可用，选择私域机器人后默认开通。开通后需要先将机器人从频道移除，然后重新添加，方可生效。
:::

### Content-Type

`application/json`

### 返回

成功返回 HTTP 状态码 `200`。

## DMS 对象

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `guild_id` | string | 私信会话关联的频道 id |
| `channel_id` | string | 私信会话关联的子频道 id |
| `create_time` | string | 创建私信会话时间戳 |
