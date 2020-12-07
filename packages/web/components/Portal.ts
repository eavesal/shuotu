import React from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  id: string
}

export class Portal extends React.Component<PortalProps> {
  element: HTMLElement

  componentDidMount() {
    this.element = document.querySelector('#' + this.props.id)
  }

  render() {
    if (!this.element) {
      return null
    }

    return ReactDOM.createPortal(this.props.children, this.element)
  }
}
