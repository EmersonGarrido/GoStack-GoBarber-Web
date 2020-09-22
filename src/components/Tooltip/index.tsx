import React from 'react';

import * as S from './styles';

interface ToolTipProps{
  title: string;
  className?: string;
}

const Tooltip: React.FC<ToolTipProps> = ({ title, className, children}) => {
  return (
    <S.Container className={className}>
      {children}
      <span>{title}</span>
    </S.Container>
  );
}

export default Tooltip;