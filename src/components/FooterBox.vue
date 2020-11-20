<template>
  <div id="footer" class="footer">
    <div class="footer-content">
      <span>Powered By MQR © 2020</span>
      <a class="link" href="http://mqr.molicloud.com" target="_blank">文档支持</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBox"
}
</script>

<style>
.footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 60px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #f5f7fa;
}

.footer-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 960px;
  padding: 20px 0;
  font-size: 13px;
  color: #5e6d82;
  opacity: 0.5;
  filter: Alpha(opacity=50);
}

.footer-content .link {
  cursor: pointer;
}
</style>