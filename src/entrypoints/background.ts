export default defineBackground(() => {
  const MAX_TABS = 3;
  console.log('background js');

  // タブの作成を監視
  browser.tabs.onCreated.addListener(async (newTab) => {
    const allTabs = await browser.tabs.query({ currentWindow: true });

    console.log(allTabs.length);

    if (allTabs.length > MAX_TABS) {
      // ポップアップを表示
      browser.action.openPopup();
    }
  });
});
