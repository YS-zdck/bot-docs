# 群成员批量移除

批量移除群成员，单次最多处理 20 个成员 openid。

::: tip 权限说明
机器人需在 WEB 管理端开启「移除群成员」开关，并由群主为机器人开启该操作权限；未开启时接口分别返回 `40103011`、`40103012`。
:::

## 接口

| 项目 | 内容 |
| --- | --- |
| HTTP URL | `/v2/groups/{group_openid}/batch_remove_members` |
| HTTP Method | `POST` |
| 接口频率限制 | 30 QPM |

## 路径参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `group_openid` | string | 是 | 群 OpenID。 |

## 请求参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `member_openids` | string[] | 是 | 需要移除的成员 OpenID，单次最多 20 个。 |

## 请求示例

```json
{
  "member_openids": [
    "7A3B9C1D5E2F4A6B8C0D1E3F5A7B9C2D"
  ]
}
```

## 返回参数

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `remove_members_result` | string | 成功时返回 `success`。 |

## 返回示例

```json
{
  "remove_members_result": "success"
}
```

## 错误码

| 错误码 | 说明 | 排查建议 |
| --- | --- | --- |
| `40103011` | 机器人已关闭操作权限 | 到 WEB 管理端为机器人打开「移除群成员」开关。 |
| `40103012` | 群主已关闭操作权限 | 需要群主为机器人打开「移除群成员」权限开关。 |
