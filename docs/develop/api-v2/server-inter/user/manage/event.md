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
| timestamp | int | 添加时间戳（Unix 秒） |
| openid | string | 用户 openid |
| scene | int | 加好友场景值，详见定义 |
| scene_param | string | 开发者自定义的回调数据（callback_data） |
| short_code | string | 扩展字段，示例中为空字符串 |
| author | object | 用户信息，结构见下表 |

Author 对象

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| union_openid | string | 用户的统一 OpenID，可能为空 |

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
  "timestamp": 1794629100,
  "openid": "A0107612525E36DE67D7ABC31E462132",
  "scene": 1002,
  "scene_param": "",
  "short_code": "",
  "author": {
    "union_openid": "A0107612525E36DE67D7ABC31E462132"
  }
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
| timestamp | int | 删除时间戳（Unix 秒） |
| openid | string | 用户 OpenID |
| author | object | 用户信息，结构见下表 |

Author 对象

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| union_openid | string | 用户的统一 OpenID，可能为空 |

- **事件示例**

```json
{
  "timestamp": 1794629220,
  "openid": "A0107612525E36DE67D7ABC31E462132",
  "author": {
    "union_openid": "A0107612525E36DE67D7ABC31E462132"
  }
}
```

## 用户授权变更

用户在单聊设置中变更主动消息接收授权时，通过 `INTERACTION_CREATE` 事件通知开发者。通过 `d.type=18` 区分用户授权变更，通过 `data.resolved.authorize_data.scope=c2c_push` 识别主动消息接收授权。

- **基本概况**

| **项目** | **值** |
| --- | --- |
| intents | `1<<26` |
| 事件类型 | `INTERACTION_CREATE` |
| 互动类型 | `type=18`，用户授权变更 |
| 触发场景 | 用户在单聊设置中变更主动消息接收授权 |

- **事件字段**

以下字段位于事件包的 `d` 对象中：

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| id | string | 互动 ID |
| application_id | string | 机器人 AppID |
| type | int | 互动类型，用户授权变更为 `18` |
| data | object | 互动数据 |
| data.resolved | object | 解析后的互动数据 |
| data.resolved.authorize_data | object | 授权变更信息，结构见下表 |
| version | int | 事件版本，示例中为 `1` |
| scene | string | 事件发生场景，单聊为 `c2c` |
| user_openid | string | 用户 OpenID |
| timestamp | string | 触发时间，RFC3339 格式 |
| union_openid | string | 用户的统一 OpenID，可能为空 |

- **AuthorizeData 对象**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| scope | string | 授权项，`c2c_push` 表示单聊主动消息接收授权 |
| opt_scene | string | 操作来源，`setting` 表示设置页 |
| switch | bool | 授权开关，`true` 表示允许，`false` 表示拒绝；可能不携带 |

- **事件示例**

以下仅展示事件包中的 `d` 对象，互动 ID、AppID 和用户标识均已脱敏。该实际事件未携带 `switch` 字段，示例保留原始字段结构。

```json
{
  "id": "6f2ca904-73be-4d81-a650-e9b31827cd45",
  "application_id": "102345678",
  "type": 18,
  "data": {
    "resolved": {
      "authorize_data": {
        "scope": "c2c_push",
        "opt_scene": "setting"
      }
    }
  },
  "version": 1,
  "scene": "c2c",
  "user_openid": "A0107612525E36DE67D7ABC31E462132",
  "timestamp": "2026-11-10T12:00:00+08:00",
  "union_openid": "A0107612525E36DE67D7ABC31E462132"
}
```

## 拒绝机器人主动消息

::: warning 情况说明
此事件已弃用
:::

请使用[用户授权变更](#用户授权变更)事件接收授权变更通知。

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

::: warning 情况说明
此事件已弃用
:::

请使用[用户授权变更](#用户授权变更)事件接收授权变更通知。

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
