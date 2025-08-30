import Image from 'next/image';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between p-5">
      <Image alt="logo do brasileirão 2023" src="/logo.png" height={10} width={58} />
      <Button size="icon" className="bg-gray-800">
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
