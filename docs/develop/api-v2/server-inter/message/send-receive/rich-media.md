# 富媒体消息

仅用于在 QQ 单聊和 QQ 群聊内发送图片、视频、语音、文件等富媒体消息时，需要先调用以下上传接口。

文件类型与大小限制（单聊和群聊上传接口通用）：

| file_type | 格式 | 软限制（超过会降级为文件类型上传） | 硬限制（超过会报错） |
| --- | --- | --- | --- |
| 1 图片 | png / jpg | 20 MB | 200 MB |
| 2 视频 | mp4 | 30 MB | 200 MB |
| 3 语音 | silk/mp3/wav/flac/ogg | 20 MB | 200 MB |
| 4 文件 | — | 200 MB | 200 MB |

支持三种上传方式，按实际文件大小和资源来源选择：

- **URL 上传**：传入 `url`，由平台下载并转存。服务端下载资源可能因网络等原因失败，若遇到下载失败可先用下面两种方式
- **分片上传合并**：先通过预上传、分片上传、分片完成三个接口（见 [分片上传](./chunked-upload.md)）完成大文件分片上传，再携带 `upload_id` 调用本接口完成合并。**推荐使用**
- **直接上传二进制数据**：传入 `file_data`，直接上传文件二进制内容。有 5M 大小上限，超过请改用分片上传

推荐使用分片上传，尤其是大文件场景。流程如下：

1. 调用预上传接口获取 `upload_id`、`block_size` 和各分片的预签名 URL
2. 按 `block_size` 将文件分片，逐片 HTTP PUT 到对应的预签名 URL
3. 每片 PUT 成功后调用分片完成接口通知服务端
4. 全部分片完成后，携带 `upload_id` 调用本接口完成合并，返回 `file_info`

注意事项：

- URL 上传存在服务端下载失败的可能，若遇到下载失败，可先将资源下载到本地，再通过直接上传二进制数据的方式上传
- 二进制直传有 5M 大小上限，文件较大时请改用分片上传

## 用于单聊

上传的文件仅能发送到单聊。

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/users/{user_openid}/files</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
	<tr>
    <td>接口频率限制</td>
    <td>50 QPS</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| user_openid | string | 是 | 用户 OpenID |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| file_type | int | 否 | 媒体类型：1 图片（png/jpg），2 视频（mp4），3 语音（silk/mp3/wav/flac/ogg），4 文件 |
| url | string | 否 | 媒体资源 URL，需以 http 开头。使用分片上传合并或二进制上传时可为空 |
| srv_send_msg | bool | 否 | `true` 直接发送消息并占用主动消息频次；`false` 仅返回 `file_info` |
| file_name | string | 否 | 文件名，分片上传或二进制上传时必填 |
| upload_id | string | 否 | 分片上传任务 ID。传入后走分片上传合并流程，此时 `url` 可为空 |
| file_data | string | 否 | 直接上传二进制数据（base64），5M 以内。超过请改用 URL 上传或分片上传 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| file_uuid | string | 文件 ID |
| file_info | string | 文件信息，用于发送消息接口的 `media.file_info` 字段。内部为序列化的二进制数据，开发者无需解析，直接透传即可 |
| ttl | int | file_info 有效期（秒），到期后需重新上传。`0` 表示可长期使用 |
| id | string | 消息 ID，仅 `srv_send_msg=true` 时返回 |
| raw_url | string | 文件下载链接（COS 预签名 GET URL），有效期与 `ttl` 一致；仅分片上传合并（`upload_id` 路径）且 `file_type` 为图片/视频/语音时返回，URL 直传和文件类型（`file_type=4`）不返回此字段 |

- **请求示例**

URL 上传图片：

```http
POST /v2/users/A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4/files
```

```json
{
  "file_type": 1,
  "url": "https://example.com/image.png",
  "srv_send_msg": false
}
```

分片上传合并视频：

```http
POST /v2/users/A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4/files
```

```json
{
  "file_type": 2,
  "srv_send_msg": false,
  "file_name": "video.mp4",
  "upload_id": "upload_a1b2c3d4e5f6"
}
```

二进制上传图片：

```http
POST /v2/users/A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4/files
```

```json
{
  "file_type": 1,
  "file_name": "image.png",
  "file_data": "iVBORw0KGgoAAAANSUhEUgAA..."
}
```

- **响应示例**

```json
{
  "file_uuid": "uuid_a1b2c3d4e5f6",
  "file_info": "AE86C5D3F0E14B238C656C0F6DD1D0479C",
  "ttl": 300
}
```

- **错误码**

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 850018 | 群被禁言或者机器人被禁言 | 请检查机器人是否被禁言 |
| 850019 | 不支持的文件格式 | 请检查 `file_type` 是否正确 |
| 850026 | 下载原始文件失败 | 请检查 URL 是否可访问或重试 |
| 850031 | 上传文件超过大小限制 | 请减小文件大小 |
| 850027 | 发送数据超时 | 请稍后重试 |
| 10000 | 不支持的操作 | 请检查请求参数 |
| 40093001 | 文件上传失败，请重试 | 大文件分片上传中 BDH 通道异常，请重试 |
| 40093002 | 超过今天发送文件容量上限 | 请明天再试或减少文件大小 |

## 用于群聊

上传的文件仅能发送到群聊。

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/groups/{group_openid}/files</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
	<tr>
    <td>接口频率限制</td>
    <td>50 QPS</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群聊的 openid |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| file_type | int | 否 | 媒体类型：1 图片（png/jpg），2 视频（mp4），3 语音（silk/mp3/wav/flac/ogg），4 文件 |
| url | string | 否 | 媒体资源 URL，需以 http 开头。使用分片上传合并或二进制上传时可为空 |
| srv_send_msg | bool | 否 | `true` 直接发送消息并占用主动消息频次；`false` 仅返回 `file_info` |
| file_name | string | 否 | 文件名，分片上传或二进制上传时必填 |
| upload_id | string | 否 | 分片上传任务 ID。传入后走分片上传合并流程，此时 `url` 可为空 |
| file_data | string | 否 | 直接上传二进制数据（base64），5M 以内。超过请改用 URL 上传或分片上传 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| file_uuid | string | 文件 ID |
| file_info | string | 文件信息，用于发送消息接口的 `media.file_info` 字段。内部为序列化的二进制数据，开发者无需解析，直接透传即可 |
| ttl | int | file_info 有效期（秒），到期后需重新上传。`0` 表示可长期使用 |
| id | string | 消息 ID，仅 `srv_send_msg=true` 时返回 |
| raw_url | string | 文件下载链接（COS 预签名 GET URL），有效期与 `ttl` 一致；仅分片上传合并（`upload_id` 路径）且 `file_type` 为图片/视频/语音时返回，URL 直传和文件类型（`file_type=4`）不返回此字段 |

- **请求示例**

URL 上传图片：

```http
POST /v2/groups/B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5/files
```

```json
{
  "file_type": 1,
  "url": "https://example.com/image.png",
  "srv_send_msg": false
}
```

分片上传合并视频：

```http
POST /v2/groups/B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5/files
```

```json
{
  "file_type": 2,
  "srv_send_msg": false,
  "file_name": "video.mp4",
  "upload_id": "upload_a1b2c3d4e5f6"
}
```

二进制上传图片：

```http
POST /v2/groups/B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5/files
```

```json
{
  "file_type": 1,
  "file_name": "image.png",
  "file_data": "iVBORw0KGgoAAAANSUhEUgAA..."
}
```

- **响应示例**

```json
{
  "file_uuid": "uuid_a1b2c3d4e5f6",
  "file_info": "AE86C5D3F0E14B238C656C0F6DD1D0479C",
  "ttl": 300
}
```

- **错误码**

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 850018 | 群被禁言或者机器人被禁言 | 请检查机器人是否被禁言 |
| 850019 | 不支持的文件格式 | 请检查 `file_type` 是否正确 |
| 850026 | 下载原始文件失败 | 请检查 URL 是否可访问或重试 |
| 850031 | 上传文件超过大小限制 | 请减小文件大小 |
| 850027 | 发送数据超时 | 请稍后重试 |
| 10000 | 不支持的操作 | 请检查请求参数 |
| 40093001 | 文件上传失败，请重试 | 大文件分片上传中 BDH 通道异常，请重试 |
| 40093002 | 超过今天发送文件容量上限 | 请明天再试或减少文件大小 |
