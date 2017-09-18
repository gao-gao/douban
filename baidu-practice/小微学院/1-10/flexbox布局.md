## 弹性布局`Flexible Box`
```
.box{
    display:flex;
    display:inline-flex;
    dispay:-webkit-flex;
}
```
- 设为Flex布局以后，子元素的float、clear和vertical-align属性将失效
- flex item为flex container的子元素，采用flex布局的元素为flex container

### 容器属性
- flex-direction：主轴方向  
`row | row-reverse | column | column-reverse`

- flex-wrap：换行   
`nowrap | wrap | wrap-reverse`

- flex-flow  
前两者的简写形式，默认值为row|nowrap

- justify-content：主轴上对齐方式  
`flex-start | flex-end | center | space-between | space-around`

- align-items：交叉轴上对齐方式
`flex-start | flex-end | center | baseline | stretch`

- align-content：多根轴线的对齐方式  
`flex-start | flex-end | center | space-between | space-around | stretch`

### 项目属性
- order：项目的排列顺序

- flex-grow：项目的放大比例

- flex-shrink：项目的缩小比例

- flex-basis：按比分配多余空间之前，项目占据的主轴空间

- flex：flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto

- align-self：为单个项目设置对齐方式
`auto | flex-start | flex-end | center | baseline | stretch;`

### 应用
- 色子布局：理解flex布局中轴线的意义，加深flex布局中针对container和项目属性的应用

- 网格布局：利用flex布局进行类似bootstrap中网格的布局

- 圣杯布局：利用flex布局，完成之前通过float,position,margin设置的两栏固定一栏自使用布局

- 输入框布局：利用flex布局，直接进行输入框的布局设置