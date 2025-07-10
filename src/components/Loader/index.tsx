import loader from "../../assets/loader.svg";

type Props = { height?: number };

export const Loader = ({ height }: Props) => {
  return <img style={{ height: height ? height + "px" : "auto" }} src={loader} />;
};
