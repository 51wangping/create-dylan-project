import classNames from "classnames";
import React from "react";

interface IProps {
  /**
   * 按钮内容
   */
  children: React.ReactNode;
  /**
   * 类名
   */
  className: string;
  /**
   * 按钮类型
   * @default button
   */
  type: 'button' | 'submit' | 'reset';
  /**
   * 按钮事件
   */
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 是否禁用
   */
  disabled: boolean;
}

export const Button: React.FC<IProps> = (
  {
    children,
    className,
    type = "button",
    onClick,
    disabled,
    ...rest
  }
) => {

  return (
    <button
      className={classNames("button", className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}


export default Button;