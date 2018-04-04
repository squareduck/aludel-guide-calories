import { h, patch } from 'ultradom'
import {
    createTemplate,
    createComponent,
    createInstance,
    createContext,
} from 'aludel'

import { containerComponent } from './components/container'

const initialState = {
    food: [
        { name: 'Potato Chips', calories: 150 },
        { name: 'Coke', calories: 140 },
        { name: 'Taco', calories: 135 },
        { name: 'Cappuccino', calories: 70 },
        { name: 'Pizza slice', calories: 155 },
    ],
}

function render(state) {
    console.log(state)
    patch(containerInstance(), document.querySelector('.app'))
}

const context = createContext(initialState, render)

const containerInstance = createInstance(context, containerComponent)

context.triggerUpdate()
