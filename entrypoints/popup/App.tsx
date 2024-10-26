import { useState, useEffect } from 'react';

interface Tab {
  id: number;
  title: string;
  url: string;
}

function App() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTabs = async () => {
      const result = await browser.storage.local.get('tabsToClose');
      if (result.tabsToClose) {
        setTabs(result.tabsToClose);
      }
      setLoading(false);
    };

    loadTabs();
  }, []);

  const handleCloseTab = async (tabId: number) => {
    try {
      await browser.tabs.remove(tabId);
      const newTabs = tabs.filter(tab => tab.id !== tabId);
      setTabs(newTabs);
      await browser.storage.local.set({ tabsToClose: newTabs });
    } catch (error) {
      console.error('タブを閉じる際にエラーが発生しました:', error);
    }
  };

  if (loading) {
    return <div className="p-4">読み込み中...</div>;
  }

  return (
    <div className="p-4 min-w-[300px]">
      <h2 className="text-lg font-bold mb-4">閉じるタブを選択</h2>
      {tabs.length === 0 ? (
        <p>閉じる必要のあるタブはありません</p>
      ) : (
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id} className="flex items-center justify-between p-2 hover:bg-gray-100">
              <div className="flex-1 mr-2">
                <div className="font-medium truncate">{tab.title}</div>
                <div className="text-sm text-gray-500 truncate">{tab.url}</div>
              </div>
              <button
                onClick={() => handleCloseTab(tab.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                閉じる
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
