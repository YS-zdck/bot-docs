# Markdown 扩展语法

Markdown 消息除支持[原生 Markdown 语法](./markdown.md#支持格式)外，还支持任务列表和 LaTeX 扩展语法。以下示例同时展示写法和渲染效果。

## 如何在 Markdown 中使用

在 `.md` 文件或 Markdown 模版中直接填写语法即可，不需要添加 HTML 标签。

1. 普通 Markdown 内容照常书写。
2. 任务列表使用 `- [ ]` 或 `- [x]`，标记后需要保留一个空格。
3. 行内 LaTeX 公式使用一对 `$` 包裹。
4. 独立 LaTeX 公式使用一对 `$$` 包裹，并让起止符分别独占一行。
5. 下划线、颜色、拼音等扩展效果也需要写在 `$...$` 中。

```markdown
# 扩展语法示例

- [x] 已完成任务
- [ ] 未完成任务

质量能量等价公式 $E = mc^2$ 嵌在文字中。

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

$\underline{\text{这段文字有下划线}}$

$\color{red}{\text{红色文字}}$
```

如果通过接口发送，需要把以上 Markdown 文本放入 `markdown.content` 字段。JSON 字符串中的换行写为 `\n`，LaTeX 命令中的反斜杠 `\` 写为 `\\`。

```json
{
  "markdown": {
    "content": "# 扩展语法示例\n\n- [x] 已完成任务\n- [ ] 未完成任务\n\n质量能量等价公式 $E = mc^2$ 嵌在文字中。\n\n$$\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n$$\n\n$\\color{red}{\\text{红色文字}}$"
  }
}
```

## 任务列表

```markdown
- [x] 已完成任务
- [ ] 未完成任务
- [x] 另一个已完成
```

<!--lint disable no-undefined-references-->

- [x] 已完成任务
- [ ] 未完成任务
- [x] 另一个已完成

<!--lint enable no-undefined-references-->

## LaTeX 公式

### 行内公式

```markdown
质量能量等价公式 $E = mc^2$ 嵌在文字中。
```

质量能量等价公式 $E = mc^2$ 嵌在文字中。

### 独立公式

```markdown
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

## 使用 LaTeX 替代 HTML 标签

### 下划线

可使用 `\underline{}` 替代 `<u>` 标签。

```markdown
$\underline{\text{这段文字有下划线}}$
```

$\underline{\text{这段文字有下划线}}$

### 文字颜色

可使用 `\color{颜色}{}` 替代 `<font color="颜色">` 标签。

```markdown
$\color{red}{\text{红色文字}}$
$\color{blue}{\text{蓝色文字}}$
$\color{green}{\text{绿色文字}}$
```

$\color{red}{\text{红色文字}}$

$\color{blue}{\text{蓝色文字}}$

$\color{green}{\text{绿色文字}}$

### 拼音标注

可使用数组结构替代 `<ruby>` 标签。

```markdown
$\overset{hàn}{\text{汉}}\;\overset{zì}{\text{字}}$
```

$\overset{hàn}{\text{汉}}\;\overset{zì}{\text{字}}$

### 加框高亮

```markdown
$\boxed{\text{重点内容加框}}$
```

$\boxed{\text{重点内容加框}}$

### 划掉

```markdown
$\cancel{\text{这段文字被划掉了}}$
```

$\cancel{\text{这段文字被划掉了}}$

## 常用公式语法

| 类型 | LaTeX 语法 | 渲染效果 |
| --- | --- | --- |
| 上标与下标 | `x^2`、`a_i` | $x^2 + a_i$ |
| 分数 | `\frac{分子}{分母}` | $\frac{a+b}{c}$ |
| 根式 | `\sqrt{x}`、`\sqrt[n]{x}` | $\sqrt{x^2+y^2}$ |
| 希腊字母 | `\alpha`、`\beta`、`\pi` | $\alpha + \beta = \pi$ |
| 求和 | `\sum_{i=1}^{n}` | $\sum_{i=1}^{n} i$ |
| 积分 | `\int_{a}^{b}` | $\int_{a}^{b} f(x)\,dx$ |

## 使用说明

- LaTeX 公式需要写在 Markdown 消息的 `content` 字段或 Markdown 模版内容中。
- 行内公式使用 `$...$`，独立公式使用 `$$...$$`。
- 在 JSON 字符串中发送包含反斜杠的 LaTeX 命令时，需要将 `\` 转义为 `\\`。

```json
{
  "markdown": {
    "content": "二次方程求根公式：$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$"
  }
}
```
