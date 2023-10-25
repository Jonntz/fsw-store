import { HomeIcon, ListOrderedIcon, LogInIcon, MenuIcon, PercentCircleIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

const Header = () => {
    return <Card className="flex justify-between p-[1.875rem] items-center">
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader className="text-left text-lg font-semibold">Menu</SheetHeader>

                <div className="mt-2 flex flex-col gap-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                       <LogInIcon size={16} />
                       Fazer Login
                    </Button>

                    <Button variant="outline" className="w-full justify-start gap-2">
                       <HomeIcon size={16} />
                       Inicio
                    </Button>

                    <Button variant="outline" className="w-full justify-start gap-2">
                       <PercentCircleIcon size={16} />
                       Ofertas
                    </Button>

                    <Button variant="outline" className="w-full justify-start gap-2">
                       <ListOrderedIcon size={16} />
                       Catálogo
                    </Button>
                </div>
            </SheetContent>
        </Sheet>

        <h1 className="font-semibold text-lg ">
            <span className="text-primary">FSW</span> Store
        </h1>

        <Button size="icon" variant="outline">
            <ShoppingCartIcon />
        </Button>
    </Card>;
}
 
export default Header;