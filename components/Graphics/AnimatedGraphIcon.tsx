import { FC, SVGProps } from 'react';
import cx from 'classnames';

import styles from './animated-graph-icon.module.scss';

const viewBoxHeight = 192;
const offsetButtom = 32;

const getOffsetForHeight = (height: number) => {
  return viewBoxHeight - offsetButtom - height;
};

const getValues = (height: number, variance: number) => {
  const heights = [height, height - variance, height];
  const offsets = heights.map(getOffsetForHeight);
  return [heights.join(';'), offsets.join(';')];
};

type Props = SVGProps<SVGSVGElement>;

export const AnimatedGraphIcon: FC<Props> = ({ className, ...props }) => {
  const [aHeights, aOffsets] = getValues(70, 10);
  const [bHeights, bOffsets] = getValues(120, 30);
  const [cHeights, cOffsets] = getValues(150, 45);
  const [dHeights, dOffsets] = getValues(160, 25);
  const [eHeights, eOffsets] = getValues(130, 35);
  const [fHeights, fOffsets] = getValues(60, 20);
  return (
    <svg className={cx(className, styles.icon)} {...props} viewBox="0 0 360 192" xmlns="http://www.w3.org/2000/svg">
      <rect y="172" width="360" height="20" rx="6">
        <animate attributeType="CSS" attributeName="opacity" from="1" to="1" dur="5s" repeatCount="indefinite" />
      </rect>
      <rect x="0" y="90" width="50" height="70" rx="6">
        <animate attributeName="height" values={aHeights} dur="700ms" repeatCount="indefinite" />
        <animate attributeName="y" values={aOffsets} dur="700ms" repeatCount="indefinite" />
      </rect>
      <rect x="62" y="40" width="50" height="120" rx="6">
        <animate attributeName="height" values={bHeights} dur="1200ms" repeatCount="indefinite" />
        <animate attributeName="y" values={bOffsets} dur="1200ms" repeatCount="indefinite" />
      </rect>
      <rect x="124" y="10" width="50" height="150" rx="6">
        <animate attributeName="height" values={cHeights} dur="900ms" repeatCount="indefinite" />
        <animate attributeName="y" values={cOffsets} dur="900ms" repeatCount="indefinite" />
      </rect>
      <rect x="186" width="50" height="160" rx="6">
        <animate attributeName="height" values={dHeights} dur="970ms" repeatCount="indefinite" />
        <animate attributeName="y" values={dOffsets} dur="970ms" repeatCount="indefinite" />
      </rect>
      <rect x="248" y="30" width="50" height="130" rx="6">
        <animate attributeName="height" values={eHeights} dur="1100ms" repeatCount="indefinite" />
        <animate attributeName="y" values={eOffsets} dur="1100ms" repeatCount="indefinite" />
      </rect>
      <rect x="310" y="0" width="50" height="0" rx="6">
        <animate attributeName="height" values={fHeights} dur="800ms" repeatCount="indefinite" />
        <animate attributeName="y" values={fOffsets} dur="800ms" repeatCount="indefinite" />
      </rect>
    </svg>
  );
};
