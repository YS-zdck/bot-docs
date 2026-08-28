# 基础消息对话

## 对话场景

<!-- > 机器人可以被添加各种聊天场景下 -->
::: tip 说明
机器人可以被添加各种聊天场景下
:::


| 单聊 | 群聊 | 文字子频道 | 频道私信 |
| --- | --- | --- | --- |
| <img :src="$withBotBase('/images/api-231017/chat-single.jpg')" alt="单聊" height="375"> | <img :src="$withBotBase('/images/api-231017/chat-group.jpg')" alt="群聊" height="375"> | <img :src="$withBotBase('/images/api-231017/chat-text-channel.jpg')" alt="文字子频道" height="375"> | <img :src="$withBotBase('/images/api-231017/chat-c2c.jpg')" alt="频道私信" height="375">|

## 消息类型


<!-- > 在对话场景里面可以使用的消息类型，以下消息类型均涉及，详情请参考服务端接口=\>消息类型章节。
> - 文本
> - 表情
> - 图片
> - 图文
> - 视频
> - 语音
> - 文件
> - Ark 消息
> - Embed 消息
> - Markdown 消息 -->

::: tip 说明
在对话场景里面可以使用的消息类型，以下消息类型均涉及，详情请参考服务端接口=\>消息类型章节。
- 文本
- 表情
- 图片
- 图文
- 视频
- 语音
- 文件
- Ark 消息
- Embed 消息
- Markdown 消息
:::

## 指令面板

<!-- > 输入 / 或者 @机器人，唤起的一个操作面板，开发者可在机器人管理端自定义设置展示内容和点击动作。 -->
::: tip 说明
输入 / 或者 @机器人可唤起操作面板。指令面板支持单聊、群聊、文字子频道和频道私信，可在机器人管理端设置，也可通过[指令面板管理接口](../../server-inter/message/trans/command-panel.md)查询、创建、修改、删除和配置关联对象。
:::

| / | @ |
| --- | --- | --- | --- |
| <img :src="$withBotBase('/images/api-231017/command-banner-1.jpg')" alt="指令面板/" height="375"> | <img :src="$withBotBase('/images/api-231017/command-banner-2.jpg')" alt="指令面板@" height="375"> | ～ | ～ |

## 自定义菜单

<!-- > 在单聊场景下有一个'快捷菜单'面板，开发者可在机器人管理端自定义设置里面的按钮内容和按钮动作。 -->
::: tip 说明
单聊场景支持快捷菜单面板。开发者可在机器人管理端设置按钮内容和动作，也可通过[全局自定义菜单接口](../../server-inter/message/trans/custom-menu.md)查询和修改；设置后对所有用户生效。
:::


| 单聊 |
| --- | --- | --- | --- |
| <img :src="$withBotBase('/images/api-231017/custum-menu.jpg')" alt="自定义菜单" height="375"> | ～ | ～ | ～ |

## 消息交互



<!-- > 在各种消息场景内，开发者可在消息体上实现自定义一些与用户的交互方式。 -->
::: tip 说明
在各种消息场景内，开发者可在消息体上实现自定义一些与用户的交互方式。
:::

| 消息按钮 | 文字链 |
| --- | --- | --- | --- |
| <img :src="$withBotBase('/images/api-231017/message-btn.jpg')" alt="消息按钮"> | <img :src="$withBotBase('/images/api-231017/text-chain.jpg')" alt="文字链"> |
