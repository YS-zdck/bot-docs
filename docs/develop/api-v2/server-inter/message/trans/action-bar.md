# 消息交互操作栏

::: tip 说明
消息交互操作栏用于在机器人消息上展示赞踩、语音播放、重新生成和停止生成等操作，目前已知赞踩和重新生成按钮是有效的。发送消息时，通过 `action_button` 字段配置需要展示的按钮。
:::

操作栏当前用于 QQ 单聊场景。普通消息按钮通过 `keyboard` 配置，操作栏通过 `action_button` 配置，两者可以同时使用。普通消息按钮的用法详见[消息按钮](./msg-btn.md)。

单聊还支持通过 `prompt_keyboard` 配置气泡按钮，用于展示可点击的提示词或指令入口，详见下文[气泡按钮](#气泡按钮)。

## 发送方式

调用[发送消息](../send-receive/send.md#单聊)接口，在请求体顶层携带 `action_button`，与 `content`、`markdown`、`media` 等消息内容字段同级。

| **场景** | **接口** |
| --- | --- |
| 单聊 | `POST /v2/users/{user_openid}/messages` |

以下示例发送一条文本消息，并展示赞踩、语音播放和重新生成按钮：

```json
{
  "msg_type": 0,
  "content": "查询完成，这是本次查询的结果。",
  "action_button": {
    "feedback": true,
    "tts": true,
    "re_generate": true,
    "callback_data": "query_result_123"
  },
  "msg_id": "ROBOT1.0_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!",
  "msg_seq": 1
}
```

## 数据结构与协议

消息发送接口的 `action_button` 字段是一个 Json Object，各字段均为可选，仅需填写本次使用的字段。

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| feedback | bool | 否 | 是否展示赞踩按钮 |
| tts | bool | 否 | 是否展示语音播放按钮 |
| re_generate | bool | 否 | 是否展示重新生成按钮 |
| stop_generate | bool | 否 | 是否展示停止生成按钮 |
| callback_data | string | 否 | 操作回调数据，最多 128 个字符；操作反馈中通过 `data.resolved.button_data` 返回 |

按钮开关设置为 `true` 时启用，设置为 `false` 时不启用。不需要操作栏时，可不传 `action_button`。群聊场景下虽然不生效，但传参不会报错。

`callback_data` 可用于关联查询记录、生成任务等业务数据。它与普通消息按钮的 `action.data` 是两个独立字段，收到反馈后应结合操作用户和目标消息识别对应业务。

## 示例

### Markdown 消息附带操作栏

```json
{
  "msg_type": 2,
  "markdown": {
    "content": "**查询完成**\n这是本次查询的结果。"
  },
  "action_button": {
    "feedback": true,
    "re_generate": true,
    "callback_data": "query_result_123"
  },
  "msg_id": "ROBOT1.0_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!",
  "msg_seq": 1
}
```

如需同时展示自定义消息按钮，在请求体中另行填写 `keyboard`，与 `action_button` 不冲突。

## 气泡按钮

气泡按钮也称输入提示键盘，当前用于 QQ 单聊场景。调用单聊发送消息接口时，在请求体顶层填写 `prompt_keyboard`，按钮内容放在 `prompt_keyboard.keyboard` 中。

`prompt_keyboard.keyboard` 使用键盘结构，`content.rows` 仅填写一行，最多 **3 个**按钮全部放在这一行的 `buttons` 数组中。客户端会将这些气泡按钮纵向展示。

气泡按钮点击后只会直接发送按钮的展示文字，对应请求体中的 `render_data.label`。电击气泡按钮后，会收到 `INTERACTION_CREATE` 事件

### 数据结构与协议

以下字段位于 `prompt_keyboard` 对象中：

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| keyboard | object | 是 | 气泡按钮的键盘对象 |
| keyboard.content | object | 是 | 自定义按钮内容 |
| keyboard.content.rows | array | 是 | 按钮行列表，仅填写一行，所有气泡按钮放在同一个 `buttons` 数组中 |
| keyboard.content.rows[].buttons | array | 是 | 气泡按钮列表，最多 3 个，客户端纵向展示 |
| keyboard.content.rows[].buttons[].render_data.label | string | 是 | 按钮展示文字，也是点击后直接发送的内容 |

### 发送示例

以下示例发送一条 Markdown 消息，附带“查看帮助”和“每日签到”两个气泡按钮：

```json
{
  "msg_type": 2,
  "markdown": {
    "content": "请选择你想使用的功能。"
  },
  "prompt_keyboard": {
    "keyboard": {
      "content": {
        "rows": [
          {
            "buttons": [
              {
                "id": "help",
                "render_data": {
                  "label": "查看帮助",
                  "visited_label": "查看帮助",
                  "style": 1
                },
                "action": {
                  "type": 2,
                  "permission": {
                    "type": 2
                  },
                  "data": "查看帮助",
                  "enter": true,
                  "unsupport_tips": "当前客户端版本不支持此按钮"
                }
              },
              {
                "id": "sign",
                "render_data": {
                  "label": "每日签到",
                  "visited_label": "每日签到",
                  "style": 1
                },
                "action": {
                  "type": 2,
                  "permission": {
                    "type": 2
                  },
                  "data": "每日签到",
                  "enter": true,
                  "unsupport_tips": "当前客户端版本不支持此按钮"
                }
              }
            ]
          }
        ]
      }
    }
  },
  "msg_id": "ROBOT1.0_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!",
  "msg_seq": 1
}
```

点击示例中的气泡按钮后，会分别发送“查看帮助”或“每日签到”。实际发送内容以 `render_data.label` 为准，提示词点击反馈的 `feedback_opt` 为 `PROMPTCLICK`，事件结构见下文。

## 事件

### 操作反馈

- **基本概况**

| **属性** | **说明** |
| --- | --- |
| intents | `1<<26` |
| 事件类型 | `INTERACTION_CREATE` |
| 互动类型 | `type=13`，操作反馈 |
| 触发场景 | 用户在单聊中操作机器人消息上的反馈按钮或气泡按钮 |

操作反馈与普通回调按钮使用同一个事件类型，通过事件包 `d.type` 区分：普通消息回调按钮为 `11`，操作反馈为 `13`。

- **事件字段**

以下字段位于事件包的 `d` 对象中：

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| id | string | 互动 ID |
| type | int | 互动类型，操作反馈为 `13` |
| scene | string | 事件发生场景，单聊为 `c2c` |
| chat_type | int | 会话类型，单聊为 `2` |
| user_openid | string | 操作用户的 OpenID |
| timestamp | string | 触发时间，RFC 3339 格式 |
| data.type | int | 事件数据类型 |
| data.resolved.message_id | string | 用户操作的机器人消息 ID |
| data.resolved.button_data | string | 发送消息时设置的 `action_button.callback_data` |
| data.resolved.feedback_opt | string | 操作类型，见下表 |
| data.resolved.checked | int | 选中状态：`1` 选中，`2` 取消选中；未提供时不要按选中处理 |
| data.resolved.message_scene | object | 消息场景信息，按实际下发内容读取 |
| version | int | 事件版本 |

- **操作类型**

| **feedback_opt** | **说明** |
| --- | --- |
| LIKE | 赞 |
| UNLIKE | 踩 |
| REGENERATE | 重新生成 |
| PROMPTCLICK | 气泡按钮（提示词）点击 |

- **事件示例**

以下示例表示用户对机器人消息点赞，`checked=1` 表示选中：

```json
{
  "op": 0,
  "id": "INTERACTION_CREATE:ce9a50e0-30fe-4024-8b45-90569b386ef1",
  "d": {
    "id": "ce9a50e0-30fe-4024-8b45-90569b386ef1",
    "application_id": "123456789",
    "type": 13,
    "data": {
      "type": 13,
      "resolved": {
        "message_id": "ROBOT1.0_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!",
        "feedback_opt": "LIKE",
        "checked": 1,
        "message_scene": {}
      }
    },
    "version": 1,
    "chat_type": 2,
    "scene": "c2c",
    "user_openid": "43C1D0BC028CDDBBFE57B3C35C96CE35",
    "timestamp": "2026-11-05T00:17:01+08:00",
    "union_openid": "43C1D0BC028CDDBBFE57B3C35C96CE35"
  },
  "t": "INTERACTION_CREATE"
}
```

以下示例表示用户点击气泡按钮，`feedback_opt=PROMPTCLICK`：

```json
{
  "op": 0,
  "id": "INTERACTION_CREATE:8c9e7d42-6a31-4c5b-9f08-2d4a6e1b730c",
  "d": {
    "id": "8c9e7d42-6a31-4c5b-9f08-2d4a6e1b730c",
    "application_id": "123456789",
    "type": 13,
    "data": {
      "type": 13,
      "resolved": {
        "message_id": "ROBOT1.0_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!",
        "feedback_opt": "PROMPTCLICK",
        "checked": 1,
        "message_scene": {}
      }
    },
    "version": 1,
    "chat_type": 2,
    "scene": "c2c",
    "user_openid": "7B8E2A6C9D4F0135A8C2E6B0D9F1473A",
    "timestamp": "2026-11-04T20:58:22+08:00",
    "union_openid": "7B8E2A6C9D4F0135A8C2E6B0D9F1473A"
  },
  "t": "INTERACTION_CREATE"
}
```
