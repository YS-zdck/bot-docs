# 获取群成员详情

## 功能描述

获取指定群聊中单个成员的详细信息，包括群昵称、角色、加入时间等。

## 接口

```
GET /v2/groups/{group_id}/members/{member_id}
```

## 路径参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| group_id | string | 是 | 群聊的 openid |
| member_id | string | 是 | 群成员的 openid |

## 返回参数

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| member_openid | string | 群成员 openid |
| username | string | 群昵称 |
| member_role | string | 群成员角色：owner（群主）、admin（管理员）、member（普通成员） |
| bot | bool | 是否为机器人 |
| joined_at | string | 加入时间，ISO 8601 格式 |
| union_openid | string | 用户统一 openid |

## 返回示例

```json
{
  "member_openid": "id",
  "username": "群昵称",
  "member_role": "owner",
  "bot": false,
  "joined_at": "2026-03-23T14:46:25+08:00",
  "union_openid": "id"
}
```

## 错误码

| 错误码 | 说明 |
| --- | --- |
| 500001 | 群聊不存在 |
| 500002 | 群成员不存在 |
| 500003 | 机器人不在该群聊中 |

详见[错误码说明](/develop/api-v2/dev-prepare/interface-framework/error-code)
