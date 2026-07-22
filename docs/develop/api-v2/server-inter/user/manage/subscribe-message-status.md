# 订阅消息授权状态变更

用户对订阅消息模板的授权状态发生变化时触发，可用于判断用户是否允许或拒绝接收指定订阅消息模板。

- **基本概况**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>Intent</td>
    <td>GROUP_AND_C2C_EVENT (1&lt;&lt;25)</td>
	</tr>
	<tr>
    <td>事件类型</td>
    <td>SUBSCRIBE_MESSAGE_STATUS</td>
	</tr>
</table>

- **事件字段**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| group_openid | string | 群 OpenID，群订阅场景时有值 |
| openid | string | 用户 OpenID，个人订阅场景时有值 |
| result | array | 各模板的授权结果列表 |

- **result 参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| template_id | int | 平台提供的订阅模板 ID |
| custom_template_id | string | 自定义订阅模板 ID |
| op | int | 用户操作：1 允许订阅，2 拒绝订阅 |
| subscribe_id | string | 订阅 ID，发送订阅消息时需使用 |
| subscribe_ts | int | 订阅操作时间戳，Unix 秒 |
| update_ts | int | 订阅状态最后更新时间戳，Unix 秒 |

- **事件示例**

```json
{
  "openid": "A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4",
  "result": [
    {
      "template_id": 10001,
      "custom_template_id": "tpl_abc123",
      "op": 1,
      "subscribe_id": "sub_def456",
      "subscribe_ts": 1784276820,
      "update_ts": 1784276820
    }
  ]
}
```
