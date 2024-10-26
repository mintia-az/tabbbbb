export default defineBackground(() => {
  const MAX_TABS = 6;
  
  // タブの作成を監視
  browser.tabs.onCreated.addListener(async (newTab) => {
    const allTabs = await browser.tabs.query({ currentWindow: true });
    
    if (allTabs.length >= MAX_TABS) {
      // タブ情報をストレージに保存
      const tabsToClose = allTabs
        .filter(tab => tab.id !== newTab.id)
        .map(tab => ({
          id: tab.id,
          title: tab.title,
          url: tab.url
        }));

      await browser.storage.local.set({ tabsToClose });

      // ポップアップを表示
      const popupUrl = browser.runtime.getURL('/popup.html');
      await browser.windows.create({
        url: popupUrl,
        type: 'popup',
        width: 400,
        height: 600
      });
    }
  });
});