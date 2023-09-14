import './Button.scss'

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({onClick, label}: ButtonProps) {
    return (
        <button
        onClick={onClick}
        className="button"
        >
        {label}
        </button>
    )
}