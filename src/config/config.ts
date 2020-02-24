const config = {
  browser: {
    userAgent: {
      iPhone:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
      win10:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
      Linux:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36',
    },
  },
  timeout: 999999,
  niconico: {
    rootUrl: 'https://www.nicovideo.jp',
    movieUrl: 'watch',
    commentSelector:
      'div.CommentPanelDataGrid-Table > div > span:nth-child(5n + 1)',
    commentPanelDataGridBody: 'div.CommentPanelDataGrid-Body',
    commentList:
      'div.MainContainer-playerPanel > div.PlayerPanelContainer > div.PlayerPanelContainer-tab > div.PlayerPanelContainer-tabItem',
    commentCount: 'div.CommentCountMeta > span > span',
    commentPanelAutoScrollButton: '.CommentPanelAutoScrollButton',
  },
}

export default config
