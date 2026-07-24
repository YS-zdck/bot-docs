# 流式消息

:::: tip 说明
流式消息用于在 QQ 单聊场景中持续更新同一条机器人回复。机器人先发送生成中的内容，再通过后续请求替换展示内容，最后发送结束状态完成本次流式消息。
::::

:::: tip 注意
流式消息与输入状态通知不是同一个能力。只有 `/v2/users/{user_openid}/stream_messages` 可以持续发送和更新消息正文；输入状态通知通过普通单聊发消息接口 `/v2/users/{user_openid}/messages` 发送 `msg_type=6` 和 `input_notify`，仅用于展示“正在输入”状态，不会发送或更新消息正文。
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
    <td>/v2/users/{user_openid}/stream_messages</td>
    </tr>
    <tr>
    <td>HTTP Method</td>
    <td>POST</td>
    </tr>
    <tr>
    <td>接口频率限制</td>
    <td>50 QPS</td>
    </tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| user_openid | string | 是 | 用户 OpenID，可在单聊消息事件中获得 |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| input_mode | string | 否 | 输入模式。`append`（默认）追加内容；`replace` 传入当前全量正文，且不能修改已下发内容前缀 |
| input_state | int | 否 | 输入状态：`1` 生成中，`10` 生成结束 |
| content_type | string | 否 | 内容类型：`text` 文本，`markdown` Markdown |
| content_raw | string | 否 | 当前需要展示的消息内容 |
| event_id | string | 否 | 被动回复的事件 ID，与 `msg_id` 二选一 |
| msg_id | string | 否 | 被动回复的消息 ID，与 `event_id` 二选一 |
| msg_seq | int | 否 | 消息序号，用于去重，同一条流式消息内保持一致 |
| index | int | 否 | 流式消息分片序号，从 `0` 开始递增 |
| stream_msg_id | string | 否 | 流式消息 ID。首次请求不填，后续请求填写首次响应中的消息 ID。 |
| is_wakeup | bool | 否 | 是否为互动召回消息；为 `true` 时不校验 `msg_id`、`event_id` 有效期 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| id | string | 消息唯一 ID。首次请求返回后，后续请求需作为 stream_msg_id 使用。 |
| timestamp | string | 消息发送时间，RFC3339 格式 |
| ext_info | object | 扩展信息，包含引用消息索引 `ref_idx` |
| remain_msg_len | int | 流式消息剩余长度，单位为字符 |

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
  "msg_id": "USER_MESSAGE_ID",
  "msg_seq": 1,
  "index": 0
}
```

响应数据包

```json
{
  "id": "STREAM_MESSAGE_ID",
  "timestamp": "2026-07-24T10:00:00+08:00",
  "ext_info": {
    "ref_idx": "REF_IDX"
  }
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
  "msg_id": "USER_MESSAGE_ID",
  "msg_seq": 1,
  "index": 2,
  "stream_msg_id": "STREAM_MESSAGE_ID"
}
```

## 注意事项

- 流式消息用于单聊场景，群聊、文字子频道、频道私信请使用普通发送消息接口。
- `event_id` 与 `msg_id` 二选一，不需要同时传入。
- 同一条流式消息内，`msg_seq` 保持一致，`index` 按请求顺序递增。
- 首次请求成功前没有 `stream_msg_id`，后续请求必须携带首次响应返回的消息 ID。
- 最后一包应发送 `input_state=10`，避免客户端一直展示生成中状态。
- 流式消息适合发送 markdown 文本；图片、语音、视频、文件等富媒体内容请使用[富媒体消息](./rich-media.md)相关接口。

## 错误码

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 40007 | 已下发内容前缀不可修改 | 使用 `replace` 时保持已下发内容前缀一致 |
| 50001 | 服务内部错误 | 请稍后重试 |
| 50002 | 频率限制 | 请降低调用频率 |
