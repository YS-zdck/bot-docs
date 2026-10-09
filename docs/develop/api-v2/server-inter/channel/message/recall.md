# 撤回子频道消息

## 接口

```http
DELETE /channels/{channel_id}/messages/{message_id}?hidetip=false
```

## 参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `hidetip` | bool | 否 | 是否隐藏提示小灰条，`true` 为隐藏，`false` 为显示。默认为 `false` |

## 功能描述

用于撤回子频道 `channel_id` 下的消息 `message_id`。

- 管理员可以撤回普通成员的消息。
- 频道主可以撤回所有人的消息。

::: warning 注意
公域机器人暂不支持申请，仅私域机器人可用，选择私域机器人后默认开通。
开通后需要先将机器人从频道移除，然后重新添加，方可生效。
:::

## Content-Type

`application/json`

## 返回

成功返回 HTTP 状态码 `200`。

## 错误码

详见 [错误码](../../../openapi/error/error.md)。

## 示例

```bash
curl -X DELETE 'https://api.sgroup.qq.com/channels/123456/messages/112233' \
  -H 'Authorization: QQBot ACCESS_TOKEN'
```
