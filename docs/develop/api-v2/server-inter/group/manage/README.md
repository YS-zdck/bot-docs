# 群管理

群管理接口用于查询群聊和成员信息、处理成员关系、维护群黑名单，以及配置入群审批和禁言策略。

## 群与机器人

- [获取群基本信息](./get-group-info.md)
- [获取机器人群内状态](./get-bot-state.md)

## 群成员

- [获取群成员列表](./get-members.md)
- [获取群成员详情](./get-member.md)
- [群成员批量移除](./remove-members.md)
- [群黑名单管理](./member-blacklist.md)

::: warning 权限说明
群成员列表、成员详情、批量移除和群黑名单能力正在内邀接入中，仅白名单机器人可用。
:::

## 管理能力

- [入群申请管理](./join-request.md)
- [群禁言管理](./mute.md)
- [入群自动审批策略](./join-approval-strategy.md)
- [群管理事件](./event.md)
