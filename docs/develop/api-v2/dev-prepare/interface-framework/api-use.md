
# 接口调用与鉴权

<!-- > QQ BOT 服务端开放的 openapi 接口，均使用 https 方式进行调用，通过  `access token` 机制实现对 openapi 接口调用的鉴权。 -->

::: tip 说明
`QQ 机器人` 服务端开放的 `openapi` 接口，均使用 `https` 方式进行调用，通过  `AccessToken` 机制实现对 `openapi` 接口调用的鉴权。
:::

## 获取调用凭证

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>https://api.bot.qq.com/app/getAppAccessToken</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
	<!-- <tr>
    <td>接口频率限制</td>
    <td></td>
	</tr> -->
</table>

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| appId | string | 是 | 在开放平台管理端上获得。 |
| clientSecret | string | 是 | 在开放平台管理端上获得。 |

- **返回参数**

成功响应：

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| `access_token` | string | 获取到的凭证。 |
| `expires_in` | number | 凭证有效时间，单位：秒，目前为 7200 秒以内。 |

失败响应：

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| `code` | number | 业务错误码。即使失败，HTTP 状态码仍可能为 `200`。 |
| `message` | string | 错误信息，仅用于人工排查，内容可能调整。 |

- **错误码**

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| `100001` | 请求过于频繁 | 降低调用频率后重试。 |
| `100007` | AppID 无效 | 检查 AppID 及机器人状态。 |
| `100016` | AppID 或 ClientSecret 不正确 | 检查传入凭证是否与管理端一致。 |
| `10004` | 机器人不存在 | 确认 AppID 对应的机器人存在。 |

- **调用示例**

```shell
curl --location 'https://api.bot.qq.com/app/getAppAccessToken' \
--header 'Content-Type: application/json' \
--data '{
  "appId": "APPID",
  "clientSecret": "CLIENTSECRET"
}'
```

- **返回示例**
```json
{
  "access_token": "ACCESS_TOKEN",
  "expires_in": "7200"
}
```

- **其他说明**

`access_token` 生命周期默认 7200 秒。有效期内重复获取通常返回相同的值；接近过期前 60 秒再次获取时会返回新凭证，旧凭证在这 60 秒内仍然有效。

建议在服务端定时刷新凭证，避免调用链路因凭证过期中断。获取凭证失败时，应优先依据响应体中的 `code` 判断结果，不要只依赖 HTTP 状态码或 `message`。

## 鉴权方式

在每次调用 https 的 openapi 开放接口请求的时候，需要在 header 内引入 `access_token` 进行调用权限验证。

**统一地址**

```
https://api.bot.qq.com
```


**请求头**

| 名称 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| Authorization | string | 是 | 格式值："QQBot ACCESS_TOKEN" |

**示例**
```shell
curl --location 'https://api.bot.qq.com/users/@me' \
--header 'Authorization: QQBot ACCESS_TOKEN'
```

::: warning 安全提示
请勿在应用前端暴露访问凭证，应由应用服务端发起 OpenAPI 请求。
:::

<!-- ## 调用权限错误码
与  `access token` 权限有关的错误码。 -->
