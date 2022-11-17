const Block = (props) => {
  return (
    <div class="relative md:w-70 md:h-70 w-30 h-45 overflow-hidden">
      <img
        src={props.blob}
        class="absolute md:w-110 w-50 md:top-0 top--1 md:left--20 left--10 z-0 w"
        alt=""
        srcset=""
      />
      <div class="absolute md:top-23 top-10.5 w-full z-1 text-center dark:color-white">
        <h2 class="md:text-10 text-6 m-y-0">
          {props.value}
          <span class="md:text-6 text-4 op-80">{props.unit}</span>
        </h2>
        <p class="text-5 op-80 md:m-t-1 m-t-10">{props.name}</p>
      </div>
    </div>
  )
}

const eq = 'md:w-30 w-10 md:h-3 h-2 md:m-y-7 m-y-3 rounded dark:bg-true-gray-4'

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
