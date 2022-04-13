export = IREM;

export as namespace REM;

declare namespace IREM {
  function init(config: { rootValue?: number; designWidth?: number; maxRatio?: number }): void;
  function px2Rem(px: string | number, addUnit?: boolean): number | string;
  function rem2Px(rem: string | number, addUnit?: boolean): number | string;
}
