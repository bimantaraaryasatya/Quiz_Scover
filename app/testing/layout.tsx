import SideBarTemplate from "@/components/SideBarTemplate";
import MenuList from "./menuList";

export const metadata = {
   title: 'Dashboard Admin | Kos Hunter',
   description: 'Kos Hunter'
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
   return(
      <SideBarTemplate title="Home" id="home" menuList={MenuList}>
         {children}
      </SideBarTemplate>
   )
}

export default RootLayout