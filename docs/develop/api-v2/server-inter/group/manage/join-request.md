# 入群申请管理

机器人拥有群管理员身份后，可以拉取指定群的入群申请列表，并对申请执行通过或拒绝操作。

## 拉取入群申请列表

- **请求**

| **项目** | **值** |
| --- | --- |
| HTTP URL | `/v2/groups/{group_openid}/join_request_list` |
| HTTP Method | GET |
| 接口频率限制 | 30 QPM |

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群 OpenID |

- **查询参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| cursor | string | 否 | 分页游标，首次请求可不传或传空字符串 |
| limit | int | 否 | 单页数量，默认 20，最大 100 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| list | JoinRequest[] | 入群申请列表 |
| next_cursor | string | 下一页游标，空字符串表示已到末页 |

- **JoinRequest**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| join_request_id | string | 申请 ID，审批时需要回传 |
| risk_tips | string | 安全提示语；可疑消息返回 `warning_tips`，普通消息命中安全规则时返回 `top_tips` |
| union_openid | string | 用户在应用或开放平台下的统一标识，如有 |
| member_openid | string | 申请人的 openid |
| username | string | 申请人昵称 |
| apply_at | string | 申请时间戳，RFC3339 格式 |
| apply_source | string | 申请来源：`self_apply` 主动申请，`invited` 被邀请 |
| invited_by | string | 邀请人的 openid，仅 `apply_source=invited` 时有效 |
| bot | bool | 是否为机器人账号 |
| verify_info | VerifyInfo | 用户入群验证信息 |

- **VerifyInfo**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| method | string | 验证方式：`verify_message` 或 `admin_review_qa` |
| verify_message | string | 验证消息内容，仅 `method=verify_message` 时可能携带 |
| review_qa_list | ReviewQA[] | 问答列表，仅 `method=admin_review_qa` 时可能携带 |

- **ReviewQA**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| question | string | 管理员设置的问题 |
| answer | string | 申请人填写的答案 |

- **响应示例**

```json
{
  "list": [
    {
      "join_request_id": "JOIN_REQUEST_ID",
      "risk_tips": "",
      "union_openid": "UNION_OPENID",
      "member_openid": "MEMBER_OPENID",
      "username": "申请人昵称",
      "apply_at": "2026-08-05T14:19:09+08:00",
      "apply_source": "self_apply",
      "invited_by": "",
      "bot": false,
      "verify_info": {
        "method": "verify_message",
        "verify_message": "验证消息",
        "review_qa_list": []
      }
    }
  ],
  "next_cursor": "NEXT_CURSOR"
}
```

## 审批入群申请

- **请求**

| **项目** | **值** |
| --- | --- |
| HTTP URL | `/v2/groups/{group_openid}/approval_join_request/{member_openid}` |
| HTTP Method | POST |
| 接口频率限制 | 60 QPM |

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群 OpenID |
| member_openid | string | 是 | 成员 OpenID |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| op | string | 是 | 审批动作：`approve` 通过，`decline` 拒绝 |
| join_request_id | string | 否 | 申请 ID |
| reject_reason | string | 否 | 拒绝理由，`op=decline` 时可填写 |
| add_to_member_blacklist | bool | 否 | 是否同时加入群黑名单，默认为 `false`，`op=decline` 时可填写 |

- **通过示例**

```json
{
  "op": "approve",
  "join_request_id": "JOIN_REQUEST_ID"
}
```

- **拒绝并拉黑示例**

```json
{
  "op": "decline",
  "join_request_id": "JOIN_REQUEST_ID",
  "reject_reason": "不符合入群要求",
  "add_to_member_blacklist": true
}
```

- **返回参数**

无。
