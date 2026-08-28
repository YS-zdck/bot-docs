# 指令面板管理

指令面板是用户在单聊、群聊、文字子频道或频道私信中输入 `/` 或 `@机器人` 后看到的快捷入口。开发者可以通过接口管理面板内容和生效范围。一个机器人最多创建 **20 个**指令面板；面板仅对已开通并具备相应使用场景权限的机器人生效。

> `c2c` 表示单聊，`group` 表示群聊，`channel` 表示频道文字子频道，`dm` 表示频道私信。
>
> 面板配置接口的频率限制按机器人维度计算。接口返回的错误信息可能包含更具体的限制原因；发生频控时应退避重试，不要循环立即重试。

## 接口列表

| **功能** | **方法与路径** | **频率限制** |
| --- | --- | --- |
| 查询面板列表 | `GET /v2/panels` | 30 QPM |
| 创建面板 | `POST /v2/panels` | 10 QPM |
| 查询面板详情 | `GET /v2/panels/{panel_id}` | 30 QPM |
| 修改面板 | `PUT /v2/panels/{panel_id}` | 10 QPM |
| 删除面板 | `DELETE /v2/panels/{panel_id}` | 10 QPM |
| 修改关联对象 | `PUT /v2/panels/{panel_id}/target` | 60 QPM |

同一个面板的创建、修改、删除及关联对象操作应串行执行。平台正在处理上一次操作时再次操作，可能返回 `40030009`。

## 查询面板列表

### 基本信息

- **HTTP URL**：`/v2/panels`
- **HTTP Method**：`GET`
- **请求频率限制**：30 QPM

### 查询参数

必须传入 `scope`。列表按面板设置时间倒序返回。

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| scope | string | 是 | 查询场景：`c2c`、`group`、`channel` 或 `dm` |
| cursor | string | 否 | 分页游标。首次请求不传或传空字符串；后续使用上一次响应的 `next_cursor` |
| limit | int | 否 | 每页数量，默认 `20`，最大 `50` |

### 响应结构

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| records | PanelRecord[] | 当前页面板列表 |
| next_cursor | string | 下一页游标；没有下一页时为空字符串 |
| is_end | bool | 是否已到最后一页 |

```json
{
  "records": [
    {
      "panel_id": "panel_123456",
      "scope": "group",
      "target_type": "specific",
      "panel": {
        "items": [
          {
            "type": "command",
            "name": "群签到",
            "desc": "每日签到",
            "only_admin": false
          }
        ],
        "remark": "群工具",
        "version": 3
      },
      "group_openids": ["GROUP_OPENID"],
      "created_at": "2026-08-28T10:00:00+08:00",
      "updated_at": "2026-08-28T10:05:00+08:00",
      "version": 3
    }
  ],
  "next_cursor": "eyJwYWdlIjoyfQ==",
  "is_end": false
}
```

当 `is_end` 为 `false` 时，应继续请求；当 `is_end` 为 `true` 时无需再使用 `next_cursor`。空列表不是错误，表示该场景尚未配置面板。

## 创建面板

### 基本信息

- **HTTP URL**：`/v2/panels`
- **HTTP Method**：`POST`
- **请求频率限制**：10 QPM

### 请求参数

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| scope | string | 是 | 生效场景：`c2c`、`group`、`channel` 或 `dm` |
| target_type | string | 否 | 生效范围：`all` 全局生效，`specific` 指定对象。默认按场景使用全局范围；只有 `c2c` 和 `group` 支持 `specific` |
| user_openids | string[] | 否 | 指定用户 OpenID。仅 `scope=c2c` 且 `target_type=specific` 时传入，单次最多 20 个 |
| group_openids | string[] | 否 | 指定群 OpenID。仅 `scope=group` 且 `target_type=specific` 时传入，单次最多 20 个 |
| panel | Panel | 是 | 面板内容 |

约束如下：

- `channel` 和 `dm` 只能使用全局范围，不支持 `target_type=specific`。
- `target_type=all` 时不要传 `user_openids` 或 `group_openids`。
- `scope=c2c` 只能传 `user_openids`，`scope=group` 只能传 `group_openids`。
- 创建成功后面板 ID 由平台生成，同一机器人最多保留 20 个面板。

### 请求示例

```http
POST /v2/panels HTTP/1.1
Host: api.sgroup.qq.com
Authorization: QQBot ACCESS_TOKEN
Content-Type: application/json

{
  "scope": "group",
  "target_type": "specific",
  "group_openids": [
    "GROUP_OPENID"
  ],
  "panel": {
    "items": [
      {
        "type": "command",
        "name": "群签到",
        "desc": "每日签到",
        "only_admin": false
      },
      {
        "type": "link",
        "name": "使用说明",
        "desc": "查看机器人帮助",
        "link": "https://example.com/help",
        "only_admin": false
      }
    ],
    "remark": "群工具"
  }
}
```

创建成功响应：

```json
{
  "panel_id": "panel_123456"
}
```

## 查询面板详情

### 基本信息

- **HTTP URL**：`/v2/panels/{panel_id}`
- **HTTP Method**：`GET`
- **请求频率限制**：30 QPM

| **路径参数** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| panel_id | string | 是 | 面板 ID |

成功响应为完整的 `PanelRecord`。`target_type=specific` 时，响应包含对应的 `user_openids` 或 `group_openids`；关联对象数量较大时，详情接口最多返回 1000 条对象标识。

```json
{
  "panel_id": "panel_123456",
  "scope": "group",
  "target_type": "specific",
  "panel": {
    "items": [
      {
        "type": "command",
        "name": "群签到",
        "desc": "每日签到",
        "only_admin": false
      }
    ],
    "remark": "群工具",
    "version": 1
  },
  "group_openids": ["GROUP_OPENID"],
  "created_at": "2026-08-28T10:00:00+08:00",
  "updated_at": "2026-08-28T10:00:00+08:00",
  "version": 1
}
```

## 修改面板

### 基本信息

- **HTTP URL**：`/v2/panels/{panel_id}`
- **HTTP Method**：`PUT`
- **请求频率限制**：10 QPM

### 请求参数

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| panel | Panel | 是 | 新的完整面板内容 |

修改是**整体覆盖**语义：传入的 `items` 会替换原有元素列表，`remark` 会替换原有备注；未传出的旧元素和备注不会保留。修改不会改变面板的 `scope`、`target_type` 或已关联的用户、群。需要改变生效范围时，应删除原面板后重新创建。

```json
{
  "panel": {
    "items": [
      {
        "type": "command",
        "name": "签到",
        "desc": "完成今日签到"
      }
    ],
    "remark": "更新后的群工具"
  }
}
```

成功响应：

```json
{
  "version": 2
}
```

## 删除面板

### 基本信息

- **HTTP URL**：`/v2/panels/{panel_id}`
- **HTTP Method**：`DELETE`
- **请求频率限制**：10 QPM

删除面板会同时删除面板内容及其生效关系。重复删除或使用不存在的 ID 会返回面板不存在错误。

```http
DELETE /v2/panels/panel_123456 HTTP/1.1
Host: api.sgroup.qq.com
Authorization: QQBot ACCESS_TOKEN
```

删除成功响应：

```json
{}
```

## 修改关联对象

关联对象接口用于增删指定单聊用户或群聊对象，保留原有面板内容。仅 `target_type=specific` 的 `c2c` 和 `group` 面板支持此接口。

### 基本信息

- **HTTP URL**：`/v2/panels/{panel_id}/target`
- **HTTP Method**：`PUT`
- **请求频率限制**：60 QPM

### 请求参数

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| op | string | 是 | 操作类型：`add` 添加，`del` 删除 |
| user_openids | string[] | 否 | 用户 OpenID。仅 `c2c` 面板可用，单次最多 20 个 |
| group_openids | string[] | 否 | 群 OpenID。仅 `group` 面板可用，单次最多 20 个 |

一次请求只能提交当前面板类型对应的对象字段。`add` 对已有对象不产生重复关联，`del` 对不存在的对象不产生新增关系；具体结果以接口响应和后续详情查询为准。

```json
{
  "op": "add",
  "group_openids": [
    "GROUP_OPENID_1",
    "GROUP_OPENID_2"
  ]
}
```

删除关联对象时：

```json
{
  "op": "del",
  "group_openids": [
    "GROUP_OPENID_1"
  ]
}
```

成功响应为空。关联对象的实际总量受平台限制，详情接口最多返回 1000 条对象标识。

## 数据结构

### PanelRecord

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| panel_id | string | 面板 ID |
| scope | string | `c2c`、`group`、`channel` 或 `dm` |
| target_type | string | `all` 或 `specific` |
| panel | Panel | 面板配置 |
| user_openids | string[] | 关联用户；仅 `c2c` 指定对象面板返回，最多 1000 条 |
| group_openids | string[] | 关联群；仅 `group` 指定对象面板返回，最多 1000 条 |
| created_at | string | 创建时间，RFC3339 格式 |
| updated_at | string | 更新时间，RFC3339 格式 |
| version | int | 面板版本号，修改面板后递增 |

### Panel

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| items | PanelItem[] | 面板元素，最多 20 个；顺序即客户端展示顺序 |
| remark | string | 开发者备注，最多 255 个字符，不向用户展示 |
| version | int | 当前面板版本；创建请求中可不传，响应中由平台返回 |

### PanelItem

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| type | string | `command` 指令入口或 `link` 链接入口 |
| name | string | 元素名称，最多 14 个字符，约 7 个中文汉字 |
| desc | string | 元素描述，最多 30 个字符，约 15 个中文汉字 |
| only_admin | bool | 是否仅允许频道或群管理员操作；默认 `false` |
| link | string | 跳转地址，仅 `type=link` 有效，必须以 `https://` 开头 |

`type=command` 时不传 `link`；`type=link` 时必须传合法的 HTTPS URL。面板元素名称、描述和备注均应使用平台允许的字符和长度，内容还会经过安全审核。

## 场景与范围限制

| **scope** | **支持的 target_type** | **指定对象字段** | **说明** |
| --- | --- | --- | --- |
| `c2c` | `all`、`specific` | `user_openids` | 单聊面板；指定对象模式按用户生效 |
| `group` | `all`、`specific` | `group_openids` | 群聊面板；指定对象模式按群生效 |
| `channel` | `all` | 无 | 文字子频道面板只能全局生效 |
| `dm` | `all` | 无 | 频道私信面板只能全局生效 |

## 错误码

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 40030001 | 参数错误 | 检查请求方法、路径和请求体格式 |
| 40030006 | 指令面板不存在 | 确认 `panel_id` 是否正确，且面板未被删除 |
| 40030008 | URL 格式错误 | 确认链接以 `https://` 开头 |
| 40030009 | 指令面板操作进行中 | 避免同一面板并发操作，稍后重试 |
| 40030011 | 生效场景不合法 | `scope` 仅支持 `c2c`、`group`、`channel`、`dm` |
| 40030012 | 生效范围不合法 | `target_type` 仅支持 `all`、`specific`，并检查场景限制 |
| 40030013 | 超出数量限制 | 检查面板总数、元素数量、关联对象数量或单次提交数量 |
| 40030015 | 面板元素类型不合法 | `type` 仅支持 `command`、`link` |
| 40030016 | 必填字段缺失 | 检查 `scope`、`panel`、`items` 及类型对应字段 |
| 40030017 | 操作类型不合法 | `op` 仅支持 `add`、`del` |
| 40030018 | 当前场景不支持此操作 | 检查 `scope`、`target_type` 与关联对象字段是否匹配 |
| 40030020 | 内容存在安全风险 | 检查名称、描述、备注及 URL 内容 |
| 40030021 | 全局面板不支持指定关联对象 | 使用 `target_type=specific` 的 `c2c` 或 `group` 面板 |
