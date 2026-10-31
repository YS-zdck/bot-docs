# 图文卡片消息

图文卡片消息通过 `msg_type=8` 发送，在单聊和群聊中展示“标题 + 描述 + 图片 + 跳转链接”的卡片样式，无需申请 Ark 模板。

|  | **单聊** | **群聊** | **文字子频道** | **频道私信** |
| --- | --- | --- | --- | --- |
| 机器人接收 | - | - | - | - |
| 机器人发送 | 支持 | 支持 | - | - |

## 发送方式

在消息发送接口中设置 `msg_type=8`，并填写 `card` 字段。`card` 在 `msg_type=8` 时为必填，其他消息类型下无需填写。

```json
{
  "msg_type": 8,
  "card": {
    "type": "tuwen",
    "content": {
      "title": "iPhone 17 Pro 正式发布",
      "description": "全新 A20 芯片 / 钛金属机身 / 支持卫星通信",
      "url": "https://news.qq.com/rain/a/20261014A05XYZ00",
      "pic_url": "https://inews.gtimg.com/newsapp_bt/0/xxx/1000.jpg"
    }
  },
  "msg_id": "ROBOT1.0_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "msg_seq": 1
}
```

发送接口参数详见[消息发送](../send-receive/send.md)。群聊与单聊的请求结构一致，仅接口地址不同：

| **场景** | **接口** |
| --- | --- |
| 单聊 | `POST /v2/users/{user_openid}/messages` |
| 群聊 | `POST /v2/groups/{group_openid}/messages` |

## MessageCard 对象

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| type | string | 否 | 卡片类型，当前支持 `tuwen`：图文卡片 |
| content | object | 否 | 卡片元素内容，`type=tuwen` 时必填 |

### content 对象（type=tuwen）

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| title | string | 是 | 卡片标题，长度 1~50 字符 |
| description | string | 是 | 卡片描述，长度 1~200 字符 |
| url | string | 是 | 点击卡片后的跳转链接，必须为 `https`，长度不超过 1024 字符 |
| pic_url | string | 是 | 卡片封面图链接，必须为 `https`，长度不超过 1024 字符 |

## 注意事项

- `title`、`description`、`url`、`pic_url` 均为必填，缺少任一字段会发送失败。
- `url` 与 `pic_url` 必须是 `https` 链接，且长度不超过 1024 字符。
- 图文卡片属于被动回复消息，需要携带 `msg_id` 或 `event_id`；如同时携带 `msg_id`，注意 `msg_id + msg_seq` 的组合不能重复，否则会发送失败。
- 图文卡片与 `content`、`markdown`、`ark`、`media` 等消息内容字段互斥，同一请求只需填写 `card`。
- `pic_url` 需为公网可访问的 `https` 图片链接。
