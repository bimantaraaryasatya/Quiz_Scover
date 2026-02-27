import SideBarTemplate from "@/components/SideBarTemplate";
import MenuList from "../menuList";

export const metadata = {
   title: 'Dashboard Tentor | Quiz Scover',
   description: 'Quiz Scover'
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
   return(
      <SideBarTemplate title="Quiz" id="quiz" menuList={MenuList}>
         {children}
      </SideBarTemplate>
   )
}

export default RootLayout