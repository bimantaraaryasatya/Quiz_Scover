import { ReactNode } from "react";
import check_mark from "@/public/emote/check_mark.png"
import play_button from "@/public/emote/play_button.png"
import warning from "@/public/emote/warning.png"

type Props = {
    children: ReactNode
    type: "button" | "submit" | "reset",
    onClick?: () => void
    className?: string
}

export const MainButton = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-primary text-white rounded-md py-2 px-4 hover:bg-primary hover:cursor-pointer flex gap-2 items-center ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const SecondButton = ({ children, type, onClick, className }: Props) => {
    return (
        <button className={`text-sm bg-transparent text-primary border border-primary rounded-md py-2 px-4 hover:cursor-pointer font-bold ${className}`} type={type} onClick={() => { if (onClick) onClick() }}>
            {children}
        </button>
    )
}

export const SubmitButton = ({ children, type, onClick, className }: Props) => {
    return(
        <button className={`flex text-sm text-center font-bold bg-transparent text-green-500 border border-green-500 hover:cursor-pointer rounded-md py-2 px-4 ${className}` } type={type} onClick={() => { if (onClick) onClick() }}>
            <div>
                <img src={check_mark.src} alt="Check mark" className="w-4 h-4 mr-2" />
            </div>
            <div>
                {children}
            </div>
        </button>
    )
}

export const UnsureButton = ({ children, type, onClick, className }: Props) => {
    return(
        <button className={`flex text-sm text-center font-bold bg-transparent text-yellow-500 border border-yellow-500 hover:cursor-pointer rounded-md py-2 px-4 ${className}` } type={type} onClick={() => { if (onClick) onClick() }}>
            <div>
                <img src={warning.src} alt="Warning" className="w-4 h-4 mr-2" />
            </div>
            <div>
                {children}
            </div>
        </button>
    )
}

export const NextButton = ({ children, type, onClick, className }: Props) => {
    return(
        <button className={`flex text-sm text-center font-bold bg-transparent text-gray-500 border border-gray-500 hover:cursor-pointer rounded-md py-2 px-4 ${className}` } type={type} onClick={() => { if (onClick) onClick() }}>
            <div>
                <img src={play_button.src} alt="Play Button" className="w-4 h-4 mr-2" />
            </div>
            <div>
                {children}
            </div>
        </button>
    )
}
