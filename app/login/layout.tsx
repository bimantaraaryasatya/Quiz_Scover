import MenuList from "../admin/menuList"

export const metadata = {
   title: 'Login | Quiz Scover',
   description: 'Kos Hunter'
}

type PropsLayout = {
   children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return(
        <>
            {children}
        </>
    )   
}

export default RootLayout