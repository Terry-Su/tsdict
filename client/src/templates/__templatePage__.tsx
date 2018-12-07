import React, { Component } from 'react'

import TopbarLayout from '@/components/layouts/TopbarLayout'
import mapStateAndStyle from '@/utils/mapStateAndStyle'

export default mapStateAndStyle()(
  class TemplatePage extends Component<any, any> {
    render() {
      return (
        <TopbarLayout>
          TemplatePage
        </TopbarLayout>
      )
    }
  }
)