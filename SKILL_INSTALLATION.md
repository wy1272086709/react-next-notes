# 安装 React Component Creator Skill

## 当前状态

✅ Skill 已经成功安装！

## 安装位置

Skill 已经安装到全局目录：
```
~/.claude/skills/react-component-creator/
```

## 两种安装方式

### 方式 1：全局安装（已完成）

Skill 已安装在全局目录，所有项目都可以使用。

**查看已安装的 skills：**
```bash
ls -la ~/.claude/skills/
```

**当前已安装：**
- ✅ `react-component-creator` - 你的自定义 skill
- ✅ `skill-creator` - skill 创建工具
- 和其他内置 skills...

### 方式 2：项目本地安装（可选）

如果只想在当前项目中使用，可以解压到项目目录：

```bash
# 创建项目 skills 目录
mkdir -p .claude/skills

# 解压 skill 文件
unzip react-component-creator.skill -d .claude/skills/
```

## 权限配置

在 `.claude/settings.local.json` 中添加权限：

```json
{
  "permissions": {
    "allow": [
      "Skill(react-component-creator)",
      "Skill(react-component-creator:*)"
    ]
  }
}
```

## 如何使用

安装完成后，你可以直接使用，无需任何命令：

### 示例 1：创建简单组件
```
创建一个名为 Button 的 React 组件
```

### 示例 2：创建带特定功能的组件
```
创建一个 UserProfile 组件，需要包含头像、用户名和简介
```

### 示例 3：创建复杂组件
```
创建一个 DataTable 组件，支持排序和筛选功能
```

## 验证安装

检查 skill 是否可用：

```bash
# 查看 skill 目录
ls -la ~/.claude/skills/react-component-creator/

# 应该看到：
# SKILL.md
# assets/
#   ├── ComponentTemplate.tsx
#   └── styles.module.css
```

## 工作原理

1. **触发** - 当你说"创建 React 组件"时
2. **加载** - Claude 读取 SKILL.md
3. **执行** - 使用模板生成组件文件
4. **输出** - 创建 .tsx 和 .module.css 文件

## 自定义 Skill

如果想修改模板，编辑：
```
~/.claude/skills/react-component-creator/assets/ComponentTemplate.tsx
```

## 卸载

如果需要移除：
```bash
rm -rf ~/.claude/skills/react-component-creator
```

## 下一步

现在你可以尝试使用这个 skill 了！试试说：

**"创建一个名为 Header 的 React 组件，包含 logo 和导航菜单"**
