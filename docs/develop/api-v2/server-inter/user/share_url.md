# 机器人链接

## 生成分享链接

生成带自定义参数的机器人分享链接，用于邀请用户添加机器人为好友。用户通过链接添加机器人时，`callback_data` 会透传给开发者。

## 接口

| 项目 | 内容 |
| --- | --- |
| HTTP URL | `/v2/generate_url_link` |
| HTTP Method | `POST` |
| 接口频率限制 | 50 QPS |

## 请求参数

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `callback_data` | string | 否 | 回传给机器人后台的数据，最长 32 个字符。 |

## 请求示例

```json
{
  "callback_data": "custom_data_123"
}
```

## 返回参数

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `data` | object | 返回数据。 |
| `data.url` | string | 生成的机器人分享链接。 |

## 返回示例

```json
{
  "data": {
    "url": "https://qun.qq.com/qunpro/robot/qunshare?robot_appid=1234567890&robot_uin=12345678&data=xxx"
  }
}
```

## 错误码

| 错误码 | 说明 | 排查建议 |
| --- | --- | --- |
| `10001` | 请求参数异常 | 检查请求参数。 |
| `10002` | 请求头异常 | 检查请求头。 |
| `10003` | 查询机器人信息异常 | 确认机器人是否存在。 |
| `10044` | 从协议头获取 UIN 失败 | 检查 `Authorization` 请求头。 |
| `11004` | 生成分享 ARK 失败 | 稍后重试。 |
