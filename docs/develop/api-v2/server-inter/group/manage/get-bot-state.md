# 获取机器人群内状态

获取机器人在指定群的状态信息。

:::: tip 说明
仅白名单机器人开放，需要向平台运营申请。
::::

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/groups/{group_openid}/bot_state</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>GET</td>
	</tr>
	<tr>
    <td>接口频率限制</td>
    <td>60 QPM</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群 OpenID |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| member_openid | string | 机器人的 OpenID |
| joined_at | string | 入群时间，RFC3339 格式 |
| allow_proactive_msg | bool | 是否接收主动推送 |
| recv_msg_setting | string | 接收消息类型：all 全部、only_mention 仅 @、mention_and_context @ 和上下文 |
| member_role | string | 群成员角色：member 普通成员、owner 群主、admin 管理员 |

- **请求示例**

```http
GET /v2/groups/3E5D8A1F7B2C9E4D6A0F1B3C5D7E9F2A/bot_state
```

- **响应示例**

```json
{
  "member_openid": "7A3B9C1D5E2F4A6B8C0D1E3F5A7B9C2D",
  "joined_at": "2025-06-15T14:30:00+08:00",
  "allow_proactive_msg": false,
  "recv_msg_setting": "only_mention",
  "member_role": "member"
}
```

- **错误码**

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 11253 | 应用无接口访问权限 | 该接口仅白名单机器人可用，请联系平台运营申请权限 |
