export const metadata = {
    title: 'Quiz Detail | Quiz Scover',
    description: 'Quiz detail page'
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <>
            {children}
        </>
    )
}

export default RootLayout
