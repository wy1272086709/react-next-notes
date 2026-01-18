# React Component Creator - Hello World Skill

## 什么是 Skill？

Skill 就像是一个"专家工具包"，它扩展了 Claude 的能力，包含：
- 专门的知识
- 特定的工作流程
- 可重用的资源（脚本、模板、文档）

## Skill 的结构

```
react-component-creator/
├── SKILL.md                    # 必需：技能的使用说明
└── assets/                     # 可选：模板文件
    ├── ComponentTemplate.tsx   # React 组件模板
    └── styles.module.css       # CSS 样式模板
```

## 文件说明

### 1. SKILL.md（必需）

这是 skill 的核心文件，包含两个部分：

**Frontmatter（YAML）**
```yaml
---
name: react-component-creator
description: Automate creating React component files...
---
```

- `name`: skill 的名称
- `description`: Claude 用这个来决定何时使用这个 skill
  - 描述了 skill 做什么
  - 描述了何时触发

**Body（Markdown）**
- 详细的使用说明
- 工作流程
- 如何使用模板

### 2. assets/（可选资源）

包含模板文件，这些文件不会被加载到上下文中，而是被 Claude 直接使用或复制。

- `ComponentTemplate.tsx`: React 组件模板
- `styles.module.css`: CSS 样式模板

## 这个 Skill 如何工作？

### 触发机制

当你说类似这样的话时，skill 会被触发：
- "创建一个 React 组件"
- "make a new component"
- "generate React component with TypeScript"

Claude 会读取 description，判断是否需要使用这个 skill。

### 工作流程

1. **需求收集**
   - 组件名称（PascalCase，如 `UserProfile`）
   - 组件功能描述
   - 需要的 props
   - 目标路径

2. **读取模板**
   - 读取 `assets/ComponentTemplate.tsx`
   - 读取 `assets/styles.module.css`

3. **替换占位符**
   - `{{ComponentName}}` → `UserProfile`
   - `{{description}}` → 用户提供的描述

4. **生成文件**
   - 创建 `UserProfile.tsx`
   - 创建 `UserProfile.module.css`

## 使用示例

假设你要创建一个 `Button` 组件：

**你的输入：**
```
创建一个 Button 组件，包含 onClick 处理和不同尺寸
```

**Claude 会：**
1. 读取 `ComponentTemplate.tsx`
2. 替换 `{{ComponentName}}` 为 `Button`
3. 自定义 props 接口（添加 `size` 属性等）
4. 创建 `Button.tsx` 和 `Button.module.css`

**生成的文件：**
```tsx
// Button.tsx
interface ButtonProps {
  title: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  size = 'medium',
  onClick,
}) => {
  return (
    <button className={`${styles.button} ${styles[size]}`} onClick={onClick}>
      {title}
    </button>
  );
};
```

## Skill vs. 普通代码

### 普通方式
每次都要重新写代码，容易遗漏步骤，没有统一标准。

### 使用 Skill
- ✅ 统一的代码结构
- ✅ 包含最佳实践
- ✅ 自动包含文档
- ✅ 类型安全
- ✅ 可重复使用

## 总结

这个 hello world skill 展示了：
1. **SKILL.md** - 定义技能的用途和触发条件
2. **assets/** - 存储可重用的模板
3. **占位符** - 使用 `{{}}` 表示需要替换的部分
4. **工作流程** - 清晰的步骤说明

现在你可以尝试使用这个 skill 了！只要说类似"创建一个 React 组件"的话，它就会自动工作。
