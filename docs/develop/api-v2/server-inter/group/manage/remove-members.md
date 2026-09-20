# 群成员批量移除

批量移除群成员，单次最多处理 20 个成员，可选择同时加入群黑名单。

::: warning 权限说明
该能力正在内邀接入中，仅白名单机器人可用。
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
| `add_to_member_blacklist` | boolean | 否 | 是否同时加入群黑名单，默认 `false`。 |

## 请求示例

```json
{
  "member_openids": [
    "7A3B9C1D5E2F4A6B8C0D1E3F5A7B9C2D"
  ],
  "add_to_member_blacklist": true
}
```

## 返回参数

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `remove_members_result` | string | 成功时返回 `success`。 |
| `add_to_member_blacklist_fail_openids` | string[] | 加入黑名单失败的成员 OpenID。 |

## 返回示例

```json
{
  "remove_members_result": "success",
  "add_to_member_blacklist_fail_openids": []
}
```

## 错误码

| 错误码 | 说明 | 排查建议 |
| --- | --- | --- |
| `11253` | 应用无接口访问权限 | 该接口仅白名单机器人可用，请联系平台运营申请权限。 |
