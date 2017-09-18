## css3
### border
#### border-radius:圆角
- 四个值时顺序分别是：上左，上右，下右，下左
####  box-shadow：阴影
- h-shadow v-shadow blur spread color inset;
#### border-image：边界图片
谷歌浏览器需要添加 `border:30px solid transparent`

- `border-image-slice:top right bottom left | fill`：切割背景图片的四条线距离上右下左的距离,fill中间部分作为背景填充content

- `border-image-width`:图片边框的宽度

- `border-image-repeat`: stretch(拉伸) round(铺满) repeat(重复)

- `border-image-outset`:content区域扩展内容

### background
#### background-image
- 背景图片，多个背景图片URL用逗号分隔
#### background-size
- 背景图片大小
#### background-origin
- 指定背景图片的位置 `content-box, padding-box,和 border-box`   
#### background-clip
- 从指定位置开始绘制

### 渐变
#### linear-gradient：线向
`background: linear-gradient(direction, color-stop1, color-stop2, ...);`
- direction:可以用上下左右表示，也可以直接用角度`deg`表示
- color 支持rgba()，支持透明度
#### radial-gradient：径向
`background: radial-gradient(center, shape size, start-color, ..., last-color);`    
- center:渐变中心
- shape: circle 或 ellipse，默认后者
- size:渐变大小，`closest-side,farthest-side,closest-corner,farthest-corner`
#### 重复渐变
repeating-radial-gradient()，repeating-linear-gradient()

### 2D，3D转换
- transform：应用转换
- transform-origin：被转换元素位置（X,Y,Z）
- transform-style：flat|preserve-3d
- perspective：元素距离视图的距离
- perspective-origin；X.Y两个值
- backface-visibility：visible|hidden 背面是否可见
#### 2D 转换
- translate(x,y) 沿着 X 和 Y 轴移动元素。
- rotate(angle) 旋转
- scale(x,y) 改变元素的宽度和高度。
- skew(x-angle,y-angle) 倾斜转换，沿着 X 和 Y 轴
- matrix() 包含旋转，缩放，移动（平移）和倾斜功能

#### 3D 转换
添加Z轴上的变化，在2D转换上添加3d
- translate3d(x,y,z)
- scale3d(x,y,z)
- rotate3d(x,y,z,angle)
- perspective(n) 定义 3D 转换元素的透视视图

### transition 过渡
`transition: property duration timing-function delay;`

### animation 动画
#### @keyframes 规则
```
@keyframes myfirst
{
    from {background: red;}
    to {background: yellow;}
}
```
#### animation
`animation: name duration timing-function delay iteration-count direction fill-mode play-state;`

### 多列
将文本内容设置成像报纸一样的多列
- column-count	指定元素应该被分割的列数。
- column-fill	指定如何填充列
- column-gap	指定列与列之间的间隙
- column-rule	所有 column-rule-* 属性的简写
- column-rule-color	指定两列间边框的颜色
- column-rule-style	指定两列间边框的样式
- column-rule-width	指定两列间边框的厚度
- column-span	指定元素要跨越多少列
- column-width	指定列的宽度
