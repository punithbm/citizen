import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <Link href={""} target="_blank">
        <div className="flex gap-2 justify-center items-center fixed bottom-4 left-1/2 -translate-x-1/2">
          <p className="text-[12px] text-white">Built on:</p>

          <p className="text-[14px] font-medium text-white"></p>
        </div>
      </Link>
    </footer>
  );
};
export default Footer;
