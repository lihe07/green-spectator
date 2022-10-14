import { mergeProps } from 'solid-js'

export default (props) => {
  const newProps = mergeProps({ class: 'bg-true-gray-8 rounded-xl' }, props)
  return <div {...newProps()}>{props.children}</div>
}
