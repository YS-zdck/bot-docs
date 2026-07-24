# 富媒体消息概述

富媒体消息支持图片、视频、语音和文件。发送前需上传文件获取 `file_info`，再通过发送消息接口设置 `msg_type=7` 并携带 `media.file_info`。

## 文件类型与限制

| **file_type** | **类型** | **格式** | **软限制** | **硬限制** |
| --- | --- | --- | --- | --- |
| 1 | 图片 | png、jpg | 20 MB | 200 MB |
| 2 | 视频 | mp4 | 30 MB | 200 MB |
| 3 | 语音 | silk | 20 MB | 200 MB |
| 4 | 文件 | 不限 | 200 MB | 200 MB |

超过软限制时会降级为文件类型上传，超过硬限制时接口返回错误。

## 上传方式

### 分片上传

分片上传适用于大文件或本地文件，推荐优先使用：

1. 调用 `upload_prepare`，获取 `upload_id`、`block_size`、预签名地址和上传配置。
2. 按 `block_size` 分片，通过 HTTP PUT 上传到对应的 `presigned_url`。
3. 每个分片上传成功后调用 `upload_part_finish`。
4. 全部分片完成后，携带 `upload_id` 调用 `/files` 接口完成合并并获取 `file_info`。

完整参数详见[分片上传](./send-receive/chunked-upload.md)。

### URL 上传

文件已在公网可访问时，可以直接传入文件 URL：

```json
{
  "file_type": 1,
  "url": "https://example.com/image.png"
}
```

单聊和群聊接口参数详见[富媒体上传](./send-receive/rich-media.md)。

## 使用 file_info 发送

```json
{
  "msg_type": 7,
  "media": {
    "file_info": "file_info"
  }
}
```

设置 `srv_send_msg=true` 可在上传时直接发送消息，但会占用主动消息频次。

## 场景隔离

| **场景** | **上传接口** |
| --- | --- |
| 单聊 | `/v2/users/{user_openid}/files` |
| 群聊 | `/v2/groups/{group_openid}/files` |

单聊与群聊的上传结果不能跨场景使用，预上传和分片完成接口也必须使用相同场景的端点。

## 注意事项

- `file_info` 存在有效期，超过返回的 `ttl` 后需重新上传。
- `md5_10m` 是文件前 10002432 字节的 MD5，可用于秒传判断。
- 分片大小默认 5 MB，并发数和重试策略由 `upload_config` 下发。
- 上传接口超时建议设置为至少 5 秒。
