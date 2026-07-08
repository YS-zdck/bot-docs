# 事件

## 用户添加机器人

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
    <td>FRIEND_ADD</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>用户添加机器人'好友'到消息列表</td>
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
| timestamp | int | 添加时间戳 |
| openid | string | 用户 openid |
| scene | int | 加好友场景值，详见定义 |
| scene_param | string | 开发者自定义的回调数据（callback_data） |

- **场景值说明**

| scene 场景值 | 说明 |
| --- | --- |
| 1000 | 缺省默认值 |
| 1001 | 网络搜索（全部tab） |
| 1002 | 网络搜索（机器人tab） |
| 1003 | 群场景 |
| 1004 | 空间场景 |
| 2001 | 站内分享资料页 |
| 2002 | 站外分享资料页 |
| 2003 | 开发者生成的分享链接（站内） |
| 2004 | 开发者生成的分享链接（站外） |

- **事件示例**

```json
{
  "openid": "E4F4AEA33253A2797FB897C50B81D7ED",
  "timestamp": 1699240365,
  "scene": 1000,
  "scene_param": ""
}
```

## 用户删除机器人

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
    <td>FRIEND_DEL</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>用户删除机器人'好友'</td>
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
| timestamp | int | 删除时间戳 |
| openid | string | 用户openid |

- **事件示例**

```json
{
	"openid": "E4F4AEA33253A2797FB897C50B81D7ED",
	"timestamp": 1699240328
}
```

## 拒绝机器人主动消息

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
    <td>C2C_MSG_REJECT</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>用户在机器人资料卡手动关闭"主动消息"推送</td>
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
| timestamp | int | 操作时间戳 |
| openid | string | 用户 openid |

- **事件示例**

```json
{
	"openid": "E4F4AEA33253A2797FB897C50B81D7ED",
	"timestamp": 1699240599
}
```

## 允许机器人主动消息

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
    <td>C2C_MSG_RECEIVE</td>
	</tr>
	<tr>
    <td>触发场景</td>
    <td>用户在机器人资料卡手动开启"主动消息"推送开关</td>
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
| timestamp | int | 操作时间戳 |
| openid | string | 用户 openid |

- **事件示例**

```json
{
	"openid": "E4F4AEA33253A2797FB897C50B81D7ED",
	"timestamp": 1699240617
}
```
