# 消息交互概述

机器人可通过消息按钮、文字链等方式与用户进行交互。

## 消息按钮互动流程

1. 机器人发送带有 `keyboard` 字段的消息。
2. 用户点击按钮后，平台推送 `INTERACTION_CREATE` 事件。
3. 机器人调用 `PUT /interactions/{interaction_id}` 响应互动。

## 携带 keyboard

发送单聊或群聊消息时，可通过 `keyboard` 使用按钮模板或自定义按钮：

```json
{
  "keyboard": {
    "id": "keyboard_id"
  }
}
```

自定义按钮可通过 `keyboard.content.rows` 设置布局、展示内容、操作权限和点击行为，完整结构详见[消息按钮](./msg-btn.md)。

## 响应互动

收到 `INTERACTION_CREATE` 后，应使用事件中的 `interaction_id` 调用互动响应接口。指令回调场景需要在 3 秒内响应，建议收到事件后立即处理，避免用户侧无反馈。

## 其他交互能力

- [表情表态](./emoji.md)：仅频道消息支持添加或删除表情表态。
- [文字链](./text-chain.md)：在支持的消息中使用可点击文字链接。
