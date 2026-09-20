# 结构化卡片消息

::: tip 说明
达到准入条件的开发者，向平台运营申请后获得权限。
:::

|  | **单聊** | **群聊** | **文字子频道** | **频道私信** |
| --- | --- | --- | --- | --- |
| 机器人接收 | - | - | - | - |
| 机器人发送 | 支持 | 支持 | 支持 | 支持 |

## 发送方式

选择合适的结构化卡片消息（ARK）模板，将模板变量以 key-value 对填充后发送。每个模板定义自己的变量（例如 `#XXX#`），变量类型可以是字符串、数组或 URL。

## 数据结构

消息发送接口中 `ark` 字段的结构如下：

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| `template_id` | int | 是 | 模板 ID，可使用 `23`、`24`、`37`；其他模板需要按平台要求申请。 |
| `kv` | array | 是 | `[{"key":"#变量#","value":"填充值"}]`，用于映射模板变量与填充值。 |

当变量类型为数组时，`kv` 元素使用 `obj` 嵌套数组结构：

```json
{
  "key": "#LIST#",
  "obj": [
    {
      "obj_kv": [
        { "key": "desc", "value": "文本" },
        { "key": "link", "value": "https://..." }
      ]
    }
  ]
}
```

## 请求示例

```json
{
  "ark": {
    "template_id": 23,
    "kv": [
      { "key": "#DESC#", "value": "机器人订阅消息" },
      { "key": "#PROMPT#", "value": "XX机器人" },
      { "key": "#TITLE#", "value": "XX机器人消息" },
      { "key": "#META_URL#", "value": "http://domain.com/" },
      {
        "key": "#META_LIST#",
        "obj": [
          {
            "obj_kv": [
              { "key": "name", "value": "aaa" },
              { "key": "age", "value": "3" }
            ]
          },
          {
            "obj_kv": [
              { "key": "name", "value": "bbb" },
              { "key": "age", "value": "4" }
            ]
          }
        ]
      }
    ]
  }
}
```

## 模板 23：链接+文本列表

模板 ID 为 `23`，用于展示描述、提示信息和文本列表。列表元素可以包含文本和跳转链接，链接需要提前报备。

### 模板格式

```json
{
  "app": "com.tencent.channel.robot",
  "view": "albumAddPic",
  "ver": "0.0.0.1",
  "desc": "#DESC#",
  "prompt": "[QQ小程序]#PROMPT#",
  "meta": {
    "detail": {
      "list": "#LIST#"
    }
  }
}
```

| **变量** | **类型** | **说明** |
| --- | --- | --- |
| `#DESC#` | string | 描述。 |
| `#PROMPT#` | string | 提示消息。 |
| `#LIST#` | array | 文本列表，每个元素为 `{desc, link}`。 |

`#LIST#` 元素结构：

| **字段** | **类型** | **说明** |
| --- | --- | --- |
| `desc` | string | 文本内容。 |
| `link` | string | 跳转链接，需要提前报备；不填则仅显示文本。 |

## 模板 24：文本+缩略图

模板 ID 为 `24`，用于展示带缩略图的文本信息。

### 模板格式

```json
{
  "app": "com.tencent.channelrobot.smallpic",
  "view": "albumAddPic",
  "ver": "0.0.0.1",
  "desc": "#DESC#",
  "prompt": "[QQ小程序]#PROMPT#",
  "meta": {
    "detail": {
      "title": "#TITLE#",
      "desc": "#METADESC#",
      "img": "#IMG#",
      "link": "#LINK#",
      "subTitle": "#SUBTITLE#"
    }
  }
}
```

| **变量** | **类型** | **说明** |
| --- | --- | --- |
| `#DESC#` | string | 描述。 |
| `#PROMPT#` | string | 提示文本。 |
| `#TITLE#` | string | 标题。 |
| `#METADESC#` | string | 详情描述。 |
| `#IMG#` | string | 图片链接。 |
| `#LINK#` | string | 跳转链接。 |
| `#SUBTITLE#` | string | 来源。 |

## 模板 37：大图

模板 ID 为 `37`，用于展示大图和跳转链接。大图尺寸为 `975×540`。

### 模板格式

```json
{
  "app": "com.tencent.imagetextbot",
  "view": "index",
  "ver": "1.0.0.11",
  "prompt": "#PROMPT#",
  "meta": {
    "robot": {
      "title": "#METATITLE#",
      "subtitle": "#METASUBTITLE#",
      "cover": "#METACOVER#",
      "jump_url": "#METAURL#"
    }
  }
}
```

| **变量** | **类型** | **说明** |
| --- | --- | --- |
| `#PROMPT#` | string | 提示消息。 |
| `#METATITLE#` | string | 标题。 |
| `#METASUBTITLE#` | string | 子标题。 |
| `#METACOVER#` | string | 大图，尺寸 `975×540`。 |
| `#METAURL#` | string | 跳转链接。 |
