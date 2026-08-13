# 发送消息

## 更新说明

:::: tip  
2026/06/22 主动推送能力更新说明

群场景主动推送消息能力于 2026/06/22 全量开放，当群主主动打开【机器人主动在群聊内发言】设置项后，机器人可对该群下发主动推动消息。

整体频控规则如下：

- 机器人账号维度的限频规则，企业认证开发者：60 qpm、个人认证开发者：60 qpm、未认证：30 qpm
- 单群（机器人发给某个群）维度的频控：20 qpm
若超频调用接口，平台返回相关超频错误信息。
::::

:::: tip  
2026/03/05 能力更新说明

沙箱环境内，机器人发送消息不受频控策略影响。
::::

:::: tip  
2026/01/10 能力更新说明

单聊场景新增互动召回消息能力，在用户主动与机器人对话之后，机器人在未来 30 天内可下发互动召回消息给用户（消息类型与当前机器人拥有的消息类型权限一致），每个周期内可下发一条。分别为：当天、1 - 3 天、3 - 7 天、7 - 30 天，合计：4 个周期，C2C发消息接口新增 is_wakeup 字段使用该能力，同时被动消息（回复类）由 60 分钟 5 次 调整为 60 分钟 4 次 。 
::::

:::: tip 注意
主动推送能力于 2025 年 4 月 21 日起不再提供，接口调用时会收到错误信息。 公告信息：[【关于QQ机器人消息推送策略调整通知】](https://q.qq.com/miniapp#/news/detail/974e66a946a5e54c441ca983585a7aab)
::::

:::: tip 说明
发送消息分为，主动推送与被动回复，主动消息和被动消息在不同的场景下，发送的频次有不同的规则。
发送消息的接口有`4`个场景：QQ单聊、QQ群聊、文字子频道、频道私信
::::
主动消息与被动消息说明：
QQ 用户可以在 QQ 客户端主动设置是否接收机器人发送的主动消息，如果设置了关闭，主动消息一律发送失败。
- 单聊
  - 主动消息每月 `4 条`，超额会发送失败。（例如：给相同用户每月最多发 4 条）
  - 被动消息（回复类）有效时间为 `60 分钟`，每个消息最多回复 `4 次`，超时或超频会发送（回复）失败；
  - 互动召回：4个周期各1条，与 `msg_id`、`event_id` 互斥
- 群聊
  - 主动消息每月 `4 条`，超额会发送失败。（例如：给相同群每月最多发 4 条）
  - 被动消息（回复类）有效时间为 `5 分钟`，每个消息最多回复 `5 次`，超时或超频会发送（回复）失败；
- 文字子频道
  - 主动消息在频道主或管理设置了情况下，按设置的数量进行限频。在未设置的情况遵循如下限制:
    - 主动推送消息，默认每天往每个子频道可推送的消息数是 `20` 条，超过会被限制。
    - 主动推送消息在每个频道中，每天可以往 `2` 个子频道推送消息。超过后会被限制。
  - 不论主动消息还是被动消息，在一个子频道中，`每秒` 最多可发送 `5 条` 消息。
  - 被动回复消息有效期为 `5 分钟`，超时会发送失败。
  - 发送消息接口要求机器人接口需要连接到 `WebSocket` 上保持在线状态
  - 有关主动消息审核，可以通过 `事件订阅 Intents` 中审核事件 `MESSAGE_AUDIT` 返回 `MessageAudited` 对象获取结果。
- 频道私信
  - 私信场景下，每个机器人每天可以对一个用户发 `2 条` 主动消息。
  - 私信场景下，每个机器人每天累计可以发 `200 条` 主动消息。
  - 被动回复消息有效期为 `5 分钟`，超时会发送失败。
 
发动的消息内容包含 URL 的说明：

如开发者需要在消息内容发送含有 url 信息的消息，请现在 q.qq.com 后台-开发设置-消息URL配置 预先配置，否则会发送失败。
调用发消息 http 接口的 timeout 建议设置最低为 5 秒，避免出现实际消息已发送成功，但没接收到同步的结果返回。

## 单聊

:::: tip 说明
单独发动消息给用户。
::::
- **请求**
<table>
    <tr>
      <th colspan="2">基本</th>
    </tr>
    <tr>
    <td>HTTP URL</td>
    <td>/v2/users/{user_openid}/messages</td>
    </tr>
    <tr>
    <td>HTTP Method</td>
    <td>POST</td>
    </tr>
    <tr>
    <td>接口频率限制</td>
    <td>100 QPS，包括主动、被动等所有消息类型</td>
    </tr>
</table>
- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| user_openid | string | 是 | 用户 OpenID |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| msg_type | int | 否 | 消息类型：0 文本，2 Markdown，3 Ark，6 输入状态通知，7 富媒体 |
| content | string | 否 | 文本内容，`msg_type=0` 时使用；填写 `markdown` 时必须为空 |
| markdown | object | 否 | [Markdown](../type/markdown.md#数据结构与协议)对象，`msg_type=2` 时使用；与 `content`、`ark` 互斥 |
| keyboard | object | 否 | [Keyboard](../trans/msg-btn.md#数据结构与协议)对象 |
| ark | object | 否 | [Ark](../type/ark.md#数据结构与协议)对象，`msg_type=3` 时使用，需要申请对应权限 |
| media | object | 否 | 富媒体对象，`msg_type=7` 时使用，`file_info` 来自单聊富媒体上传接口 |
| input_notify | object | 否 | 输入状态通知对象，仅 `msg_type=6` 时使用 |
| message_reference | MessageReference | 否 | 消息引用对象 |
| event_id | string | 否 | 被动回复的事件 ID，与 `msg_id` 二选一，支持 `INTERACTION_CREATE`、`C2C_MSG_RECEIVE`、`FRIEND_ADD` |
| msg_id | string | 否 | 被动回复的消息 ID，从 `C2C_MESSAGE_CREATE` 等事件的 `d.id` 获取 |
| msg_seq | int | 否 | 回复序号，与 `msg_id` 联合使用，默认 1；相同 `msg_id + msg_seq` 重复发送会失败 |
| is_wakeup | bool | 否 | 互动召回消息标记，与 msg_id、event_id 互斥 |
| force_verify_image_resource | bool | 否 | 是否校验图片转存结果。为 `true` 时，图片转存失败将返回错误且不发送消息，默认为 `false` |

- **input_notify 对象**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| input_type | int | 是 | 输入状态类型。当前使用 `1`，表示“正在输入”。 |
| input_second | int | 是 | 输入状态持续时间，单位为秒。例如传 `60` 表示客户端展示约 60 秒“正在输入”状态。 |

- **MessageReference 对象**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| message_id | string | 否 | 被引用消息 ID，例如 `REFIDX_xxxxxx`。非机器人消息从消息事件 `message_scene.ext` 数组的 `msg_idx` 获取；机器人自己发送的消息从发送响应 `ext_info.ref_idx` 获取 |

- **输入状态通知示例**

请求数据包

```json
{
  "msg_type": 6,
  "input_notify": {
    "input_type": 1,
    "input_second": 60
  },
  "msg_seq": 123,
  "msg_id": "msg_id"
}
```


- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| id | string | 消息唯一ID |
| timestamp | int | 发送时间 |
| ext_info | object | 扩展信息，`ref_idx` 可用于后续引用机器人自己发送的消息 |

- **常见错误码**
- 当 msg_type = 7 时，content 字段需要填入一个值，譬如一个空格 " "，后续版本会修复该问题。

| **code** | **message** | **说明** |
| --- | --- | --- |
| 22009 | msg limit exceed | 消息发送超频 |
| 304082 | upload media info fail | 富媒体资源拉取失败，请重试 |
| 304083 | convert media info fail | 富媒体资源拉取失败，请重试 |
## 群聊
:::: tip 说明
发动消息到群。
::::
- **请求**
<table>
    <tr>
      <th colspan="2">基本</th>
    </tr>
    <tr>
    <td>HTTP URL</td>
    <td>/v2/groups/{group_openid}/messages</td>
    </tr>
    <tr>
    <td>HTTP Method</td>
    <td>POST</td>
    </tr>
    <tr>
    <td>接口频率限制</td>
    <td>100 QPS</td>
    </tr>
</table>
- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群聊的 openid |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| msg_type | int | 否 | 消息类型：0 文本，2 Markdown，7 富媒体；群消息不支持流式参数 |
| content | string | 否 | 文本内容，`msg_type=0` 时使用；填写 `markdown` 时必须为空 |
| markdown | object | 否 | [Markdown](../type/markdown.md#数据结构与协议)对象，`msg_type=2` 时使用；与 `content`、`ark` 互斥 |
| keyboard | object | 否 | [Keyboard](../trans/msg-btn.md#数据结构与协议)对象 |
| media | object | 否 | 富媒体对象，`msg_type=7` 时使用，`file_info` 来自群聊富媒体上传接口 |
| message_reference | MessageReference | 否 | 消息引用对象，结构与单聊相同 |
| event_id | string | 否 | 被动回复的事件 ID，与 `msg_id` 二选一，支持 `INTERACTION_CREATE`、`GROUP_ADD_ROBOT`、`GROUP_MSG_RECEIVE` |
| msg_id | string | 否 | 被动回复的消息 ID，从 `GROUP_AT_MESSAGE_CREATE` 等事件的 `d.id` 获取 |
| msg_seq | int | 否 | 回复序号，与 `msg_id` 联合使用，默认 1；相同 `msg_id + msg_seq` 重复发送会失败 |
| force_verify_image_resource | bool | 否 | 是否校验图片转存结果。为 `true` 时，图片转存失败将返回错误且不发送消息，默认为 `false` |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| id | string | 消息唯一 ID |
| timestamp | int | 发送时间 |
| ext_info | object | 扩展信息，`ref_idx` 可用于后续引用机器人自己发送的消息 |

- **常见错误码**
- 当 msg_type = 7 时，content 字段需要填入一个值，譬如一个空格 " "，后续版本会修复该问题。

| **code** | **message** | **说明** |
| --- | --- | --- |
| 22009 | msg limit exceed | 消息发送超频 |
| 304082 | upload media info fail | 富媒体资源拉取失败，请重试 |
| 304083 | convert media info fail | 富媒体资源拉取失败，请重试 |
## 文字子频道
:::: tip 说明
发动消息到文字子频道。
::::
- **请求**
<table>
    <tr>
      <th colspan="2">基本</th>
    </tr>
    <tr>
    <td>HTTP URL</td>
    <td>/channels/{channel_id}/messages</td>
    </tr>
    <tr>
    <td>HTTP Method</td>
    <td>POST</td>
    </tr>
</table>
- **详细文档**
[发送消息\|QQ机器人文档](../post_messages.md)
## 频道私信
发动消息到频道私信，请求参数与文字子频道发送消息参数一致
- **请求**
<table>
    <tr>
      <th colspan="2">基本</th>
    </tr>
    <tr>
    <td>HTTP URL</td>
    <td>/dms/{guild_id}/messages</td>
    </tr>
    <tr>
    <td>HTTP Method</td>
    <td>POST</td>
    </tr>
</table>
- **详细文档**
[发送私信\|QQ机器人文档](../dms/post_dms_messages.md)
