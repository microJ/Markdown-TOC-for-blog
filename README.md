# Markdown-TOC-for-blog
create TOC for blog published with markdown-syntax.

在页面中动态生成TOC导航。markdown语法生成的文章最佳。

- 默认选取id为`main`的区域。  
定义选取区域的id标识符：传入`{el: 'idname'}`
- 展示区域中的h2~h6标签。默认从h2开始展示到h3。  
如果需要修改展示层级，将标签中的数字传入即可。例如展示到h5，在对象中传入`{level: 5}`。
- 点击标题会在页面中自动定位到相应位置。


TODO：
> - [x] 动态生成TOC
> - [ ] 点击跳转锚点效果

## 如何使用：

默认：
`new MdTOCNav()`

选取id标识符为'blogMain'的区域：
`new MdTOCNav({el: 'blogMain'})`

修改展示层级到h5：
`new MdTOCNav({level: 5})`
实际上不推荐这么做，标题层级太多不好看2333

