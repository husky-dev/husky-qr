import { PageFooter } from '@/components/Page';
import { mc, StyleProps } from '@/styles';
import React, { FC, useRef, useState, MouseEvent, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

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
  const cardBodyRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [value, setValue] = useState<string>('');
  const [qrSize, setQrSize] = useState(200);

  useEffect(() => {
    const el = cardBodyRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setQrSize(Math.floor(entry.contentRect.width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleTabClick = (tb: Tab) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveTab(tb);
  };

  const handleSaveClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    downloadStringAsFile(canvasRef.current.toDataURL('image/png'), 'qr.png');
  };

  const handleCopyClick = (e: MouseEvent) => {
    e.preventDefault();
    if (value) navigator.clipboard.writeText(value);
  };

  const handleRead: OnResultFunction = (result, err) => {
    if (err) return;
    const text = result?.getText();
    if (text) setValue(text);
  };

  const renderCreate = () => {
    const curVal = value.trim() || 'https://qr.husky-dev.me/';
    return (
      <div className="flex flex-col gap-4">
        <textarea
          placeholder="Your text"
          className="textarea textarea-primary w-full resize-none"
          rows={4}
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
        />
        <div className="flex justify-center">
          <QRCodeCanvas ref={canvasRef} value={curVal} size={qrSize} level="M" marginSize={1} />
        </div>
        <a className="btn btn-primary w-full" role="button" onClick={handleSaveClick}>
          {'Save'}
        </a>
      </div>
    );
  };

  const renderRead = () => (
    <div className="flex flex-col gap-4">
      <QrReader constraints={{ facingMode: 'user' }} onResult={handleRead} />
      <textarea className="textarea textarea-primary w-full resize-none" rows={3} readOnly value={value} />
      <a className={mc('btn w-full', value ? 'btn-primary' : 'btn-disabled')} role="button" onClick={handleCopyClick}>
        {'Copy'}
      </a>
    </div>
  );

  return (
    <div className={mc('min-h-screen flex flex-col', className)}>
      <div className="flex-1 flex flex-col items-center px-4 py-10 gap-6">
        <div className="card bg-base-200 w-full max-w-sm shadow-lg">
          <div ref={cardBodyRef} className="card-body p-5 gap-5">
            <div role="tablist" className="tabs tabs-border">
              <a
                role="tab"
                className={mc('tab flex-1', activeTab === 'create' && 'tab-active')}
                onClick={handleTabClick('create')}
              >
                {'Create'}
              </a>
              <a role="tab" className={mc('tab flex-1', activeTab === 'read' && 'tab-active')} onClick={handleTabClick('read')}>
                {'Read'}
              </a>
            </div>
            {activeTab === 'create' && renderCreate()}
            {activeTab === 'read' && renderRead()}
          </div>
        </div>
      </div>
      <PageFooter className="py-6" />
    </div>
  );
};

export default MainPage;
