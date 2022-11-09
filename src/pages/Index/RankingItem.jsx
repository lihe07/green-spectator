export default (props) => {
  return (
    <div class="flex">
      <div>{props.rank}</div>
      <span>{props.name}</span>
      <span>
        {props.data}
        {props.unit}
      </span>
    </div>
  )
}
