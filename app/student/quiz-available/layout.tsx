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
      <SideBarTemplate title="Quiz Available" id="quiz-available" menuList={MenuList}>
         {children}
      </SideBarTemplate>
   )
}

export default RootLayout