import { FC } from "react";
import "./GlobalStyle.scss";

type Props = {
  children: any;
};

export const GlobalStyle: FC<Props> = ({ children }) => {
  return children;
};
