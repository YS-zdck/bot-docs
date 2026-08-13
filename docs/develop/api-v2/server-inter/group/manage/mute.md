# 群禁言管理

机器人拥有群管理员身份后，可以查询群级禁言规则和当前被禁言成员，也可以新增、更新或解除成员禁言。

## 查询群禁言状态

- **请求**

| **项目** | **值** |
| --- | --- |
| HTTP URL | `/v2/groups/{group_openid}/restrict_chat_setting` |
| HTTP Method | GET |
| 接口频率限制 | 30 QPM |

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群 OpenID |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| global_rule | GlobalMuteRule | 群级全员禁言配置 |
| members | MemberMuteState[] | 当前处于禁言中的用户列表，不含已过期记录 |

- **GlobalMuteRule**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| mode | string | 全员禁言模式：`none` 未开启，`always` 始终禁言，`schedule` 定时或周期禁言 |
| schedule_rules | MuteScheduleRule[] | 定时禁言规则列表 |
| recurring_rules | MuteRecurringRule[] | 周期禁言规则列表 |

- **MuteScheduleRule**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| task_id | string | 定时禁言任务 ID |
| start_at | string | 禁言开始时间，RFC3339 格式 |
| end_at | string | 禁言结束时间，RFC3339 格式 |
| enabled | bool | 规则是否启用 |

- **MuteRecurringRule**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| task_id | string | 周期禁言任务 ID |
| weekdays | int[] | 生效星期列表，取值 1 至 7，1 表示周一，7 表示周日 |
| start_time | string | 开始时间，格式为 `HH:mm`，使用北京时间 |
| end_time | string | 结束时间，格式为 `HH:mm`；小于开始时间时表示跨天 |
| enabled | bool | 规则是否启用 |

- **MemberMuteState**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| member_openid | string | 被禁言成员的 openid |
| mute_expire_at | string | 禁言到期时间，RFC3339 格式 |
| username | string | 被禁言成员昵称 |
| union_openid | string | 用户在应用或开放平台下的统一标识，如有 |

## 设置群成员禁言

机器人必须拥有群管理员身份，单次设置的最大禁言时长为 30 天。

- **请求**

| **项目** | **值** |
| --- | --- |
| HTTP URL | `/v2/groups/{group_openid}/restrict_chat_setting` |
| HTTP Method | POST |
| 接口频率限制 | 60 QPM |

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群 OpenID |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| members | SetMemberMuteState[] | 否 | 用户禁言列表，每项通过 `op` 控制新增、更新或解除，单次不超过 10 个 |

- **SetMemberMuteState**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| op | string | 是 | `add` 增加禁言，`update` 更新到期时间，`del` 解除禁言 |
| member_openid | string | 是 | 被操作成员的 openid；新增或更新时只能操作普通成员，不能操作群主、管理员或机器人 |
| mute_expire_at | string | 否 | 禁言到期时间，RFC3339 格式，最长不超过 30 天；`op=del` 时可传空字符串表示立即解除 |

- **请求示例**

```json
{
  "members": [
    {
      "op": "add",
      "member_openid": "MEMBER_OPENID",
      "mute_expire_at": "2026-08-05T11:23:05+08:00"
    }
  ]
}
```

- **返回参数**

无。
