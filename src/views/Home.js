import React from 'react'
import Button from '@material-ui/core/Button'
import classes from './Home.module.scss'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import classnames from 'classnames'
import _ from 'lodash'
import Page from '../components/Page'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { HotTable } from '@handsontable/react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const saveAs = window.saveAs

export default class Home extends React.Component {

    state = {
        conditions: [
            {
                type: 'point',
                data: {
                    name: 'A',
                    x: 1,
                    y: 2
                }
            },
            {
                type: 'point',
                data: {
                    name: 'B',
                    x: 100,
                    y: 0
                }
            },
            {
                type: 'point',
                data: {
                    name: 'C',
                    x: 100,
                    y: 100
                }
            },
            {
                type: 'line',
                data: {
                    name: 'D',
                    A: 3,
                    B: 4,
                    C: 5,
                }
            }
        ],
        results: [
            // {
            //     type: 'distance',
            //     data: ['A', 'B'],
            //     result: '100'
            // }
        ],
        text: `1
22
333
4444
Hello
World
This is Cat`,
        result: '',
        formData: {
            prefix: '123',
            suffix: 'aaa',
        },
        commonForm: {

        },

        curType: {
            value: 'point'
        },

        addDialogVisible: false,

        count: 0,
        count2: 0,
        open: false,
        teamName: '',
        teamNameA: 'A',
        teamNameB: 'B',
        editTeamName: '',
        rules: [
            // {
            //     type: 'prefix',
            //     attr: {
            //         text: '这是前缀'
            //     }
            // },
            // {
            //     type: 'suffix',
            //     attr: {
            //         text: '这是后缀'
            //     }
            // }
        ],
        activeRule: {
            type: 'prefix',
            name: '前缀',
            attr: {
                text: '123'
            }
        },

        distanceForm: {
            first: 'B',
            second: 'C',
        }
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        const setState = data => {
            this.setState(data)
        }
        const { history } = this.props
        let state = this.state

        const { tableData, conditions, results, distanceForm, commonForm, curType, activeRule, addDialogVisible } = state

        function view9() {
            let newTableData = tableData.filter((item, index) => {
                return item[2] === '11'
            })
            setState({
                tableData: newTableData,
            })
        }

        let randomArr = [12, 8, 20, 9, 14, 13, 10, 1, 6, 23, 5, 22, 4, 7, 18, 17, 24, 15, 3, 16, 11, 2, 19, 21]
        console.log('time', randomArr[new Date().getHours()])

        class Point {
            constructor() {
              this.x = 0
              this.y = 0
            }
        }
    
        class Rect {
    
        }
    
        class Segment {}
    
        function getDisatance(dot, dot2) {
            return Math.sqrt(Math.pow(dot.x - dot2.x, 2) + Math.pow(dot.y - dot2.y, 2))
        }
    
        function dot2Line(dot, line) {
            return Math.abs((line.A * dot.x + line.B * dot.y + line.C) / (Math.sqrt(Math.pow(line.A, 2) + Math.pow(line.B, 2))))
        }
    
        function dot2Plane(dot, plane) {
            return (Math.abs(plane.A * dot.x + plane.B * dot.y + plane.C * dot.z + plane.D)) / (Math.sqrt(Math.pow(plane.A, 2) + Math.pow(plane.B, 2) + Math.pow(plane.C, 2)))
        }

        let distance = getDisatance({
            x: 0,
            y: 0
        }, {
            x: 2,
            y: 0
        })

        function ConditionItem(item, index) {

            function removeItem(item, index) {
                conditions.splice(index, 1)
                setState({
                    conditions,
                })
            }

            return (
                <div className={classes.item} key={index}>
                    <div>
                        {item.type === 'point' &&
                            <div>点 { item.data.name }：({ item.data.x }, { item.data.y })</div>
                        }
                        {item.type === 'line' &&
                            <div>线 { item.data.name }：{ item.data.A }x + { item.data.B }y + { item.data.C } = 0</div>
                        }
                    </div>
                    <div onClick={() => removeItem(item, index)}>删除</div>
                </div>
            )
        }

        function ResultItem(item, index) {

            function getDotDistance() {

            }

            return (
                <div key={index}>
                    {item.type === 'distance' &&
                        <div>{ item.data[0] } 和 { item.data[1] } 的距离：{ item.result }</div>
                    }
                </div>
            )
        }

        function addResult() {
            let item1 = conditions.find(item => item.data.name === distanceForm.first)
            let item2 = conditions.find(item => item.data.name === distanceForm.second)
            if (item1.type === 'point' && item2.type === 'point') {
                let p1 = item1.data
                let p2 = item2.data
                console.log('addResult', distanceForm.first, p1)
                // if (p1.type)
                results.push({
                    type: 'distance',
                    data: [distanceForm.first, distanceForm.second],
                    result: getDisatance(p1, p2)
                })
            }

            if ((item1.type === 'point' && item2.type === 'line') || (item1.type === 'line' && item2.type === 'point')) {
                let p
                let line
                if (item1.type === 'point') {
                    p = item1.data
                    line = item2.data
                } else {
                    p = item2.data
                    line = item1.data
                }
                // if (p1.type)
                results.push({
                    type: 'distance',
                    data: [distanceForm.first, distanceForm.second],
                    result: dot2Line(p, line)
                })
            }

            setState({
                results,
            })
        }

        function addMidPoint() {
            let item1 = conditions.find(item => item.data.name === distanceForm.first)
            let item2 = conditions.find(item => item.data.name === distanceForm.second)
            if (item1.type === 'point' && item2.type === 'point') {
                let p1 = item1.data
                let p2 = item2.data
                console.log('addResult', distanceForm.first, p1)
                // if (p1.type)
                function getMidPoint(pt, pt2) {
                    return {
                        x: (pt.x + pt2.x) / 2,
                        y: (pt.y + pt2.y) / 2,
                    }
                }
                let midPoint = getMidPoint(p1, p2)
                conditions.push({
                    type: 'point',
                    data: {
                        name: commonForm.name,
                        x: midPoint.x,
                        y: midPoint.y,
                    }
                })
                setState({
                    conditions,
                })
            } else {
                // alert('')
            }
        }

        let options = conditions.filter(item => item.type === 'point' || item.type === 'line').map(item => {
            return {
                value: item.data.name,
                label: item.data.name
            }
        })

        function OptionItem(item, index) {
            return <MenuItem value={item.value} key={item.value}>{ item.label }</MenuItem>
        }

        function handlerCommonInputChange(name, e, type) {
            if (type === 'number') {
                distanceForm[name] = parseInt(e.target.value)
            } else {
                distanceForm[name] = e.target.value
            }
            setState({
                distanceForm
            })
        }

        function handlerCommonInputChange2(name, e, type) {
            if (type === 'number') {
                commonForm[name] = parseInt(e.target.value)
            } else {
                commonForm[name] = e.target.value
            }
            setState({
                commonForm
            })
        }

        function getName() {
            return 'ASD'
        }

        function addDot() {
            conditions.push({
                type: 'point',
                data: {
                    name: commonForm.name || getName(),
                    x: commonForm.x || 0,
                    y: commonForm.y || 0
                }
            })
            setState({
                conditions,
            })
        }

        function addLine() {
            conditions.push({
                type: 'line',
                data: {
                    name: commonForm.name,
                    A: commonForm.A,
                    B: commonForm.B,
                    C: commonForm.C
                }
            })
            setState({
                conditions,
            })
        }

        let types = [
            {
                value: 'point',
                name: '点',
            },
            {
                value: 'line',
                name: '直线',
            },
            {
                value: 'midPoint',
                name: '点（中点）',
            }
        ]

        function TypeItem(item, index) {

            function selectType(item) {
                setState({
                    curType: item
                })
            }
            
            return (
                <div className={classnames(classes.item, {[classes.active]: item.value === curType.value})} 
                    onClick={() => selectType(item)} key={index}>{item.name}</div>
            )
        }

        return (
            <Page title="数学+" menu={[
                // {
                //     label: '重置',
                //     click() {
                //         setState({
                //             // count: 0,
                //             // count2: 0,
                //             // teamNameA: 'A',
                //             // teamNameB: 'B',
                //         })
                //     }
                // },
            ]}>
                <div className={classes.container}>
                    <div>
                        <div>条件：</div>
                        {conditions.length === 0 &&
                            <div>请添加条件</div>
                        }
                        <div className={classes.conditionList}>
                            {conditions.map(ConditionItem)}
                        </div>
                    </div>

                    
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.checkedA}
                                // onChange={handleChange('checkedA')}
                                value="checkedA"
                                // inputProps={{
                                // 'aria-label': 'primary checkbox',
                                // }}
                            />
                        }
                        label="头部"
                    /> */}
                    {/* <Button className={classes.btn} variant="contained" onClick={test}>测试</Button> */}
                    <Button className={classes.btn} variant="contained" onClick={addDot}>添加条件</Button>

                    {/* <div>添加条件：</div> */}
                    <div className={classes.typeList}>
                        {types.map(TypeItem)}
                    </div>
                    {curType.value === 'point' &&
                        <div>
                            <div>添加点</div>
                            <div>
                                <TextField
                                    label="名称"
                                    // className={classes.textField}
                                    value={commonForm.name}
                                    onChange={e => handlerCommonInputChange2('name', e)}
                                />
                                <TextField
                                    label="x"
                                    type="number"
                                    // className={classes.textField}
                                    value={commonForm.x}
                                    onChange={e => handlerCommonInputChange2('x', e, 'number')}
                                />
                                , 
                                <TextField
                                    label="y"
                                    type="number"
                                    // className={classes.textField}
                                    value={commonForm.y}
                                    onChange={e => handlerCommonInputChange2('y', e, 'number')}
                                />
                            </div>
                            <div className={classes.actions}>
                                <Button className={classes.btn} variant="contained" onClick={addDot}>添加点</Button>
                            </div>
                        </div>
                    }
                    {curType.value === 'line' &&
                        <div>
                            <div>
                                添加直线
                            </div>
                            <div>
                                <TextField
                                    label="名称"
                                    // className={classes.textField}
                                    value={commonForm.name}
                                    onChange={e => handlerCommonInputChange2('name', e)}
                                />
                                <TextField
                                    label="A"
                                    type="number"
                                    // className={classes.textField}
                                    value={commonForm.A}
                                    onChange={e => handlerCommonInputChange2('A', e, 'number')}
                                />
                                , 
                                <TextField
                                    label="B"
                                    type="number"
                                    // className={classes.textField}
                                    value={commonForm.B}
                                    onChange={e => handlerCommonInputChange2('B', e, 'number')}
                                />
                                , 
                                <TextField
                                    label="C"
                                    type="number"
                                    value={commonForm.C}
                                    // className={classes.textField}
                                    onChange={e => handlerCommonInputChange2('C', e, 'number')}
                                />
                            </div>
                            <div className={classes.actions}>
                                <Button className={classes.btn} variant="contained" onClick={addLine}>添加线</Button>
                            </div>
                        </div>
                    }

                    {curType.value === 'midPoint' &&
                        <div>
                            <div>
                                添加中点
                            </div>
                            <div>
                                <TextField
                                    label="名称"
                                    // className={classes.textField}
                                    value={commonForm.name}
                                    onChange={e => handlerCommonInputChange2('name', e)}
                                />
                                <Select
                                    value={distanceForm.first}
                                    onChange={e => handlerCommonInputChange('first', e)}
                                    >
                                    {options.map(OptionItem)}
                                </Select>
                                和
                                <Select
                                    value={distanceForm.second}
                                    onChange={e => handlerCommonInputChange('second', e)}
                                    >
                                    {options.map(OptionItem)}
                                </Select>
                                的中点
                            </div>
                            <div className={classes.actions}>
                                <Button className={classes.btn} variant="contained" onClick={addMidPoint}>添加中点</Button>
                            </div>

                        </div>
                    }




                    <div>计算</div>
                    <Select
                        value={distanceForm.first}
                        onChange={e => handlerCommonInputChange('first', e)}
                        >
                        {options.map(OptionItem)}
                    </Select>
                    和
                    <Select
                        value={distanceForm.second}
                        onChange={e => handlerCommonInputChange('second', e)}
                        >
                        {options.map(OptionItem)}
                    </Select>
                    的
                    距离

                    <div className={classes.actions}>
                        <Button className={classes.btn} variant="contained" onClick={addResult}>添加</Button>
                    </div>

                    <div>
                        <div>结果</div>
                        {results.map(ResultItem)}
                    </div>



                </div>
            </Page>
        )
    }
}

