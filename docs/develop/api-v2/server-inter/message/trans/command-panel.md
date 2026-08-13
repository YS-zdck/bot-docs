# 指令面板管理

指令面板支持单聊、群聊、文字子频道和频道私信。一个机器人最多创建 20 个指令面板。

## 接口列表

| **功能** | **方法与路径** | **频率限制** |
| --- | --- | --- |
| 查询面板列表 | `GET /v2/panels` | 30 QPM |
| 创建面板 | `POST /v2/panels` | 10 QPM |
| 查询面板详情 | `GET /v2/panels/{panel_id}` | 30 QPM |
| 修改面板 | `PUT /v2/panels/{panel_id}` | 10 QPM |
| 删除面板 | `DELETE /v2/panels/{panel_id}` | 10 QPM |
| 修改关联对象 | `PUT /v2/panels/{panel_id}/target` | 60 QPM |

## 查询面板列表

必须通过 `scope` 筛选场景，结果按设置时间倒序排列。

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| scope | string | 是 | `c2c`、`group`、`channel` 或 `dm` |
| cursor | string | 否 | 分页游标，首次请求可不传或传空字符串 |
| limit | int | 否 | 每页数量，默认 20，最大 50 |

返回 `records`、`next_cursor` 和 `is_end`。`records` 中每项为 `PanelRecord`。

## 创建面板

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| scope | string | 是 | 生效场景：`c2c`、`group`、`channel` 或 `dm` |
| target_type | string | 否 | `all` 全局生效或 `specific` 指定对象；仅 `c2c/group` 支持 `specific` |
| user_openids | string[] | 否 | 指定用户，仅用于 `c2c`，单次最多 20 个 |
| group_openids | string[] | 否 | 指定群，仅用于 `group`，单次最多 20 个 |
| panel | Panel | 是 | 面板内容 |

创建成功返回 `panel_id`。

```json
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
        "desc": "每日签到"
      }
    ],
    "remark": "群工具"
  }
}
```

## 查询面板详情

`GET /v2/panels/{panel_id}` 返回完整 `PanelRecord`。指定对象模式还会返回 `user_openids` 或 `group_openids`，最多 1000 条。

## 修改面板

`PUT /v2/panels/{panel_id}` 的请求体包含必填的 `panel`。传入内容会完整覆盖原有元素列表和备注，但不影响已经关联的用户或群，成功后返回新的 `version`。

## 删除面板

`DELETE /v2/panels/{panel_id}` 删除面板及其生效关系，成功响应体为空。

## 修改关联对象

仅 `target_type=specific` 的单聊和群聊面板支持修改关联对象。

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| op | string | 是 | `add` 添加或 `del` 删除 |
| user_openids | string[] | 否 | 用户 openid，仅用于 `c2c`，单次最多 20 个 |
| group_openids | string[] | 否 | 群 openid，仅用于 `group`，单次最多 20 个 |

## 数据结构

### PanelRecord

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| panel_id | string | 面板 ID |
| scope | string | `c2c`、`group`、`channel` 或 `dm` |
| target_type | string | `all` 或 `specific` |
| panel | Panel | 面板配置 |
| created_at | string | 创建时间，RFC3339 格式 |
| updated_at | string | 更新时间，RFC3339 格式 |
| version | int | 面板版本号 |
| user_openids | string[] | 关联用户，仅指定用户模式返回，最多 1000 条 |
| group_openids | string[] | 关联群，仅指定群模式返回，最多 1000 条 |

### Panel

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| items | PanelItem[] | 面板元素，最多 20 个 |
| remark | string | 开发者备注，最多 255 个字符，不对用户展示 |
| version | int | 当前版本号 |

### PanelItem

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| name | string | 元素名称，最多 14 个字符，约 7 个中文汉字 |
| desc | string | 元素描述，最多 30 个字符，约 15 个中文汉字 |
| type | string | `command` 指令或 `link` 链接 |
| only_admin | bool | 是否仅允许频道或群管理员操作 |
| link | string | 跳转地址，仅 `type=link` 时有效 |

## 错误码

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 40030001 | 参数错误 | 检查请求参数 |
| 40030006 | 指令面板不存在 | 确认 `panel_id` 是否正确 |
| 40030008 | URL 格式错误 | 确认 URL 以 `https://` 开头 |
| 40030009 | 指令面板操作进行中 | 避免并发操作并稍后重试 |
| 40030011 | 生效场景不合法 | `scope` 仅支持 `c2c/group/channel/dm` |
| 40030012 | 生效范围不合法 | `target_type` 仅支持 `all/specific` |
| 40030013 | 超出数量限制 | 根据返回的限制值减少数量 |
| 40030015 | 面板元素类型不合法 | 元素类型仅支持 `command/link` |
| 40030016 | 必填字段缺失 | 检查必填字段是否完整 |
| 40030017 | 操作类型不合法 | `op` 仅支持 `add/del` |
| 40030018 | 当前场景不支持此操作 | 检查场景与操作是否匹配 |
| 40030020 | 内容存在安全风险 | 检查面板内容是否包含敏感信息 |
| 40030021 | 全局面板不支持指定关联对象 | 使用 `target_type=specific` 的单聊或群聊面板 |
