# 分片上传

本接口用于在 QQ 单聊和 QQ 群聊中上传本地大文件或使用分片上传流程。完整流程为：先申请上传任务，再按返回的预签名地址上传文件分片，然后通知每个分片上传完成，最后调用[富媒体消息](./rich-media.md)中的 `/files` 接口完成上传并获取 `file_info`。

## 调用流程

1. 调用 `upload_prepare` 获取 `upload_id`、分片大小和 `parts`。
2. 按 `parts` 中的 `presigned_url` 使用 PUT 上传每个文件分片。
3. 每个分片上传成功后，调用 `upload_part_finish` 通知分片上传完成。
4. 所有分片完成后，调用[富媒体消息](./rich-media.md)中的 `/v2/users/{openid}/files` 或 `/v2/groups/{group_openid}/files`，请求体传入 `upload_id`，获取用于发消息的 `file_info`。

## 准备上传

### 用于单聊

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/users/{openid}/upload_prepare</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| openid | string | 是 | QQ 用户的 openid，可在各类事件中获得。 |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| file_type | int | 是 | 媒体类型：1 图片（png/jpg），2 视频（mp4），3 语音（silk/wav/mp3/flac），4 文件 |
| file_name | string | 是 | 文件名，包含扩展名 |
| file_size | int | 是 | 文件大小，单位为字节 |
| md5 | string | 是 | 完整文件的 MD5，十六进制字符串 |
| sha1 | string | 是 | 完整文件的 SHA1，十六进制字符串 |
| md5_10m | string | 是 | 文件前 10002432 Bytes 的 MD5；文件不足该大小时为完整文件 MD5 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| upload_id | string | 上传任务 ID，后续分片完成和完成上传时使用 |
| block_size | int | 默认分片大小，单位为字节 |
| parts | array | 分片上传信息列表 |
| upload_config | object | 上传配置，包括并发数、重试超时时间等 |

- **parts 参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| index | int | 分片序号，从 1 开始 |
| presigned_url | string | 当前分片的预签名上传地址，客户端使用 PUT 上传分片内容 |
| block_size | int | 当前分片大小，未返回时使用返回参数中的 `block_size` |

### 用于群聊

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/groups/{group_openid}/upload_prepare</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群聊的 openid |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| file_type | int | 是 | 媒体类型：1 图片（png/jpg），2 视频（mp4），3 语音（silk/wav/mp3/flac），4 文件 |
| file_name | string | 是 | 文件名，包含扩展名 |
| file_size | int | 是 | 文件大小，单位为字节 |
| md5 | string | 是 | 完整文件的 MD5，十六进制字符串 |
| sha1 | string | 是 | 完整文件的 SHA1，十六进制字符串 |
| md5_10m | string | 是 | 文件前 10002432 Bytes 的 MD5；文件不足该大小时为完整文件 MD5 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| upload_id | string | 上传任务 ID，后续分片完成和完成上传时使用 |
| block_size | int | 默认分片大小，单位为字节 |
| parts | array | 分片上传信息列表 |
| upload_config | object | 上传配置，包括并发数、重试超时时间等 |

- **parts 参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| index | int | 分片序号，从 1 开始 |
| presigned_url | string | 当前分片的预签名上传地址，客户端使用 PUT 上传分片内容 |
| block_size | int | 当前分片大小，未返回时使用返回参数中的 `block_size` |

## 完成分片上传

### 用于单聊

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/users/{openid}/upload_part_finish</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| openid | string | 是 | QQ 用户的 openid，可在各类事件中获得。 |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| upload_id | string | 是 | 准备上传接口返回的上传任务 ID |
| part_index | int | 是 | 分片序号，从 1 开始 |
| block_size | int | 是 | 当前分片大小，单位为字节 |
| md5 | string | 是 | 当前分片内容的 MD5，十六进制字符串 |

- **返回参数**

无

### 用于群聊

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/groups/{group_openid}/upload_part_finish</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群聊的 openid |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| upload_id | string | 是 | 准备上传接口返回的上传任务 ID |
| part_index | int | 是 | 分片序号，从 1 开始 |
| block_size | int | 是 | 当前分片大小，单位为字节 |
| md5 | string | 是 | 当前分片内容的 MD5，十六进制字符串 |

- **返回参数**

无
