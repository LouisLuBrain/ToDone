# ToDone
**浏览器端的待办事项网页应用**

## plan
> 考虑增减功能
> 开发Chrome版本插件

## resource
> 字体库：font-awesome
> 框架：简单采用Vue.js

## ver-01
> 数据存储于浏览器storage中，清除缓存会让数据丢失
> 可以考虑采用`jsonp`读写到一个本地.json文件
> + 可以进行添加删除操作
> + 每分钟进行判断，会将昨天的待办更新到遗留事件
