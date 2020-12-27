import React, { FC } from 'react';

import s from './stat.module.scss';

interface Props {
  label: string;
  value: string;
  extra?: string;
}

export const Stat: FC<Props> = ({ label, value, extra }) => {
  return (
    <div className={s.container}>
      <dt className={s.label}>{label}</dt>
      <StatValue value={value} extra={extra} />
    </div>
  );
};

interface ValueProps {
  value: string;
  extra?: string;
}

export const StatValue: FC<ValueProps> = ({ value, extra }) => {
  return (
    <dd className={s.value}>
      {value}
      {extra && <span className={s.extra}>({extra})</span>}
    </dd>
  );
};
