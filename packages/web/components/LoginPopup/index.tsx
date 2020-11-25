import React, { useState } from 'react'
import OTPLoginForm from '../OTPLoginForm'
import PasswordLoginForm from '../PasswordLoginForm'

import styles from './index.module.css'

interface LoginProps {
  onLoginSuccess?: () => void
}

enum TABS {
  OTP_LOGIN = 'OTP_LOGIN',
  PASSWORD_LOGIN = 'PASSWORD_LOGIN',
}

export default function LoginPopup({ onLoginSuccess }: LoginProps) {
  const [current, setCurrent] = useState(TABS.OTP_LOGIN)
  return (
    <div className={styles.main}>
      <h2>登录{current === TABS.OTP_LOGIN ? '/注册' : ''}</h2>
      <ul>
        <li onClick={() => setCurrent(TABS.OTP_LOGIN)}>验证码登录/注册</li>
        <li onClick={() => setCurrent(TABS.PASSWORD_LOGIN)}>用户名密码登录</li>
      </ul>
      {current === TABS.OTP_LOGIN && <OTPLoginForm onLoginSuccess={onLoginSuccess} />}
      {current === TABS.PASSWORD_LOGIN && <PasswordLoginForm onLoginSuccess={onLoginSuccess} />}
    </div>
  )
}
