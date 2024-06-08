"use client";

import React from "react";

interface Props {
  if: boolean | string | number | unknown;
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;
}

/*
  This component allows the conditional rendering in a more consise and readable manner by conforming to
  react declarative style
*/
export const ShouldRender = (props: Props) => {
  const component = (props.children as React.ReactElement) || (
    <React.Fragment />
  );

  return props.if ? component : <React.Fragment />;
};
