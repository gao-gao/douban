### 云课堂页面样式分析
分成7个部分，顶部的广告条、导航栏、轮播图、导航栏中项目介绍、图片廊、课程展示、底部版权信息栏
### 广告条
```
<div class="ad" id="ad">
        <div>
            <p class="ad-left">网易云课堂微专业，帮助你掌握专业技能，令你求职或加薪多一份独特优势！ <span>立即查看></span></p>
            <p class="ad-right"><span id="close"></span>不再提醒</p>
        </div>
</div>
```
- 最外层div：设置宽度为浏览器宽，以设置背景颜色
- 次外层div：设置宽度为1200px，以方便对内部的左右部分进行定位
- 内部左右部分p：左边左浮动，右边右浮动就可以直接将内容定位好，并且随着浏览器窗口的缩放会有