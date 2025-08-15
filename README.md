# create-vfan

[![create-vfan](https://img.shields.io/npm/v/create-vfan.svg)](https://www.npmjs.com/package/create-vfan)
[![download](https://img.shields.io/npm/dm/create-vfan.svg)](https://www.npmjs.com/package/create-vfan)
[![build status](https://github.com/VfanLee/create-vfan/actions/workflows/release.yml/badge.svg)](https://github.com/VfanLee/create-vfan/actions/workflows/release.yml)
[![license](https://img.shields.io/github/license/VfanLee/create-vfan.svg)](https://github.com/VfanLee/create-vfan/blob/main/LICENSE)

## 介绍

Vfan Lee 的项目脚手架，用于快速创建项目。

## 快速开始

```bash
# npm
npm create vfan@latest

# pnpm
pnpm create vfan@latest

# yarn
yarn create vfan@latest
```

## 使用方式

```bash
用法（Usage）: create-vfan [项目名称] [选项]

Vfan Lee 的项目脚手架，用于快速创建项目。

参数（Arguments）:
  project-name               项目名称

选项（Options）:
  -v, --version              显示版本信息
  -f, --force                强制覆盖已存在的目录
  -t, --template <template>  指定模板
  -h, --help                 显示帮助信息

示例（Examples）:
  $ create-vfan
  $ create-vfan my-app
  $ create-vfan my-app --template react18-ts
  $ create-vfan my-app -t next14 --force
```

**💡 提示：** 不常用的项目模板统一在 [`uncommon-templates`](https://github.com/VfanLee/create-vfan/tree/main/uncommon-templates) 中进行管理。

## 贡献者

[![contributors](https://contrib.rocks/image?repo=VfanLee/create-vfan)](https://github.com/VfanLee/create-vfan/graphs/contributors)

## 许可证

[MIT](./LICENSE)
