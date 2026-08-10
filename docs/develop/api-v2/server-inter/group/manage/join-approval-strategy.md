# 入群自动审批策略

入群自动审批策略用于将关联群中命中白名单 QQ 号码的入群申请自动审批通过。一个机器人最多创建 20 个策略，策略仅在机器人拥有对应群管理员身份时生效。

## 查询策略列表

`GET /v2/groups/join_approval_strategy`，接口频率限制为 60 QPM。

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| cursor | string | 否 | 分页游标，首次请求可不传或传空字符串 |
| limit | int | 否 | 单页数量，默认 20，最大 100 |

返回 `strategies` 和 `next_cursor`。`next_cursor` 为空字符串时表示已到末页。

- **JoinApprovalStrategy**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| strategy_id | string | 策略 ID |
| group_openids | string[] | 关联的群 openid 列表，创建时使用 `group_openids` 才返回 |
| group_ids | string[] | 关联的 QQ 群号列表，创建时使用 `group_ids` 才返回 |
| whitelist_user_count | int | 白名单号码数量估算值，可能存在少量误差 |
| is_enable | string | `on` 启用，`off` 关闭 |
| expire_at | string | 过期时间，RFC3339 格式 |
| created_at | string | 创建时间，RFC3339 格式 |
| updated_at | string | 最近更新时间，RFC3339 格式 |
| remark | string | 策略备注 |

## 创建策略

`POST /v2/groups/join_approval_strategy`，接口频率限制为 60 QPM。

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openids | string[] | 否 | 群 openid 列表，最多 100 个；与 `group_ids` 二选一，不能同时传入 |
| group_ids | string[] | 否 | QQ 群号列表，最多 100 个；与 `group_openids` 二选一，使用字符串避免精度问题 |
| is_enable | string | 否 | `on` 启用，`off` 关闭，默认为 `on` |
| expire_at | string | 否 | 过期时间，RFC3339 格式；不传时默认一年后过期 |
| remark | string | 否 | 策略备注，最多 255 个汉字 |

- **请求示例**

```json
{
  "group_openids": [
    "GROUP_OPENID_1",
    "GROUP_OPENID_2"
  ],
  "is_enable": "on",
  "expire_at": ""
}
```

返回服务端生成的 `strategy_id`、`is_enable` 和 `expire_at`。

## 修改策略

`PATCH /v2/groups/join_approval_strategy/{strategy_id}`，接口频率限制为 60 QPM。

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| strategy_id | string | 是 | 路径参数，策略 ID |
| is_enable | string | 否 | `on` 启用，`off` 关闭 |
| expire_at | string | 否 | 过期时间，RFC3339 格式 |
| group_action | GroupAction | 否 | 关联群增删操作，群标识形式必须与创建时一致 |
| remark | string | 否 | 策略备注，最多 255 个汉字 |

- **GroupAction**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| op | string | 是 | `add` 新增关联群，`del` 删除关联群 |
| group_openids | string[] | 否 | 待操作的群 openid 列表，与 `group_ids` 互斥 |
| group_ids | string[] | 否 | 待操作的 QQ 群号列表，与 `group_openids` 互斥 |

## 删除策略

`DELETE /v2/groups/join_approval_strategy/{strategy_id}`，接口频率限制为 60 QPM，响应体为空。

## 执行策略

`POST /v2/groups/join_approval_strategy/{strategy_id}/execute`，接口频率限制为 60 QPM。

该接口对策略关联的全部群发起全量扫描，将命中白名单号码的入群申请自动审批通过。任务异步执行，约 10 分钟完成，响应体为空。

## 修改白名单

`POST /v2/groups/join_approval_strategy/{strategy_id}/whitelist_users`，接口频率限制为 60 QPM。

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| strategy_id | string | 是 | 路径参数，策略 ID |
| op | string | 是 | `add` 新增号码，`del` 删除号码 |
| whitelist_users | string[] | 是 | QQ 号码列表，单次最多 10000 个，总上限 10 万；使用字符串避免 JavaScript 精度问题 |

- **请求示例**

```json
{
  "op": "add",
  "whitelist_users": [
    "1234567",
    "1234568"
  ]
}
```

返回 `strategy_id`、操作后的 `whitelist_user_count` 估算值和 RFC3339 格式的 `updated_at`。
