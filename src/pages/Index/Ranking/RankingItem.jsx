export default (props) => {
  return (
    <div class="flex color-white h-20 w-full items-center px-5 box-border">
      <div class="w-8 h-8 rounded-50% flex items-center justify-center text-5 bg-op-40"
        classList={{
          'bg-yellow': props.rank === 1,
          'bg-gray': props.rank === 2,
          'bg-orange': props.rank === 3
        }}
      >{props.rank}</div>
      <span class="flex-1 mx-5 text-5">{props.name}</span>
      <span class="font-mono">
        <span class="text-6 font-bold">{props.data}</span>
        <span class="ml-1 text-4 op-80">{props.unit}</span>
      </span>
    </div>
  )
}
