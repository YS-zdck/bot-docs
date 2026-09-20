# 获取群成员列表

获取群成员列表，每次最多返回 30 条，支持分页。

::: warning 权限说明
该能力正在内邀接入中，仅白名单机器人可用。
:::

## 接口

| 项目 | 内容 |
| --- | --- |
| HTTP URL | `/v2/groups/{group_openid}/members` |
| HTTP Method | `GET` |
| 接口频率限制 | 60 QPM |

## 路径参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `group_openid` | string | 是 | 群 OpenID。 |

## 查询参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `cursor` | string | 否 | 分页游标；首次请求可不传或传空字符串，后续传入上一次响应的 `next_cursor`。 |

## 请求示例

```http
GET /v2/groups/3E5D8A1F7B2C9E4D6A0F1B3C5D7E9F2A/members?cursor=
```

## 返回参数

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `members` | Member[] | 成员列表，每次最多返回 30 条。 |
| `next_cursor` | string | 下一页游标，空字符串表示已到末页。 |

### Member

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
  "members": [
    {
      "member_openid": "7A3B9C1D5E2F4A6B8C0D1E3F5A7B9C2D",
      "username": "阳光小助手",
      "member_role": "member",
      "bot": false,
      "joined_at": "2025-08-20T09:15:00+08:00",
      "union_openid": "9F2E872045CCCC5948BEAF5B5FCCDF22"
    }
  ],
  "next_cursor": "bG1fNmIxOTM1NTRjNy4zMA"
}
```

## 错误码

| 错误码 | 说明 | 排查建议 |
| --- | --- | --- |
| `11253` | 应用无接口访问权限 | 该接口仅白名单机器人可用，请联系平台运营申请权限。 |
