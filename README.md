# node-jsonpify

在开发时，为了提高开发效率，使用 [YApi](https://github.com/YMFE/yapi) Mock 系统来辅助开发。但 YAPI 不支持 jsonp。而 node-jsonpify 就为此而诞生的。

## Install

```
npm install jsonpify -g
```

## Usage

```js
// 默认( 端口：3232，callback 参数及值：callback=callback)
jsonpify http://example.com
```

- 指定端口

  ```js
  jsonpify http://example.com  -p 8080
  jsonpify http://example.com  --port 8080
  ```

  > 如果指定的端口占用，jsonpify 会提供备选端口

- 指定 callback 参数名，来获取包裹 json 数据的函数名

  ```js
  // http://api.example.com?cb=fun
  jsonpify http://example.com  -n cb
  jsonpify http://example.com  --name cb

  // 返回结果
  // fun({json data})
  ```

- 如果接口不支持 `callback=？` 参数，可以使用`-w`选项来指定包裹 json 数据的函数名

  ```js
  // http://api.example.com
  jsonpify http://example.com  -w fun
  jsonpify http://example.com  -wrapper fun

  // 返回结果
  // fun({json data})
  ```

- 更多帮助

  ```js
  jsonpify -h
  jsonpify --help
  ```

## Dome

- 接口：[https://api.github.com/repos/zhansingsong/node-jsonpify?\_=1553585325899](https://api.github.com/repos/zhansingsong/node-jsonpify?_=1553585325899)

- 使用 jsonpify
  ```js
  jsonpify https://api.github.com -p 8888 -w github
  ```
- 访问：[http://localhost:8888/repos/zhansingsong/node-jsonpify?\_=1553585325899](http://localhost:8888/repos/zhansingsong/node-jsonpify?_=1553585325899)
