import { Stage, Sprite, Container, Text, useTick } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
import { useRef, useReducer } from 'react';
import bunny from './images/bunny.png'

const height = 450;
const width = 600;
const options = {
  backgroundColor: 0x1099bb,
  height,
  width,
};


const reducer = (_, { data }) => data

const Bunny = ({ scale }) => {
  const position = useRef('')

  function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }
  
  function onDragEnd() {
      this.alpha = 1;
      this.dragging = false;
      this.data = null;
  }
  
  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
        position.current = newPosition
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
  }

  const [posi, update] = useReducer(reducer)

  useTick(delta => {
    update({
      type: 'update',
      data: {
        x: position.current.x,
        y: position.current.y,
      },
    })
  })

  return (
    <>
    <Sprite
      // init
      texture={PIXI.Texture.from(bunny)}
      anchor={new PIXI.Point(0.5, 0.5)}
      scale={scale}
      // interactions
      interactive={true}
      buttonMode={true}
      pointerdown={onDragStart}
      pointerup={onDragEnd}
      pointerupoutside={onDragEnd}
      pointermove={onDragMove}
    />
    <Text
      x={100}
      y={300}
      text={JSON.stringify(posi)}
      style={
      new PIXI.TextStyle({
        align: 'center',
        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
        fontSize: 16,
        fontWeight: 200,
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#01d27e',
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: '#ccced2',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
      })}
    />
    </>
  )
}

function App () {
  return (
    <>
      <h1>Drag me!</h1>
      <Stage options={options}>
        <Container>
          <Bunny scale={2}/>
        </Container>
      </Stage>
    </>
  )
}

export default App;
