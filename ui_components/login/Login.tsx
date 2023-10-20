import Image from "next/image";
import * as React from "react";
import { icons } from "../../utils/images";
import { Button } from "../shared";

interface ILoginProps {
  handleSetupChest: () => void;
  loader?: boolean;
  signIn: () => Promise<void>;
}

function Login(props: ILoginProps) {
  const { handleSetupChest, loader, signIn } = props;

  return (
    <div className="h-[100vh] w-full bg-primary-50 relative overflow-clip">
      <Image
        className="absolute left-0 top-20 w-full"
        src={icons.loginBg}
        alt="login"
      />
      <div className="text-center absolute bottom-[200px] left-1/2 -translate-x-1/2 w-[calc(100vw-32px)]">
        <h1 className="mb-4 text-white font-extrabold text-xl">
          Grow your future
        </h1>
        <p className="text-text-100 paragraph_medium">
          Invest for your future and get rewarded
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[calc(100vw-32px)] xl:w-[15%]">
        <Button
          onClick={signIn}
          variant={"primary"}
          label="Login with Google"
          leftIcon={icons.googleIcon.src}
          className=""
        />
      </div>
    </div>
  );
}

export default Login;
