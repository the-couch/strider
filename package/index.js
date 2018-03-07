import React from 'react'

class Hustler extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeIndex: props.activeIndex || 0,
      active: true,
      hiding: false
    }

    this.children = React.Children.toArray(this.props.children)
  }

  componentWillReceiveProps () {
    this.children = React.Children.toArray(this.props.children)
  }

  hide (cb) {
    this.setState({
      hiding: true,
      active: false
    }, () => {
      setTimeout(() => {
        cb()
      }, this.props.transitionSpeed)
    })
  }

  show () {
    setTimeout(() => {
      this.setState({
        active: true
      })
    }, this.props.transitionSpeed)
  }

  shouldStep (index) {
    return index !== this.state.activeIndex
  }

  next () {
    let curr = this.state.activeIndex
    const nextIndex = this.clamp(++curr)

    if (this.shouldStep(nextIndex)) {
      this.hide(() => {
        this.setState(state => ({
          activeIndex: nextIndex,
          hiding: false
        }), () => {
          setTimeout(() => {
            this.show()
          }, 0)
        })
      })
    }
  }

  prev () {
    let curr = this.state.activeIndex
    const prevIndex = this.clamp(--curr)

    if (this.shouldStep(prevIndex)) {
      this.hide(() => {
        this.setState(state => ({
          activeIndex: prevIndex,
          hiding: false
        }), () => {
          this.show()
        })
      })
    }
  }

  goTo (index) {
    this.hide(() => {
      this.setState(state => ({
        activeIndex: this.clamp(index),
        hiding: false
      }), () => {
        this.show()
      })
    })
  }

  clamp (index) {
    return Math.min(Math.max(index, 0), this.children.length - 1)
  }

  render () {
    const step = this.children[this.state.activeIndex]

    return React.cloneElement(step, {
      ...step.props,
      ...this.state,
      next: this.next.bind(this),
      prev: this.prev.bind(this),
      goTo: this.goTo.bind(this)
    })
  }
}

function Step ({ children, ...props }) {
  return children(props)
}

module.exports = {
  Hustler,
  Step
}
