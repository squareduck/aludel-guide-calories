import { h } from 'ultradom'
import { createTemplate, createComponent } from 'aludel'

function foodOptions(list) {
    const foodList = list.map(food =>
        h(
            'option',
            { value: food.name, selected: food.selected },
            `${food.name} (${food.calories} cal)`,
        ),
    )

    return [h('option', { value: '' }, 'Select your food...'), ...foodList]
}

function portionText(amount, food) {
    const portions = amount === '1' ? '1 portion' : `${amount} portions`
    const calories = food ? food.calories * amount : 0
    return `${portions} (${calories} calories total)`
}

const foodTemplate = createTemplate({
    sockets: ['foodList', 'todayList', 'selectedFood'],
    actions: {
        $init: () => model => {
            model.$local = { amount: 1 }
            model.todayList = []
            return model
        },
        updateAmount: amount => model => {
            model.$local.amount = amount
            return model
        },
        updateFood: name => model => {
            model.foodList = model.foodList.map(food => {
                if (food.name === name)
                    return Object.assign({ selected: true }, food)
                return Object.assign(
                    {},
                    { name: food.name, calories: food.calories },
                )
            })
            model.selectedFood = model.foodList.filter(f => f.selected)[0]
            return model
        },
        munch: () => model => {
            const serving = Object.assign(
                {},
                {
                    name: model.selectedFood.name,
                    amount: model.$local.amount,
                    calories: model.selectedFood.calories * model.$local.amount,
                },
            )
            model.todayList = [serving, ...model.todayList]
            return model
        },
        forget: () => model => {
            model.todayList = []
            return model
        },
    },
    render: ({ model, action }) => {
        const isValid = !!model.selectedFood

        return h('div', { class: 'food col' }, [
            h('form', {}, [
                h('p', {}, [
                    h('label', { for: 'select-food' }, 'Choose food'),
                    h(
                        'select',
                        {
                            id: 'select-food',
                            onchange: event =>
                                action.updateFood(event.target.value),
                        },
                        foodOptions(model.foodList),
                    ),
                ]),
                h('p', {}, [
                    h(
                        'label',
                        { for: 'range-portions' },
                        portionText(model.$local.amount, model.selectedFood),
                    ),
                    h('input', {
                        id: 'range-portions',
                        type: 'range',
                        value: model.$local.amount,
                        disabled: !isValid,
                        onchange: event =>
                            action.updateAmount(event.target.value),
                        min: 1,
                        max: 5,
                    }),
                ]),
                h('p', {}, [
                    h(
                        'button',
                        {
                            class: 'is-full-width',
                            type: 'submit',
                            disabled: !isValid,
                            onclick: event => {
                                event.preventDefault()
                                action.munch()
                            },
                        },
                        'Munch!',
                    ),
                ]),
                h('p', {}, [
                    h(
                        'button',
                        {
                            class: 'is-full-width',
                            onclick: event => {
                                event.preventDefault()
                                action.forget()
                            },
                        },
                        'Forget and forgive',
                    ),
                ]),
            ]),
        ])
    },
})

export const foodComponent = createComponent(foodTemplate, {
    foodList: ['food'],
    todayList: ['today'],
    selectedFood: ['selected'],
})
