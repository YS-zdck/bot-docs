# 获取用户基本信息

获取指定 openid 的用户信息，包括昵称、头像以及是否接收主动推送。

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/users/{user_openid}/info</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>GET</td>
	</tr>
	<tr>
    <td>接口频率限制</td>
    <td>10 QPS</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| user_openid | string | 是 | 用户 OpenID |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| union_openid | string | 跨应用关联用户 openid，当绑定了 3 方应用时有效 |
| username | string | 用户名 |
| avatar | string | 用户头像原图 |
| allow_proactive_msg | bool | 是否接收主动推送，`true` 表示接受主动推送 |

- **错误码**

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 40184001 | 无好友关系 | 用户与机器人无好友关系，无法查询该用户信息 |

- **请求示例**

```http
GET /v2/users/CADF012424CB537DDBC9950A90732538/info
```

- **响应示例**

用户未开启主动消息：

```json
{
  "username": "笑😊心❤️",
  "allow_proactive_msg": false,
  "avatar": "https://thirdqq.qlogo.cn/bqqthird?key=AwviarjcoNVXmyUAEwW0xtGErhFibuWOzWYdUST20wEvz18MYo293c78BvRFt2s5Is&kti=avZwqQAAAAI&s=640"
}
```

用户已开启主动消息：

```json
{
  "username": "笑😊心❤️",
  "allow_proactive_msg": true,
  "avatar": "https://thirdqq.qlogo.cn/bqqthird?key=AwviarjcoNVXmyUAEwW0xtGErhFibuWOzWYdUST20wEvz18MYo293c78BvRFt2s5Is&kti=avZwqQAAAAI&s=640"
}
```

- **其他说明**

`allow_proactive_msg` 反映用户当前是否接受机器人的主动推送，可作为判断能否主动发消息的依据之一；`union_openid` 仅在机器人绑定了 3 方应用时返回。
