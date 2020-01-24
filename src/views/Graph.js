import React, { Component } from 'react'
import Page from '../components/Page'
import classes from './Graph.module.scss'

let canvasWidth = window.innerWidth - 256
let canvasHeight = window.innerHeight - 64

const editor = {
    width: canvasWidth,
    height: canvasHeight,
    origin: {
        x: canvasWidth / 2,
        y: canvasHeight / 2
    },
    scale: 1,
    nodes: [
        {
            type: 'point',
            data: {
                x: 1,
                y: 1
            }
        },
        {
            type: 'line',
            data: [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 1,
                },
            ]
        },
        {
            type: 'rect',
            data: [
                {
                    x: 1,
                    y: 2,
                },
                {
                    x: 1,
                    y: 1,
                },
                {
                    x: 2,
                    y: 1,
                },
                {
                    x: 2,
                    y: 2,
                },
            ]
        }
    ]
}
let _reDraw

class Graph extends Component {

    state = {}

    componentDidMount() {
        let { origin, scale } = editor
        const setState = data => {
            this.setState(data)
        }

        let canvas = document.getElementById('canvas')
        let ctx = canvas.getContext('2d')

        console.log('test', canvasWidth, canvasHeight)
        
        
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        ctx.width = canvasWidth
        ctx.height = canvasHeight

        const GRID_SIZE = 80

        function redraw() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            // ctx.fillRect(0, 0, 100, 100)

            // ctx.beginPath()
            // ctx.moveTo(0, 0)
            // ctx.lineTo(origin.x, origin.y)
            // ctx.stroke()
    
            function mathPointToCavasPt(pt) {
                return {
                    x: origin.x + pt.x * GRID_SIZE * scale,
                    y: origin.y - pt.y * GRID_SIZE * scale,
                }
            }

            function drawMathPoint(pt) {
                let p = mathPointToCavasPt(pt)
                ctx.beginPath()
                ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI)
                ctx.stroke()
            }

            function drawMathLine(line) {
                ctx.beginPath()
                let startPt = mathPointToCavasPt(line[0])
                let endPt = mathPointToCavasPt(line[1])
                ctx.moveTo(startPt.x, startPt.y)
                ctx.lineTo(endPt.x, endPt.y)
                ctx.stroke()
            }

            function drawMathRect(dots, isClose = false) {
                drawLines(dots, true)
            }

            function drawLines(dots, isClose = false) {
                ctx.beginPath()
                for (let i = 0; i < dots.length; i++) {
                    let pt = mathPointToCavasPt(dots[i])
                    if (i === 0) {
                        ctx.moveTo(pt.x, pt.y)
                    } else {
                        ctx.lineTo(pt.x, pt.y)
                    }
                }
                if (isClose) {
                    let firstPt = mathPointToCavasPt(dots[0])
                    ctx.lineTo(firstPt.x, firstPt.y)
                }
                ctx.stroke()
            }

            // 原点
            drawMathPoint({
                x: 0,
                y: 0
            })
            
            // x 轴
            ctx.strokeStype = '#999'
            ctx.beginPath()
            // ctx.moveTo(origin.x, origin.y)
            // ctx.lineTo(origin.x + 600, origin.y)
            ctx.moveTo(0, origin.y)
            ctx.lineTo(editor.height, origin.y)
            ctx.stroke()
            let axiosStart = origin.x - editor.width
            // for (let i = 0; i < 10; i++) {
            //     ctx.beginPath()
            //     ctx.moveTo(origin.x + i * 10, origin.y)
            //     ctx.lineTo(origin.x + 600, origin.y)
            //     ctx.stroke()
            // }
            // y 轴
            ctx.beginPath()
            ctx.moveTo(origin.x, 0)
            ctx.lineTo(origin.x, editor.height)
            ctx.stroke()

            for (let node of editor.nodes) {
                if (node.type === 'point') {
                    drawMathPoint(node.data)        
                }
                if (node.type === 'line') {
                    drawMathLine(node.data)        
                }
                if (node.type === 'rect') {
                    drawMathRect(node.data)        
                }

            }
        }

        _reDraw = redraw

        redraw()

        let rect = canvas.getBoundingClientRect()

        canvas.addEventListener('mousedown', e => {
            let downPt = {
                x: e.pageX - rect.left,
                y: e.pageY - rect.top,
            }
            let downState = {
                origin: {
                    x: origin.x,
                    y: origin.y,
                }
            }
            console.log('down', downPt)
            let handlerMouseMove
            let handlerMouseUp
            canvas.addEventListener('mousemove', handlerMouseMove =  e => {
                let movePt = {
                    x: e.pageX - rect.left,
                    y: e.pageY - rect.top,
                }
                console.log('move', movePt)
                let offsetX = movePt.x - downPt.x
                let offsetY = movePt.y - downPt.y
                origin.x = downState.origin.x + offsetX
                origin.y = downState.origin.y + offsetY
                redraw()
            })
            canvas.addEventListener('mouseup', handlerMouseUp =  e => {
                // let movePt = {
                //     x: e.pageX - rect.left,
                //     y: e.pageY - rect.top,
                // }
                console.log('up')
                canvas.removeEventListener('mousemove', handlerMouseMove)
                canvas.removeEventListener('mouseup', handlerMouseUp)
            })
        })

        
        canvas.addEventListener('mousewheel', e => {
            console.log('mousewheel', e)
            // e.stopPropagation()
            e.preventDefault()

            let oldScale = scale
            let oldOrigin = {
                x: origin.x,
                y: origin.y,
            }

            let scalePt = {
                x: e.pageX - rect.left,
                y: e.pageY - rect.top,
            }
            console.log('scalePt', scalePt)

            let unit
            if (e.deltaY <= 0) {
                unit = 1
            } else {
                unit = -1
            }
            let newScale = scale + 0.1 * unit
            console.log('newScale', newScale)
            if (newScale < 0.5) {
                newScale = 0.5
            }
            if (newScale > 4) {
                newScale = 4
            }


            origin.x = scalePt.x - ((scalePt.x - oldOrigin.x) * newScale / oldScale)
            origin.y = scalePt.y - ((scalePt.y - oldOrigin.y) * newScale / oldScale)
            // origin.y = 100
            scale = newScale
            redraw()
            return false
        })
        canvas.addEventListener('click', e => {
            // console.log('click', e)
            // alert('click')
            
        })
    }

    render() {
        const setState = data => {
            this.setState(data)
        }
        const { history } = this.props
        const { asd } = this.state

        // console.log('canvasWidth', window.clientWidth)

        function addPoint() {
            // alert(1)
            editor.nodes.push({
                type: 'point',
                data: {
                    x: 3,
                    y: 1
                }
            })
            _reDraw()
        }

        function addLine() {
            // alert(1)
            editor.nodes.push({
                type: 'line',
                data: [
                    {
                        x: 0,
                        y: 0
                    },
                    {
                        x: 4,
                        y: 1
                    }
                ]
            })
            _reDraw()
        }

        return (
            <Page title="" noSide={true}>
                <div className={classes.editor}>
                    <div className={classes.toolBox}>
                        <button type="button" onClick={addPoint}>add point</button>
                        <button type="button" onClick={addLine}>add line</button>
                    </div>
                    <div className={classes.canvasBox}>
                        <canvas className={classes.canvas} id="canvas"></canvas>
                    </div>
                </div>
            </Page>
        )
    } 
}

export default Graph
