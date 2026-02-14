import { ReactNode } from "react";
import check_mark from "@/public/emote/check_mark.png"
import cross_mark from "@/public/emote/cross_mark.png"
import warning from "@/public/emote/warning.png"

type Props = {
    children: ReactNode
    className?: string
}

export const QuizDifficulty = ({children, className}: Props) => {
    return(
        <div className={`text-sm text-center font-bold bg-secondary text-primary rounded-md py-2 px-4 ${className}`}>
            {children}
        </div>
    )
}

export const ClassTag = ({children, className}: Props) => {
    return(
        <div className={`text-sm text-center font-bold bg-primary text-white rounded-md py-2 px-4 ${className}`}>
            {children}
        </div>
    )
}

export const DoneTag = ({children, className}: Props) => {
    return(
        <div className={`flex text-sm text-center font-bold bg-transparent text-green-500 border border-green-500 rounded-md py-2 px-4 ${className}`}>
            <div>
                <img src={check_mark.src} alt="Check mark" className="w-4 h-4 mr-2" />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export const DueTag = ({children, className}: Props) => {
    return(
        <div className={`flex text-sm text-center font-bold bg-transparent text-yellow-500 border border-yellow-500 rounded-md py-2 px-4 ${className}`}>
            <div>
                <img src={warning.src} alt="Warning" className="w-4 h-4 mr-2" />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export const OverdueTag = ({children, className}: Props) => {
    return(
        <div className={`flex text-sm text-center font-bold bg-transparent text-red-500 border border-red-500 rounded-md py-2 px-4 ${className}`}>
            <div>
                <img src={cross_mark.src} alt="Cross mark" className="w-4 h-4 mr-2" />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}