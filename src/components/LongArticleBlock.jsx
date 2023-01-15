import Section from './Section'

export default (props) => {
  return (
    <Section animOnly={true}>
      <div
        class="flex rounded-5 md:h-70 w-full bg-black dark:bg-op-50 light:bg-op-30 transition my-20 md:flex-row flex-col"
        classList={{
          'md:flex-row-reverse': props.reverse
        }}
      >
        <div
          class="md:w-50% w-full rounded-5 md:h-full h-50 bg-cover"
          style={{ 'background-image': `url(${props.cover})` }}
        />
        <div class="md:w-50% w-full md:h-full color-white pa-10 box-border">
          <p class="text-5 op-90 m0 flex items-center">
            <img
              src={props.orgnization.logo}
              alt={props.orgnization.name}
              class="w-7 h-7"
            />
            <span class="ml-2">{props.orgnization.name}</span>
          </p>
          <h1 class="text-8 my-4 tracking-wide">{props.title}</h1>
          <p class="text-5 m-0 op-70 leading-relaxed">{props.description}</p>
        </div>
      </div>
    </Section>
  )
}