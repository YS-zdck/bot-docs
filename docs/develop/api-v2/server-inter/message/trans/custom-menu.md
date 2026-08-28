# 全局自定义菜单

全局自定义菜单是单聊会话输入框下方的快捷菜单。菜单设置后对当前机器人的所有单聊用户生效，不支持按用户分别配置，也不适用于群聊、文字子频道或频道私信。

> 菜单配置接口的频率限制按机器人维度计算。修改采用整体覆盖语义，应先查询当前配置，再提交需要保留的全部菜单项。

## 接口列表

| **功能** | **方法与路径** | **频率限制** |
| --- | --- | --- |
| 查询菜单 | `GET /v2/menu` | 30 QPM |
| 修改菜单 | `PUT /v2/menu` | 5 QPM |

## 查询菜单

### 基本信息

- **HTTP URL**：`/v2/menu`
- **HTTP Method**：`GET`
- **请求频率限制**：30 QPM

该接口没有路径参数、查询参数和分页参数。

### 响应结构

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| version | int | 当前菜单版本号 |
| menu | Menu | 当前生效的菜单配置；未设置菜单时为空 |

已配置菜单时：

```json
{
  "version": 3,
  "menu": {
    "items": [
      {
        "type": "send_message",
        "name": "帮助",
        "send_message": "/help",
        "align": "left"
      },
      {
        "type": "link",
        "name": "官网",
        "link": "https://example.com",
        "align": "right"
      }
    ]
  }
}
```

未设置菜单时，`menu` 为空，`version` 仍用于表示当前配置版本：

```json
{
  "version": 0,
  "menu": null
}
```

## 修改菜单

### 基本信息

- **HTTP URL**：`/v2/menu`
- **HTTP Method**：`PUT`
- **请求频率限制**：5 QPM

### 请求参数

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| menu | Menu | 否 | 新的完整菜单配置；传入后整体覆盖原配置 |

修改是**整体覆盖**语义，不是增量追加：请求中的 `menu.items` 会替换所有旧菜单项，未出现在请求中的旧菜单项会被删除。菜单项顺序即客户端展示顺序。

### 完整请求示例

```http
PUT /v2/menu HTTP/1.1
Host: api.sgroup.qq.com
Authorization: QQBot ACCESS_TOKEN
Content-Type: application/json

{
  "menu": {
    "items": [
      {
        "type": "send_message",
        "name": "帮助",
        "send_message": "/help",
        "align": "left"
      },
      {
        "type": "link",
        "name": "官网",
        "link": "https://example.com",
        "align": "left"
      },
      {
        "type": "menu",
        "name": "更多",
        "align": "right",
        "sub_menu_items": [
          {
            "type": "send_message",
            "name": "今日签到",
            "send_message": "/sign"
          },
          {
            "type": "link",
            "name": "使用说明",
            "link": "https://example.com/help"
          }
        ]
      },
      {
        "type": "switch",
        "name": "联网搜索",
        "align": "right",
        "switch": {
          "switch_id": "net_search",
          "default": true
        }
      }
    ]
  }
}
```

修改成功响应：

```json
{
  "version": 4
}
```

`version` 是平台生成的菜单版本号。修改成功后应以响应值或再次查询的结果为准。

## 菜单项类型与字段组合

每个菜单项只能使用与 `type` 对应的动作字段，不应同时传入多个动作配置。

| **type** | **必填动作字段** | **支持位置** | **行为** |
| --- | --- | --- | --- |
| `send_message` | `send_message` | 一级、二级菜单 | 点击后将指定内容自动填入聊天输入框 |
| `link` | `link` | 一级、二级菜单 | 点击后打开 HTTPS 链接 |
| `menu` | `sub_menu_items` | 仅一级菜单 | 展开二级菜单，不能继续嵌套 |
| `switch` | `switch` | 仅一级菜单 | 展示可切换状态的开关 |

## 数据结构

### Menu

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| items | MenuItem[] | 一级菜单项，最多 10 个，按数组顺序展示 |

### MenuItem

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| name | string | 按钮名称，最多 10 个字符；一个中文汉字按两个字符计算 |
| type | string | `switch`、`send_message`、`link` 或 `menu` |
| sub_menu_items | SubMenuItem[] | 二级菜单，仅 `type=menu` 时必填，最多 5 个且不能继续嵌套 |
| send_message | string | 自动填入聊天输入框的内容，仅 `type=send_message` 时必填 |
| link | string | 跳转地址，仅 `type=link` 时必填，必须以 `https://` 开头 |
| switch | Switch | 开关配置，仅 `type=switch` 时必填 |
| align | string | 一级菜单对齐方式：`left` 左对齐或 `right` 右对齐，默认 `left` |

### SubMenuItem

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| name | string | 按钮名称，最多 14 个字符，约 7 个中文汉字 |
| type | string | `send_message` 或 `link` |
| send_message | string | 自动填入聊天输入框的内容，仅 `type=send_message` 时必填 |
| link | string | 跳转地址，仅 `type=link` 时必填，必须以 `https://` 开头 |

二级菜单只支持 `send_message` 和 `link`，不支持 `menu`、`switch`、继续嵌套或单独设置 `align`。

### Switch

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| switch_id | string | 开关标识；打开后用户消息的 `ext` 字段携带 `{switch_id}=1`，关闭后不携带 |
| default | bool | 初始状态，`true` 表示默认打开，`false` 表示默认关闭 |

`switch_id` 应在当前菜单中保持唯一且稳定，机器人服务端根据用户消息 `ext` 中是否存在对应键值判断开关状态。修改 `switch_id` 等同于定义新的开关标识。

## 字段限制

- 一级菜单最多 10 个，每个 `menu` 类型的一级菜单最多包含 5 个二级菜单项。
- 一级菜单名称最多 10 个字符，其中一个中文汉字按两个字符计算。
- 二级菜单名称最多 14 个字符，约 7 个中文汉字。
- `link` 必须为 HTTPS URL，不能使用 HTTP 或缺少协议的地址。
- `type=menu` 时必须提供非嵌套的 `sub_menu_items`。
- `type=send_message`、`type=link`、`type=switch` 必须分别提供对应动作字段。
- 菜单名称、自动填充内容和链接会经过平台安全校验。

## 菜单项行为

`send_message` 只负责把文本填入输入框，用户后续发送的消息按普通单聊消息处理；`link` 只执行页面跳转；`switch` 状态通过用户消息的 `ext` 字段传递。
