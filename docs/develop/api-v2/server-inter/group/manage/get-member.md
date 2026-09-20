# 获取群成员详情

获取指定群成员的详细信息。

::: warning 权限说明
该能力正在内邀接入中，仅白名单机器人可用。
:::

## 接口

| 项目 | 内容 |
| --- | --- |
| HTTP URL | `/v2/groups/{group_openid}/members/{member_openid}` |
| HTTP Method | `GET` |
| 接口频率限制 | 30 QPM |

## 路径参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `group_openid` | string | 是 | 群 OpenID。 |
| `member_openid` | string | 是 | 群成员 OpenID。 |

## 请求示例

```http
GET /v2/groups/3E5D8A1F7B2C9E4D6A0F1B3C5D7E9F2A/members/7A3B9C1D5E2F4A6B8C0D1E3F5A7B9C2D
```

## 返回参数

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `member_openid` | string | 成员 OpenID。 |
| `username` | string | 用户昵称。 |
| `member_role` | string | 群成员角色：`member`、`owner` 或 `admin`。 |
| `bot` | boolean | 是否为机器人。 |
| `joined_at` | string | 入群时间，RFC3339 格式。 |
| `union_openid` | string | 用户在应用或开放平台下的统一标识，如无则为空。 |

## 返回示例

```json
{
  "member_openid": "7A3B9C1D5E2F4A6B8C0D1E3F5A7B9C2D",
  "username": "小明",
  "member_role": "admin",
  "bot": false,
  "joined_at": "2025-08-20T09:15:00+08:00",
  "union_openid": "B4C6D8E0F2A4B6C8D0E2F4A6B8C0D2E4"
}
```

## 错误码

| 错误码 | 说明 | 排查建议 |
| --- | --- | --- |
| `11253` | 应用无接口访问权限 | 该接口仅白名单机器人可用，请联系平台运营申请权限。 |
