# strider

A stepper library, for use in any type of flow, onboarding, quiz. With some helpers for animating between steps but without getting too in the way.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Usage

```javascript
import React from 'react'
import { Strider, Step } from 'react-strider'
import cx from 'classnames'

import Layout from './Layout'

import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'

class Quiz extends React.Component {
  constructor () {
    super()
    this.state = {
      products: []
    }
  }
  render () {
    return (
      <Layout>
        <Strider activeIndex={0} transitionSpeed={400}>
          <Step>
            {({ next, goTo, active, hiding, activeIndex }) => (
              <div className={cx('step__wrapper', {
                'is-active': active,
                'is-hiding': hiding
              })}>
                <StepOne next={next} />
              </div>
            )}
          </Step>
          <Step>
            {({ next, prev, goTo, active, hiding, activeIndex }) => (
              <div className={cx('step__wrapper', {
                'is-active': active,
                'is-hiding': hiding
              })}>
                <StepTwo next={next} step={activeIndex} prev={prev} handleProduct={(i) => this.setState({product: i})} />
              </div>
            )}
          </Step>
          <Step>
            {({ next, prev, goTo, active, hiding, activeIndex }) => (
              <div className={cx('step__wrapper', {
                'is-active': active,
                'is-hiding': hiding
              })}>
                <StepThree next={next} step={activeIndex} prev={prev} />
              </div>
            )}
          </Step>
          <Step>
            {({ next, prev, goTo, active, hiding, activeIndex }) => (
              <div className={cx('step__wrapper', {
                'is-active': active,
                'is-hiding': hiding
              })}>
                <StepFour next={next} step={activeIndex} prev={prev} />
              </div>
            )}
          </Step>
        </Strider>
      </Layout>
    )
  }
}

```

## API

`next` - goes to the next step if there is one

`prev` - goes to the previous step if there is one

`goTo` - allows you to jump to any step `0` being the root step

`hiding` - a simple set timeout for applying animations between steps, you could also apply set timeouts on the next/prev call to add additional animations within your own components

`active` - the current active step, can be used again for animating

`activeIndex` - the current index, helpful if you want to have some ui for visualizing where you are in the flow, or numbered steps like step 3 of 7 for example.



MIT License
