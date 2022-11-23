import { For, mergeProps } from 'solid-js'
import Card from './Card'

export default (props_) => {
  const props = mergeProps(props_, {
    direction: 'right'
  })
  return (
    <Card class="md:w-18 w-7 relative bg-gradient-linear bg-op-10 from-red to-green z1">
      <div class="w-full h-full op-50 bg-dark rounded-xl" />
      {/* When shallow screen: hide numbers */}
      <div class="w-full h-90% absolute top-4% left-0 md:op-100 op-0">
        <For each={[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]}>
          {(num) => (
            <div
              class="flex items-center absolute"
              style={{ top: 100 - num + '%' }}
              classList={{
                'op-70': num % 50 === 0,
                'op-60': num % 50 !== 0,
                'flex-row-reverse': props.direction === 'left'
              }}
            >
              <div
                class="bg-white h-1 m-r-2"
                classList={{
                  'w-22': num % 50 === 0,
                  'w-20': num % 50 !== 0
                }}
              />
              <span
                class="color-white"
                classList={{
                  'text-5': num % 50 === 0,
                  'text-4': num % 50 !== 0
                }}
              >
                {num}
              </span>
            </div>
          )}
        </For>
      </div>
    </Card>
  )
}
