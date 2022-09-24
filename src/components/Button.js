import React from "react";

const Button = ({ text, dispatch, dispatchType, classNames }) => {
  return (
    <button
      className={classNames}
      type="button"
      onClick={() =>
        dispatch({
          type: dispatchType,
          payload: { data: text },
        })
      }
    >
      {text}
    </button>
  );
};

export default Button;
