import { h, patch } from 'ultradom'
import {
    createTemplate,
    createComponent,
    createInstance,
    createContext,
} from 'aludel'

import { layoutComponent } from './components/layout'

const initialState = {
    food: [
        { name: 'Potato Chips', calories: 150 },
        { name: 'Coke', calories: 140 },
        { name: 'Taco', calories: 135 },
        { name: 'Cappuccino', calories: 70 },
        { name: 'Pizza slice', calories: 155 },
    ],
}

const context = createContext(initialState, render)

function render(state) {
    console.log(state)
    patch(layoutInstance(), document.querySelector('.app'))
}

/*
 * We don't need to trigger the first render() here because one of the children
 * has $init action. Manual render() will execute before $init actions got a
 * chance to complete.
 * 
 * $init actions run on instantiation.
 * 
 */
const layoutInstance = createInstance(context, layoutComponent)
