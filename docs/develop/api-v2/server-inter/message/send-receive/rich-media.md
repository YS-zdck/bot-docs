# 富媒体消息

仅用于在QQ单聊和QQ群聊内发送图片、视频、语音、文件等富媒体消息时，需要先调用以下上传接口。

如果需要上传本地大文件或使用分片上传流程，请先调用[分片上传](./chunked-upload.md)相关接口，按返回的预签名地址上传分片并通知分片完成后，最后回到本接口传入 `upload_id` 完成上传并获取 `file_info`。

## 用于单聊

- **请求**

<table>
	<tr>
	  <th colspan="2">基本</th>
	</tr>
	<tr>
    <td>HTTP URL</td>
    <td>/v2/users/{openid}/files</td>
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
| url | string | 是 | 需要发送媒体资源的url |
| file_data | - | 否 | base64 二进制数据（备选上传方式） |
| upload_id | string | 否 | 分片上传任务 ID。通过[分片上传](./chunked-upload.md)获取，并在所有分片完成后传入 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| file_uuid | string | 文件 ID |
| file_info | string | 文件信息，用于发消息接口的 media 字段使用 |
| ttl | int | 有效期（秒），到期后 file_info 失效，当等于 0 时表示可长期使用 |

- **错误码**


## 用于群聊

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
</table>

- **路径参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| group_openid | string | 是 | 群聊的 openid |

- **请求参数**

| **属性** | **类型** | **必填** | **说明** |
| --- | --- | --- | --- |
| file_type | int | 是 | 媒体类型：1 图片（png/jpg），2 视频（mp4），3 语音（silk/wav/mp3/flac），4 文件 |
| url | string | 是 | 需要发送媒体资源的url |
| file_data | - | 否 | base64 二进制数据（备选上传方式） |
| upload_id | string | 否 | 分片上传任务 ID。通过[分片上传](./chunked-upload.md)获取，并在所有分片完成后传入 |

- **返回参数**

| **属性** | **类型** | **说明** |
| --- | --- | --- |
| file_uuid | string | 文件 ID |
| file_info | string | 文件信息，用于发消息接口的 media 字段使用 |
| ttl | int | 有效期（秒），到期后 file_info 失效，当等于 0 时表示可长期使用 |
