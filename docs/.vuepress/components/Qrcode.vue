<template>
  <div class="qrcode">
    <div class="title top">手机QQ扫码</div>
    <img src="https://guild-1251316161.cos.ap-guangzhou.myqcloud.com/miniapp/icons/qq_guild_developer_doc.png"
         alt="开发者社区" />
    <div class="title bottom">加入官方频道开发者社区</div>
    <div class="unofficial-group">
      <span class="warn">⚠️</span> 非官方交流群<br/>
      <code>367239358</code>
      <div class="tip">进群请填写机器人 AppID</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>
<style>
.qrcode {
  position: fixed;
  top: 300px;
  right: 35px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f7f7f7;
}
.qrcode img {
  width: 170px;
  height: 170px;
}
.qrcode .title {
  font-size: 17px;
  text-align: center;
  font-weight: bold;
}
.qrcode .title.top {
  margin-bottom: 2px;
}
.qrcode .title.bottom {
  margin-top: 2px;
  font-size:14px;
}
.qrcode .unofficial-group {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed #ddd;
  font-size: 12px;
  text-align: center;
  color: #888;
  line-height: 1.6;
}
.qrcode .unofficial-group .warn {
  font-size: 14px;
}
.qrcode .unofficial-group code {
  background: #e8e8e8;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 13px;
  color: #333;
}
.qrcode .unofficial-group .tip {
  margin-top: 4px;
  font-size: 11px;
  color: #b0b0b0;
}

@media only screen and (max-width: 1440px) {
  .qrcode {
    display: none;
  }
}
</style>
