import SideBarTemplate from "@/components/SideBarTemplate";
import MenuList from "../menuList";

export const metadata = {
   title: 'Dashboard Admin | Quiz Scover',
   description: 'Quiz Scover'
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