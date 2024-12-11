

interface IButtonProps {
    value: string
    type?: 'submit' | 'reset' | 'button'
    style?: string
    fontSize?: string
    disabled?: boolean
    onClick?: () => void
}

export default function Button({ value, style, type, fontSize, disabled, onClick }: IButtonProps) {
    return (
        <button
            type={type ? type : 'button'}
            onClick={() => {
                if(onClick && !disabled){
                    onClick()
                }
            }}
            className={`flex items-center justify-center ${disabled ? ' bg-gray-500 cursor-not-allowed ' : 'bg-black hover:brightness-90 cursor-pointer'} shadow-lg  text-white font-[600] rounded-lg px-4 py-2 w-4/5 h-10  ${ fontSize ? fontSize : 'text-lg'}  ${style} truncate`}>
            {value}
        </button>
    )
}
