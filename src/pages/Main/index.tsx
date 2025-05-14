import { PageFooter } from '@/components/Page';
import { Log } from '@/core/log';
import { mc, StyleProps } from '@/styles';
import React, { ChangeEvent, FC, useMemo, useState, MouseEvent } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const log = Log('MainPage');

type Props = StyleProps;

type Tab = 'create' | 'read';

export const MainPage: FC<Props> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [value, setValue] = useState<string>('Hello world');

  const handleTabClick = (tb: Tab) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveTab(tb);
  };

  const renderCreate = () => {
    const modVal = value.trim();
    const curVal = modVal ? modVal : 'https://qr.husky-dev.me/';
    return (
      <div className={mc('flex flex-col items-center')}>
        <div>{!!curVal && <QRCodeSVG value={curVal} size={200} level="M" marginSize={1} />}</div>
        <div className="mt-4 w-full">
          <textarea
            className={mc('textarea textarea-primary', 'w-[200px]')}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
          />
        </div>
      </div>
    );
  };

  const renderRead = () => {
    return <div>{'Read'}</div>;
  };

  return (
    <div className={mc(className)}>
      <div className={mc('container', 'mx-auto', 'py-10 space-y-6')}>
        {/* Title */}
        <div>
          <h1 className={mc('text-center text-3xl font-bold')}>{'QR Toolkit'}</h1>
        </div>
        {/* Title */}
        {/* Tabs */}
        <div className={mc('flex flex-col items-center')}>
          <div role="tablist" className="tabs tabs-border">
            <a role="tab" className={mc('tab', activeTab === 'create' && 'tab-active')} onClick={handleTabClick('create')}>
              {'Create'}
            </a>
            <a role="tab" className={mc('tab', activeTab === 'read' && 'tab-active')} onClick={handleTabClick('read')}>
              {'Read'}
            </a>
          </div>
        </div>
        {/* Tabs */}
        {/* Content */}
        <div className={mc('flex flex-col items-center', 'w-full')}>
          {activeTab === 'create' && renderCreate()}
          {activeTab === 'read' && renderRead()}
        </div>
        {/* Content */}
        <PageFooter />
      </div>
    </div>
  );
};

export default MainPage;
