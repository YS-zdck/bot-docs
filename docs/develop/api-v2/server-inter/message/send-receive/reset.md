# 撤回消息

## 单聊

### 接口

```http
DELETE /v2/users/{openid}/messages/{message_id}
```

### 功能描述

用于撤回机器人发送给当前用户 `openid` 的消息 `message_id`。发送超出 **2 分钟** 的消息不可撤回。

### Content-Type

```http
application/json
```

### 返回

成功返回 HTTP 状态码 `200`。

### 错误码

详见[错误码](../../../dev-prepare/error-trace/openapi.md)。

### 示例

请求数据包

```http
DELETE /v2/users/123456/messages/112233
```

## 群聊

### 接口

```http
DELETE /v2/groups/{group_openid}/messages/{message_id}
```

### 功能描述

可用于撤回机器人在当前群 `group_openid` 发送的消息，`message_id` 可通过消息发送成功时获得。消息发送超出 **2 分钟** 不可撤回。

当机器人被群主设置为群管理员时，还可撤回成员发送的消息。成员消息的 `message_id` 可通过 `GROUP_MESSAGE_CREATE`、`GROUP_AT_MESSAGE_CREATE` 事件获取。

### Content-Type

```http
application/json
```

### 返回

成功返回 HTTP 状态码 `200`。

### 错误码

详见[错误码](../../../dev-prepare/error-trace/openapi.md)。

### 示例

请求数据包

```http
DELETE /v2/groups/123456/messages/112233
```

## 文字子频道

### 接口

```http
DELETE /channels/{channel_id}/messages/{message_id}?hidetip=false
```

### 参数

| 字段名  | 类型 | 描述                                                             |
| ------- | ---- | ---------------------------------------------------------------- |
| hidetip | bool | 选填，是否隐藏提示小灰条，true 为隐藏，false 为显示。默认为false |

### 功能描述

用于撤回子频道 `channel_id` 下的消息 `message_id`

- 管理员可以撤回普通成员的消息。
- 频道主可以撤回所有人的消息。

<PrivateDomain/>

### Content-Type

```http
application/json
```

### 返回

成功返回 HTTP 状态码 `200`。

### 错误码

详见[错误码](../../../openapi/error/error.md)。

### 示例

请求数据包

```http
DELETE /channels/123456/messages/112233
```


## 频道私信

### 接口

```http
DELETE /dms/{guild_id}/messages/{message_id}?hidetip=false
```

### 参数

| 字段名  | 类型 | 描述                                                             |
| ------- | ---- | ---------------------------------------------------------------- |
| hidetip | bool | 选填，是否隐藏提示小灰条，true 为隐藏，false 为显示。默认为false |

### 功能描述

用于撤回私信频道 `guild_id` 中 `message_id` 指定的私信消息。只能用于撤回机器人自己发送的私信。

<PrivateDomain/>

### Content-Type

```http
application/json
```

### 返回

成功返回 HTTP 状态码 `200`。

### 错误码

详见[错误码](../../../openapi/error/error.md)。

### 示例

请求数据包

```http
DELETE /dms/123456/messages/112233
```
