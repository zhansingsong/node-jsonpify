# node-jsonpify

在开发时，为了提高开发效率，使用 YAPI Mock 系统来辅助开发。但 YAPI 不支持 jsonp。而 node-jsonpify 就为此而诞生的。

## Install

```
npm install jsonpify -g
```

## Usage

```js
// 默认端口：3232，callback 参数函数名：callback
jsonpify http://example.com
```

- 指定端口

  ```js
  jsonpify http://example.com  -p 8080
  jsonpify http://example.com  --port 8080
  ```

  > 如果指定的端口占用，jsonpify 会提供备选端口

- 指定 callback 函数名

  ```js
  jsonpify http://example.com  -n cb
  jsonpify http://example.com  --name cb
  ```

- 更多帮助

  ```js
  jsonpify -h
  jsonpify --help
  ```
