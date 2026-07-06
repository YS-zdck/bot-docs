const apiConfig231017 = require('../develop/api-v2/config');

const base = '/';

module.exports = ctx => ({
  base,
  configureWebpack: (config, isServer) => {
    config.output.publicPath = base;
  },
  title: ' QQ机器人文档',
  description:
    'QQ小程序是连接年轻用户的新方式，覆盖8亿新生代活跃网民。轻便快捷的开发模式，将能在QQ内被轻松获取和传播。',
  keywords: 'QQ频道,QQ机器人,频道机器人',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    require('./plugins/plugin-active-header-links/index'),
    ['fulltext-search'],
    [
      'one-click-copy', // 代码块复制按钮
      {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
        copyMessage: 'Copied！',
        duration: 1000,
        showInMobile: false,
      },
    ],
    ['@vuepress/back-to-top'],
    [
      'sitemap',
      {
        hostname: 'https://bot.q.qq.com',
      },
    ],
    [
      'robots',
      {
        host: 'https://bot.q.qq.com',
        disallowAll: false,
        allowAll: true,
        sitemap: '/wiki/sitemap.xml',
      },
    ],
    [
      'vuepress-plugin-zooming', // 放大图片
      {
        selector: '.theme-default-content img:not(.no-zoom):not(.disable-zooming)', // 排除class是no-zoom的图片
        options: {
          bgColor: 'rgba(0,0,0,0.6)',
        },
      },
    ],
    [
      'vuepress-plugin-right-anchor',
      {
        showDepth: 6,
        expand: {
          trigger: 'hover',
          clickModeDefaultOpen: true,
        },
      },
    ],
    ['vuepress-plugin-baidu-autopush'],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        popupComponent: 'MySWUpdatePopup',
        updatePopup: {
          '/': {
            message: '发现新内容可用~',
            buttonText: '刷新',
          },
        },
      },
    ],
    [require('./plugins/vuepress-plugin-contributors/index'), {
      docsRepo: 'YS-zdck/bot-docs',
      docsBranch: 'main',
      docsDir: 'docs',
      label: '贡献者🎉',
      api: 'https://api.xuann.wang/api/github-file-contributors',
      disableRoutes:['/develop/api/']
    }]
  ],
  globalUIComponents: ['TuXiaoChao','Qrcode'],
  theme: require.resolve('./theme-qq'),
  themeConfig: {
    // sidebarDepth: 0,
    sidebarDepth: 1,
    displayAllHeaders: false,
    lastUpdated: '上次更新',
    nav: [
      {
        text: '介绍',
        link: '/',
      },
      {
        text: 'API文档',
        link: '/develop/api-v2/',
      },




      {
        text: '机器人平台',
        link: 'https://bot.q.qq.com/open',
      },
      {
        text: '更新日志',
        link: '/changelog/',
      },
    ],
    repo: 'YS-zdck/bot-docs',
    editLinks: true,
    editLinkText: '在GitHub上编辑此页',
    docsDir: 'docs',
    // 不展示编码的页面
    disableRoutes: ['/develop/api/'],
    docsBranch: 'main',
    sidebar: {
      // '/develop/api/': convertSummary('./docs/develop/api/SUMMARY-PUBLIC.md', hiddenApi, 1, true),
      ...apiConfig231017.sidebar,
      '/': [''],
    },

    plugins: [
      [
        '@vuepress/search',
        {
          searchMaxSuggestions: 10,
          themeColor: '#0252d9',
          inputMinLength: 2,
          openInNewWindow: true,
        },
      ],
    ],
  },
});
