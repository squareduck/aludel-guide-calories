import { h } from 'ultradom'
import { createTemplate, createComponent } from 'aludel'

const statsTemplate = createTemplate({
    sockets: ['history'],
    render: ({ model }) => {
        const totalCalories = model.history.reduce(
            (acc, food) => acc + food.calories,
            0,
        )
        return h('div', { class: 'stats col' }, [
            h('table', {}, [
                h('thead', {}, [
                    h('tr', {}, [
                        h('th', {}, 'Food name'),
                        h('th', {}, 'Amount'),
                        h('th', {}, 'Calories'),
                    ]),
                ]),
                h(
                    'tbody',
                    {},
                    model.history.map(food =>
                        h('tr', {}, [
                            h('td', {}, food.name),
                            h('td', {}, food.amount),
                            h('td', {}, food.calories),
                        ]),
                    ),
                ),
                h('tfoot', {}, [
                    h('tr', {}, [
                        h('th', {}, ''),
                        h('th', {}, ''),
                        h('th', {}, totalCalories),
                    ]),
                ]),
            ]),
        ])
    },
})

export const statsComponent = createComponent(statsTemplate, {
    history: ['today'],
})
