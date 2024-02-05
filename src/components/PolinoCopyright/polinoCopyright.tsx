import polinoLogoImage from "@/assets/images/polino-logo.png";
import { HeartSvg } from "@/icons";
import Image from "next/image";

type Props = {};

const PolinoCopyright = (props: Props) => {
  return (
    <div className='flex justify-center items-center text-xs py-2 w-full'>
      توسعه یافته با
      <HeartSvg className='text-destructive mx-1' />
      توسط
      <Image
        {...polinoLogoImage}
        className='aspect-square w-5 mx-1'
        alt='polino team logo'
      />
    </div>
  );
};

export default PolinoCopyright;
