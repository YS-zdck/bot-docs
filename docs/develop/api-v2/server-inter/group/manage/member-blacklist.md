# 群黑名单管理

查询或修改群黑名单。只有目标用户不在群中时，才能将其加入群黑名单。

::: warning 权限说明
该能力正在内邀接入中，仅白名单机器人可用。
:::

## 查询群黑名单

### 接口

| 项目 | 内容 |
| --- | --- |
| HTTP URL | `/v2/groups/{group_openid}/member_blacklist` |
| HTTP Method | `GET` |
| 接口频率限制 | 30 QPM |

### 路径参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `group_openid` | string | 是 | 群 OpenID。 |

### 查询参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `cursor` | string | 否 | 分页游标，首次请求可不传或传空字符串。 |
| `limit` | integer | 否 | 单页数量，默认 20，最大 100。 |

### 请求示例

```http
GET /v2/groups/3E5D8A1F7B2C9E4D6A0F1B3C5D7E9F2A/member_blacklist?limit=20
```

### 返回参数

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `users` | BlacklistUser[] | 黑名单用户列表。 |
| `next_cursor` | string | 下一页游标，空字符串表示已到末页。 |

#### BlacklistUser

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `union_openid` | string | 用户在应用或开放平台下的统一标识，如无则为空。 |
| `member_openid` | string | 群成员 OpenID。 |
| `username` | string | 用户昵称。 |
| `banned_at` | string | 拉黑时间，RFC3339 格式。 |
| `bot` | boolean | 是否为机器人账号。 |

### 返回示例

```json
{
  "users": [
    {
      "union_openid": "9F2E872045CCCC5948BEAF5B5FCCDF22",
      "member_openid": "7A3B9C1D5E2F4A6B8C0D1E3F5A7B9C2D",
      "username": "阳光少年",
      "banned_at": "2025-07-01T10:30:00+08:00",
      "bot": false
    }
  ],
  "next_cursor": ""
}
```

## 操作群黑名单

### 接口

| 项目 | 内容 |
| --- | --- |
| HTTP URL | `/v2/groups/{group_openid}/member_blacklist` |
| HTTP Method | `POST` |
| 接口频率限制 | 60 QPM |

### 请求参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `op` | string | 是 | `add` 表示加入黑名单，`del` 表示移出黑名单。目标成员仍在群中时不能执行 `add`。 |
| `member_openids` | string[] | 是 | 目标成员 OpenID，单次最多 20 个。 |

### 请求示例

加入群黑名单：

```json
{
  "op": "add",
  "member_openids": [
    "7A3B9C1D5E2F4A6B8C0D1E3F5A7B9C2D"
  ]
}
```

移出群黑名单：

```json
{
  "op": "del",
  "member_openids": [
    "7A3B9C1D5E2F4A6B8C0D1E3F5A7B9C2D"
  ]
}
```

### 返回参数

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `fail_openids` | string[] | 操作失败的成员 OpenID。 |

```json
{
  "fail_openids": []
}
```

## 错误码

| 错误码 | 说明 | 排查建议 |
| --- | --- | --- |
| `11253` | 应用无接口访问权限 | 该接口仅白名单机器人可用，请联系平台运营申请权限。 |
