import { Button as ShadcnButton } from 'shadcn-ui';

const Button = ({ children, onClick, className, ...props }) => {
    return (
        <ShadcnButton onClick={onClick} className={className} {...props}>
            {children}
        </ShadcnButton>
    );
};

export default Button;