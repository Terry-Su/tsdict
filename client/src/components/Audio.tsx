import React, { Component } from 'react'
import styled from 'styled-components'

import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  
}

@States( `audio`, `text`, `available`, )
export default class Audio extends Component<Props> {
  text: string
  available: boolean
  
  audioRef: any = React.createRef()
  get audio(): HTMLAudioElement { return this.audioRef.current }

  componentDidUpdate(prevProps) {
    if ( prevProps.available !== this.available ) {
      this.available && this.audio.play()
    }
  }

  render() {
    return (
      <StyledRoot hidden>
        {this.available &&<audio ref={ this.audioRef }>
          <source src={`http://dict.youdao.com/dictvoice?audio=${encodeURIComponent(this.text)}&type=2`}/>
          <source src={`http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=8&text=${encodeURIComponent(this.text)}`}/>
        </audio>
        }
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div``