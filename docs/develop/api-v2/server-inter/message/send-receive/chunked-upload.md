# 分片上传

本接口用于在 QQ 单聊和 QQ 群聊中上传本地大文件或使用分片上传流程。完整流程为：先申请上传任务，再按返回的预签名地址上传文件分片，然后通知每个分片上传完成，最后调用[富媒体消息](./rich-media.md)中的 `/files` 接口完成上传并获取 `file_info`。

## 调用流程

1. 调用 `upload_prepare` 获取 `upload_id`、分片大小和 `parts`。
2. 按 `parts` 中的 `presigned_url` 使用 PUT 上传每个文件分片。
3. 每个分片上传成功后，调用 `upload_part_finish` 通知分片上传完成。
4. 所有分片完成后，调用[富媒体消息](./rich-media.md)中的 `/v2/users/{user_openid}/files` 或 `/v2/groups/{group_openid}/files`，请求体传入 `upload_id`，获取用于发消息的 `file_info`。

## 准备上传

### 用于单聊

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/users/{user_id}/upload_prepare</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
	<tr>
    <td>接口频率限制</td>
    <td>10 QPS</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| user_id | string | 是 | 用户 OpenID |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| file_type | int | 是 | 业务类型：1 图片，2 视频，3 语音，4 文件 |
| file_name | string | 是 | 文件名 |
| file_size | string | 是 | 文件大小，单位为字节 |
| md5 | string | 是 | 完整文件的 MD5 |
| sha1 | string | 是 | 完整文件的 SHA1 |
| md5_10m | string | 是 | 文件前 10002432 字节（约 10MB）的 MD5 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| upload_id | string | 上传任务 ID，后续分片完成和完成上传时使用 |
| block_size | string | 默认分片大小，单位为字节 |
| parts | array | 分片上传信息列表 |
| upload_config | object | 上传配置，包括并发数、重试超时时间等 |

- **parts 参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| index | int | 分片序号，从 0 开始 |
| presigned_url | string | 当前分片的预签名上传地址，客户端使用 PUT 上传分片内容 |
| block_size | string | 当前分片大小，单位为字节 |

- **upload_config 参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| concurrency | int | 上传并发数，默认 1 |
| retry_timeout | int | 重试超时时间，单位为秒，默认 300 |
| retry_delay | int | 重试延迟，单位为秒，默认 1 |

### 用于群聊

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/groups/{group_id}/upload_prepare</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
	<tr>
    <td>接口频率限制</td>
    <td>10 QPS</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_id | string | 是 | 群 OpenID |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| file_type | int | 是 | 业务类型：1 图片，2 视频，3 语音，4 文件。图片软限制 20 MB、视频软限制 30 MB、语音软限制 20 MB、文件软限制 200 MB；超过软限制降级为文件类型，超过 200 MB 返回错误 |
| file_name | string | 是 | 文件名 |
| file_size | string | 是 | 文件大小，单位为字节 |
| md5 | string | 是 | 完整文件的 MD5 校验值 |
| sha1 | string | 是 | 完整文件的 SHA1 校验值 |
| md5_10m | string | 是 | 文件前 10002432 字节（约 10MB）的 MD5 校验值 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| upload_id | string | 上传任务 ID，后续分片完成和完成上传时使用 |
| block_size | string | 默认分片大小，单位为字节 |
| parts | array | 分片上传信息列表 |
| upload_config | object | 上传配置，包括并发数、重试超时时间等 |

- **parts 参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| index | int | 分片序号，从 0 开始 |
| presigned_url | string | 当前分片的预签名上传地址，客户端使用 PUT 上传分片内容 |
| block_size | string | 当前分片大小，单位为字节 |

- **upload_config 参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| concurrency | int | 上传并发数，默认 1 |
| retry_timeout | int | 重试超时时间，单位为秒，默认 300 |
| retry_delay | int | 重试延迟，单位为秒，默认 1 |

## 完成分片上传

### 用于单聊

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/users/{user_id}/upload_part_finish</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
	<tr>
    <td>接口频率限制</td>
    <td>10 QPS</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| user_id | string | 是 | 用户 OpenID |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| upload_id | string | 否 | 准备上传接口返回的上传任务 ID |
| part_index | int | 否 | 分片序号，对应 `parts.index`，从 0 开始 |
| block_size | string | 否 | 当前分片大小，单位为字节 |
| md5 | string | 否 | 当前分片内容的 MD5 |

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
    <td>/v2/groups/{group_id}/upload_part_finish</td>
	</tr>
	<tr>
    <td>HTTP Method</td>
    <td>POST</td>
	</tr>
	<tr>
    <td>接口频率限制</td>
    <td>10 QPS</td>
	</tr>
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_id | string | 是 | 群 OpenID |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| upload_id | string | 否 | 准备上传接口返回的上传任务 ID |
| part_index | int | 否 | 分片序号，对应 `parts.index`，从 0 开始 |
| block_size | string | 否 | 当前分片大小，单位为字节 |
| md5 | string | 否 | 当前分片内容的 MD5 |

- **返回参数**

无

## 错误码

| **错误码** | **说明** | **排查建议** |
| --- | --- | --- |
| 850018 | 群被禁言或者机器人被禁言 | 请检查机器人是否被禁言 |
| 850019 | 不支持的文件格式 | 请检查 `file_type` 是否正确 |
| 850026 | 下载原始文件失败 | 请检查文件是否可访问或重试 |
| 850031 | 上传文件超过大小限制 | 请减小文件大小 |
| 850027 | 发送数据超时 | 请稍后重试 |
| 10000 | 不支持的操作 | 请检查请求参数 |
| 40093001 | 文件上传失败，请重试 | 请重新申请上传或重新上传分片 |
| 40093002 | 超过当天发送文件容量上限 | 请次日重试或减少文件大小 |
