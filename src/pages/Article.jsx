import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from '@solidjs/router'
import { Show, createEffect, createResource, on } from 'solid-js'
import './Article.module.css'

export default () => {
  const locale = useI18n()[1].locale
  const data = useRouteData()

  const localData = () => data[locale()]

  const [markdown, { refetch }] = createResource(
    async () => (await localData().fetcher()).default
  )

  createEffect(on(locale, refetch, { defer: true }))

  return (
    <div class="pt-20 color-white">
      <Show when={data && !markdown.loading}>
        <section class="p-10 max-w-300 ma">
          <article>
            <h1>{localData().meta?.title}</h1>
            <p>
              For Debug:
              <br /> Here is my metadata:
            </p>
            <pre>{JSON.stringify(localData(), null, 2)}</pre>
            <br />
          </article>
          <article>{markdown()}</article>
        </section>
      </Show>
      <Show when={markdown.loading}>
        <h1>Loading...</h1>
      </Show>
    </div>
  )
}
