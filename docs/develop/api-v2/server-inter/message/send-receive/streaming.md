# 流式消息

:::: tip 说明
流式消息用于在 QQ 单聊场景中持续更新同一条机器人回复。机器人先发送生成中的内容，再通过后续请求替换展示内容，最后发送结束状态完成本次流式消息。
::::

:::: tip 注意
流式消息与输入状态通知不是同一个能力。只有 `/v2/users/{openid}/stream_messages` 可以持续发送和更新消息正文；输入状态通知通过普通单聊发消息接口 `/v2/users/{openid}/messages` 发送 `msg_type=6` 和 `input_notify`，仅用于展示“正在输入”状态，不会发送或更新消息正文。
::::

## 单聊

:::: tip 说明
流式消息当前用于单聊场景。群聊、文字子频道、频道私信请使用[发送消息](./send.md)接口。
::::

- **请求**

<table>
    <tr>
      <th colspan="2">基本</th>
    </tr>
    <tr>
    <td>HTTP URL</td>
    <td>/v2/users/{openid}/stream_messages</td>
    </tr>
    <tr>
    <td>HTTP Method</td>
    <td>POST</td>
    </tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| openid | string | 是 | QQ 用户的 openid，可在单聊消息事件中获得。 |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| input_mode | string | 是 | 输入模式。当前使用 `replace`，表示每次使用 content_raw 替换整条流式消息内容。 |
| input_state | int | 是 | 输入状态。`1` 表示生成中，`10` 表示生成结束。 |
| content_type | string | 是 | 内容类型。当前使用 `markdown`。 |
| content_raw | string | 是 | 当前需要展示的 markdown 内容。 |
| event_id | string | 是 | 前置收到的事件 ID，用于发送被动消息。 |
| msg_id | string | 是 | 前置收到的用户消息 ID，用于发送被动消息。 |
| msg_seq | int | 是 | 回复消息的序号，同一条流式消息内保持一致。 |
| index | int | 是 | 流式消息分片序号，从 `0` 开始递增。 |
| stream_msg_id | string | 否 | 流式消息 ID。首次请求不填，后续请求填写首次响应中的消息 ID。 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| id | string | 消息唯一 ID。首次请求返回后，后续请求需作为 stream_msg_id 使用。 |
| timestamp | int | 发送时间。 |

## 调用方式

流式消息分为首次请求、后续请求和结束请求。

- 首次请求不传 `stream_msg_id`，用于创建一条流式消息。
- 后续请求需要传入首次响应中的 `id` 作为 `stream_msg_id`，用于持续更新同一条消息。
- 结束请求需要将 `input_state` 设置为 `10`，表示本次流式消息生成结束。
- 当 `input_mode` 为 `replace` 时，每次请求的 `content_raw` 都应传当前完整展示内容，而不是只传新增内容。

如果只需要让客户端展示“机器人正在输入”，请使用[发送消息](./send.md)中的单聊接口发送输入状态通知：

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

input_notify 字段说明：

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| input_type | int | 是 | 输入状态类型。当前使用 `1`，表示“正在输入”。 |
| input_second | int | 是 | 输入状态持续时间，单位为秒。例如传 `60` 表示客户端展示约 60 秒“正在输入”状态。 |

输入状态通知可以与流式消息配合使用，例如先发送输入状态通知提示用户机器人正在处理，再调用流式消息接口持续更新正文。但输入状态通知本身不具备流式消息发送能力，不能替代流式消息接口。

## 示例

### 首次请求

请求数据包

```json
{
  "input_mode": "replace",
  "input_state": 1,
  "content_type": "markdown",
  "content_raw": "正在分析你的问题...",
  "event_id": "EVENT_ID",
  "msg_id": "USER_MESSAGE_ID",
  "msg_seq": 1,
  "index": 0
}
```

响应数据包

```json
{
  "id": "STREAM_MESSAGE_ID",
  "timestamp": 1710000000
}
```

### 后续请求

请求数据包

```json
{
  "input_mode": "replace",
  "input_state": 1,
  "content_type": "markdown",
  "content_raw": "正在分析你的问题，已经找到相关资料...",
  "event_id": "EVENT_ID",
  "msg_id": "USER_MESSAGE_ID",
  "msg_seq": 1,
  "index": 1,
  "stream_msg_id": "STREAM_MESSAGE_ID"
}
```

### 结束请求

请求数据包

```json
{
  "input_mode": "replace",
  "input_state": 10,
  "content_type": "markdown",
  "content_raw": "正在分析你的问题，已经找到相关资料。结论如下：...",
  "event_id": "EVENT_ID",
  "msg_id": "USER_MESSAGE_ID",
  "msg_seq": 1,
  "index": 2,
  "stream_msg_id": "STREAM_MESSAGE_ID"
}
```

## 注意事项

- 流式消息用于单聊场景，群聊、文字子频道、频道私信请使用普通发送消息接口。
- 同一条流式消息内，`msg_seq` 保持一致，`index` 按请求顺序递增。
- 首次请求成功前没有 `stream_msg_id`，后续请求必须携带首次响应返回的消息 ID。
- 最后一包应发送 `input_state=10`，避免客户端一直展示生成中状态。
- 流式消息适合发送 markdown 文本；图片、语音、视频、文件等富媒体内容请使用[富媒体消息](./rich-media.md)相关接口。
