import { splitProps } from 'solid-js'

export default (props) => {
  const [local, others] = splitProps(props, ['children', 'class'])
  return (
    <div {...others} class={'bg-true-gray-8 rounded-xl ' + local.class}>
      {local.children}
    </div>
  )
}
