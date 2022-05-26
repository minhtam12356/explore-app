import React from 'react'

interface TopBarProps {
    loginSuccess: boolean;
    userName: string;
}

function TopBar({ loginSuccess = false, userName }: TopBarProps) {
    return (
        <div className="flex justify-between">
            <div className="home--logo">Logo</div>
            {!loginSuccess && <div className="home--get-started">Get started</div>}
            {loginSuccess && <div className="home--login-success">{userName}</div>}
        </div>
    )
}

export default TopBar