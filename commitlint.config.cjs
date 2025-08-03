module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',     // 构建系统或外部依赖的更改
        'chore',     // 其他不修改 src 或 test 文件的更改
        'ci',        // CI 配置文件和脚本的更改
        'docs',      // 仅文档更改
        'feat',      // 新功能
        'fix',       // bug 修复
        'perf',      // 提高性能的代码更改
        'refactor',  // 既不修复 bug 也不添加功能的代码更改
        'revert',    // 回滚之前的提交
        'style',     // 不影响代码含义的更改（空白、格式、缺少分号等）
        'test',      // 添加缺失的测试或纠正现有测试
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
}
