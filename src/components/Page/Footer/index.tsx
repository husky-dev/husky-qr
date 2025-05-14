import { config } from '@/core/config';
import { mc, StyleProps } from '@/styles';
import { TestIdProps } from '@/utils';
import React, { FC } from 'react';

type Props = StyleProps & TestIdProps;

export const PageFooter: FC<Props> = ({ testId, className, style }) => {
  const year = new Date().getFullYear();
  return (
    <footer data-testid={testId} className={mc('space-y-0.5', 'text-center text-xs', className)} style={style}>
      <div>
        <span>{`© ${year} `}</span>
        <a className="link" href="https://qr.husky-dev.me">
          {'QR Toolkit'}
        </a>
      </div>
      <div>
        <span>{'Розроблено by '}</span>
        <a className="link" href="https://husky-dev.me" target="__blank">
          {'Husky Dev'}
        </a>
      </div>
      <div>{`v${config.version}`}</div>
    </footer>
  );
};

export default PageFooter;
