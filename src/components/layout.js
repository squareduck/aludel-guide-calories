import { h } from 'ultradom'
import { createTemplate, createComponent } from 'aludel'

import { foodComponent } from './food'
import { statsComponent } from './stats'

const layoutTemplate = createTemplate({
    children: {
        food: foodComponent,
        stats: statsComponent,
    },
    render: ({ model, child }) => {
        return h('div', { class: 'app' }, [
            h('nav', { class: 'nav' }, [
                h('div', { class: 'nav-left' }, [
                    h('a', { class: 'brand', href: '#' }, 'CalorieCulator'),
                ]),
            ]),
            h('div', { class: 'row' }, [child.food(), child.stats()]),
        ])
    },
})

export const layoutComponent = createComponent(layoutTemplate, {})
