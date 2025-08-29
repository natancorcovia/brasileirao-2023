import Image from 'next/image';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';

const Header = () => {
  return (
    <Card className="flex flex-row items-center justify-between bg-amber-300 p-5">
      <Image alt="logo do brasileirão 2023" src="/logo.png" height={10} width={58} />
      <Button size="icon" className="bg-gray-800">
        <MenuIcon />
      </Button>
    </Card>
  );
};

export default Header;
