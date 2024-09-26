import { ReactElement, ReactEventHandler, RefObject } from "react";

interface TextEllipsisProps {
  text?: string;
  maxTextWidth?: number;
  ref?: RefObject<HTMLParagraphElement>;
  onMouseEnter?: ReactEventHandler;
  onMouseLeave?: ReactEventHandler;
  className?: string;
}

const TextEllipsis = (props: TextEllipsisProps): ReactElement => {
  const { text, maxTextWidth, ref, onMouseEnter, onMouseLeave, className } =
    props;

  return (
    <p
      ref={ref}
      className={`${className} truncate`}
      style={{ maxWidth: `${maxTextWidth || 100}%` }}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {text}
    </p>
  );
};

TextEllipsis.defaultProps = {
  text: "",
  maxTextWidth: 0,
};

export default TextEllipsis;
