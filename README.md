[![gkatemplatew](https://user-images.githubusercontent.com/10385585/28489021-a9cc83aa-6eea-11e7-8c1b-4bb326bb9fe9.png)](https://github.com/joeyguo/gka)

## gka-tpl-createjs

<a href="https://www.npmjs.org/package/gka-tpl-createjs"><img src="https://img.shields.io/npm/v/gka-tpl-createjs.svg?style=flat"></a>
<a href="https://github.com/joeyguo/gka-tpl-createjs#license"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>

[gka](https://github.com/joeyguo/gka) 文件生成模板，一键式生成 createjs 合图及需要的数据，并内置优化。

- 输出 createjs 精灵图动画文件
- 结合 -uc 支持 `相同帧图片复用`✓ `空白裁剪优化`✓ (可选) 
- 默认开启 `开启合图优化`✓

[示例预览](https://gkajs.github.io/gka-tpl-createjs/example/gka.html)、 [示例代码](https://github.com/gkajs/gka-tpl-createjs/tree/master/example)

相关文章：[使用 gka 加速 createjs 动画开发及图片优化](https://github.com/joeyguo/blog/issues/19)

# 优化对比

CreateJS [示例图片](https://github.com/CreateJS/EaselJS/blob/master/_assets/art/spritesheet_grant.png)压缩后 为 `105.3 KB`

GKA [生成图片](https://github.com/gkajs/gka-tpl-createjs/tree/master/example/img/sprites.png)压缩后 大小为 `64.6 KB`

# Install

```sh
$ npm i gka -g               # install gka

（已内置）$ npm i gka-tpl-createjs -g  # install gka-tpl-createjs
```

# Usage

```sh
$ gka <dir> -t createjs [options]
```

改变合图布局模式，可使用 -a 参数，如

```sh
$ gka <dir> -t createjs -a left-right
```
合图布局模式 默认 binary-tree，可选 top-down | left-right ..
详见 gka [README](https://github.com/gkajs/gka)

# Example

```sh
$ gka E:\gka-test\img -t createjs
```

<table>
    <thead>
        <tr><th>Before</th><th>After</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><pre><code>
./img
├── hello-01.png
├── hello-02.png
├── hello-03.png
├── hello-04.png
├── hello-05.png
└── ...
</code></pre></td>
<td><pre><code>
./gka-hello
└── gka.html
└── data.js
└── img
    └── sprites.png
</code></pre></td>
        </tr>
    </tbody>
</table>

# Use GKA

[https://github.com/gkajs/gka](https://github.com/gkajs/gka)

