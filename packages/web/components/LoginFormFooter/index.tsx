import React from 'react'
import Button, { ButtonApperance, ButtonSize } from '../Button'

import styles from './index.module.css'

interface LoginFormFooterProps {
  text?: string
  buttonText?: string
  onClick?: () => void
}

export default function LoginFormFooter({ text, buttonText, onClick }: LoginFormFooterProps) {
  return (
    <footer className={styles.footer}>
      <p>{text}</p>
      <Button size={ButtonSize.S} apperance={ButtonApperance.SECONDARY} onClick={onClick}>
        {buttonText}
      </Button>
    </footer>
  )
}
