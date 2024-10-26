import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface Tab {
  id: number;
  title: string;
  url: string;
  favIconUrl: string;
}

const App = (): JSX.Element => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTabs = async () => {
      const allTabs = await browser.tabs.query({ currentWindow: true });
      setTabs(allTabs.map((tab) => ({
        id: tab.id ?? 0,
        title: tab.title ?? '',
        url: tab.url ?? '',
        favIconUrl: tab.favIconUrl ?? ''
      })));
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
    <ThemeProvider>
      <div className="p-4 w-96">
        <div
          className="flex justify-between mb-2"
        >
          <h2 className="text-lg font-bold flex items-center">Tabs</h2>
          <ModeToggle></ModeToggle>
        </div>
        
        {tabs.length === 0 ? (
          <p>閉じる必要のあるタブはありません</p>
        ) : (
          <ul className="space-y-2 max-h-[400px] overflow-scroll">
            {tabs.map((tab) => (
              <li key={tab.id} className="flex items-center justify-between p-2">
                <img 
                    src={tab.favIconUrl || '/default-favicon.png'} // デフォルトアイコンのパスを指定
                    alt=""
                    className="w-4 h-4 mr-3"
                  />
                <div className="w-3/5">
                  <p className="truncate">{tab.title}</p>
                  <p className="truncate">{tab.url}</p>
                </div>
                <Button
                  className='ml-auto'
                  variant="outline"
                  onClick={() => handleCloseTab(tab.id)}
                >
                  閉じる
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ThemeProvider>

  );
}

export default App;
