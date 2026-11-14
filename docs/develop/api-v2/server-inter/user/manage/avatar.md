# 获取用户头像

群聊、单聊场景下，可直接读取消息事件中的头像地址，也可通过机器人 AppID 和用户 OpenID 拼接头像地址。

## 通过消息事件获取

用户发送消息后，事件包的 `d.author.avatar` 字段会携带头像 URL，获取后可直接作为图片地址使用

| **事件类型** | **字段位置** | **说明** |
| --- | --- | --- |
| `C2C_MESSAGE_CREATE` | `d.author.avatar` | 单聊消息发送者头像 |
| `GROUP_AT_MESSAGE_CREATE` | `d.author.avatar` | 群聊 @ 机器人消息发送者头像 |
| `GROUP_MESSAGE_CREATE` | `d.author.avatar` | 群聊全量消息发送者头像 |

群消息的 `mentions` 列表使用相同的用户结构，可读取 `d.mentions[].avatar` 获取被 @ 用户的头像。

### 数据结构

以下字段位于消息事件的 `d.author` 对象中：

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| avatar | string | 用户头像 URL，未携带时为空 |

### 事件示例

以下为单聊消息的 `d.author` 示例：

```json
{
  "id": "A0107612525E36DE67D7ABC31E462132",
  "username": "示例用户",
  "avatar": "https://thirdqq.qlogo.cn/bqqthird?key=B7kX2mQ9cR4vN6pT8sW1aD5fG3hJ0yL2uE9iO7zC4bV6nM8qP1rS5tU3wY0xA2dF&kti=avF7k2pAAAA&s=640",
  "bot": false,
  "user_openid": "A0107612525E36DE67D7ABC31E462132",
  "union_openid": "A0107612525E36DE67D7ABC31E462132"
}
```

完整事件结构见[消息事件](../../message/send-receive/event.md)。

## 通过 AppID 和 OpenID 获取

已保存用户 OpenID 时，可按以下格式拼接头像 URL，无需等待用户再次发送消息。

### 地址格式

```text
https://thirdqq.qlogo.cn/qqapp/{appid}/{openid}/100
```

| **参数** | **说明** |
| --- | --- |
| appid | 获取该用户 OpenID 的机器人 AppID |
| openid | 用户在该机器人下的 OpenID；单聊使用 `author.user_openid`，群聊使用 `author.member_openid` |
| 100 | 图片尺寸参数，此处使用 `100` |

### 请求示例

```http
GET https://thirdqq.qlogo.cn/qqapp/102345678/A0107612525E36DE67D7ABC31E462132/100
```
