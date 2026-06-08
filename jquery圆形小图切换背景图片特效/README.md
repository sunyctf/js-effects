# jquery圆形小图切换背景图片特效

#### 介绍

使用jquery+TweenMax实现的背景大图切换特效，圆形小图圆环排列的样式。点击缩略图切换网页背景大图的js特效。

> 关于TweenMax 

TweenMax 是 GSAP (GreenSock Animation Platform) 动画平台中一个功能全面的 JavaScript/ActionScript 动画引擎。它用于创建高性能的“补间动画”（Tween），即在起始状态和结束状态之间自动生成平滑过渡效果。

简单来说，你只需定义动画的**目标**、**时长**和**结束状态**，TweenMax 就能处理中间过程，并支持丰富的缓动效果和动画控制。

---

**🚀 核心功能**

*   **多属性动画**：可同时控制 CSS 属性（如 `x`, `y`, `opacity`, `scale`）、SVG 属性、数字、颜色等。
*   **强大的缓动 (Easing)**：内置多种缓动函数（如 `Power2.easeOut`, `Back.easeOut`），使动画效果更自然生动。
*   **时间控制**：支持精确设置动画时长、延迟 (`delay`)、重复次数 (`repeat`)、重复间隔 (`repeatDelay`) 以及往返运动 (`yoyo`)。
*   **丰富的回调**：可在动画开始、更新、完成等不同阶段触发回调函数（如 `onStart`, `onUpdate`, `onComplete`），便于执行联动逻辑。
*   **时间轴管理**：能与 TimelineMax 等时间轴工具无缝配合，编排复杂的动画序列，实现整体控制（如暂停、快进）。
*   **广泛的兼容性**：支持所有主流浏览器（包括 IE6+）及移动端，并提供对 Canvas、SVG 等图形技术的良好支持。

---

**📦 在 GSAP 家族中的定位**

TweenMax 是 GSAP 家族中功能最全面的成员之一，其定位如下：

*   **TweenLite**：轻量级核心，体积小，满足大部分基础动画需求。
*   **TweenMax**：在 TweenLite 基础上，集成了更多常用插件（如 CSSPlugin），并增加了 `repeat`、`yoyo` 等便捷功能，是一个“全功能版”的 Tween 引擎。

---

**💻 代码示例 (JavaScript)**

以下是一个在网页中使用 TweenMax 的典型示例：

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GSAP 动画示例</title>
    <!-- 引入 TweenMax (通常通过 CDN 或 npm 引入) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
</head>

<body>
    <!-- 一个用于动画的 div 元素 -->
    <div class="box" style="width:50px;height:50px;background:red;"></div>
    <script>
        // 获取元素
        const box = document.querySelector('.box');

        // 使用 TweenMax.to() 方法创建动画
        // 参数：目标元素, 持续时间(秒), 结束状态及配置
        TweenMax.to(box, 1, {
            x: 200,                // 向右移动 200px
            y: 100,                // 向下移动 100px
            rotation: 360,          // 旋转 360 度
            opacity: 0.5,           // 透明度变为 0.5
            ease: Power2.easeOut,   // 缓动函数
            delay: 0.5,             // 延迟 0.5 秒开始
            onComplete: () => {     // 动画完成后的回调
                console.log('动画完成');
            }
        });
    </script>
</body>

</html>
```


**常用方法对比：**
*   `TweenMax.to()`：从当前状态变化到目标状态。
*   `TweenMax.from()`：从指定的起始状态变化到当前状态。
*   `TweenMax.fromTo()`：自定义动画的起始状态和结束状态。

---

### 💡 现状与建议

*   **历史版本**：你提到的 TweenMax 是 GSAP 2.x 时代的经典版本，功能强大且稳定。
*   **当前版本**：GSAP 已迭代至 3.x/4.x 版本，官方主推 `gsap` 核心对象（如 `gsap.to()`, `gsap.from()`）。新项目建议直接使用最新版 GSAP，以获得更好的性能和持续的维护支持。

#### 技术栈

HTML5 canvas + CSS3 + JS + JQuery

#### 在线预览

[Github仓库](https://github.com/sunyctf/js-effects) | [Demo预览](https://sunyctf.github.io/js-effects/canvas+jq炫彩粒子宇宙星云特效/index.html) 🌐 [Gitee仓库](https://gitee.com/sunyctf/js-effects) | [Demo预览](https://sunyctf.gitee.io/js-effects/canvas+jq炫彩粒子宇宙星云特效/index.html)

#### 软件架构

软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  GitHub 官方博客 [blog.github.com](https://github.blog)
3.  你可以 [https://github.com/explore](https://github.com/explore) 这个地址来了解 GitHub 上的优秀开源项目
4.  GitHub官方提供的使用手册 [https://docs.github.com/cn](https://docs.github.com/cn)
5.  GitHub中文社区 https://www.githubs.cn/