# 事件

## 机器人加入群聊

- **基本概况**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
  <tr>
    <td>intents</td>
    <td>1<<25</td>
	</tr>
  <tr>
    <td>事件类型</td>
    <td>GROUP_ADD_ROBOT</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>机器人被添加到群聊</td>
	</tr>
  <tr>
    <td>权限要求</td>
    <td>暂无</td>
	</tr>
	<tr>
    <td>推送方式</td>
    <td>Websocket</td>
	</tr>
</table>

- **事件字段**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| timestamp | int | 加入的时间戳 |
| group_openid | string | 加入群的群openid |
| op_member_openid | string | 操作添加机器人进群的群成员openid |

- **事件示例**

```json
{
	"group_openid": "C9F778FE6ADF9D1D1DBE395BF744A33A",
	"op_member_openid": "E4F4AEA33253A2797FB897C50B81D7ED",
	"timestamp": 1699240248
}
```

## 机器人退出群聊

- **基本概况**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
  <tr>
    <td>intents</td>
    <td>1<<25</td>
	</tr>
  <tr>
    <td>事件类型</td>
    <td>GROUP_DEL_ROBOT</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>机器人被移出群聊</td>
	</tr>
  <tr>
    <td>权限要求</td>
    <td>暂无</td>
	</tr>
	<tr>
    <td>推送方式</td>
    <td>Websocket</td>
	</tr>
</table>

- **事件字段**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| timestamp | int | 移除的时间戳 |
| group_openid | string | 移除群的群openid |
| op_member_openid | string | 操作移除机器人退群的群成员openid |

- **事件示例**

```json
{
	"group_openid": "C9F778FE6ADF9D1D1DBE395BF744A33A",
	"op_member_openid": "E4F4AEA33253A2797FB897C50B81D7ED",
	"timestamp": 1699240426
}
```


## 群聊拒绝机器人主动消息

- **基本概况**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
  <tr>
    <td>intents</td>
    <td>1<<25</td>
	</tr>
  <tr>
    <td>事件类型</td>
    <td>GROUP_MSG_REJECT</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>群管理员主动在机器人资料页操作关闭通知</td>
	</tr>
  <tr>
    <td>权限要求</td>
    <td>暂无</td>
	</tr>
	<tr>
    <td>推送方式</td>
    <td>Websocket</td>
	</tr>
</table>

- **事件字段**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| timestamp | int | 操作的时间戳 |
| group_openid | string | 操作群的群openid |
| op_member_openid | string | 操作群成员的openid |

- **事件示例**

```json
{
	"group_openid": "C9F778FE6ADF9D1D1DBE395BF744A33A",
	"op_member_openid": "E4F4AEA33253A2797FB897C50B81D7ED",
	"timestamp": 1699240458
}
```

## 群聊接受机器人主动消息

- **基本概况**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
  <tr>
    <td>intents</td>
    <td>1<<25</td>
	</tr>
  <tr>
    <td>事件类型</td>
    <td>GROUP_MSG_RECEIVE</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>群管理员主动在机器人资料页操作开启通知</td>
	</tr>
  <tr>
    <td>权限要求</td>
    <td>暂无</td>
	</tr>
	<tr>
    <td>推送方式</td>
    <td>Websocket</td>
	</tr>
</table>

- **事件字段**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| timestamp | int | 操作的时间戳 |
| group_openid | string | 操作群的群openid |
| op_member_openid | string | 操作群成员的openid |

- **事件示例**

```json
{
	"group_openid": "C9F778FE6ADF9D1D1DBE395BF744A33A",
	"op_member_openid": "E4F4AEA33253A2797FB897C50B81D7ED",
	"timestamp": 1699240477
}
```

## 群成员加入群聊

- **基本概况**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
  <tr>
    <td>intents</td>
    <td>GROUP_MEMBER_EVENT (1&lt;&lt;24)</td>
	</tr>
  <tr>
    <td>事件类型</td>
    <td>GROUP_MEMBER_ADD</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>成员加入群聊时触发</td>
	</tr>
  <tr>
    <td>权限要求</td>
    <td>暂无</td>
	</tr>
	<tr>
    <td>推送方式</td>
    <td>Websocket</td>
	</tr>
</table>

- **事件字段**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| timestamp | int | 加入的时间戳 |
| group_openid | string | 群的 openid |
| member_openid | string | 加入成员的 openid |

- **事件示例**

```json
{
	"group_openid": "C9F778FE6ADF9D1D1DBE395BF744A33A",
	"member_openid": "E4F4AEA33253A2797FB897C50B81D7ED",
	"timestamp": 1699240248
}
```

## 群成员退出群聊

- **基本概况**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
  <tr>
    <td>intents</td>
    <td>GROUP_MEMBER_EVENT (1&lt;&lt;24)</td>
	</tr>
  <tr>
    <td>事件类型</td>
    <td>GROUP_MEMBER_REMOVE</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>成员退出群聊时触发</td>
	</tr>
  <tr>
    <td>权限要求</td>
    <td>暂无</td>
	</tr>
	<tr>
    <td>推送方式</td>
    <td>Websocket</td>
	</tr>
</table>

- **事件字段**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| timestamp | int | 退出的时间戳 |
| group_openid | string | 群的 openid |
| member_openid | string | 退出成员的 openid |

- **事件示例**

```json
{
	"group_openid": "C9F778FE6ADF9D1D1DBE395BF744A33A",
	"member_openid": "E4F4AEA33253A2797FB897C50B81D7ED",
	"timestamp": 1699240426
}
```

## 用户申请加群

机器人是群管理员时，用户申请加群会触发此事件。

- **基本概况**

| **项目** | **值** |
| --- | --- |
| intents | `1<<25` |
| 事件类型 | `GROUP_JOIN_REQUEST` |
| 触发场景 | 用户主动申请入群、被其他成员邀请入群或自动审批通过 |
| 权限要求 | 机器人必须是群管理员 |

- **事件字段**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| group_openid | string | 群 OpenID |
| join_request_id | string | 申请 ID，审批接口需要回传 |
| risk_tips | string | 安全提示语；可疑消息返回 `warning_tips`，普通消息命中安全规则时返回 `top_tips` |
| union_openid | string | 用户在应用或开放平台下的统一标识，如有 |
| member_openid | string | 申请人的 openid |
| username | string | 申请人昵称 |
| apply_at | string | 申请时间戳，RFC3339 格式 |
| apply_source | string | `self_apply` 主动申请，`invited` 被邀请 |
| invited_by | string | 邀请人的 openid，仅 `apply_source=invited` 时有效 |
| bot | bool | 是否为机器人账号 |
| verify_info | VerifyInfo | 用户入群验证信息 |
| auto_approved | AutoApproved | 自动审批通过的扩展信息，仅自动通过事件携带 |

- **VerifyInfo**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| method | string | 验证方式：`verify_message` 或 `admin_review_qa` |
| verify_message | string | 验证消息内容，仅 `method=verify_message` 时可能携带 |
| review_qa_list | ReviewQA[] | 管理员问答列表，仅 `method=admin_review_qa` 时可能携带 |

- **ReviewQA**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| question | string | 管理员设置的问题 |
| answer | string | 申请人填写的答案 |

- **AutoApproved**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| strategy_id | string | 自动审批通过所命中的策略 ID |

- **事件示例**

```json
{
  "group_openid": "GROUP_OPENID",
  "join_request_id": "JOIN_REQUEST_ID",
  "member_openid": "MEMBER_OPENID",
  "username": "申请人昵称",
  "apply_at": "2026-08-05T17:32:52+08:00",
  "apply_source": "self_apply",
  "verify_info": {
    "method": "verify_message",
    "verify_message": "验证消息"
  },
  "auto_approved": {
    "strategy_id": "st_7c0b77d442"
  }
}
```
