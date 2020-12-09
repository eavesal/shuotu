import React from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  id: string
}

interface PortalState {
  element?: HTMLElement
}

export class Portal extends React.Component<PortalProps, PortalState> {
  constructor(props: PortalProps) {
    super(props)

    this.state = {
      element: null,
    }
  }

  componentDidMount() {
    this.setState({
      element: document.querySelector('#' + this.props.id),
    })
  }

  render() {
    if (!this.state.element) {
      return null
    }

    return ReactDOM.createPortal(this.props.children, this.state.element)
  }
}
