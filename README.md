# Markdown-TOC-for-blog
create TOC for blog published with markdown-syntax.

在页面中动态生成TOC导航。markdown语法生成的文章最佳。

- 可自定义标签选取区域。
- 展示选取区域中的h2~h6标签。默认从h2开始展示到h3。
- 点击标题会在页面中自动定位到相应位置。


TODO：
> - [x] 动态生成TOC
> - [ ] 点击跳转锚点效果

## 如何使用：

包含两个可选参数：
> el: 定义选取区域的id标识符。*可选，默认id为'main'*
> level: 显示层级。例如显示至h4，设置值为4即可。*可选，默认为3*

- 默认：  
`new MdTOCNav()`

- 选取id标识符为'blogMain'的区域：  
`new MdTOCNav({el: 'blogMain'})`

- 修改展示层级到h5：  
`new MdTOCNav({level: 5})`  
实际上不推荐这么做，标题层级太多不好看2333

