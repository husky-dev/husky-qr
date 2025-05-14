import { PageFooter } from '@/components/Page';
import { Log } from '@/core/log';
import { mc, StyleProps } from '@/styles';
import React, { ChangeEvent, FC, useRef, useState, MouseEvent } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

const log = Log('MainPage');

type Props = StyleProps;

type Tab = 'create' | 'read';

const downloadStringAsFile = (data: string, filename: string) => {
  const a = document.createElement('a');
  a.download = filename;
  a.href = data;
  a.click();
};

export const MainPage: FC<Props> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [value, setValue] = useState<string>('Hello world');
  const [curErr, setCurErr] = useState<string | undefined>(undefined);

  const handleTabClick = (tb: Tab) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveTab(tb);
    setCurErr(undefined);
  };

  const handleSaveClick = (e: MouseEvent) => {
    e.preventDefault();
    const node = canvasRef.current;
    if (!canvasRef.current) {
      return;
    }
    const dataURI = canvasRef.current.toDataURL('image/png');
    downloadStringAsFile(dataURI, 'qr.png');
  };

  const handleRead: OnResultFunction = (result, err) => {
    if (err) {
      return setCurErr(err.message);
    }
    const text = result?.getText();
    if (text) {
      setValue(text);
    }
  };

  const renderCreate = () => {
    const modVal = value.trim();
    const curVal = modVal ? modVal : 'https://qr.husky-dev.me/';
    return (
      <div className={mc('flex flex-col items-center')}>
        <div>{!!curVal && <QRCodeCanvas ref={canvasRef} value={curVal} size={200} level="M" marginSize={1} />}</div>
        <div className="mt-2 w-full">
          <textarea
            className={mc('textarea textarea-primary', 'w-[200px]')}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
          />
        </div>
        <div className="mt-2 w-full">
          <a className={mc('btn btn-primary btn-sm', 'w-full')} role="button" onClick={handleSaveClick}>
            {'Save'}
          </a>
        </div>
      </div>
    );
  };

  const renderRead = () => {
    return (
      <div>
        <QrReader constraints={{ facingMode: 'user' }} onResult={handleRead} />
      </div>
    );
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
          <div role="tablist" className="tabs tabs-box">
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
