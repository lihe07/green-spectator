export default (props) => {
  return (
    <section class="p-10 max-w-300 ma" {...props}>
      {props.children}
    </section>
  )
}
