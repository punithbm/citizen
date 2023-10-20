import Image from "next/image";

import { TImages, TNextImage } from "../utils/images";

interface ISecondaryBtn {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  leftImage?: TNextImage | TImages;
  rightImage?: TNextImage | TImages | string;
  className?: string;
  showShareIcon?: boolean;
  btnDisable?: boolean;
  loading?: boolean;
}

export default function SecondaryBtn(props: ISecondaryBtn) {
  const { title, onClick, rightImage, leftImage, showShareIcon, className, btnDisable, loading } = props;
  return (
    <button
      className={`py-4 support_text_bold rounded-lg flex gap-1 items-center w-full justify-center border max-w-[400px] mx-auto ${className}`}
      disabled={btnDisable}
      onClick={onClick}
    >
      {leftImage && !loading && <Image src={leftImage} alt="right-image" />}
      {!loading && title}
      {!loading && rightImage && <Image src={rightImage} alt="right-image" />}
      {loading && (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </button>
  );
}
