# 全局自定义菜单

自定义菜单仅支持单聊场景。设置后对所有用户生效，不支持按用户分别配置。

## 查询菜单

`GET /v2/menu`，接口频率限制为 `30 QPM`。

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| version | int | 当前菜单版本号 |
| menu | Menu | 当前生效的菜单配置，未设置菜单时为空 |

## 修改菜单

`PUT /v2/menu`，接口频率限制为 `5 QPM`。传入的 `menu` 会完整覆盖原有菜单配置。

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| menu | Menu | 否 | 新的菜单配置 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| version | int | 修改后的菜单版本号 |

## 数据结构

### Menu

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| items | MenuItem[] | 菜单项，最多 10 个，按列表顺序从左到右展示 |

### MenuItem

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| name | string | 按钮名称，最多 10 个字符，一个中文汉字按两个字符计算 |
| type | string | `switch`、`send_message`、`link` 或 `menu` |
| sub_menu_items | SubMenuItem[] | 二级菜单，仅 `type=menu` 时有效，最多 5 个且不能继续嵌套 |
| send_message | string | 自动填入聊天输入框的内容，仅 `type=send_message` 时有效 |
| link | string | 跳转地址，仅 `type=link` 时有效，必须以 `https://` 开头 |
| switch | Switch | 开关配置，仅 `type=switch` 时有效 |
| align | string | `left` 左对齐或 `right` 右对齐，默认为 `left` |

### SubMenuItem

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| name | string | 按钮名称，最多 14 个字符，约 7 个中文汉字 |
| type | string | `send_message` 或 `link` |
| send_message | string | 自动填入聊天输入框的内容，仅 `type=send_message` 时有效 |
| link | string | 跳转地址，仅 `type=link` 时有效，必须以 `https://` 开头 |

### Switch

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| switch_id | string | 开关标识；打开后用户消息的 `ext` 字段携带 `{switch_id}=1`，关闭后不携带 |
| default | bool | 初始状态，`true` 表示默认打开 |

## 修改示例

```json
{
  "menu": {
    "items": [
      {
        "type": "send_message",
        "name": "帮助",
        "send_message": "/help"
      },
      {
        "type": "link",
        "name": "官网",
        "link": "https://example.com"
      }
    ]
  }
}
```

## 错误码

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 40030008 | URL 格式错误 | 确认 URL 以 `https://` 开头 |
| 40030013 | 超出数量限制 | 按错误信息中的限制值减少菜单项 |
| 40030014 | 菜单类型不合法 | `type` 仅支持 `switch/send_message/link/menu` |
| 40030016 | 必填字段缺失 | 检查菜单类型对应的字段是否完整 |
| 40030020 | 内容存在安全风险 | 检查菜单内容是否包含敏感信息 |
