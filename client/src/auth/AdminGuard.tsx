import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../App';

interface Props {
    children: ReactNode;
}

function AdminGuard({ children }: Props) {
    const context = useContext(AppContext);

    function isNotAdmin(): boolean {
        return !context?.user?.isAdmin || false;
    }

    return isNotAdmin() ? (
        <Navigate
            to='/'
            replace={true}
        />
    ) : (
        <>{children}</>
    );
}

export default AdminGuard;
