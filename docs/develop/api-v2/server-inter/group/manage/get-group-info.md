# 获取群基础信息

获取指定群的基本信息。

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
    <td>/v2/groups/{group_openid}/info</td>
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
| group_openid | string | 群 OpenID |
| group_name | string | 群名称 |
| group_finger_memo | string | 群简介 |
| group_class_text | string | 群分类 |
| group_tags | string[] | 群标签列表 |
| group_member_num | int | 群成员人数 |

- **请求示例**

```http
GET /v2/groups/3E5D8A1F7B2C9E4D6A0F1B3C5D7E9F2A/info
```

- **响应示例**

```json
{
  "group_openid": "3E5D8A1F7B2C9E4D6A0F1B3C5D7E9F2A",
  "group_name": "读书分享会",
  "group_finger_memo": "每周共读一本好书",
  "group_class_text": "文化",
  "group_tags": [
    "阅读",
    "文学",
    "成长"
  ],
  "group_member_num": 256
}
```

- **错误码**

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 11253 | 应用无接口访问权限 | 该接口仅白名单机器人可用，请联系平台运营申请权限 |
