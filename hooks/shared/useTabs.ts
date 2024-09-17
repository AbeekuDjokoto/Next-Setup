import React from 'react';

interface Tab {
  label: string;
  value: string;
}

interface TabS {
  id: number;
  label: string;
  value: string;
  isActive: boolean;
}
function getArr(data: any) {
  let id = 0;
  let arr: any = [];
  if (!data) return arr;
  for (let item of data) {
    arr.push({ ...item, isActive: false, id: ++id });
  }
  return arr;
}
function useTabs(data: Tab[], defaultActive: string) {
  const [tabs, setTabs] = React.useState<TabS[]>(() => getArr(data));

  function setActiveTab(id: number) {
    setTabs((prev) => {
      return prev.map((tab) => {
        return tab.id === id ? { ...tab, isActive: true } : { ...tab, isActive: false };
      });
    });
  }

  function getActiveTab() {
    let active = tabs.find((tab) => tab.isActive === true)?.value;
    if (!active) return defaultActive;
    return active;
  }

  return { tabs, setActiveTab, active: getActiveTab() };
}

export { useTabs };
