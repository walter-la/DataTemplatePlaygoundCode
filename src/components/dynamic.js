let a = {
    functional: true,
    props: {
        template: String,
        data: { type: Object, default: () => ({}) }
    },
    render(h, context) {
        const template = context.props.template;
        const dynComponent = {
            template,
            data() { return context.props.data }
        }

        const component = template ? dynComponent : ''
        return h(component);
    }
}

export default a