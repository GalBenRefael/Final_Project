import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

function FormLayout({ children }: Props) {
    return (
        <div className='m-4  d-flex justify-content-center'>
            <div className='row'>{children}</div>
        </div>
    );
}

export default FormLayout;
