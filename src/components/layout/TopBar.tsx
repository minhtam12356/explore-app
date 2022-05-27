import React from 'react'

interface TopBarProps {
    loginSuccess?: boolean;
    content: string;
}

function TopBar({ loginSuccess = false, content }: TopBarProps) {
    return (
        <div className="flex justify-between">
            <div className="topbar--logo">Logo</div>
            <div className={`topbar--${loginSuccess ? 'login-success' : 'get-started'}`}>{content}</div>
        </div>
    )
}

export default TopBar