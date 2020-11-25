import React, { useCallback, useState } from 'react'
import cx from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'

import DropdownMenu from '../DropdownMenu'

import styles from './index.module.css'
import { useHistory } from 'react-router-dom'
import { useLogout } from '../../../services/auth'

interface UserNavCardProps {
  username: string
}

const options = [
  [
    {
      title: '设置',
      value: '/user/setting',
    },
  ],
  [
    {
      title: '退出登录',
      value: 'LOGOUT',
    },
  ],
]

export default function UserNavCard({ username }: UserNavCardProps) {
  const [isMenuVisiable, setMenuVisibility] = useState(false)
  const history = useHistory()
  const [logout] = useLogout()

  const onMenuItemClicked = useCallback(
    (value: string) => {
      setMenuVisibility(false)

      if (value === 'LOGOUT') {
        return logout()
      }

      return history.push(value)
    },
    [history, logout, setMenuVisibility],
  )

  return (
    <OutsideClickHandler onOutsideClick={() => setMenuVisibility(false)} useCapture>
      <div className={styles.main}>
        <div className={styles.name}>{username}</div>
        <div
          className={cx(styles.dropdown, isMenuVisiable ? styles.dropdownActive : '')}
          onClick={() => setMenuVisibility(!isMenuVisiable)}
        >
          <i>&#xe74f;</i>
          {isMenuVisiable && <DropdownMenu items={options} onItemClicked={onMenuItemClicked} />}
        </div>
      </div>
    </OutsideClickHandler>
  )
}
