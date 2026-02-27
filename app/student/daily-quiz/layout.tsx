import SideBarTemplate from "@/components/SideBarTemplate";
import MenuList from "../menuList";

export const metadata = {
   title: 'Dashboard Student | Quiz Scover',
   description: 'Quiz Scover'
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
   return(
      <SideBarTemplate title="Daily Quiz" id="daily-quiz" menuList={MenuList}>
         {children}
      </SideBarTemplate>
   )
}

export default RootLayout