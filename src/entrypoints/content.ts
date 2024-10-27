export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    // 現在のページ情報をバックグラウンドに通知
    browser.runtime.sendMessage({
      type: 'PAGE_LOADED',
      url: window.location.href,
      title: document.title,
    });
  },
});
