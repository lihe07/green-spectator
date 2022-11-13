const Block = (props) => {
  return (
    <div class="relative w-70 h-70 overflow-hidden">
      <img
        src={props.blob}
        class="absolute w-110 top-0 left--20 z-0"
        alt=""
        srcset=""
      />
      <div class="absolute top-20 w-full z-1 text-center dark:color-white">
        <h2 class="">
          {props.value}
          <span>{props.unit}</span>
        </h2>
        <p>{props.name}</p>
      </div>
    </div>
  )
}

const eq = 'w-30 h-3 m-y-7 rounded dark:bg-true-gray-4'

export default (props) => {
  return (
    <div class="flex justify-around items-center">
      <Block
        value={props.leftValue}
        blob={props.leftBlob}
        unit={props.leftUnit}
        name={props.left}
      />
      <div>
        <div class={eq} />
        <div class={eq} />
      </div>
      <Block
        value={props.rightValue}
        blob={props.rightBlob}
        unit={props.rightUnit}
        name={props.right}
      />
    </div>
  )
}
