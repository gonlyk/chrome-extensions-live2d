可使用本地模型的谷歌live2d插件。因使用了[live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)，仅支持moc类型的live2d（这项目几年没维护了）

需要添加模型时，将模型放在model文件夹下，并在model.config.json文件中配置模型路径和模型名称

## 使用
1. 使用谷歌浏览器转到`chrome://extensions/`
2. 打开开发者模式
3. 点击加载已解压的扩展程序，选择文件夹
4. 刷新网页（某些网页可能不生效，但大部分都失效）

## 相关项目
[live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)：浏览器live2d项目，本项目核心代码魔改自该项目（live2d.min.js，上传时使用了inline-source-map，各位可自行调试）

[live2d-model](https://github.com/Eikanya/Live2d-model)：使用的模型
## update
0.0.2更新：
1. 添加启用配置和模型配置
2. 添加几套模型